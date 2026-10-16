import { createHmac, timingSafeEqual } from "crypto";

/**
 * microCMSのWebhook署名（X-MICROCMS-Signature）を検証する。
 * シークレットとリクエストボディからHMAC-SHA256を作り、タイミング安全に比較する。
 */
export function verifyWebhookSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const expected = createHmac("sha256", secret).update(body).digest("hex");

  const actualBuf = Buffer.from(signature, "utf8");
  const expectedBuf = Buffer.from(expected, "utf8");

  // timingSafeEqualは長さ違いで例外を投げるため、先に長さを見る
  if (actualBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(actualBuf, expectedBuf);
}
