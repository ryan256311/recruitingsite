import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getCmsClient, resetCmsClientForTest } from "./client";

const ORIGINAL = {
  domain: process.env.MICROCMS_SERVICE_DOMAIN,
  key: process.env.MICROCMS_API_KEY,
};

beforeEach(() => {
  resetCmsClientForTest();
});

afterEach(() => {
  process.env.MICROCMS_SERVICE_DOMAIN = ORIGINAL.domain;
  process.env.MICROCMS_API_KEY = ORIGINAL.key;
  resetCmsClientForTest();
});

describe("getCmsClient", () => {
  it("サービスドメインが未設定なら、どの環境変数が足りないか分かる例外を投げる", () => {
    delete process.env.MICROCMS_SERVICE_DOMAIN;
    process.env.MICROCMS_API_KEY = "test-key";

    expect(() => getCmsClient()).toThrowError(/MICROCMS_SERVICE_DOMAIN/);
  });

  it("APIキーが未設定なら、どの環境変数が足りないか分かる例外を投げる", () => {
    process.env.MICROCMS_SERVICE_DOMAIN = "test-domain";
    delete process.env.MICROCMS_API_KEY;

    expect(() => getCmsClient()).toThrowError(/MICROCMS_API_KEY/);
  });

  it("環境変数が揃っていればクライアントを返す", () => {
    process.env.MICROCMS_SERVICE_DOMAIN = "test-domain";
    process.env.MICROCMS_API_KEY = "test-key";

    const client = getCmsClient();

    expect(typeof client.getList).toBe("function");
    expect(typeof client.getListDetail).toBe("function");
  });

  it("2回目以降は同じインスタンスを返す", () => {
    process.env.MICROCMS_SERVICE_DOMAIN = "test-domain";
    process.env.MICROCMS_API_KEY = "test-key";

    expect(getCmsClient()).toBe(getCmsClient());
  });

  it("モジュールをimportしただけでは例外を投げない（環境変数なしでもテストが動く）", () => {
    delete process.env.MICROCMS_SERVICE_DOMAIN;
    delete process.env.MICROCMS_API_KEY;

    // importは既に済んでおり、ここに到達できること自体が検証になる
    expect(typeof getCmsClient).toBe("function");
  });
});
