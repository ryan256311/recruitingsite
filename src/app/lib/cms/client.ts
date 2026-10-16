import { createClient } from "microcms-js-sdk";

type CmsClient = ReturnType<typeof createClient>;

let cached: CmsClient | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`環境変数 ${name} が設定されていません`);
  }
  return value;
}

/**
 * microCMSの読み取り用クライアントを返す。
 *
 * 生成を遅延させているのは、環境変数が無い状態でもモジュールのimportが通るようにするため。
 * モジュール先頭で生成すると、CMSを呼ばないテストまでAPIキーを要求してしまう。
 * 設定漏れは最初の呼び出し時点（ビルド時のデータ取得）で例外になるので、
 * 古い内容のまま無言でデプロイされることはない。
 */
export function getCmsClient(): CmsClient {
  if (!cached) {
    cached = createClient({
      serviceDomain: requireEnv("MICROCMS_SERVICE_DOMAIN"),
      apiKey: requireEnv("MICROCMS_API_KEY"),
    });
  }
  return cached;
}

/** テスト用。環境変数を差し替えて検証するためにキャッシュを捨てる */
export function resetCmsClientForTest(): void {
  cached = null;
}
