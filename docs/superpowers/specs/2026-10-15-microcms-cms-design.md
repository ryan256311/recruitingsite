# 採用サイト コンテンツ管理（microCMS導入）設計書

- 作成日: 2026-10-15
- 対象リポジトリ: recruiting-site（Next.js App Router / Vercel）
- 方式: 案A microCMS（ヘッドレスCMS SaaS）

## 1. 目的と成功基準

### 目的

採用担当者（非エンジニア、数名）が、エンジニアの手を借りずにサイトのコンテンツを更新・編集・投稿できるようにする。操作感はWordPressの投稿機能を踏襲する。

### 成功基準

1. 担当者がお知らせ1件を、コードに触れず **5分以内に公開** できる
2. 下書き保存 → 本番と同じ見た目のプレビュー → 公開 の流れが使える
3. 公開日時の予約ができる
4. 既存の公開URL（`/contents/2` など12記事分）が **変わらない**
5. 本文・見出しの見た目が現状と同等に保たれる

## 2. 対象範囲

### 対象

| コンテンツ | 現在の保管場所 | 件数 |
|---|---|---|
| お知らせ | `src/app/data/news.ts` | 0件 |
| コンテンツ記事 | `src/app/data/contents.ts` | 12件（ID: 2, 3, 25〜34） |
| 求人情報（キャリア） | `src/app/data/jobs.ts` | 7件（ID: 1〜7） |
| 求人情報（新卒） | `src/app/data/jobs.ts` | 0件 |
| トップページのお知らせ欄 | `src/app/pages/Home.tsx:230` 付近にハードコード | 1件 |

トップページのお知らせ欄は現在コードに直接書かれた1件（外部リンク付き）なので、これもCMS管理に移す。お知らせはCMSの `news` を参照し、最新数件を表示する形に変える。

### 非対象（今回やらない）

- トップページのヒーロー文言、スライダー画像、会社紹介セクション等のデザイン密結合部分（`src/assets` からimportしている画像群を含む）
- 上司承認フロー、担当者ごとの権限分離（microCMSの権限管理はBusinessプラン 月75,000円が必要なため、費用対効果が合わない）
- 多言語対応
- 応募フォーム（`api/contact`）とファイルアップロード（`api/upload`）— 既存のまま変更しない

## 3. アーキテクチャ

```
microCMS（管理画面・コンテンツ保管）
  ├ news      リスト形式API
  ├ contents  リスト形式API
  └ jobs      リスト形式API
        │
        │ ①ビルド時・ISR再生成時にGET（microcms-js-sdk）
        ▼
Next.js on Vercel
  src/app/lib/cms/      新規: APIクライアント・取得関数・型マッピング
        │
        │ ②既存の型（NewsItem / ContentItem / Job）に変換して渡す
        ▼
  src/app/pages/*.tsx   既存のページコンポーネント（原則そのまま）
        ▲
        │ ③公開・更新・予約公開時にWebhook
  src/app/api/revalidate/route.ts   新規: 署名検証 → revalidateTag()
```

### 3.1 既存の型を「契約」として残す

`src/app/data/*.ts` の `NewsItem` / `ContentItem` / `Job` の型定義・カテゴリ定義・ヘルパー関数は残し、**データ本体の配列だけを削除する**。microCMSのレスポンスは `src/app/lib/cms/` のマッピング層でこれらの型に変換する。

**この層を挟む理由**: CMS固有のフィールド名（`contentId`、`displayDate`、`revisedAt` 等）がページコンポーネントに漏れない。結果として、データを参照している13ファイルの大半を書き換えずに済み、将来CMSを乗り換えても影響が `src/app/lib/cms/` に閉じる。

ただし「原則そのまま」には例外が2つある。

**例外1: ID型の変更**。第5節のID設計により `ContentItem.id` が `number` から `string` に、`Job.id` が `Job.slug` に変わるため、**IDを数値として扱っている箇所は修正が必要**になる（詳細は第5節）。マッピング層はフィールド名の差異を吸収するが、型そのものの変更は吸収できない。

