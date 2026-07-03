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
