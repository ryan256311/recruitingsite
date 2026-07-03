# お問い合わせフォーム 実装ガイド

採用サイトのお問い合わせフォームの実装内容と、動作させるためのセットアップ手順をまとめます。

---

## 1. 概要

- フロントのフォーム（`Contact.tsx`）が入力を検証し、`/api/contact` にJSONをPOST。
- API（`/api/contact`）が **Resend** を使って **管理者宛** と **応募者宛（自動返信）** の2通のメールを送信。
- 履歴書などの添付ファイルは先に `/api/upload` にアップロードし、保存先URLをフォーム送信データに含める。
- ファイル保存先は **Cloudflare R2（またはAWS S3）**。未設定時は開発用プレースホルダURLで代替。

```
[ユーザー] ──入力──> Contact.tsx
    │  ①ファイル選択時: POST /api/upload  ──> R2/S3 に保存 → URL取得
    │  ②送信ボタン:     POST /api/contact (JSON) ──> Resend で2通送信
    └──────────────────────────> 完了画面 or エラー表示
```

---

## 2. 構成ファイル

| ファイル | 役割 |
|---|---|
| `src/app/pages/Contact.tsx` | フォームUI・入力検証（react-hook-form）・送信処理 |
| `src/app/api/contact/route.ts` | 入力検証（zod）・XSSエスケープ・Resendでメール送信 |
| `src/app/api/upload/route.ts` | 添付ファイルを R2/S3 にアップロード |
| `.env.local` | APIキー等の環境変数（**Git管理外**。`.env.example` を参照） |

---

## 3. 処理フロー詳細

### 3-1. ファイルアップロード（`/api/upload`）
- 受付形式: **PDF / Word(doc,docx) / JPG / PNG**、**最大5MB**。
- 保存キー: `YYYY-MM-DD/{種別}/{UUID}.{拡張子}`。
- **開発モードのフォールバック**: `R2_BUCKET_NAME` か `R2_ENDPOINT` が未設定の場合、実際には保存せず `https://placeholder-storage.dev/...` を返す（アップロードは成功扱い）。
  - → **ローカルでメール送信だけ確認する場合、R2の設定は不要**。

### 3-2. フォーム送信（`/api/contact`）
1. zodスキーマで必須項目を検証（不備は400）。
2. 全入力値をHTMLエスケープ（XSS対策）。
3. **管理者宛メール**を送信（`to: ADMIN_EMAIL`、`replyTo: 応募者メール`、本文に全項目＋添付リンク）。
4. **応募者宛の自動返信メール**を送信（受付確認）。
5. 成功で `{ success: true }` を返却 → フロントは完了画面へ。

### 3-3. 採用区分の自動プリフィル
Contactページはクエリパラメータ `type` を読み取り、初期値を設定する:

| URL | inquiryType | recruitmentType |
|---|---|---|
| `/contact?type=company-visit` | 会社見学 | （未設定） |
| `/contact?type=career` | 選考への応募 | キャリア採用 |
| `/contact?type=graduate` | 選考への応募 | 新卒採用 |

`?job=職種名` を付けると応募職種にもプリフィルされる。

---

## 4. 環境変数一覧

| 変数 | 必須 | 用途 | 未設定時 |
|---|---|---|---|
| `RESEND_API_KEY` | ✅ | Resend APIキー | **500エラー**（`RESEND_API_KEY is not configured`） |
| `RESEND_FROM_EMAIL` | 推奨 | 送信元アドレス | `noreply@resend.dev` |
| `ADMIN_EMAIL` | 推奨 | 問い合わせ通知の受信先 | `recruit@exceet.co.jp` |
| `R2_ENDPOINT` | 任意※ | R2エンドポイント | 開発プレースホルダで代替 |
| `R2_ACCESS_KEY_ID` | 任意※ | R2アクセスキー | 〃 |
| `R2_SECRET_ACCESS_KEY` | 任意※ | R2シークレット | 〃 |
| `R2_BUCKET_NAME` | 任意※ | バケット名 | 〃 |
| `R2_PUBLIC_URL` | 任意※ | 公開URLのベース | 〃 |

※ 本番では添付ファイルを実保存するため R2（またはS3）の設定が必要。S3を使う場合は `S3_ENDPOINT` / `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` / `S3_PUBLIC_URL` を使用。

---

## 5. セットアップ手順

### 手順A. メール送信だけ動かす（最短）
1. [https://resend.com](https://resend.com) でアカウント作成。
2. **API Keys** から APIキー（`re_` で始まる）を発行。
3. プロジェクト直下の `.env.local` を開き、以下を設定:
   ```env
   RESEND_API_KEY=re_実際のキー
   RESEND_FROM_EMAIL=onboarding@resend.dev   # テスト用。登録メール宛にのみ届く
   ADMIN_EMAIL=自分のメールアドレス           # 受信確認用
   ```
   > テスト段階では `RESEND_FROM_EMAIL=onboarding@resend.dev` が使え、**Resendに登録したメール宛**にのみ送信可能。
4. 開発サーバーを再起動（`npm run dev`）。
5. フォームから送信 → 受信を確認。
   - この段階では添付ファイルはプレースホルダURL（開発モード）。

### 手順B. 本番相当（独自ドメイン送信＋ファイル保存）
1. Resendで**独自ドメインを認証**し、`RESEND_FROM_EMAIL` をそのドメインのアドレスに設定（例: `noreply@exceet.co.jp`）。任意の宛先に送信可能になる。
2. Cloudflare R2 でバケットを作成し、アクセスキーを発行。`.env.local` に `R2_*` を設定。
3. `ADMIN_EMAIL` を実際の採用担当アドレスに設定。
4. 開発サーバー再起動 → 添付付きで送信テスト。
5. デプロイ環境（Vercel等）にも同じ環境変数を登録する。

---

## 6. トラブルシューティング

| 症状 | 原因 | 対処 |
|---|---|---|
| 送信時「エラーが発生しました。しばらく経ってから…」 | `RESEND_API_KEY` 未設定で500 | `.env.local` にキーを設定しサーバー再起動 |
| メールは届くが添付リンクが `placeholder-storage.dev` | R2/S3未設定（開発モード） | 本番はR2/S3を設定（手順B） |
| 応募者宛の自動返信が届かない | 送信元ドメイン未認証で `onboarding@resend.dev` 使用時、登録メール以外に送れない | 独自ドメインを認証（手順B-1） |
| 「履歴書を添付してください」 | 履歴書が必須（フロント検証） | ファイルを添付してから送信 |

---

## 7. カスタマイズ箇所

- **通知先メール**: `ADMIN_EMAIL`（環境変数）。
- **メール文面**: `src/app/api/contact/route.ts` の HTML テンプレート。
- **プリフィル条件**: `Contact.tsx` の `useEffect`（`searchParams.get("type")` の分岐）。
- **受付ファイル形式・上限**: `src/app/api/upload/route.ts` の `ALLOWED_TYPES` / `MAX_SIZE`。
