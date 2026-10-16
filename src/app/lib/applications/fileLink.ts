import { createHmac, timingSafeEqual } from "crypto";

/**
 * 応募書類のファイルIDを、自分が発行したものだと確認できるようにする。
 *
 * 実体はGoogleドライブの非公開フォルダにあり、閲覧できるのはフォルダを
 * 共有された人だけ。ここで署名を確かめるのは、応募フォームに他人の
 * ファイルIDを送り込まれて、スプレッドシートに無関係なリンクが
 * 並ぶのを防ぐため。
 */

// ドライブのファイルIDは英数字とハイフン・アンダースコアのみ
const FILE_ID = /^[A-Za-z0-9_-]{10,200}$/;

function requireSecret(): string {
  const secret = process.env.FILE_ACCESS_SECRET;
  if (!secret) throw new Error("環境変数 FILE_ACCESS_SECRET が設定されていません");
  return secret;
}

export function isValidFileId(fileId: string): boolean {
  if (!fileId || fileId.length > 200) return false;
  return FILE_ID.test(fileId);
}

export function signFileId(fileId: string): string {
  return createHmac("sha256", requireSecret()).update(fileId).digest("hex");
}

export function verifyFileId(fileId: string, token: string | undefined | null): boolean {
  if (!token) return false;

  const expected = signFileId(fileId);
  const givenBuf = Buffer.from(token, "utf8");
  const expectedBuf = Buffer.from(expected, "utf8");

  // timingSafeEqualは長さが違うと例外を投げるため、先に長さを見る
  if (givenBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(givenBuf, expectedBuf);
}

/** スプレッドシートと通知メールに載せる、ドライブで開くURL */
export function buildDriveUrl(fileId: string): string {
  if (!fileId) return "";
  return `https://drive.google.com/file/d/${fileId}/view`;
}
