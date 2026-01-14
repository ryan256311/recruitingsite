// コンテンツデータ型定義
export interface ContentItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: 'company' | 'work' | 'members' | 'environment' | 'dialogue';
  categoryLabel: string;
  tags: string[];
  publishedAt: string;
}

// カテゴリ定義
export const contentCategories = [
  { id: 'all', label: 'すべて' },
  { id: 'company', label: '会社を知る' },
  { id: 'work', label: '仕事を知る' },
  { id: 'members', label: '仲間を知る' },
  { id: 'environment', label: '働く環境' },
  { id: 'dialogue', label: '対話を知る' },
] as const;

export type ContentCategoryId = typeof contentCategories[number]['id'];

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

// コンテンツデータ
export const contentItems: ContentItem[] = [
  // 会社を知る
  {
    id: 1,
    title: '理念・ミッション・行動指針',
    description: 'エクシートが大切にしている理念と、日々の行動の指針について紹介します。',
    content: `## 私たちの理念

エクシートは「変化を楽しみ挑戦し続ける」という理念のもと、クライアントと社会に価値を提供し続けています。

## ミッション

デジタルの力で、企業と人々の可能性を広げる。

私たちは、Webサイト制作やデジタルマーケティングを通じて、クライアントのビジネス成長を支援しています。単なる制作会社ではなく、クライアントのパートナーとして共に課題を解決していきます。

## 行動指針

1. **変化を恐れず、挑戦する**
   新しい技術やアイデアに積極的に取り組みます。

2. **チームで成果を出す**
   個人の力を結集し、チームとして最高の結果を追求します。

3. **クライアントの成功にコミットする**
   クライアントの目標達成を自分事として捉えます。

4. **学び続ける**
   常に成長を意識し、スキルと知識のアップデートを怠りません。`,
    image: '/images/contents/mission.jpg',
    category: 'company',
    categoryLabel: '会社を知る',
    tags: ['カルチャー'],
    publishedAt: '2024.10.01',
  },
  {
    id: 2,
    title: 'トップメッセージ',
    description: '代表取締役からのメッセージをお届けします。',
    content: `## 代表取締役メッセージ

皆さん、こんにちは。株式会社エクシート代表取締役の○○です。

エクシートは創業以来、「変化を楽しみ挑戦し続ける」をモットーに、デジタル領域でクライアントの成長を支援してきました。

### 私たちが大切にしていること

私たちは、単なる制作会社ではありません。クライアントのビジネスパートナーとして、共に考え、共に悩み、共に成長していく存在でありたいと考えています。

### 求める人材像

エクシートでは、以下のような方を求めています。

- 変化を恐れず、新しいことに挑戦できる方
- チームワークを大切にできる方
- 自ら考え、行動できる方
- 成長意欲の高い方

### 最後に

私たちと一緒に、デジタルの力で社会に価値を提供していきませんか？
皆さんのご応募をお待ちしております。`,
    image: '/images/contents/message.jpg',
    category: 'company',
    categoryLabel: '会社を知る',
    tags: ['カルチャー'],
    publishedAt: '2024.10.01',
  },
  {
    id: 3,
    title: 'エクシートの強み・事業内容',
    description: '私たちの事業領域と強みについてご紹介します。',
    content: `## 事業内容

エクシートは、デジタル領域を中心に以下の事業を展開しています。

### 1. Web制作事業
- コーポレートサイト制作
- ECサイト構築
- Webアプリケーション開発
- UI/UXデザイン

### 2. デジタルマーケティング事業
- SEO対策
- リスティング広告運用
- SNSマーケティング
- コンテンツマーケティング

### 3. ブランディング事業
- CI/VI設計
- ロゴデザイン
- ブランドガイドライン策定

## 私たちの強み

### 一貫したサポート体制
企画から制作、運用まで一貫してサポートします。

### 多様な専門人材
デザイナー、エンジニア、マーケターなど多様な専門家が在籍。

### クライアントファースト
クライアントの成功を第一に考え、最適な提案を行います。`,
    image: '/images/contents/business.jpg',
    category: 'company',
    categoryLabel: '会社を知る',
    tags: ['Career', 'カルチャー'],
    publishedAt: '2024.10.01',
  },
  {
    id: 4,
    title: '入社して得られる5つの価値',
    description: 'エクシートで働くことで得られる価値についてお伝えします。',
    content: `## エクシートで働く5つの価値

### 1. 幅広い経験
様々な業界のクライアントと仕事ができるため、幅広い経験を積むことができます。

### 2. 成長機会
研修制度や資格取得支援など、成長をサポートする仕組みが充実しています。

### 3. チームワーク
部署を超えた連携が活発で、チームで成果を出す喜びを感じられます。

### 4. 柔軟な働き方
フレックスタイム制やリモートワークなど、柔軟な働き方が可能です。

### 5. キャリアパス
スペシャリスト、マネジメントなど、自分に合ったキャリアを選択できます。`,
    image: '/images/contents/value.jpg',
    category: 'company',
    categoryLabel: '会社を知る',
    tags: ['Career', '新卒採用', 'キャリア採用'],
    publishedAt: '2024.10.01',
  },
  // 仕事を知る
  {
    id: 5,
    title: '組織図・仕事内容',
    description: 'エクシートの組織構成と各部署の仕事内容をご紹介します。',
    content: `## 組織構成

エクシートは、4つの部署で構成されています。

### クリエイティブ部（約15名）
Webサイトやアプリケーションのデザインを担当。UI/UXデザイン、グラフィックデザインなど幅広いクリエイティブワークを行います。

### テクノロジー部（約20名）
Webアプリケーション開発やシステム構築を担当。フロントエンド、バックエンド、インフラと幅広い技術領域をカバーしています。

### 企画部（約12名）
プロジェクトの企画立案からディレクションまでを担当。クライアントとの窓口となり、プロジェクト全体を推進します。

### マーケティング部（約10名）
デジタルマーケティング施策の企画・運用を担当。データ分析に基づいた戦略立案を行います。

## 部署間の連携

各部署が連携し、ワンチームでプロジェクトに取り組んでいます。`,
    image: '/images/contents/organization.jpg',
    category: 'work',
    categoryLabel: '仕事を知る',
    tags: ['Career', '新卒採用', 'キャリア採用'],
    publishedAt: '2024.09.15',
  },
  // 仲間を知る
  {
    id: 6,
    title: '先輩社員インタビュー：Webデザイナー 山田さん',
    description: 'クリエイティブ部で活躍するWebデザイナーの山田さんにインタビューしました。',
    content: `## プロフィール

**山田 太郎**
クリエイティブ部 Webデザイナー
2022年キャリア入社

## 入社のきっかけ

前職でもWebデザイナーとして働いていましたが、より幅広い案件に携わりたいと思い転職を決意しました。エクシートは様々な業界のクライアントがいて、挑戦できる環境があると感じ入社を決めました。

## 現在の仕事内容

クライアントのWebサイトのUI/UXデザインを担当しています。ワイヤーフレームの作成からビジュアルデザイン、プロトタイプ制作まで一貫して行います。

## 1日のスケジュール

- 9:00 出社、メールチェック
- 10:00 チームミーティング
- 11:00 デザイン作業
- 12:00 ランチ
- 13:00 クライアントとのオンラインMTG
- 14:00 デザイン作業
- 17:00 進捗共有
- 18:00 退社

## メッセージ

エクシートはチャレンジを歓迎する会社です。ぜひ一緒に働きましょう！`,
    image: '/images/contents/interview1.jpg',
    category: 'members',
    categoryLabel: '仲間を知る',
    tags: ['インタビュー', 'キャリア採用'],
    publishedAt: '2024.09.01',
  },
  {
    id: 7,
    title: '先輩社員インタビュー：エンジニア 佐藤さん',
    description: 'テクノロジー部で活躍するフロントエンドエンジニアの佐藤さんにインタビューしました。',
    content: `## プロフィール

**佐藤 花子**
テクノロジー部 フロントエンドエンジニア
2023年新卒入社

## 入社のきっかけ

大学でプログラミングを学び、Web開発に興味を持ちました。エクシートは若手でも裁量を持って仕事ができる環境があると聞き、入社を決めました。

## 現在の仕事内容

React/TypeScriptを使ったWebアプリケーションのフロントエンド開発を担当しています。入社1年目から大きなプロジェクトにも参加させていただいています。

## 入社して感じたこと

思った以上に早く実践的な仕事を任せてもらえました。先輩エンジニアのサポートも手厚く、わからないことがあってもすぐに相談できる環境です。

## 休日の過ごし方

趣味はカフェ巡りです。新しいカフェを見つけて、ゆっくり読書をするのが好きです。

## メッセージ

新卒でも成長できる環境が整っています。一緒に頑張りましょう！`,
    image: '/images/contents/interview2.jpg',
    category: 'members',
    categoryLabel: '仲間を知る',
    tags: ['インタビュー', '新卒採用'],
    publishedAt: '2024.08.15',
  },
  // 働く環境
  {
    id: 8,
    title: '人材育成・研修制度',
    description: 'エクシートの人材育成方針と研修制度についてご紹介します。',
    content: `## 人材育成方針

エクシートでは、社員一人ひとりの成長を支援するため、様々な育成プログラムを用意しています。

## 研修制度

### 新入社員研修（3ヶ月）
- ビジネスマナー研修
- 業界知識研修
- 専門スキル研修
- OJT

### メンター制度
先輩社員がマンツーマンでサポートします。

### スキルアップ研修
- 外部セミナー参加支援
- 社内勉強会
- オンライン学習プラットフォーム

### 資格取得支援
対象資格の受験費用を会社が負担します。

## キャリア形成支援

- 定期的な1on1面談
- キャリアパス相談
- 社内公募制度`,
    image: '/images/contents/training.jpg',
    category: 'environment',
    categoryLabel: '働く環境',
    tags: ['制度', '新卒採用', 'キャリア採用'],
    publishedAt: '2024.08.01',
  },
  {
    id: 9,
    title: '人事評価制度・キャリアパス',
    description: '公正な評価制度と多様なキャリアパスについてご紹介します。',
    content: `## 人事評価制度

エクシートでは、公正で透明性のある評価制度を運用しています。

### 評価の仕組み
- 半期ごとの目標設定と振り返り
- 360度フィードバック
- 成果と行動の両面から評価

### 評価項目
- 業績達成度
- スキル向上
- チームへの貢献
- 行動指針の実践

## キャリアパス

### スペシャリストコース
専門性を深め、その分野のプロフェッショナルを目指します。

### マネジメントコース
チームリーダー、マネージャーとして組織を率います。

### 複合キャリア
複数の領域を横断的に担当するキャリアも可能です。`,
    image: '/images/contents/career-path.jpg',
    category: 'environment',
    categoryLabel: '働く環境',
    tags: ['制度', 'Career'],
    publishedAt: '2024.07.15',
  },
  // 対話を知る
  {
    id: 10,
    title: '社内イベント紹介',
    description: '社員同士の交流を深める社内イベントをご紹介します。',
    content: `## 社内イベント

エクシートでは、社員同士の交流を大切にしています。

### 定期イベント

#### 月次全体会議
月に1回、全社員が集まり、会社の方針や各部署の取り組みを共有します。

#### 納会
四半期ごとに開催。プロジェクトの成功を祝い、社員同士で交流します。

#### 社員旅行（年1回）
社員旅行で親睦を深めます。

### 自主的な活動

#### 部活動
フットサル部、ボードゲーム部、カメラ部など様々な部活動があります。

#### 勉強会
技術勉強会やデザインレビュー会など、スキルアップのための活動も活発です。

### オンラインイベント

リモートワークの社員も参加できるよう、オンラインでのイベントも開催しています。`,
    image: '/images/contents/events.jpg',
    category: 'dialogue',
    categoryLabel: '対話を知る',
    tags: ['カルチャー'],
    publishedAt: '2024.07.01',
  },
  // 追加サンプルデータ
  {
    id: 11,
    title: '先輩社員インタビュー：プロジェクトマネージャー 田中さん',
    description: '企画部で活躍するプロジェクトマネージャーの田中さんにインタビューしました。',
    content: `## プロフィール\n\n**田中 健太**\n企画部 プロジェクトマネージャー\n2020年キャリア入社\n\n## 入社のきっかけ\n\n前職ではSIerでシステム開発のPMをしていましたが、よりクリエイティブな領域に挑戦したいと思い転職しました。`,
    image: '/images/contents/interview3.jpg',
    category: 'members',
    categoryLabel: '仲間を知る',
    tags: ['インタビュー', 'キャリア採用'],
    publishedAt: '2024.06.15',
  },
  {
    id: 12,
    title: '先輩社員インタビュー：マーケター 鈴木さん',
    description: 'マーケティング部で活躍するマーケターの鈴木さんにインタビューしました。',
    content: `## プロフィール\n\n**鈴木 美咲**\nマーケティング部 マーケター\n2024年新卒入社\n\n## 入社のきっかけ\n\n大学でマーケティングを専攻し、デジタルマーケティングに興味を持ちました。`,
    image: '/images/contents/interview4.jpg',
    category: 'members',
    categoryLabel: '仲間を知る',
    tags: ['インタビュー', '新卒採用'],
    publishedAt: '2024.06.01',
  },
  {
    id: 13,
    title: 'クロストーク：デザイナー×エンジニア',
    description: 'デザイナーとエンジニアが語る、チームワークの秘訣。',
    content: `## 対談メンバー\n\n- 山田太郎（Webデザイナー）\n- 佐藤花子（フロントエンドエンジニア）\n\n## テーマ：デザインと実装の連携\n\n職種を超えたコラボレーションの実際について語ります。`,
    image: '/images/contents/crosstalk1.jpg',
    category: 'members',
    categoryLabel: '仲間を知る',
    tags: ['インタビュー', 'カルチャー'],
    publishedAt: '2024.05.15',
  },
  {
    id: 14,
    title: 'オフィス環境のご紹介',
    description: '働きやすさを追求した新オフィスをご紹介します。',
    content: `## 新オフィスの特徴\n\n2025年に移転した新オフィスは、社員の働きやすさを第一に設計されています。\n\n### 集中ブース\n一人で集中したいときに使える個室ブースを完備。\n\n### コラボレーションスペース\nチームでのディスカッションに最適なオープンスペース。`,
    image: '/images/contents/office.jpg',
    category: 'environment',
    categoryLabel: '働く環境',
    tags: ['カルチャー', '制度'],
    publishedAt: '2024.05.01',
  },
  {
    id: 15,
    title: '福利厚生制度のご紹介',
    description: '社員の生活をサポートする充実した福利厚生をご紹介します。',
    content: `## 福利厚生一覧\n\n### 休暇制度\n- 完全週休2日制（土日祝）\n- 有給休暇\n- 夏季休暇・年末年始休暇\n- 慶弔休暇\n\n### 各種手当\n- 通勤手当\n- 住宅手当\n- 資格取得支援`,
    image: '/images/contents/benefits.jpg',
    category: 'environment',
    categoryLabel: '働く環境',
    tags: ['制度', 'Career'],
    publishedAt: '2024.04.15',
  },
  {
    id: 16,
    title: 'リモートワーク制度について',
    description: '柔軟な働き方を支えるリモートワーク制度をご紹介します。',
    content: `## リモートワーク制度\n\nエクシートでは、週2日までのリモートワークが可能です。\n\n### 対象者\n入社3ヶ月以上の全社員\n\n### 環境サポート\n- モニター貸与\n- 通信費補助`,
    image: '/images/contents/remote.jpg',
    category: 'environment',
    categoryLabel: '働く環境',
    tags: ['制度', 'キャリア採用'],
    publishedAt: '2024.04.01',
  },
  {
    id: 17,
    title: '新卒研修プログラムの紹介',
    description: '入社後3ヶ月間の新卒研修プログラムについてご紹介します。',
    content: `## 新卒研修プログラム\n\n### 1ヶ月目：基礎研修\nビジネスマナー、業界知識を学びます。\n\n### 2ヶ月目：専門研修\n配属予定の部署に応じた専門スキルを習得。\n\n### 3ヶ月目：OJT\n実際のプロジェクトに参加しながら学びます。`,
    image: '/images/contents/training-new.jpg',
    category: 'environment',
    categoryLabel: '働く環境',
    tags: ['制度', '新卒採用'],
    publishedAt: '2024.03.15',
  },
  {
    id: 18,
    title: '社内勉強会レポート',
    description: '毎月開催している社内勉強会の様子をレポートします。',
    content: `## 社内勉強会\n\nエクシートでは、毎月様々なテーマで勉強会を開催しています。\n\n### 最近のテーマ\n- 最新フロントエンド技術動向\n- デザインシステムの構築\n- AI活用の最前線`,
    image: '/images/contents/study.jpg',
    category: 'dialogue',
    categoryLabel: '対話を知る',
    tags: ['カルチャー', 'Career'],
    publishedAt: '2024.03.01',
  },
  {
    id: 19,
    title: '社員総会レポート 2024',
    description: '年に一度の社員総会の様子をレポートします。',
    content: `## 社員総会 2024\n\n年に一度、全社員が集まる社員総会を開催しました。\n\n### プログラム\n- 代表メッセージ\n- 年間表彰\n- 懇親会`,
    image: '/images/contents/meeting.jpg',
    category: 'dialogue',
    categoryLabel: '対話を知る',
    tags: ['カルチャー'],
    publishedAt: '2024.02.15',
  },
  {
    id: 20,
    title: '部活動紹介：フットサル部',
    description: '社員有志で活動するフットサル部をご紹介します。',
    content: `## フットサル部\n\n毎週水曜日の夜に活動しています。\n\n### 活動内容\n- 週1回の練習\n- 月1回の対外試合\n- 年2回の合宿`,
    image: '/images/contents/futsal.jpg',
    category: 'dialogue',
    categoryLabel: '対話を知る',
    tags: ['カルチャー'],
    publishedAt: '2024.02.01',
  },
  {
    id: 21,
    title: 'プロジェクト紹介：大手ECサイトリニューアル',
    description: '大手ECサイトのリニューアルプロジェクトをご紹介します。',
    content: `## プロジェクト概要\n\n大手アパレルブランドのECサイトをフルリニューアル。\n\n### 成果\n- CVR 150%向上\n- ページ表示速度 2倍改善`,
    image: '/images/contents/project1.jpg',
    category: 'work',
    categoryLabel: '仕事を知る',
    tags: ['Career', 'キャリア採用'],
    publishedAt: '2024.01.15',
  },
  {
    id: 22,
    title: 'プロジェクト紹介：スタートアップ支援',
    description: 'スタートアップ企業のブランディング支援プロジェクトをご紹介します。',
    content: `## プロジェクト概要\n\n急成長中のスタートアップ企業のブランディングを全面支援。\n\n### 支援内容\n- ブランド戦略策定\n- ロゴ・VI設計\n- Webサイト制作`,
    image: '/images/contents/project2.jpg',
    category: 'work',
    categoryLabel: '仕事を知る',
    tags: ['Career', '新卒採用'],
    publishedAt: '2024.01.01',
  },
  {
    id: 23,
    title: '代表インタビュー：エクシートの未来',
    description: '代表取締役が語る、エクシートのビジョンと未来。',
    content: `## 代表インタビュー\n\nエクシートの今後の展望について、代表取締役に聞きました。\n\n### 今後の展望\n- 新規事業への挑戦\n- グローバル展開\n- 人材育成の強化`,
    image: '/images/contents/ceo-interview.jpg',
    category: 'company',
    categoryLabel: '会社を知る',
    tags: ['インタビュー', 'カルチャー'],
    publishedAt: '2023.12.15',
  },
  {
    id: 24,
    title: '創業ストーリー',
    description: 'エクシート創業の経緯と歩みをご紹介します。',
    content: `## 創業ストーリー\n\n2010年、3人のメンバーでスタートしたエクシート。\n\n### 創業の想い\nデジタルの力で、もっと多くの企業の可能性を広げたい。\n\n### 成長の軌跡\n- 2010年：創業\n- 2015年：オフィス拡大\n- 2020年：社員50名突破`,
    image: '/images/contents/history.jpg',
    category: 'company',
    categoryLabel: '会社を知る',
    tags: ['カルチャー'],
    publishedAt: '2023.12.01',
  },
];

