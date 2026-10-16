import { describe, expect, it } from "vitest";
import { isContentNotFound } from "./notFound";

/**
 * microCMS SDKが投げるエラーの形を模したもの。
 * SDKの型ガードは status / url / originalError の3つが自身のプロパティとして
 * 存在することを条件にしているので、同じ形で作る。
 */
function requestError(status: number) {
  const error = new Error(`fetch API response status: ${status}`);
  return Object.assign(error, {
    name: "MicroCMSRequestError",
    status,
    url: "https://exceet-recruit.microcms.io/api/v1/contents/2",
    originalError: undefined,
  });
}

describe("isContentNotFound", () => {
  it("404は「存在しない」とみなす", () => {
    expect(isContentNotFound(requestError(404))).toBe(true);
  });

  it("400は「存在しない」とみなす（下書きキー不正など、記事側の問題）", () => {
    expect(isContentNotFound(requestError(400))).toBe(true);
  });

  it("429は「存在しない」とみなさない（レート制限は一時的な障害）", () => {
    expect(isContentNotFound(requestError(429))).toBe(false);
  });

  it("500は「存在しない」とみなさない（CMS側の障害）", () => {
    expect(isContentNotFound(requestError(500))).toBe(false);
  });

  it("ネットワークエラーは「存在しない」とみなさない", () => {
    expect(isContentNotFound(new TypeError("fetch failed"))).toBe(false);
  });

  it("エラーでない値は「存在しない」とみなさない", () => {
    expect(isContentNotFound(undefined)).toBe(false);
    expect(isContentNotFound("404")).toBe(false);
  });
});