**例外2: クライアントコンポーネントのprops化**。`src/app/pages/` の9ファイルはすべて `"use client"` であり、そのうち `Home` / `NewsList` / `ContentsList` / `JobsList` / `Career` / `Graduate` の6ファイルは**モジュールの先頭でデータ配列を直接importしている**。クライアントコンポーネントからCMSを叩くとAPIキーがブラウザに露出するため、以下の形に変える。

- データ取得は**サーバーコンポーネント（各ルートの `page.tsx`）で行う**
- 取得結果を**propsでクライアントコンポーネントに渡す**
- クライアント側の絞り込み（カテゴリ・タグのフィルタUI）は現状どおり `useState` で動く

`NewsDetail` / `JobDetail` / `ContentsDetail` の3ファイルは既にpropsでデータを受け取る形なので、この変更の影響を受けない。ただし `ContentsDetail` 内で呼んでいる `getRelatedContents()` はモジュールレベルの配列を参照しているため、**関連記事もpropsで受け取る形に変える**必要がある。

### 3.2 更新の反映方法：Webhook主・時間ISR従

- **主**: microCMSが公開・更新・予約公開のたびに `/api/revalidate` を呼ぶ。`X-MICROCMS-Signature` ヘッダをHMACで検証した上で、該当タグのみ `revalidateTag()`。反映は数秒。
- **従**: 各ページに `export const revalidate = 600`（10分）も設定する。

**二段構えにする理由**: Webhookは単発のHTTPリクエストなので失敗しうる。一方、時間ISRだけだと「公開したのに最大10分出てこない」という担当者体験になる。主で速さを、従で確実性を担保する。なお microCMS の予約公開は実行時刻の精度が公式に保証されていないため、従の存在が予約公開時の保険としても働く。

Webhookは microCMS 側の通知タイミング設定で「コンテンツの公開（予約設定による操作）」をONにする（既定でON）。

### 3.3 キャッシュタグ設計

| タグ | 再検証対象 |
|---|---|
| `news` | `/`（お知らせ欄）、`/news`、`/news/[id]` |
| `contents` | `/`（コンテンツ欄）、`/contents`、`/contents/[id]` |
| `jobs` | `/`、`/jobs`、`/career`、`/career/[slug]`、`/graduate`、`/graduate/[slug]` |

Webhookのペイロードに含まれる `api` フィールド（エンドポイント名）をそのままタグ名に対応させる。粒度を記事単位にせずエンドポイント単位にするのは、一覧ページと詳細ページとトップページが同じデータを共有しており、個別無効化しても結局ほぼ全部を再生成するため。

### 3.4 一覧取得のページング

microCMSのGET APIは **デフォルト10件・`limit`最大100件** を返す。記事は現在12件で今後増える。取得関数は `offset` を進めながら `totalCount` に達するまで繰り返す**全件取得**として実装する。

この制約を設計に明記する理由: 実装時に見落とすと「記事が10件で止まる」という形で本番に出る。

## 4. データモデル

共通方針として、**表示ラベルや色はCMSに持たせず、サイト側の定義から引く**（`newsCategories` / `contentCategories` / `getCategoryColor`）。CMSに持たせると表記揺れが起き、ラベル変更のたびに全記事を編集することになる。CMSが持つのはカテゴリの識別子（セレクト値）だけとする。

### 4.1 news（お知らせ）— リスト形式

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `date` | 日付 | 日時 | ✓ | 記事に表示する日付。公開日時とは別管理 |
| `title` | タイトル | テキストフィールド | ✓ | |
| `category` | カテゴリ | セレクト | ✓ | `graduate` / `news` / `other` |
| `body` | 本文 | リッチエディタ | – | 外部リンクのみのお知らせでは空になる |
| `image` | アイキャッチ画像 | 画像 | – | |
| `externalUrl` | 外部リンクURL | テキストフィールド | – | 入力時は一覧から外部サイトへ直接リンクする |

