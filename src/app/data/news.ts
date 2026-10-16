// お知らせデータ型定義
// データ本体はmicroCMSが保持する。取得は src/app/lib/cms/news.ts 経由。
export interface NewsItem {
  /** microCMSのcontentId */
  id: string;
  date: string;
  title: string;
  category: 'graduate' | 'news' | 'other';
  categoryLabel: string;
  /** リッチエディタ由来のHTML。外部リンクのみのお知らせでは空文字 */
  content: string;
  image?: string;
  /** 入力時は一覧から外部サイトへ直接リンクする */
  externalUrl?: string;
}

// カテゴリ定義
export const newsCategories = [
  { id: 'all', label: 'すべて' },
  { id: 'graduate', label: '新卒' },
  { id: 'news', label: 'ニュース' },
  { id: 'other', label: 'その他' },
] as const;

export type NewsCategoryId = typeof newsCategories[number]['id'];
