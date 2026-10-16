import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildFileUrl, isValidObjectKey, signObjectKey, verifyObjectKey } from "./fileLink";

const KEY = "2026-10-16/resume/0f8fad5b-d9cb-469f-a165-70867728950e.pdf";

beforeEach(() => {
  process.env.FILE_ACCESS_SECRET = "test-file-secret";
});

afterEach(() => {
  delete process.env.FILE_ACCESS_SECRET;
});

describe("signObjectKey / verifyObjectKey", () => {
  it("自分で署名したものは検証を通る", () => {
    expect(verifyObjectKey(KEY, signObjectKey(KEY))).toBe(true);
  });

  it("別のファイルの署名では通らない（1枚のリンクで他人の書類を見せない）", () => {
    const otherKey = "2026-10-16/resume/11111111-2222-3333-4444-555555555555.pdf";
    expect(verifyObjectKey(otherKey, signObjectKey(KEY))).toBe(false);
  });

  it("署名が改ざんされていたら通らない", () => {
    const token = signObjectKey(KEY);
    const tampered = token.slice(0, -1) + (token.endsWith("a") ? "b" : "a");
    expect(verifyObjectKey(KEY, tampered)).toBe(false);
  });

  it("署名が空なら通らない", () => {
    expect(verifyObjectKey(KEY, "")).toBe(false);
    expect(verifyObjectKey(KEY, null)).toBe(false);
  });

  it("長さの違う署名でも例外を投げずにfalseを返す", () => {
    expect(() => verifyObjectKey(KEY, "short")).not.toThrow();
    expect(verifyObjectKey(KEY, "short")).toBe(false);
  });

  it("シークレットが変わると以前の署名は通らない", () => {
    const token = signObjectKey(KEY);
    process.env.FILE_ACCESS_SECRET = "another-secret";
    expect(verifyObjectKey(KEY, token)).toBe(false);
  });
});

describe("isValidObjectKey", () => {
  it("アップロード側が作る形式を受け入れる", () => {
    expect(isValidObjectKey(KEY)).toBe(true);
  });

  it("上位ディレクトリへの参照を拒否する", () => {
    expect(isValidObjectKey("../../etc/passwd")).toBe(false);
    expect(isValidObjectKey("2026-10-16/resume/../../secret.pdf")).toBe(false);
  });

  it("空や極端に長い値を拒否する", () => {
    expect(isValidObjectKey("")).toBe(false);
    expect(isValidObjectKey("a".repeat(600))).toBe(false);
  });
});

describe("buildFileUrl", () => {
  it("署名付きの取得URLを組み立てる", () => {
    const url = new URL(buildFileUrl("https://example.com", KEY));
    expect(url.pathname).toBe("/api/files");
    expect(url.searchParams.get("key")).toBe(KEY);
    expect(verifyObjectKey(KEY, url.searchParams.get("token"))).toBe(true);
  });

  it("キーが未設定なら空文字を返す（添付なしの応募を壊さない）", () => {
    expect(buildFileUrl("https://example.com", "")).toBe("");
  });
});