`categoryLabel` はサイト側で `category` から導出する。

**`externalUrl` が必要な理由**: トップページのお知らせ欄（`Home.tsx:230` 付近）には現在1件がハードコードされており、その1件は外部サイト（福井労働局のページ）への直接リンクになっている。この運用を続けられるようにフィールドとして用意する。`externalUrl` があれば一覧のリンク先を外部URLにし、無ければ `/news/[id]` の詳細ページへ送る。

**日付の形式**: 既存の `NewsItem.date` と `ContentItem.publishedAt` は `2026.07.03` という `YYYY.MM.DD` 形式の文字列である。CMSはISO 8601形式（`2026-07-03T00:00:00.000Z`）を返すため、マッピング層でこの形式に整形する。

### 4.2 contents（コンテンツ記事）— リスト形式

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `title` | タイトル | テキストフィールド | ✓ | |
| `description` | 概要 | テキストエリア | ✓ | 一覧・OGPで使用 |
| `body` | 本文 | リッチエディタ | ✓ | |
| `image` | アイキャッチ画像 | 画像 | – | 未設定ならプレースホルダー画像を使う（下記） |
| `category` | カテゴリ | セレクト | ✓ | `company` / `work` / `members` / `environment` / `dialogue` |
| `tags` | タグ | 複数選択 | – | `Career` / `新卒採用` / `キャリア採用` / `カルチャー` / `インタビュー` / `制度` |
| `displayDate` | 掲載日 | 日時 | ✓ | 記事に表示する日付。マッピング層で `ContentItem.publishedAt` に変換する |

**`publishedAt` という名前を使わない理由**: microCMSは `createdAt` / `updatedAt` / `publishedAt` / `revisedAt` をシステム標準フィールドとして予約している。同名のカスタムフィールドを作るとレスポンス上で衝突する。CMS側は `displayDate` とし、サイト側の既存型 `ContentItem.publishedAt` へはマッピング層で詰め替える。

### 4.3 jobs（求人）— リスト形式

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `slug` | URL識別子 | テキストフィールド | ✓ | URLの末尾。既存7件は `1`〜`7` |
| `employmentCategory` | 募集区分 | セレクト | ✓ | `career` / `graduate` |
| `title` | 職種名 | テキストフィールド | ✓ | |
| `department` | 部署名 | テキストフィールド | ✓ | |
| `departmentDescription` | 部署紹介 | テキストエリア | ✓ | |
| `type` | 職種区分 | テキストフィールド | ✓ | 例: エンジニア |
| `description` | 概要 | テキストエリア | ✓ | |
| `background` | 募集背景 | テキストエリア | ✓ | |
| `requirements` | 応募要件 | 繰り返しフィールド（テキスト） | ✓ | 配列 |
| `responsibilities` | 業務内容 | 繰り返しフィールド（テキスト） | ✓ | 配列 |
| `salary` | 給与 | テキストエリア | ✓ | 改行を含む |
| `location` | 勤務地 | テキストエリア | ✓ | 改行を含む |
| `employmentType` | 雇用形態 | テキストフィールド | ✓ | |
| `welcomeSkills` | 歓迎スキル | 繰り返しフィールド | – | |
| `appealPoints` | アピールポイント | 繰り返しフィールド | – | |
| `workHours` | 勤務時間 | テキストエリア | – | |
| `holidays` | 休日休暇 | テキストエリア | – | |
| `trialPeriod` | 試用期間 | テキストフィールド | – | |
| `benefits` | 待遇・福利厚生 | 繰り返しフィールド | – | |
| `selectionProcess` | 選考プロセス | 繰り返しフィールド | – | |
| `devEnvironment` | 開発環境 | カスタムフィールド | – | `tech` / `versionControl` / `designTools` / `workStyle` の4配列 |

