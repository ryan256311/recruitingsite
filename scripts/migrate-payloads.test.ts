import { describe, expect, it } from "vitest";
import {
  buildContentPayload,
  buildJobPayload,
  markdownToHtml,
  toIso,
  type LegacyContent,
  type LegacyJob,
} from "./migrate-payloads";

function legacyContent(): LegacyContent {
  return {
    id: 25,
    title: "プロジェクトチームの話",
    description: "概要テキスト",
    content: "## 見出し\n\n本文です。\n",
    image: "/images/contents/project-team.webp",
    category: "work",
    categoryLabel: "仕事を知る",
    tags: ["制度", "カルチャー"],
    publishedAt: "2025.01.14",
  };
}

function legacyJob(): LegacyJob {
  return {
    id: 1,
    title: "Webコーダー",
    department: "メディアコンテンツ部",
    departmentDescription: "部署紹介",
    type: "エンジニア",
    description: "概要",
    background: "募集背景",
    requirements: ["実務経験1年以上"],
    responsibilities: ["Web制作"],
    salary: "月給220,000円〜",
    location: "福井県坂井市",
    employmentType: "正社員",
  };
}

describe("toIso", () => {
  it("YYYY.MM.DD を日本時間0時のISO 8601にする", () => {
    expect(toIso("2025.01.14")).toBe("2025-01-13T15:00:00.000Z");
  });

  it("日本時間0時に変換するため、CMS側で同じ日付として表示される", () => {
    // 2026.07.03 JST 00:00 = 2026-07-02T15:00:00Z
    expect(toIso("2026.07.03")).toBe("2026-07-02T15:00:00.000Z");
  });

  it("不正な形式では例外を投げる", () => {
    expect(() => toIso("2025-01-14")).toThrowError(/日付の形式/);
    expect(() => toIso("")).toThrowError(/日付の形式/);
  });
});

describe("markdownToHtml", () => {
  it("##見出しをh2にする", () => {
    expect(markdownToHtml("## 見出し")).toContain("<h2>見出し</h2>");
  });

  it("###見出しをh3にする", () => {
    expect(markdownToHtml("### 小見出し")).toContain("<h3>小見出し</h3>");
  });

  it("段落をpで囲む", () => {
    expect(markdownToHtml("本文です。")).toContain("<p>本文です。</p>");
  });

  it("**強調**をstrongにする", () => {
    expect(markdownToHtml("**太字**")).toContain("<strong>太字</strong>");
  });

  it("- 箇条書きをulとliにする", () => {
    const html = markdownToHtml("- 項目1\n- 項目2");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>項目1</li>");
  });

  it("空文字は空文字を返す", () => {
    expect(markdownToHtml("")).toBe("");
  });
});

describe("buildContentPayload", () => {
  it("CMSスキーマのフィールド名に詰め替える", () => {
    const payload = buildContentPayload(legacyContent());
    expect(payload.contentId).toBe("25");
    expect(payload.content.title).toBe("プロジェクトチームの話");
    expect(payload.content.description).toBe("概要テキスト");
    expect(payload.content.category).toEqual(["work"]);
    expect(payload.content.tags).toEqual(["制度", "カルチャー"]);
    expect(payload.content.displayDate).toBe("2025-01-13T15:00:00.000Z");
  });

  it("本文をHTMLに変換して入れる", () => {
    const payload = buildContentPayload(legacyContent());
    expect(payload.content.body).toContain("<h2>見出し</h2>");
    expect(payload.content.body).toContain("<p>本文です。</p>");
  });

  it("categoryLabelはCMSに送らない（サイト側で導出するため）", () => {
    const payload = buildContentPayload(legacyContent());
    expect(payload.content).not.toHaveProperty("categoryLabel");
  });

  it("画像はCMSに送らない（管理画面から手動アップロードするため）", () => {
    const payload = buildContentPayload(legacyContent());
    expect(payload.content).not.toHaveProperty("image");
  });

  it("移行元の画像パスを手作業用に別途返す", () => {
    const payload = buildContentPayload(legacyContent());
    expect(payload.imageToUploadManually).toBe("/images/contents/project-team.webp");
  });
});

describe("buildJobPayload（配列はテキストエリアの改行区切りで送る）", () => {
  it("slugとemploymentCategoryを設定し、contentIdは衝突しない形にする", () => {
    const payload = buildJobPayload(legacyJob(), "career");
    expect(payload.contentId).toBe("career-1");
    expect(payload.content.slug).toBe("1");
    expect(payload.content.employmentCategory).toEqual(["career"]);
  });

  it("新卒求人は別のcontentIdになる", () => {
    const payload = buildJobPayload(legacyJob(), "graduate");
    expect(payload.contentId).toBe("graduate-1");
    expect(payload.content.employmentCategory).toEqual(["graduate"]);
  });

  it("必須フィールドをそのまま引き継ぐ", () => {
    const payload = buildJobPayload(legacyJob(), "career");
    expect(payload.content.title).toBe("Webコーダー");
    expect(payload.content.salary).toBe("月給220,000円〜");
  });

  it("配列項目を改行区切りの文字列にする", () => {
    const job: LegacyJob = {
      ...legacyJob(),
      requirements: ["実務経験1年以上", "普通自動車第一種免許"],
    };
    const payload = buildJobPayload(job, "career");
    expect(payload.content.requirements).toBe("実務経験1年以上\n普通自動車第一種免許");
  });

  it("部署紹介は20文字制限に合わせたフィールドIDで送る", () => {
    const payload = buildJobPayload(legacyJob(), "career");
    expect(payload.content.departmentDesc).toBe("部署紹介");
    expect(payload.content).not.toHaveProperty("departmentDescription");
  });

  it("未設定の任意フィールドはキーを含めない", () => {
    const payload = buildJobPayload(legacyJob(), "career");
    expect(payload.content).not.toHaveProperty("welcomeSkills");
    expect(payload.content).not.toHaveProperty("devTech");
  });

  it("開発環境は4つのフィールドに展開して送る", () => {
    const job: LegacyJob = {
      ...legacyJob(),
      devEnvironment: {
        tech: ["TypeScript", "React"],
        versionControl: ["Git"],
        designTools: ["Figma"],
        workStyle: ["リモート可"],
      },
    };
    const payload = buildJobPayload(job, "career");
    expect(payload.content.devTech).toBe("TypeScript\nReact");
    expect(payload.content.devVersionControl).toBe("Git");
    expect(payload.content.devDesignTools).toBe("Figma");
    expect(payload.content.devWorkStyle).toBe("リモート可");
    expect(payload.content).not.toHaveProperty("devEnvironment");
  });

  it("idは送らない（slugで管理するため）", () => {
    const payload = buildJobPayload(legacyJob(), "career");
    expect(payload.content).not.toHaveProperty("id");
  });
});
