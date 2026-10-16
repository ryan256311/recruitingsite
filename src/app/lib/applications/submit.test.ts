import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitApplication } from "./submit";
import type { Application } from "./sheet";

function base(): Application {
  return {
    inquiryType: "応募・選考について",
    recruitmentType: "キャリア採用",
    jobs: ["ルート営業"],
    name: "福井 太郎",
    furigana: "フクイ タロウ",
    email: "taro@example.com",
    phone: "",
    portfolioUrl: "",
    message: "",
    resumeUrl: "https://example.com/r.pdf",
    resumeName: "履歴書.pdf",
    careerHistoryUrl: "",
    careerHistoryName: "",
    portfolioFileUrl: "",
    portfolioFileName: "",
  };
}

function jsonResponse(body: unknown, ok = true) {
  return {
    ok,
    status: ok ? 200 : 500,
    text: async () => JSON.stringify(body),
  } as Response;
}

beforeEach(() => {
  process.env.GAS_WEBHOOK_URL = "https://script.google.com/macros/s/test/exec";
  process.env.GAS_WEBHOOK_SECRET = "test-secret";
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.GAS_WEBHOOK_URL;
  delete process.env.GAS_WEBHOOK_SECRET;
});

describe("submitApplication", () => {
  it("記録できたら行番号を返す", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ ok: true, row: 7 })));
    await expect(submitApplication(base())).resolves.toEqual({ row: 7 });
  });

  it("合言葉と応募内容を送る", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true, row: 2 }));
    vi.stubGlobal("fetch", fetchMock);

    await submitApplication(base());

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://script.google.com/macros/s/test/exec");
    const sent = JSON.parse(init.body as string);
    expect(sent.secret).toBe("test-secret");
    expect(sent.data.name).toBe("福井 太郎");
  });

  it("数式になりうる値を無害化してから送る", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ ok: true, row: 2 }));
    vi.stubGlobal("fetch", fetchMock);

    await submitApplication({ ...base(), name: "=1+1" });

    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const sent = JSON.parse(init.body as string);
    expect(sent.data.name).toBe("'=1+1");
  });

  it("Apps Scriptが ok:false を返したら失敗にする（HTTPは200で返ってくる）", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ ok: false, error: "unauthorized" })));
    await expect(submitApplication(base())).rejects.toThrow(/unauthorized/);
  });

  it("HTTPエラーなら失敗にする", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({}, false)));
    await expect(submitApplication(base())).rejects.toThrow();
  });

  it("JSON以外が返ってきたら失敗にする（ログイン画面のHTMLなど）", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, status: 200, text: async () => "<!DOCTYPE html>" }) as Response)
    );
    await expect(submitApplication(base())).rejects.toThrow();
  });

  it("メール送信だけ失敗した場合は成功として扱う（記録は残っているため）", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({ ok: true, row: 9, mailError: "quota exceeded" }))
    );
    await expect(submitApplication(base())).resolves.toEqual({ row: 9, mailError: "quota exceeded" });
  });

  it("接続先が未設定なら、その旨がわかる例外を投げる", async () => {
    delete process.env.GAS_WEBHOOK_URL;
    vi.stubGlobal("fetch", vi.fn());
    await expect(submitApplication(base())).rejects.toThrow(/GAS_WEBHOOK_URL/);
  });

  it("合言葉が未設定なら、その旨がわかる例外を投げる", async () => {
    delete process.env.GAS_WEBHOOK_SECRET;
    vi.stubGlobal("fetch", vi.fn());
    await expect(submitApplication(base())).rejects.toThrow(/GAS_WEBHOOK_SECRET/);
  });
});