新卒・キャリアを1つのAPIにまとめ `employmentCategory` で分ける。理由: フィールド構成が完全に同一で、API数（Hobbyプラン5個上限）を節約でき、職種の区分変更が1クリックで済む。

### 実際に作成したスキーマとの差異（2026-10-16 更新）

microCMSの管理画面でスキーマを作成した際に、上の表から3点変更した。

**1. 繰り返しフィールド → テキストエリア（1行に1項目）**

microCMSの繰り返しフィールドはカスタムフィールドの定義を必要とし、APIは `string[]` ではなく `[{ fieldId, value }]` を返す。既存の `Job` 型は `string[]` を前提にしており、そのまま渡すと `JobDetail` が「Objects are not valid as a React child」で落ちる。カスタムフィールドの間接層を挟むより、テキストエリアに1行1項目で書いてもらう方が担当者にも分かりやすいため、`requirements` / `responsibilities` / `welcomeSkills` / `appealPoints` / `benefits` / `selectionProcess` はすべて**テキストエリア**とした。マッピング層の `toLines` が改行で分割する。

**2. `devEnvironment`（カスタムフィールド）→ 4つのテキストエリア**

同じ理由で、`devTech` / `devVersionControl` / `devDesignTools` / `devWorkStyle` の4フィールドに展開した。マッピング層が `Job.devEnvironment` の形に組み立て直す。4つとも空なら `undefined` にして、詳細ページから欄ごと消える。

**3. `image` を必須から任意へ**

当初は必須としていたが、2点の理由で任意に変更した。

- microCMSは**下書き作成時も必須フィールドを検証する**ため、画像を後から手動で設定する移行手順が成立しない（実際に12件すべてが `'image' field required error.` で失敗した）
- 既存12記事の画像を確認したところ、**10枚が同一のブランドプレースホルダー**で、実写はインタビュー2枚のみだった。専用写真を持たない記事の方が多く、画像を必須にすると同じダミーを繰り返しアップロードする作業になる

未設定のときはマッピング層が `/images/contents/placeholder.webp`（ロゴ入りの青い画像）を入れる。記事を一覧から除外する扱いはやめた。

**4. `departmentDescription` → `departmentDesc`**

microCMSのフィールドIDは**20文字以内**という制限があり、`departmentDescription`（21文字）は登録できなかった。マッピング層で既存型の `departmentDescription` に詰め替える。

## 5. ID設計とURL維持

### 決定: microCMSの `contentId`（文字列）を正とする

既存の `ContentItem.id` / `Job.id` は `number` だが、これを **文字列ベースに変更する**。

- **既存12記事**: 移行時に contentId をカスタムIDで `2`、`3`、`25`〜`34` と手入力し、`/contents/2` 等の既存URLを維持する
- **新規記事**: contentId は自動生成（英数字）でよい。URLが英数字になるが、担当者にID入力を強いるより運用負荷が低い
- **求人**: contentId は自動生成とし、URLには `slug` フィールドを使う。既存7件は slug に `1`〜`7` を入れて `/career/1` 等を維持する

この方針の代償として、以下のコード変更が必要になる。

- `ContentItem.id`: `number` から `string` へ
- `Job.id`: `number` から `Job.slug`: `string` へ
- `getContentById(parseInt(id, 10))` を文字列比較に変更
- `ContentsDetail.tsx` の `content.id === 31`（会社見学記事の特別扱い）を文字列比較に変更
- 各ページのリンク生成（`/contents/${item.id}` 等）は文字列でもそのまま動作する

## 6. 本文リッチテキストの扱い

### 現状

`ContentsDetail.tsx:19` の自作簡易Markdownパーサ（`## ` と `### ` のみ対応）で本文を描画している。見出しは「20px・太字・左に4px #4346BE のアクセント罫」という固有の体裁を持つ。

