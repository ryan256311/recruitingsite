import { describe, expect, it } from "vitest";
import { toJob, toLines, type CmsJob } from "./jobs";

function base(): CmsJob {
  return {
    id: "career-1",
    slug: "1",
    employmentCategory: ["career"],
    title: "Webコーダー・HTMLコーダー",
    department: "メディアコンテンツ部",
    departmentDesc: "部署紹介テキスト",
    type: "エンジニア",
    description: "概要",
    background: "募集背景",
    requirements: "実務経験1年以上\n普通自動車第一種免許",
    responsibilities: "Web制作・コーディング",
    salary: "月給220,000円〜",
    location: "福井県坂井市",
    employmentType: "正社員",
  };
}

describe("toLines", () => {
  it("改行区切りのテキストを配列にする", () => {
    expect(toLines("a\nb\nc")).toEqual(["a", "b", "c"]);
  });

  it("CRLFの改行も扱える", () => {
    expect(toLines("a\r\nb")).toEqual(["a", "b"]);
  });

  it("空行と前後の空白を取り除く", () => {
    expect(toLines("  a  \n\n\n  b  \n")).toEqual(["a", "b"]);
  });

  it("未設定・空文字では空配列を返す", () => {
    expect(toLines(undefined)).toEqual([]);
    expect(toLines("")).toEqual([]);
    expect(toLines("   \n  ")).toEqual([]);
  });

  // スキーマをテキストエリアから繰り返しフィールドに変更しても壊れないようにしておく
  it("文字列の配列をそのまま扱える", () => {
    expect(toLines(["a", "b"])).toEqual(["a", "b"]);
  });

  it("繰り返しフィールド形式のオブジェクト配列も扱える", () => {
    expect(
      toLines([
        { fieldId: "item", value: "a" },
        { fieldId: "item", value: "b" },
      ])
    ).toEqual(["a", "b"]);
  });

  it("オブジェクト配列の空値は取り除く", () => {
    expect(toLines([{ fieldId: "item", value: "" }, { fieldId: "item" }])).toEqual([]);
  });
});

describe("toJob", () => {
  it("CMSレスポンスをJobへ変換する", () => {
    const job = toJob(base());
    expect(job?.slug).toBe("1");
    expect(job?.title).toBe("Webコーダー・HTMLコーダー");
    expect(job?.salary).toBe("月給220,000円〜");
  });

  it("departmentDescをdepartmentDescriptionへ詰め替える", () => {
    expect(toJob(base())?.departmentDescription).toBe("部署紹介テキスト");
  });

  it("応募要件の改行を配列に変換する", () => {
    expect(toJob(base())?.requirements).toEqual([
      "実務経験1年以上",
      "普通自動車第一種免許",
    ]);
  });

  it("業務内容の改行を配列に変換する", () => {
    expect(toJob(base())?.responsibilities).toEqual(["Web制作・コーディング"]);
  });

  it("必須の配列が未設定なら空配列で埋める", () => {
    const job = toJob({ ...base(), requirements: undefined, responsibilities: undefined });
    expect(job?.requirements).toEqual([]);
    expect(job?.responsibilities).toEqual([]);
  });

  it("任意の配列フィールドが未設定ならundefinedにする（欄ごと出さない）", () => {
    const job = toJob(base());
    expect(job?.welcomeSkills).toBeUndefined();
    expect(job?.appealPoints).toBeUndefined();
    expect(job?.benefits).toBeUndefined();
    expect(job?.selectionProcess).toBeUndefined();
  });

  it("任意の配列フィールドが空文字でもundefinedにする", () => {
    expect(toJob({ ...base(), welcomeSkills: "   \n " })?.welcomeSkills).toBeUndefined();
  });

  it("任意の配列フィールドを改行区切りで引き継ぐ", () => {
    const job = toJob({
      ...base(),
      welcomeSkills: "EC-CUBE経験\nReact経験",
      benefits: "社保完備",
    });
    expect(job?.welcomeSkills).toEqual(["EC-CUBE経験", "React経験"]);
    expect(job?.benefits).toEqual(["社保完備"]);
  });

  it("開発環境は4つのフィールドから組み立てる", () => {
    const job = toJob({
      ...base(),
      devTech: "HTML5/CSS3\nTypeScript",
      devVersionControl: "SourceTree",
      devDesignTools: "Figma",
      devWorkStyle: "営業と連携",
    });
    expect(job?.devEnvironment).toEqual({
      tech: ["HTML5/CSS3", "TypeScript"],
      versionControl: ["SourceTree"],
      designTools: ["Figma"],
      workStyle: ["営業と連携"],
    });
  });

  it("開発環境は一部だけ入力されていても残りを空配列で埋める", () => {
    const job = toJob({ ...base(), devTech: "TypeScript" });
    expect(job?.devEnvironment).toEqual({
      tech: ["TypeScript"],
      versionControl: [],
      designTools: [],
      workStyle: [],
    });
  });

  it("開発環境が4つとも空ならundefinedにする（欄ごと出さない）", () => {
    expect(toJob(base())?.devEnvironment).toBeUndefined();
    expect(toJob({ ...base(), devTech: "  " })?.devEnvironment).toBeUndefined();
  });

  it("slugが空ならnullを返す", () => {
    expect(toJob({ ...base(), slug: "" })).toBeNull();
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toJob({ ...base(), title: "" })).toBeNull();
  });
});
