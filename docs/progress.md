# 進捗まとめ（レスポンシブ調整ほか）

このドキュメントは、直近のセッションで実施した調整内容の記録です。

## ブレークポイント規約
- **PC**: `min-[1040px]`（1040px以上）
- **タブレット**: `max-[1039px]`（1039px以下）
- **SP**: `max-[539px]`（539px以下）

---

## 1. TOPページ（Home.tsx）

### 環境を知るセクション（05）
- 見出し・スライダー幅・ギャップを `clamp()` で連続スケール化。
  - 見出し: `clamp(48px, 4.5vw, 72px)`
  - スライダー幅: `clamp(480px, 50vw, 860px)`
  - ギャップ: `clamp(48px, 6vw, 120px)`
- スライダーを**絶対配置（`absolute inset-0`）**にし、高さをセクションに追従。
  - → **スライダー表示幅が変わってもセクション縦幅は不変**、上下の見切れも解消。
- スライダー画像は縦横比（400/560）を維持したまま縮小。

### インタビュー & クロストーク
- SP表示を1カラム化（`max-[539px]:grid-cols-1`）。
- 見出しの `&` の後に改行を追加。

### NEWSセクション 採用情報ボタン
- 黒背景（invert）を「新卒採用向け」→「キャリア採用向け」へ移動。

---

## 2. 全ページ共通（Layout.tsx）

- 「採用について」セクションの表示幅を他セクションに統一（`max-w-[1180px] mx-auto` → `pl-[80px] pr-20` 系）。
- フッター採用情報ボタンをNEWSと同じ役割ベース配色に統一：
  - **会社見学=青 / キャリア採用=黒 / 27卒(新卒)=白**

---

## 3. 各セクションタイトルのSPフォントサイズ

- TOP・下層ページの**セクション見出しをSP時 26px** に統一。
  - インライン `fontSize:'36px'` と `text-h2` クラス、いずれも `max-[539px]:!text-[26px]` で上書き。

---

## 4. 下層ページ全般のレスポンシブ対応

対象: Career / Graduate / JobDetail / JobsList / ContentsList / ContentsDetail / NewsList / NewsDetail / Contact / CompanyVisit

- ヒーロー見出し（`text-h1`）: `max-[1039px]:!text-[40px] max-[539px]:!text-[32px]`。
- インライン64px見出し: `clamp(36px, 5vw, 64px)`。
- カードグリッド: `grid-cols-3` → タブレット2列/SP1列、`grid-cols-2` → SP1列。
- サイドバー＋本文レイアウト: タブレットで縦積み（sticky解除）。
- 横並びSTEPフロー: タブレットで縦積み（矢印は非表示）。
- 2カラムヒーロー（CompanyVisit/JobDetail）: タブレットで縦積み、画像は全幅。
- 先頭セクションの上部padding: `pt-32` → **ヘッダー高さ規約 `pt-[90px]/68/58`** に統一。
- セクションマーカー（「01」/`<code>`）の top/left をレスポンシブ化。
- CompanyVisitの壊れたclassName（`\1`）を修正。

### 下層ヒーローnav（Career/Graduate/JobDetail）をTOP FV踏襲で再構成
- タブレット/SPで **flex-col-reverse**（タイトル上・ナビ下）。
- ナビリンクを横並び（Career/Graduate=グリッド、JobDetailは項目数可変のためflex-wrap）。
- 縦ガイド線と「Contents」ラベルをタブレット以下で非表示。
- **`<nav>` 装飾マーカー**を追加（タブレット/SPのみ表示）。

### 募集要項テーブル（Career/Graduate/JobDetail）
- タブレット表示で**項目（th）と内容（td）を上下レイアウト化**（`tr` を縦フレックス、th全幅・右罫線除去）。

### タイトル下線
- `w-12 h-px` → **`w-12 h-[2px]`（高さ2px）**、SPで **幅34px**（`max-[539px]:w-[34px]`）。全ページ適用。

---

## 5. お問い合わせ導線

- Career/Graduate のお問い合わせCTAに `type` を付与し、遷移先で採用区分を自動プリフィル。
  - Career → `/contact?type=career`（旧: `href="#"` の未設定リンクを修正）
  - Graduate → `/contact?type=graduate`
- フォーム実装の詳細・セットアップは [`contact-form.md`](./contact-form.md) 参照。
- ローカルで送信失敗（500）する原因は `RESEND_API_KEY` 未設定。`.env.local` の雛形を用意済み。

---

## 6. 検証
- 各編集後 `npx tsc --noEmit` で型チェック（エラーなし / exit 0）。

## 7. 今後の対応候補（未完了）
- `.env.local` に実際の Resend APIキー等を記入（フォーム動作に必須・要ユーザー対応）。
- 本番でファイル添付を実保存する場合は R2/S3 の設定。

---

## 8. microCMS導入によるコンテンツ管理（2026-10-16）

採用担当者（非エンジニア）が管理画面からコンテンツを更新できるようにした。
設計書: [`superpowers/specs/2026-10-15-microcms-cms-design.md`](./superpowers/specs/2026-10-15-microcms-cms-design.md)
実装計画: [`superpowers/plans/2026-10-16-microcms-cms.md`](./superpowers/plans/2026-10-16-microcms-cms.md)
担当者向け手順書: [`cms-operation.md`](./cms-operation.md)

### 構成
- コンテンツは microCMS の3つのAPI（`news` / `contents` / `jobs`）が保持
- `src/app/lib/cms/` が取得とマッピングを担当し、既存の型（`NewsItem` / `ContentItem` / `Job`）へ変換
- データ取得はサーバーコンポーネント（各 `page.tsx`）で行い、`"use client"` のページコンポーネントへpropsで渡す
- 反映は Webhook（`/api/revalidate`）で数秒。保険として全ページ `revalidate = 600`

### 主な変更
- `src/app/data/*.ts` のデータ配列を削除（型・カテゴリ定義・ヘルパーのみ残す）
- `ContentItem.id` を `number` → `string`、`Job.id` → `Job.slug: string`（既存URLをcontentId/slugで維持）
- `ContentsDetail.tsx` の自作Markdownパーサを削除し、`CmsBody`（サニタイズ付きHTML描画）に置き換え
- トップページにハードコードされていたお知らせ1件をCMS参照に変更（`externalUrl` で外部リンクに対応）
- `next.config.ts` を新規作成（microCMS画像ドメインの許可）
- vitest を導入（`npm test`）

### 必要な環境変数（`.env.example` 参照）
`MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` / `MICROCMS_WEBHOOK_SECRET` / `DRAFT_PREVIEW_SECRET`
（`MICROCMS_WRITE_API_KEY` は移行スクリプト用。Vercelには登録しない）

### microCMS側の設定
- Webhook: カスタム通知 → `https://<本番ドメイン>/api/revalidate`、シークレットは `MICROCMS_WEBHOOK_SECRET` と同じ値
  通知タイミングは「公開」「公開（予約設定による操作）」「更新」「非公開」「削除」をON
- 画面プレビュー: `https://<本番ドメイン>/api/draft?secret=<DRAFT_PREVIEW_SECRET>&api=contents&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}`

### 未完了（APIキー提供後に実施）
- microCMSのアカウント・サービス作成、APIスキーマ3つの作成
- `npm run migrate:cms`（記事12件・求人7件の投入。`--dry-run` で事前確認可）
- 記事画像12枚の手動アップロードと公開
- `npm run build` と本番での受け入れ確認