### 変更後

非エンジニアがWYSIWYGで書けることが要件なので、本文は microCMS の**リッチエディタ（HTML出力）**とする。これに伴い、

1. 自作Markdownパーサ `renderContent` は **削除**する
2. 受け取ったHTMLは `sanitize-html` で **サニタイズ**してから描画する（当初は `isomorphic-dompurify` を使ったが、依存するjsdomがVercelのランタイムで `ERR_REQUIRE_ESM` を起こし、ページ再生成が失敗したため差し替えた。ビルドは通るので本番でしか露見しない）（許可タグ: `h2` `h3` `p` `strong` `em` `ul` `ol` `li` `a` `br` `img` `blockquote`）
3. 見出し等の体裁は、ラッパー要素 `.cms-body` 配下のCSSで再現する（`src/styles/index.css` に `.cms-body h2 { ... }` を定義）

**サニタイズを必須とする理由**: リッチエディタのHTMLをそのまま `dangerouslySetInnerHTML` に渡すと、CMS側に書き込める人が任意のスクリプトをサイト訪問者のブラウザで実行できる状態になる。担当者を信頼するかどうかとは別に、CMSアカウントが乗っ取られた場合の被害範囲を限定するために挟む。

### 本文内の画像

リッチエディタ内の `img` は microCMS のメディア（`images.microcms-assets.io`）を指す。`next/image` の対象外（HTML内のため）なので、`?w=` と `?fm=webp` のクエリを付与して配信サイズを抑える。

## 7. 画像・メディア管理

- アイキャッチ画像、本文内画像は **microCMSのメディア機能**にアップロードする（WordPressのメディアライブラリに相当。担当者が管理画面から直接操作できる）
- 既存の記事画像（`public/images/contents/*.webp`）は microCMS に移行し、CMS側のURLを参照する。移行完了後も `public/` 側はしばらく残す（切り戻し用）
- `next.config.ts` を **新規作成**し、`images.remotePatterns` に `images.microcms-assets.io` を許可する（現在このプロジェクトに `next.config.*` は無い）

## 8. 下書きプレビュー

Next.js の Draft Mode と microCMS の画面プレビュー機能を組み合わせる。

```
microCMS管理画面「画面プレビュー」ボタン
  → /api/draft?secret=<DRAFT_PREVIEW_SECRET>&api=contents&contentId=xx&draftKey=yy
      ├ secret を検証（不一致は401）
      ├ draftMode().enable()
      └ /contents/xx?draftKey=yy へリダイレクト
          → 記事ページは draftMode 有効時のみ draftKey 付きでCMSを叩く
            （キャッシュ無効 = no-store）
```

`secret` 検証を入れる理由: Draft Modeを誰でも有効化できると、未公開の下書きが第三者に読めてしまう。

## 9. 予約公開

- 担当者は microCMS の管理画面で公開日時を予約する（Hobbyプランでも利用可）
- 予約実行時に Webhook が飛び、`/api/revalidate` 経由で該当ページが再生成される
- 実行時刻の精度は公式保証がないため、分単位の厳密さが必要な告知は手動公開を推奨する（この運用上の注意は担当者向け手順書に明記する）

## 10. 移行計画

1. microCMS側で3つのAPIスキーマを作成（手作業）
2. 移行スクリプト `scripts/migrate-to-microcms.ts` を作成し、`src/app/data/*.ts` の既存データを**下書きとして**投入する（書き込み権限付きAPIキーを使う `microcms-js-sdk` の `create` / `update`）
   - 本文の既存Markdown（`## ` `### ` と段落）を `marked` でHTMLに変換して投入する
   - contents は contentId に既存の数値IDを指定する
   - jobs は slug に既存の数値IDを入れる
3. 既存の記事画像12枚を**管理画面から手動でアップロード**し、各記事のアイキャッチに設定する
4. 投入結果を管理画面で目視確認してから公開する（12記事 + 7求人）

