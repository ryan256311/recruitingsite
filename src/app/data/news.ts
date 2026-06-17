// お知らせデータ型定義
export interface NewsItem {
  id: number;
  date: string;
  title: string;
  category: 'graduate' | 'news' | 'other';
  categoryLabel: string;
  content: string;
  image?: string;
}

// カテゴリ定義
export const newsCategories = [
  { id: 'all', label: 'すべて' },
  { id: 'graduate', label: '新卒' },
  { id: 'news', label: 'ニュース' },
  { id: 'other', label: 'その他' },
] as const;

export type NewsCategoryId = typeof newsCategories[number]['id'];

// お知らせデータ
// ※サンプル/架空のお知らせは削除済み。実際のお知らせをここに追加してください。
export const newsItems: NewsItem[] = [];

// IDでお知らせを取得するヘルパー関数
export function getNewsById(id: number): NewsItem | undefined {
  return newsItems.find(item => item.id === id);
}

// カテゴリでフィルタリングするヘルパー関数
export function getNewsByCategory(categoryId: NewsCategoryId): NewsItem[] {
  if (categoryId === 'all') {
    return newsItems;
  }
  return newsItems.filter(item => item.category === categoryId);
}
