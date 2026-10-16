import { createHmac } from "crypto";
import { describe, expect, it } from "vitest";
import { verifyWebhookSignature } from "./signature";

const SECRET = "test-secret";

function sign(body: string): string {
  return createHmac("sha256", SECRET).update(body).digest("hex");
}

describe("verifyWebhookSignature", () => {
  it("正しい署名を受け入れる", () => {
    const body = JSON.stringify({ api: "news" });
    expect(verifyWebhookSignature(body, sign(body), SECRET)).toBe(true);
  });

  it("署名が無ければ拒否する", () => {
    expect(verifyWebhookSignature("{}", null, SECRET)).toBe(false);
  });

  it("署名が空文字なら拒否する", () => {
    expect(verifyWebhookSignature("{}", "", SECRET)).toBe(false);
  });

  it("改ざんされた本文を拒否する", () => {
    const signature = sign(JSON.stringify({ api: "news" }));
    expect(verifyWebhookSignature(JSON.stringify({ api: "jobs" }), signature, SECRET)).toBe(false);
  });

  it("別のシークレットで作られた署名を拒否する", () => {
    const body = JSON.stringify({ api: "news" });
    const wrong = createHmac("sha256", "other-secret").update(body).digest("hex");
    expect(verifyWebhookSignature(body, wrong, SECRET)).toBe(false);
  });

  it("長さの違う署名でも例外を投げずにfalseを返す", () => {
    const body = JSON.stringify({ api: "news" });
    expect(verifyWebhookSignature(body, "abc", SECRET)).toBe(false);
  });

  it("同じ長さだが異なる署名を拒否する", () => {
    const body = JSON.stringify({ api: "news" });
    const valid = sign(body);
    const tampered = valid.slice(0, -1) + (valid.endsWith("0") ? "1" : "0");
    expect(verifyWebhookSignature(body, tampered, SECRET)).toBe(false);
  });
});
