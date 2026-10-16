import { isMicroCMSRequestError } from "microcms-js-sdk";

/**
 * 「そのコンテンツが存在しない」エラーかどうかを判定する。
 *
 * 取得失敗をすべて null（=404表示）にしてしまうと、CMS側の一時的な障害や
 * レート制限のときにも「記事が見つかりません」が描画され、しかもその結果が
 * ISRのキャッシュに最大10分残る。公開中の記事が消えたように見えてしまう。
 *
 * そこで本当に存在しない場合だけ null を返し、それ以外は例外を投げ直して
 * Next.jsに再生成の失敗として扱わせる（直前の生成済みページが配信され続ける）。
 */
export function isContentNotFound(error: unknown): boolean {
  if (!isMicroCMSRequestError(error)) return false;

  // 400はdraftKeyの不正など「そのコンテンツを出せない」系。404と同様に扱う
  return error.status === 404 || error.status === 400;
}
