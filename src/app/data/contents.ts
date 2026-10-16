// コンテンツデータ型定義
// データ本体はmicroCMSが保持する。取得は src/app/lib/cms/contents.ts 経由。
export interface ContentItem {
  /** microCMSのcontentId。既存記事は "2" "3" "25"〜"34" でURLを維持している */
  id: string;
  title: string;
  description: string;
  /** リッチエディタ由来のHTML */
  content: string;
  image: string;
  category: 'company' | 'work' | 'members' | 'environment' | 'dialogue';
  categoryLabel: string;
  tags: string[];
  publishedAt: string;
}

// カテゴリ定義
export const contentCategories = [
  { id: 'all', label: 'すべて', color: '#333' },
  { id: 'company', label: '会社を知る', color: '#00A8A8' },
  { id: 'work', label: '仕事を知る', color: '#D4AF37' },
  { id: 'members', label: '仲間を知る', color: '#E84855' },
  { id: 'environment', label: '働く環境', color: '#4A90E2' },
  { id: 'dialogue', label: '対話を知る', color: '#9B59B6' },
] as const;

export type ContentCategoryId = typeof contentCategories[number]['id'];

// カテゴリIDから色を取得するヘルパー関数
export function getCategoryColor(categoryId: string): string {
  const category = contentCategories.find(cat => cat.id === categoryId);
  return category?.color || '#4346BE';
}

// タグ定義
export const contentTags = [
  'Career',
  '新卒採用',
  'キャリア採用',
  'カルチャー',
  'インタビュー',
  '制度',
] as const;

export type ContentTag = typeof contentTags[number];

// 以下のヘルパーは、CMSから取得した配列を引数で受け取る。
// データ本体を持たなくなったため、モジュール内の配列を参照しない。

// IDでコンテンツを取得するヘルパー関数
export function getContentById(items: ContentItem[], id: string): ContentItem | undefined {
  return items.find(item => item.id === id);
}

// カテゴリでフィルタリングするヘルパー関数
export function getContentsByCategory(items: ContentItem[], categoryId: ContentCategoryId): ContentItem[] {
  if (categoryId === 'all') {
    return items;
  }
  return items.filter(item => item.category === categoryId);
}

// タグでフィルタリングするヘルパー関数
export function getContentsByTag(items: ContentItem[], tag: string): ContentItem[] {
  return items.filter(item => item.tags.includes(tag));
}

// カテゴリとタグで複合フィルタリング
export function getContentsFiltered(
  items: ContentItem[],
  categoryId: ContentCategoryId,
  tag?: string
): ContentItem[] {
  let filtered = categoryId === 'all' ? items : items.filter(item => item.category === categoryId);
  if (tag) {
    filtered = filtered.filter(item => item.tags.includes(tag));
  }
  return filtered;
}

// 関連コンテンツを取得（同じカテゴリの他の記事）
export function getRelatedContents(items: ContentItem[], id: string, limit: number = 3): ContentItem[] {
  const currentItem = getContentById(items, id);
  if (!currentItem) return [];

  return items
    .filter(item => item.id !== id && item.category === currentItem.category)
    .slice(0, limit);
}
