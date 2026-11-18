/**
 * サイト全体の基本情報。ページのタイトル・URL・検索エンジン向けの情報で共通に使う。
 */
export const SITE_NAME = "エクシート採用サイト";
export const COMPANY_NAME = "株式会社エクシート";
export const COMPANY_URL = "https://exceet.co.jp/";

/**
 * 本番の公開アドレス（末尾の / なし）。
 * 独自ドメインに移すときは、Vercel の環境変数 NEXT_PUBLIC_SITE_URL に新しいアドレスを設定して再デプロイする。
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://recruitingsitenext.vercel.app"
).replace(/\/+$/, "");

/**
 * 検索エンジンに載せるか。公開日に Vercel の環境変数 ALLOW_INDEXING=true（Production のみ）を設定して再デプロイする。
 * プレビュー環境（VERCEL_ENV=preview）やローカルでは、設定に関係なく載せない。
 */
export const ALLOW_INDEXING =
  process.env.ALLOW_INDEXING === "true" && process.env.VERCEL_ENV === "production";
