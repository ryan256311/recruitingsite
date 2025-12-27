# 採用サイト 仕様書

## 1. プロジェクト概要
- 目的: 自社採用サイトの構築
- 目標: 高速な読み込み速度とSEO最高評価（Lighthouse 100）
- 開発環境: VS Code（生成AI CLIツールを活用）
- デプロイ先: Vercel

## 2. 技術選定（スタック）
- Framework: Next.js（App Router）
- Library: React
- Language: TypeScript
- Styling: Tailwind CSS
- 主要施策: ISR、Next/Image、Next/Font を積極採用

## 3. 生成AI CLIツールの役割分担
- 仕様書作成（Codex）: 全体方針、ディレクトリ構造、機能要件をMarkdownで定義
- 機能実装（Claude Code）: 仕様書に基づき Next.js/React/TypeScript/Tailwind を実装
- コードレビュー（Codex）: 仕様書と実装の整合性を確認し、ディレクトリ全体と新規追加/編集ファイルを重点的にレビュー
  - 重点観点: セマンティクスの欠落、SEOに不利な実装（見出し階層、構造化データ、代替テキストなど）
  - レビュー基準の詳細は今後策定（現時点は上記の重点観点を優先）
  - レビュー基準（暫定チェックリスト）
    - 仕様整合性: 仕様書の要件・ページ構成・機能が実装で満たされている
    - セマンティクス: 見出し階層が一貫し、section/figure/ulなどの適切な要素が使われている
    - アクセシビリティ: alt/aria/label/コントラスト/フォーカスの欠落がない
    - SEO: metadata、OGP、JSON-LD、canonical、robotsの設定が仕様に沿っている
    - パフォーマンス: 画像最適化、フォント最適化、不要JSの排除、LCP/CLS対策ができている
    - ルーティング: App Routerの設計に沿い、URLとページ構造がサイトマップ通り
    - コンテンツ: 重要な本文/見出し/CTAが欠落していない
    - コード品質: 型安全、命名、一貫したコンポーネント分割、重複排除

## 4. 運用ルール
- GitHubへのプッシュはAIによる自動実行を禁止
- ユーザー指示があったタイミングのみ Claude Code または Codex で実行
- Lighthouse 100 を目標に、SEO/パフォーマンス規約を順守

## 5. サイトマップ
- トップページ
  - 只今募集中の求人（一覧）
    - 各求人ページ（職種ごと）
  - コンテンツ（一覧）
    - コンテンツ（詳細）
  - お知らせ（一覧）
    - お知らせ（詳細）
  - キャリア採用
    - 求人ページ - キャリア採用（職種ごと）
  - 新卒採用
    - 求人ページ - 新卒採用（職種ごと）
  - お問い合わせ

## 6. ディレクトリ構造案（Next.js App Router）
- `app/`
  - `layout.tsx`: 共有レイアウト、フォント、全体メタデータ
  - `page.tsx`: トップページ
  - `company/`, `jobs/`, `culture/`, `entry/`: 各セクションページ
  - `api/`（必要時）: 送信フォーム等のAPI
- `components/`: 再利用UI、セクションコンポーネント
- `lib/`: ユーティリティ、SEO/構造化データ生成
- `styles/`: Tailwind設定、グローバルCSS
- `public/`: 画像、OGP、favicon、robots.txt
- `content/`（必要時）: 採用情報、FAQ、ポリシー等のMD/MDX

## 7. SEO設計方針
- App Routerの`metadata`で全ページSEOを統一管理
- OGP/Twitterカード/JSON-LDの整備（職種ページはJobPostingを推奨）
- `next/image`で最適化画像配信（width/height必須、LCP最小化）
- `next/font`でフォント最適化（FOIT/CLS対策）
- ISRで更新頻度の高いページを高速配信
- `sitemap.xml`と`robots.txt`を自動生成
- Core Web Vitalsを常に監視（LCP/INP/CLS）

## 8. 追加要件
- アクセシビリティ: 見出し階層、alt、フォームラベルの厳守
- 表示速度: 重要CSS/画像の優先読み込み、不要JSの削減
- 多言語対応: 将来的に `app/[locale]/` での拡張を考慮
