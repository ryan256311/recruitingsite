import { describe, expect, it } from "vitest";
import { toJob, type CmsJob } from "./jobs";

function base(): CmsJob {
  return {
    id: "generated-id",
    slug: "1",
    employmentCategory: ["career"],
    title: "Webコーダー・HTMLコーダー",
    department: "メディアコンテンツ部",
    departmentDescription: "部署紹介テキスト",
    type: "エンジニア",
    description: "概要",
    background: "募集背景",
    requirements: ["実務経験1年以上"],
    responsibilities: ["Web制作・コーディング"],
    salary: "月給220,000円〜",
    location: "福井県坂井市",
    employmentType: "正社員",
  };
}

describe("toJob", () => {
  it("CMSレスポンスをJobへ変換する", () => {
    const job = toJob(base());
    expect(job?.slug).toBe("1");
    expect(job?.title).toBe("Webコーダー・HTMLコーダー");
    expect(job?.requirements).toEqual(["実務経験1年以上"]);
    expect(job?.salary).toBe("月給220,000円〜");
  });

  it("任意フィールドが未設定ならundefinedのままにする", () => {
    const job = toJob(base());
    expect(job?.welcomeSkills).toBeUndefined();
    expect(job?.devEnvironment).toBeUndefined();
    expect(job?.benefits).toBeUndefined();
  });

  it("必須の配列が未設定なら空配列で埋める", () => {
    const job = toJob({ ...base(), requirements: undefined, responsibilities: undefined });
    expect(job?.requirements).toEqual([]);
    expect(job?.responsibilities).toEqual([]);
  });

  it("任意の配列フィールドを引き継ぐ", () => {
    const job = toJob({ ...base(), welcomeSkills: ["EC-CUBE経験"], benefits: ["社保完備"] });
    expect(job?.welcomeSkills).toEqual(["EC-CUBE経験"]);
    expect(job?.benefits).toEqual(["社保完備"]);
  });

  it("開発環境のカスタムフィールドを引き継ぐ", () => {
    const job = toJob({
      ...base(),
      devEnvironment: {
        fieldId: "devEnvironment",
        tech: ["HTML5/CSS3"],
        versionControl: ["SourceTree"],
        designTools: ["Figma"],
        workStyle: ["営業と連携"],
      },
    });
    expect(job?.devEnvironment).toEqual({
      tech: ["HTML5/CSS3"],
      versionControl: ["SourceTree"],
      designTools: ["Figma"],
      workStyle: ["営業と連携"],
    });
  });

  it("開発環境の一部が未設定でも空配列で埋める", () => {
    const job = toJob({
      ...base(),
      devEnvironment: { fieldId: "devEnvironment", tech: ["TypeScript"] },
    });
    expect(job?.devEnvironment).toEqual({
      tech: ["TypeScript"],
      versionControl: [],
      designTools: [],
      workStyle: [],
    });
  });

  it("slugが空ならnullを返す", () => {
    expect(toJob({ ...base(), slug: "" })).toBeNull();
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toJob({ ...base(), title: "" })).toBeNull();
  });
});
