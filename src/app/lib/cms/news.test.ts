import { describe, expect, it } from "vitest";
import { toNewsItem, type CmsNews } from "./news";

function base(): CmsNews {
  return {
    id: "abc123",
    date: "2026-07-03T00:00:00.000Z",
    title: "説明会に参加します",
    category: ["news"],
    body: "<p>本文</p>",
  };
}

describe("toNewsItem", () => {
  it("CMSレスポンスをNewsItemへ変換する", () => {
    expect(toNewsItem(base())).toEqual({
      id: "abc123",
      date: "2026.07.03",
      title: "説明会に参加します",
      category: "news",
      categoryLabel: "ニュース",
      content: "<p>本文</p>",
      image: undefined,
      externalUrl: undefined,
    });
  });

  it("categoryLabelをサイト側の定義から導出する", () => {
    expect(toNewsItem({ ...base(), category: ["graduate"] })?.categoryLabel).toBe("新卒");
    expect(toNewsItem({ ...base(), category: ["other"] })?.categoryLabel).toBe("その他");
  });

  it("本文が空でも変換できる（外部リンクのみのお知らせ）", () => {
    const item = toNewsItem({
      ...base(),
      body: undefined,
      externalUrl: "https://example.com/info",
    });
    expect(item?.content).toBe("");
    expect(item?.externalUrl).toBe("https://example.com/info");
  });

  it("画像があればURLだけを取り出す", () => {
    const item = toNewsItem({
      ...base(),
      image: { url: "https://images.microcms-assets.io/a.webp", width: 800, height: 600 },
    });
    expect(item?.image).toBe("https://images.microcms-assets.io/a.webp");
  });

  it("externalUrlが空文字ならundefinedにする（詳細ページへ送る）", () => {
    expect(toNewsItem({ ...base(), externalUrl: "" })?.externalUrl).toBeUndefined();
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toNewsItem({ ...base(), title: "" })).toBeNull();
  });

  it("未知のカテゴリならnullを返す", () => {
    expect(toNewsItem({ ...base(), category: ["unknown"] })).toBeNull();
  });

  it("カテゴリが空配列ならnullを返す", () => {
    expect(toNewsItem({ ...base(), category: [] })).toBeNull();
  });

  it("カテゴリに絞り込み用のallが入っていたらnullを返す", () => {
    expect(toNewsItem({ ...base(), category: ["all"] })).toBeNull();
  });
});