// IDでコンテンツを取得するヘルパー関数
export function getContentById(id: number): ContentItem | undefined {
  return contentItems.find(item => item.id === id);
}

// カテゴリでフィルタリングするヘルパー関数
export function getContentsByCategory(categoryId: ContentCategoryId): ContentItem[] {
  if (categoryId === 'all') {
    return contentItems;
  }
  return contentItems.filter(item => item.category === categoryId);
}

// タグでフィルタリングするヘルパー関数
export function getContentsByTag(tag: string): ContentItem[] {
  return contentItems.filter(item => item.tags.includes(tag));
}

// カテゴリとタグで複合フィルタリング
export function getContentsFiltered(categoryId: ContentCategoryId, tag?: string): ContentItem[] {
  let filtered = categoryId === 'all' ? contentItems : contentItems.filter(item => item.category === categoryId);
  if (tag) {
    filtered = filtered.filter(item => item.tags.includes(tag));
  }
  return filtered;
}

// 関連コンテンツを取得（同じカテゴリの他の記事）
export function getRelatedContents(id: number, limit: number = 3): ContentItem[] {
  const currentItem = getContentById(id);
  if (!currentItem) return [];

  return contentItems
    .filter(item => item.id !== id && item.category === currentItem.category)
    .slice(0, limit);
}
