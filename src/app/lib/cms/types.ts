/** microCMSが返す画像フィールドの形 */
export interface CmsImage {
  url: string;
  width: number;
  height: number;
}

/**
 * microCMSのセレクトフィールドは、単一選択の設定でも配列で返る。
 * 先頭要素を取り出すヘルパー。
 */
export function firstSelected(values: string[] | undefined): string | undefined {
  return values?.[0];
}
