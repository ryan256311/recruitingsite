import { describe, expect, it } from "vitest";
import { toContentItem, type CmsContent } from "./contents";

function base(): CmsContent {
  return {
    id: "25",
    title: "プロジェクトチームの話",
    description: "概要テキスト",
    body: "<h2>見出し</h2><p>本文</p>",
    image: { url: "https://images.microcms-assets.io/a.webp", width: 1200, height: 800 },
    category: ["work"],
    tags: ["制度", "カルチャー"],
    displayDate: "2025-01-14T00:00:00.000Z",
  };
}

describe("toContentItem", () => {
  it("CMSレスポンスをContentItemへ変換する", () => {
    expect(toContentItem(base())).toEqual({
      id: "25",
      title: "プロジェクトチームの話",
      description: "概要テキスト",
      content: "<h2>見出し</h2><p>本文</p>",
      image: "https://images.microcms-assets.io/a.webp",
      category: "work",
      categoryLabel: "仕事を知る",
      tags: ["制度", "カルチャー"],
      publishedAt: "2025.01.14",
    });
  });

  it("displayDateをpublishedAtへ詰め替える", () => {
    expect(toContentItem(base())?.publishedAt).toBe("2025.01.14");
  });

  it("タグ未設定なら空配列にする", () => {
    expect(toContentItem({ ...base(), tags: undefined })?.tags).toEqual([]);
  });

  it("概要未設定なら空文字にする", () => {
    expect(toContentItem({ ...base(), description: undefined })?.description).toBe("");
  });

  it("画像が未設定ならnullを返す（一覧から除外する）", () => {
    expect(toContentItem({ ...base(), image: undefined })).toBeNull();
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toContentItem({ ...base(), title: "" })).toBeNull();
  });

  it("未知のカテゴリならnullを返す", () => {
    expect(toContentItem({ ...base(), category: ["unknown"] })).toBeNull();
  });

  it("カテゴリが空配列ならnullを返す", () => {
    expect(toContentItem({ ...base(), category: [] })).toBeNull();
  });

  it("カテゴリに絞り込み用のallが入っていたらnullを返す", () => {
    expect(toContentItem({ ...base(), category: ["all"] })).toBeNull();
  });

  it("全カテゴリのラベルを正しく導出する", () => {
    expect(toContentItem({ ...base(), category: ["company"] })?.categoryLabel).toBe("会社を知る");
    expect(toContentItem({ ...base(), category: ["members"] })?.categoryLabel).toBe("仲間を知る");
    expect(toContentItem({ ...base(), category: ["environment"] })?.categoryLabel).toBe("働く環境");
    expect(toContentItem({ ...base(), category: ["dialogue"] })?.categoryLabel).toBe("対話を知る");
  });
});
