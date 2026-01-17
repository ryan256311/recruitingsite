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
export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '2025.04.01',
    title: '2025年度キャリア採用選考情報を公開しました',
    category: 'news',
    categoryLabel: 'ニュース',
    content: `2025年度のキャリア採用選考情報を公開いたしました。

現在、以下の職種で積極的に採用を行っております。
・Webデザイナー
・フロントエンドエンジニア

詳細は各求人ページをご確認ください。
皆様のご応募をお待ちしております。`,
  },
  {
    id: 2,
    date: '2025.03.15',
    title: '27卒向け会社説明会を開催します',
    category: 'graduate',
    categoryLabel: '新卒',
    content: `2027年卒業予定の学生の皆様を対象とした会社説明会を開催いたします。

【開催日程】
・2025年4月10日（木）14:00〜16:00
・2025年4月15日（火）10:00〜12:00
・2025年4月20日（日）13:00〜15:00

【開催形式】
オンライン（Zoom）

【内容】
・会社概要説明
・先輩社員との座談会
・質疑応答

ご参加をお待ちしております。`,
  },
  {
    id: 3,
    date: '2025.03.01',
    title: '新しいオフィスへ移転しました',
    category: 'other',
    categoryLabel: 'その他',
    content: `この度、業容拡大に伴い、新オフィスへ移転いたしました。

【新住所】
〒150-0001
東京都渋谷区神宮前1-2-3 ○○ビル5F

【アクセス】
JR山手線「原宿」駅 徒歩5分
東京メトロ千代田線「明治神宮前」駅 徒歩3分

新しいオフィスでは、より快適な環境で業務を行えるようになりました。
引き続きよろしくお願いいたします。`,
  },
  {
    id: 4,
    date: '2025.02.15',
    title: '会社見学参加者募集中',
    category: 'graduate',
    categoryLabel: '新卒',
    content: `夏季会社見学の参加者を募集しています。

【開催期間】
2025年8月〜9月（5日間プログラム）

【募集コース】
・企画・マーケティングコース
・デザインコース
・エンジニアコース

実際のプロジェクトに参加し、実践的な経験を積むことができます。
詳細はエントリーページをご確認ください。`,
  },
  {
    id: 5,
    date: '2025.02.01',
    title: 'コーポレートサイトをリニューアルしました',
    category: 'news',
    categoryLabel: 'ニュース',
    content: `コーポレートサイトをリニューアルいたしました。

デザインを一新し、より見やすく使いやすいサイトになりました。
会社の最新情報や採用情報を随時更新してまいりますので、
ぜひご覧ください。`,
  },
];

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
