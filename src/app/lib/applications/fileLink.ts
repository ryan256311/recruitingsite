import { createHmac, timingSafeEqual } from "crypto";

/**
 * 応募書類へのアクセスを、ファイル単位の署名付きリンクで制御する。
 *
 * 保管先のバケットは非公開にしてあるので、URLを知っているだけでは取得できない。
 * 署名はファイルのキーごとに作るため、ある応募者の履歴書のリンクを持っていても
 * 別の応募者の書類は開けない。
 */

// アップロード側が作るキーの形: 2026-10-16/resume/<uuid>.pdf
const OBJECT_KEY = /^\d{4}-\d{2}-\d{2}\/[a-zA-Z]+\/[0-9a-f-]+\.[a-z0-9]+$/;

function requireSecret(): string {
  const secret = process.env.FILE_ACCESS_SECRET;
  if (!secret) throw new Error("環境変数 FILE_ACCESS_SECRET が設定されていません");
  return secret;
}

export function isValidObjectKey(key: string): boolean {
  if (!key || key.length > 512) return false;
  if (key.includes("..")) return false;
  return OBJECT_KEY.test(key);
}

export function signObjectKey(key: string): string {
  return createHmac("sha256", requireSecret()).update(key).digest("hex");
}

export function verifyObjectKey(key: string, token: string | null): boolean {
  if (!token) return false;

  const expected = signObjectKey(key);
  const givenBuf = Buffer.from(token, "utf8");
  const expectedBuf = Buffer.from(expected, "utf8");

  // timingSafeEqualは長さが違うと例外を投げるため、先に長さを見る
  if (givenBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(givenBuf, expectedBuf);
}

/** スプレッドシートと通知メールに載せる取得用URLを作る */
export function buildFileUrl(origin: string, key: string): string {
  if (!key) return "";

  const url = new URL("/api/files", origin);
  url.searchParams.set("key", key);
  url.searchParams.set("token", signObjectKey(key));
  return url.toString();
}