**画像をスクリプトで自動投入しない理由**: microCMSのメディアアップロードはManagement API側の機能で、プランによる制限の有無が確認できていない。12枚・1回限りの作業なので、手動アップロードの方が確実で早い。この判断のため、移行スクリプトは画像以外を投入し、記事は下書き状態で止める。
5. サイト側のデータ取得をCMSに切り替える
6. 本番反映後、既存URLの表示とOGPを確認する
7. 担当者向けの操作手順書を `docs/cms-operation.md` として作成する

移行スクリプトは一度しか使わないが、投入をやり直せるよう **冪等**に作る（同じcontentIdへのPUTで上書き）。

## 11. エラーハンドリング

| 状況 | 挙動 |
|---|---|
| CMS APIがビルド時に失敗 | ビルドを失敗させる（古い内容での無言デプロイを防ぐ） |
| CMS APIがISR再生成時に失敗 | 直前の生成済みページを配信し続ける（Next.jsの既定挙動）。エラーはログに残す |
| Webhookの署名不正 | 401を返し、再検証しない |
| 存在しないID | `notFound()`（既存挙動を維持） |
| 必須フィールドが空 | 取得時のスキーマ検証で検出し、該当記事を一覧から除外してログに残す（ページ全体を落とさない） |

## 12. テスト方針

現在このプロジェクトにはテスト環境が無い（`package.json` の scripts は dev/build/start のみ）。本作業で **vitest を導入**する。

優先度順のテスト対象:

1. **マッピング層**（最重要）: CMSレスポンスから `NewsItem` / `ContentItem` / `Job` への変換。必須フィールド欠落、空配列、オプショナルフィールド未設定のケースを含む
2. **全件取得のページング**: 10件超・100件超のレスポンスで全件返ることを確認
3. **Webhook署名検証**: 正しい署名で200、不正・欠落で401
4. **HTMLサニタイズ**: `<script>` や `onerror` 属性が除去されること
5. 手動確認: 下書きプレビュー、予約公開、既存URLの維持

## 13. 必要な環境変数

```
MICROCMS_SERVICE_DOMAIN=exceet-recruit # https://xxxxx.microcms.io の xxxxx
MICROCMS_API_KEY=xxxxxxxx              # GET権限（読み取り用）
MICROCMS_WEBHOOK_SECRET=xxxxxxxx       # Webhook署名検証用
DRAFT_PREVIEW_SECRET=xxxxxxxx          # プレビューURL保護用（任意の長い文字列）
```

`.env.example` に追記し、Vercelの環境変数にも登録する。

**書き込み用キーを分けない理由**: HobbyプランはAPIキーを1個しか作れない。移行スクリプトの実行時だけ、このキーに管理画面から POST / PUT 権限を一時的に付与し、投入後に GET のみへ戻す運用とする。常用するキーに書き込み権限を残さないためで、権限が有効なのは移行作業中の数分間に限られる。

## 14. 事前に必要な作業（依頼者側）

1. microCMS のアカウント作成とサービス作成
2. APIキーの発行（読み取り用・書き込み用）
3. 上記キーの共有

## 15. 想定コストとリスク

| 項目 | 内容 |
|---|---|
| コスト | Hobbyプラン **無料**（メンバー3人／API5個／予約公開○／編集履歴○）で要件を満たす |
| 増額条件 | 管理画面を使う人が **4人以上**になると Team **¥4,900/月**（税抜、追加メンバー+1,200円/人） |
| リスク1 | 権限分離はBusiness（¥75,000/月）が必要。当面は**担当者全員が全記事を編集・公開できる**前提で運用する |
| リスク2 | 予約公開の実行時刻は公式保証がない |
| リスク3 | コンテンツが社外（microCMS）に保管される。定期的なバックアップ手段を別途検討する |
| リスク4 | 無料プランの商用利用条件は申込時に利用規約で確認する |
