# microCMS コンテンツ管理 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 採用担当者（非エンジニア）が microCMS の管理画面から、お知らせ・コンテンツ記事・求人情報を下書き・プレビュー・公開・予約公開できるようにする。

**Architecture:** コンテンツは microCMS に保管する。Next.js のサーバーコンポーネント（各ルートの `page.tsx`）が microCMS からデータを取得し、既存の型（`NewsItem` / `ContentItem` / `Job`）へマッピング層で変換して、`"use client"` のページコンポーネントへ props で渡す。更新の反映は microCMS の Webhook による `revalidateTag()` を主とし、10分間隔の時間ISRを保険として併用する。

**Tech Stack:** Next.js 15 (App Router) / TypeScript / microcms-js-sdk / isomorphic-dompurify / marked / vitest / Vercel

**Spec:** `docs/superpowers/specs/2026-10-15-microcms-cms-design.md`

## Global Constraints

- コンテンツの参照は**必ずサーバーコンポーネント側**で行う。`"use client"` のファイルから `microcms-js-sdk` を import してはならない（APIキーがブラウザへ露出する）
- 既存の公開URLを変更しない: `/contents/2`、`/contents/3`、`/contents/25`〜`/contents/34`、`/career/1`〜`/career/7`
- 既存の型 `NewsItem` / `ContentItem` / `Job`（`src/app/data/*.ts`）の**フィールド名を変更しない**。CMS側の差異はマッピング層で吸収する。例外はID型の変更のみ（`ContentItem.id`: `number` → `string`、`Job.id` → `Job.slug`: `string`）
- 日付文字列の形式は `YYYY.MM.DD`（例 `2026.07.03`）。CMSのISO 8601をこの形式へ整形する
- CMSのカテゴリ表示ラベル・色はCMSに持たせず、`newsCategories` / `contentCategories` / `getCategoryColor` から引く
- microCMS の `publishedAt` / `createdAt` / `updatedAt` / `revisedAt` はシステム予約フィールド。カスタムフィールド名に使わない（掲載日は `displayDate`）
- microCMS のGET APIは1回で最大100件。一覧取得は必ず全件取得する
- リッチエディタ由来のHTMLは、描画前に必ずサニタイズする
- ISRの時間フォールバックは全ページ `export const revalidate = 600`
- 全タスクで Conventional Commits 形式のコミットメッセージを使い、各タスク末尾でコミットする

## 実行順序の制約

**Task 13（移行スクリプト）は Task 1 の直後に実行する。**

移行スクリプトは `src/app/data/contents.ts` と `jobs.ts` のデータ配列を入力にするが、Task 4 と Task 5 でその配列を削除する。配列が消えた後ではスクリプトが動かない。

したがって実行順は次のとおり。

```
Task 1（基盤整備）
  → Task 13（移行スクリプトを作成し、CMSへ投入して画像も設定する）
  → Task 2 〜 Task 12（コード側の切り替え）
  → Task 14（手順書・本番設定・受け入れ確認）
```

Task 13 の前に、依頼者側で microCMS のアカウント作成とAPIスキーマ3つの作成が完了している必要がある。

## Review Focus

仕様から導かれるが、どのタスクのテストでも素直には現れない入力・状況。各行に対応するテストを、その挙動を持つタスクに入れてある。

1. **本文が空のお知らせ**（外部リンクのみの運用）— 詳細ページが落ちず、一覧は外部URLへリンクする（Task 3・Task 7）
2. **必須フィールドが欠けた記事**（画像未設定のまま公開されたなど）— ページ全体を落とさず、その記事だけ一覧から除外する（Task 4・Task 5）
3. **11件目以降の記事**（APIの既定10件の境界）— 一覧に全件出る（Task 2）
4. **Webhookの署名が欠落・不正**— 401を返し、再検証しない（Task 11）
5. **リッチエディタに紛れ込んだ `<script>` や `onerror` 属性** — 描画時に除去される（Task 6）

---

## File Structure

### 新規作成

| ファイル | 責務 |
|---|---|
| `next.config.ts` | microCMS画像ドメインの許可 |
| `vitest.config.ts` | テスト設定 |
| `src/app/lib/cms/client.ts` | microCMSクライアントの生成（環境変数の読み取りを1箇所に閉じる） |
| `src/app/lib/cms/fetchAll.ts` | ページングしながら全件取得する汎用関数 |
| `src/app/lib/cms/types.ts` | CMSレスポンスの型（CMS固有の形はここだけに閉じる） |
| `src/app/lib/cms/format.ts` | ISO日時 → `YYYY.MM.DD` 整形 |
| `src/app/lib/cms/news.ts` | お知らせの取得関数とマッパー |
| `src/app/lib/cms/contents.ts` | コンテンツ記事の取得関数とマッパー |
| `src/app/lib/cms/jobs.ts` | 求人の取得関数とマッパー |
| `src/app/lib/html.ts` | CMSのHTMLをサニタイズする |
| `src/app/components/CmsBody.tsx` | サニタイズ済みHTMLを描画する |
| `src/app/api/revalidate/route.ts` | Webhook受信・署名検証・タグ再検証 |
| `src/app/api/draft/route.ts` | 下書きプレビューの開始 |
| `src/app/api/draft/disable/route.ts` | 下書きプレビューの終了 |
| `scripts/migrate-to-microcms.ts` | 既存データをCMSへ投入（1回限り・冪等） |
| `docs/cms-operation.md` | 担当者向け操作手順書 |

### 変更

| ファイル | 変更内容 |
|---|---|
| `src/app/data/news.ts` | `newsItems` 配列を削除。型・カテゴリ定義・ヘルパーは残す。`externalUrl` を型に追加 |
| `src/app/data/contents.ts` | `contentItems` 配列を削除。`ContentItem.id` を `string` 化。配列前提のヘルパーを引数で受け取る形に変更 |
| `src/app/data/jobs.ts` | `careerJobs` / `graduateJobs` 配列を削除。`Job.id` を `Job.slug: string` に変更 |
| `src/app/pages/Home.tsx` | ハードコードのお知らせを削除し、`news` と `contents` を props で受け取る |
| `src/app/pages/NewsList.tsx` | `items` を props で受け取る |
| `src/app/pages/NewsDetail.tsx` | 本文を `CmsBody` で描画 |
| `src/app/pages/ContentsList.tsx` | `items` を props で受け取る |
| `src/app/pages/ContentsDetail.tsx` | 自作Markdownパーサを削除、`CmsBody` で描画、`relatedContents` を props で受け取る |
| `src/app/pages/JobsList.tsx` | `careerJobs` / `graduateJobs` を props で受け取る |
| `src/app/pages/Career.tsx` | `jobs` を props で受け取る |
| `src/app/pages/Graduate.tsx` | `jobs` を props で受け取る |
| `src/app/pages/JobDetail.tsx` | リンク生成を `slug` に変更 |
| `src/app/App.tsx` | props を Home へ中継 |
| `src/app/page.tsx` | CMSから取得して App へ渡す |
| `src/app/news/page.tsx` 他7ファイル | CMSから取得して props で渡す。`revalidate = 600` |
| `src/styles/index.css` | `.cms-body` 配下の体裁を定義 |
| `.env.example` | microCMS関連の環境変数を追記 |
| `package.json` | 依存追加、`test` スクリプト追加 |

---

### Task 1: 基盤整備（依存追加・テスト環境・画像ドメイン）

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `next.config.ts`
- Modify: `.env.example`
- Create: `src/app/lib/cms/client.ts`

**Interfaces:**
- Consumes: なし（最初のタスク）
- Produces: `cmsClient`（`microcms-js-sdk` の `createClient` 戻り値）、`npm test` コマンド

- [ ] **Step 1: 依存パッケージを追加**

```bash
npm install microcms-js-sdk isomorphic-dompurify
npm install -D vitest @vitejs/plugin-react marked tsx
```

`marked` と `tsx` は移行スクリプト（Task 13）専用なので devDependencies に入れる。

- [ ] **Step 2: `package.json` に test スクリプトを追加**

`scripts` に以下を追加する。

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: `vitest.config.ts` を作成**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: 動作確認用のテストを書いて実行する**

`src/app/lib/cms/smoke.test.ts` を作成する。

```ts
import { describe, expect, it } from "vitest";

describe("vitest setup", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: PASS（1 passed）

確認できたら `src/app/lib/cms/smoke.test.ts` を削除する。

- [ ] **Step 5: `next.config.ts` を作成**

このプロジェクトには現在 `next.config.*` が存在しない。新規作成する。

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: `.env.example` に環境変数を追記**

末尾に追記する。

```
# microCMS（コンテンツ管理）
MICROCMS_SERVICE_DOMAIN=xxxxx          # https://xxxxx.microcms.io の xxxxx 部分
MICROCMS_API_KEY=xxxxxxxx              # GET権限のAPIキー
MICROCMS_WRITE_API_KEY=xxxxxxxx        # POST/PUT権限。移行スクリプト用（Vercelには登録しない）
MICROCMS_WEBHOOK_SECRET=xxxxxxxx       # Webhook署名の検証用
DRAFT_PREVIEW_SECRET=xxxxxxxx          # 下書きプレビューURLの保護用（任意の長い文字列）
```

- [ ] **Step 7: `src/app/lib/cms/client.ts` を作成**

```ts
import { createClient } from "microcms-js-sdk";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`環境変数 ${name} が設定されていません`);
  }
  return value;
}

export const cmsClient = createClient({
  serviceDomain: requireEnv("MICROCMS_SERVICE_DOMAIN"),
  apiKey: requireEnv("MICROCMS_API_KEY"),
});
```

環境変数が無いときに例外を投げるのは、設定漏れをビルド時に気付かせるため。黙って空データのサイトを配信するより安全。

- [ ] **Step 8: ビルドが通ることを確認**

Run: `npm run build`
Expected: 成功（この時点ではCMSを呼んでいないので、環境変数が無くても通る）

- [ ] **Step 9: コミット**

```bash
git add package.json package-lock.json vitest.config.ts next.config.ts .env.example src/app/lib/cms/client.ts
git commit -m "chore: microCMS導入の基盤を整備（依存追加・vitest・画像ドメイン許可）"
```

---

### Task 2: 全件取得ユーティリティ

**Files:**
- Create: `src/app/lib/cms/fetchAll.ts`
- Test: `src/app/lib/cms/fetchAll.test.ts`

**Interfaces:**
- Consumes: なし
- Produces:
  - `interface CmsListResponse<T> { contents: T[]; totalCount: number; offset: number; limit: number }`
  - `type GetListPage<T> = (queries: { limit: number; offset: number }) => Promise<CmsListResponse<T>>`
  - `async function fetchAll<T>(getPage: GetListPage<T>, pageSize?: number): Promise<T[]>`

- [ ] **Step 1: 失敗するテストを書く**

`src/app/lib/cms/fetchAll.test.ts` を作成する。

```ts
import { describe, expect, it, vi } from "vitest";
import { fetchAll, type CmsListResponse } from "./fetchAll";

function fakeApi(total: number) {
  const all = Array.from({ length: total }, (_, i) => ({ id: i + 1 }));
  return vi.fn(
    async ({ limit, offset }: { limit: number; offset: number }): Promise<CmsListResponse<{ id: number }>> => ({
      contents: all.slice(offset, offset + limit),
      totalCount: total,
      offset,
      limit,
    })
  );
}

describe("fetchAll", () => {
  it("1ページに収まる件数をそのまま返す", async () => {
    const api = fakeApi(3);
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(3);
    expect(api).toHaveBeenCalledTimes(1);
  });

  it("APIの既定10件を超えても全件返す", async () => {
    const api = fakeApi(12);
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(12);
    expect(result[11].id).toBe(12);
  });

  it("1ページ上限を超える件数をページングして全件返す", async () => {
    const api = fakeApi(250);
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(250);
    expect(api).toHaveBeenCalledTimes(3);
    expect(result[249].id).toBe(250);
  });

  it("0件のときは空配列を返し、追加リクエストをしない", async () => {
    const api = fakeApi(0);
    const result = await fetchAll(api, 100);
    expect(result).toEqual([]);
    expect(api).toHaveBeenCalledTimes(1);
  });

  it("totalCountが嘘でもcontentsが空になれば止まる", async () => {
    const api = vi.fn(async ({ limit, offset }: { limit: number; offset: number }) => ({
      contents: offset === 0 ? [{ id: 1 }] : [],
      totalCount: 999,
      offset,
      limit,
    }));
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(1);
    expect(api).toHaveBeenCalledTimes(2);
  });
});
```

最後のテストは無限ループ防止のためのもの。`totalCount` だけを信じてループすると、CMS側の値が実際の件数と食い違ったときにビルドが止まらなくなる。

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test -- fetchAll`
Expected: FAIL（`./fetchAll` が解決できない）

- [ ] **Step 3: 実装する**

`src/app/lib/cms/fetchAll.ts` を作成する。

```ts
export interface CmsListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export type GetListPage<T> = (queries: {
  limit: number;
  offset: number;
}) => Promise<CmsListResponse<T>>;

/** microCMSのGET APIは1回で最大100件しか返さないため、全件揃うまで繰り返す */
export async function fetchAll<T>(getPage: GetListPage<T>, pageSize = 100): Promise<T[]> {
  const all: T[] = [];
  let offset = 0;

  while (true) {
    const page = await getPage({ limit: pageSize, offset });
    all.push(...page.contents);

    // contentsが空になったら、totalCountの値に関わらず打ち切る（無限ループ防止）
    if (page.contents.length === 0) break;
    if (all.length >= page.totalCount) break;

    offset += pageSize;
  }

  return all;
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test -- fetchAll`
Expected: PASS（5 passed）

- [ ] **Step 5: コミット**

```bash
git add src/app/lib/cms/fetchAll.ts src/app/lib/cms/fetchAll.test.ts
git commit -m "feat: microCMSの一覧を全件取得するユーティリティを追加"
```

---

### Task 3: お知らせのマッピング層

**Files:**
- Create: `src/app/lib/cms/types.ts`
- Create: `src/app/lib/cms/format.ts`
- Create: `src/app/lib/cms/news.ts`
- Test: `src/app/lib/cms/format.test.ts`
- Test: `src/app/lib/cms/news.test.ts`
- Modify: `src/app/data/news.ts`

**Interfaces:**
- Consumes: `fetchAll`、`CmsListResponse`（Task 2）、`cmsClient`（Task 1）
- Produces:
  - `formatCmsDate(iso: string): string` — ISO → `YYYY.MM.DD`
  - `interface CmsNews { id: string; date: string; title: string; category: string; body?: string; image?: { url: string; width: number; height: number }; externalUrl?: string }`
  - `toNewsItem(cms: CmsNews): NewsItem | null` — 必須欠落時は `null`
  - `getAllNews(): Promise<NewsItem[]>`
  - `getNewsDetail(id: string, draftKey?: string): Promise<NewsItem | null>`
  - `NewsItem` に `externalUrl?: string` が追加される

- [ ] **Step 1: 日付整形の失敗するテストを書く**

`src/app/lib/cms/format.test.ts` を作成する。

```ts
import { describe, expect, it } from "vitest";
import { formatCmsDate } from "./format";

describe("formatCmsDate", () => {
  it("ISO 8601をYYYY.MM.DD形式にする", () => {
    expect(formatCmsDate("2026-07-03T00:00:00.000Z")).toBe("2026.07.03");
  });

  it("月日を2桁でゼロ埋めする", () => {
    expect(formatCmsDate("2024-01-05T00:00:00.000Z")).toBe("2024.01.05");
  });

  it("日本時間の日付として扱う（UTC深夜のずれを防ぐ）", () => {
    // UTC 2026-07-02T15:00:00Z = JST 2026-07-03 00:00
    expect(formatCmsDate("2026-07-02T15:00:00.000Z")).toBe("2026.07.03");
  });

  it("空文字や不正な値では空文字を返す", () => {
    expect(formatCmsDate("")).toBe("");
    expect(formatCmsDate("not-a-date")).toBe("");
  });
});
```

3番目のテストが重要。microCMSの日時はUTCで返るため、素朴に `getMonth()` を使うと日本時間の日付が1日ずれる。担当者が「7月3日」と入力した記事が「7月2日」と表示される不具合になる。

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test -- format`
Expected: FAIL（`./format` が解決できない）

- [ ] **Step 3: 実装する**

`src/app/lib/cms/format.ts` を作成する。

```ts
/** microCMSのISO 8601日時を、サイト表記の YYYY.MM.DD（日本時間）に整形する */
export function formatCmsDate(iso: string): string {
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  // 日本時間に寄せてから年月日を取り出す（UTCのまま扱うと日付が1日ずれる）
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = jst.getUTCFullYear();
  const month = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jst.getUTCDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test -- format`
Expected: PASS（4 passed）

- [ ] **Step 5: `NewsItem` 型に `externalUrl` を追加**

`src/app/data/news.ts` の `NewsItem` を次のように変更する（`newsItems` 配列の削除は Task 7 で行う）。

```ts
export interface NewsItem {
  id: string;
  date: string;
  title: string;
  category: 'graduate' | 'news' | 'other';
  categoryLabel: string;
  content: string;
  image?: string;
  /** 入力時は一覧から外部サイトへ直接リンクする */
  externalUrl?: string;
}
```

`id` を `number` から `string` に変えている。microCMSの `contentId` は文字列のため。

- [ ] **Step 6: マッパーの失敗するテストを書く**

`src/app/lib/cms/news.test.ts` を作成する。

```ts
import { describe, expect, it } from "vitest";
import { toNewsItem, type CmsNews } from "./news";

function base(): CmsNews {
  return {
    id: "abc123",
    date: "2026-07-03T00:00:00.000Z",
    title: "説明会に参加します",
    category: "news",
    body: "<p>本文</p>",
  };
}

describe("toNewsItem", () => {
  it("CMSレスポンスをNewsItemへ変換する", () => {
    const item = toNewsItem(base());
    expect(item).toEqual({
      id: "abc123",
      date: "2026.07.03",
      title: "説明会に参加します",
      category: "news",
      categoryLabel: "ニュース",
      content: "<p>本文</p>",
      image: undefined,
      externalUrl: undefined,
    });
  });

  it("categoryLabelをサイト側の定義から導出する", () => {
    expect(toNewsItem({ ...base(), category: "graduate" })?.categoryLabel).toBe("新卒");
    expect(toNewsItem({ ...base(), category: "other" })?.categoryLabel).toBe("その他");
  });

  it("本文が空でも変換できる（外部リンクのみのお知らせ）", () => {
    const item = toNewsItem({
      ...base(),
      body: undefined,
      externalUrl: "https://example.com/info",
    });
    expect(item?.content).toBe("");
    expect(item?.externalUrl).toBe("https://example.com/info");
  });

  it("画像があればURLだけを取り出す", () => {
    const item = toNewsItem({
      ...base(),
      image: { url: "https://images.microcms-assets.io/a.webp", width: 800, height: 600 },
    });
    expect(item?.image).toBe("https://images.microcms-assets.io/a.webp");
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toNewsItem({ ...base(), title: "" })).toBeNull();
  });

  it("未知のカテゴリならnullを返す", () => {
    expect(toNewsItem({ ...base(), category: "unknown" })).toBeNull();
  });
});
```

タイトル欠落や未知カテゴリで `null` を返すのは、仕様11節「該当記事を一覧から除外してログに残す（ページ全体を落とさない）」を満たすため。

- [ ] **Step 7: テストが失敗することを確認**

Run: `npm test -- news`
Expected: FAIL（`toNewsItem` が存在しない）

- [ ] **Step 8: 実装する**

`src/app/lib/cms/types.ts` を作成する。

```ts
/** microCMSが返す画像フィールドの形 */
export interface CmsImage {
  url: string;
  width: number;
  height: number;
}
```

`src/app/lib/cms/news.ts` を作成する。

```ts
import { newsCategories, type NewsItem } from "../../data/news";
import { cmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";
import { formatCmsDate } from "./format";
import type { CmsImage } from "./types";

const ENDPOINT = "news";

export interface CmsNews {
  id: string;
  date: string;
  title: string;
  category: string;
  body?: string;
  image?: CmsImage;
  externalUrl?: string;
}

const VALID_CATEGORIES = new Set(["graduate", "news", "other"]);

function categoryLabelOf(categoryId: string): string | undefined {
  return newsCategories.find((c) => c.id === categoryId)?.label;
}

/** CMSレスポンスを既存のNewsItemへ変換する。必須が欠けていればnull */
export function toNewsItem(cms: CmsNews): NewsItem | null {
  if (!cms.title) return null;
  if (!VALID_CATEGORIES.has(cms.category)) return null;

  const categoryLabel = categoryLabelOf(cms.category);
  if (!categoryLabel) return null;

  return {
    id: cms.id,
    date: formatCmsDate(cms.date),
    title: cms.title,
    category: cms.category as NewsItem["category"],
    categoryLabel,
    content: cms.body ?? "",
    image: cms.image?.url,
    externalUrl: cms.externalUrl || undefined,
  };
}

function mapValid(list: CmsNews[]): NewsItem[] {
  return list.flatMap((cms) => {
    const item = toNewsItem(cms);
    if (!item) {
      console.error(`[cms] お知らせ ${cms.id} に必須フィールドの欠落があるため一覧から除外しました`);
      return [];
    }
    return [item];
  });
}

export async function getAllNews(): Promise<NewsItem[]> {
  const contents = await fetchAll<CmsNews>(({ limit, offset }) =>
    cmsClient.getList<CmsNews>({
      endpoint: ENDPOINT,
      queries: { limit, offset, orders: "-date" },
    }) as Promise<CmsListResponse<CmsNews>>
  );
  return mapValid(contents);
}

export async function getNewsDetail(id: string, draftKey?: string): Promise<NewsItem | null> {
  try {
    const cms = await cmsClient.getListDetail<CmsNews>({
      endpoint: ENDPOINT,
      contentId: id,
      queries: draftKey ? { draftKey } : {},
      customRequestInit: draftKey ? { cache: "no-store" } : undefined,
    });
    return toNewsItem(cms);
  } catch {
    return null;
  }
}
```

- [ ] **Step 9: テストが通ることを確認**

Run: `npm test -- news`
Expected: PASS（6 passed）

- [ ] **Step 10: コミット**

```bash
git add src/app/lib/cms/types.ts src/app/lib/cms/format.ts src/app/lib/cms/format.test.ts src/app/lib/cms/news.ts src/app/lib/cms/news.test.ts src/app/data/news.ts
git commit -m "feat: お知らせのmicroCMSマッピング層と日付整形を追加"
```

---

### Task 4: コンテンツ記事のマッピング層

**Files:**
- Create: `src/app/lib/cms/contents.ts`
- Test: `src/app/lib/cms/contents.test.ts`
- Modify: `src/app/data/contents.ts`

**Interfaces:**
- Consumes: `formatCmsDate`、`fetchAll`、`cmsClient`、`CmsImage`
- Produces:
  - `interface CmsContent { id: string; title: string; description: string; body: string; image?: CmsImage; category: string; tags?: string[]; displayDate: string }`
  - `toContentItem(cms: CmsContent): ContentItem | null`
  - `getAllContents(): Promise<ContentItem[]>`
  - `getContentDetail(id: string, draftKey?: string): Promise<ContentItem | null>`
  - `ContentItem.id` が `string` になる

- [ ] **Step 1: `ContentItem.id` を文字列化し、配列を削除し、ヘルパーを引数受け取りに変える**

`src/app/data/contents.ts` を変更する。`export const contentItems: ContentItem[] = [ ... ];` を**丸ごと削除する**（約990行）。残すのは型定義、`contentCategories`、`contentTags`、`getCategoryColor`、および以下で書き換えるヘルパー群。

配列の削除をこのタスクで行う理由: `ContentItem.id` を `string` にすると、数値IDを持つ既存の配列リテラルが型エラーになる。型変更と配列削除を別タスクに分けると、その間ずっと `npx tsc --noEmit` が通らない状態になる。

> このタスクに入る前に Task 13（移行）を済ませておくこと。削除する配列が移行スクリプトの入力になっている。

```ts
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: 'company' | 'work' | 'members' | 'environment' | 'dialogue';
  categoryLabel: string;
  tags: string[];
  publishedAt: string;
}
```

ファイル末尾のヘルパー群を、モジュール内の配列ではなく引数を受け取る形に書き換える。

```ts
// IDでコンテンツを取得する
export function getContentById(items: ContentItem[], id: string): ContentItem | undefined {
  return items.find(item => item.id === id);
}

// カテゴリでフィルタリングする
export function getContentsByCategory(items: ContentItem[], categoryId: ContentCategoryId): ContentItem[] {
  if (categoryId === 'all') {
    return items;
  }
  return items.filter(item => item.category === categoryId);
}

// タグでフィルタリングする
export function getContentsByTag(items: ContentItem[], tag: string): ContentItem[] {
  return items.filter(item => item.tags.includes(tag));
}

// カテゴリとタグの組み合わせでフィルタリングする
export function getContentsFiltered(
  items: ContentItem[],
  categoryId: ContentCategoryId,
  tag?: string
): ContentItem[] {
  let result = getContentsByCategory(items, categoryId);
  if (tag) {
    result = result.filter(item => item.tags.includes(tag));
  }
  return result;
}

// 関連記事を取得する（同カテゴリを優先し、足りなければ他カテゴリで埋める）
export function getRelatedContents(items: ContentItem[], id: string, limit: number = 3): ContentItem[] {
  const current = items.find(item => item.id === id);
  if (!current) return items.slice(0, limit);

  const sameCategory = items.filter(item => item.id !== id && item.category === current.category);
  const others = items.filter(item => item.id !== id && item.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}
```

既存の実装と引数の形だけが違う。中身の挙動（同カテゴリ優先で埋める）は既存のものを読んで合わせること。

- [ ] **Step 2: 失敗するテストを書く**

`src/app/lib/cms/contents.test.ts` を作成する。

```ts
import { describe, expect, it } from "vitest";
import { toContentItem, type CmsContent } from "./contents";

function base(): CmsContent {
  return {
    id: "25",
    title: "プロジェクトチームの話",
    description: "概要テキスト",
    body: "<h2>見出し</h2><p>本文</p>",
    image: { url: "https://images.microcms-assets.io/a.webp", width: 1200, height: 800 },
    category: "work",
    tags: ["制度", "カルチャー"],
    displayDate: "2025-01-14T00:00:00.000Z",
  };
}

describe("toContentItem", () => {
  it("CMSレスポンスをContentItemへ変換する", () => {
    expect(toContentItem(base())).toEqual({
      id: "25",
      title: "プロジェクトチームの話",
      description: "概要テキスト",
      content: "<h2>見出し</h2><p>本文</p>",
      image: "https://images.microcms-assets.io/a.webp",
      category: "work",
      categoryLabel: "仕事を知る",
      tags: ["制度", "カルチャー"],
      publishedAt: "2025.01.14",
    });
  });

  it("displayDateをpublishedAtへ詰め替える", () => {
    expect(toContentItem(base())?.publishedAt).toBe("2025.01.14");
  });

  it("タグ未設定なら空配列にする", () => {
    expect(toContentItem({ ...base(), tags: undefined })?.tags).toEqual([]);
  });

  it("画像が未設定ならnullを返す（一覧から除外する）", () => {
    expect(toContentItem({ ...base(), image: undefined })).toBeNull();
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toContentItem({ ...base(), title: "" })).toBeNull();
  });

  it("未知のカテゴリならnullを返す", () => {
    expect(toContentItem({ ...base(), category: "unknown" })).toBeNull();
  });

  it("全カテゴリのラベルを正しく導出する", () => {
    expect(toContentItem({ ...base(), category: "company" })?.categoryLabel).toBe("会社を知る");
    expect(toContentItem({ ...base(), category: "members" })?.categoryLabel).toBe("仲間を知る");
    expect(toContentItem({ ...base(), category: "environment" })?.categoryLabel).toBe("働く環境");
    expect(toContentItem({ ...base(), category: "dialogue" })?.categoryLabel).toBe("対話を知る");
  });
});
```

画像未設定で `null` にするのは、`ContentItem.image` が必須で、空文字を `next/image` に渡すと実行時エラーになるため。記事1件の設定漏れでページ全体を落とさない。

- [ ] **Step 3: テストが失敗することを確認**

Run: `npm test -- contents`
Expected: FAIL（`toContentItem` が存在しない）

- [ ] **Step 4: 実装する**

`src/app/lib/cms/contents.ts` を作成する。

```ts
import { contentCategories, type ContentItem } from "../../data/contents";
import { cmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";
import { formatCmsDate } from "./format";
import type { CmsImage } from "./types";

const ENDPOINT = "contents";

export interface CmsContent {
  id: string;
  title: string;
  description: string;
  body: string;
  image?: CmsImage;
  category: string;
  tags?: string[];
  displayDate: string;
}

function categoryLabelOf(categoryId: string): string | undefined {
  if (categoryId === "all") return undefined;
  return contentCategories.find((c) => c.id === categoryId)?.label;
}

/** CMSレスポンスを既存のContentItemへ変換する。必須が欠けていればnull */
export function toContentItem(cms: CmsContent): ContentItem | null {
  if (!cms.title) return null;
  if (!cms.image?.url) return null;

  const categoryLabel = categoryLabelOf(cms.category);
  if (!categoryLabel) return null;

  return {
    id: cms.id,
    title: cms.title,
    description: cms.description ?? "",
    content: cms.body ?? "",
    image: cms.image.url,
    category: cms.category as ContentItem["category"],
    categoryLabel,
    tags: cms.tags ?? [],
    publishedAt: formatCmsDate(cms.displayDate),
  };
}

function mapValid(list: CmsContent[]): ContentItem[] {
  return list.flatMap((cms) => {
    const item = toContentItem(cms);
    if (!item) {
      console.error(`[cms] 記事 ${cms.id} に必須フィールドの欠落があるため一覧から除外しました`);
      return [];
    }
    return [item];
  });
}

export async function getAllContents(): Promise<ContentItem[]> {
  const contents = await fetchAll<CmsContent>(({ limit, offset }) =>
    cmsClient.getList<CmsContent>({
      endpoint: ENDPOINT,
      queries: { limit, offset, orders: "-displayDate" },
    }) as Promise<CmsListResponse<CmsContent>>
  );
  return mapValid(contents);
}

export async function getContentDetail(id: string, draftKey?: string): Promise<ContentItem | null> {
  try {
    const cms = await cmsClient.getListDetail<CmsContent>({
      endpoint: ENDPOINT,
      contentId: id,
      queries: draftKey ? { draftKey } : {},
      customRequestInit: draftKey ? { cache: "no-store" } : undefined,
    });
    return toContentItem(cms);
  } catch {
    return null;
  }
}
```

- [ ] **Step 5: テストが通ることを確認**

Run: `npm test -- contents`
Expected: PASS（7 passed）

- [ ] **Step 6: コミット**

```bash
git add src/app/lib/cms/contents.ts src/app/lib/cms/contents.test.ts src/app/data/contents.ts
git commit -m "feat: コンテンツ記事のmicroCMSマッピング層を追加"
```

---

### Task 5: 求人のマッピング層

**Files:**
- Create: `src/app/lib/cms/jobs.ts`
- Test: `src/app/lib/cms/jobs.test.ts`
- Modify: `src/app/data/jobs.ts`

**Interfaces:**
- Consumes: `fetchAll`、`cmsClient`
- Produces:
  - `interface CmsJob { id: string; slug: string; employmentCategory: string; title: string; ... }`
  - `toJob(cms: CmsJob): Job | null`
  - `getJobs(category: "career" | "graduate"): Promise<Job[]>`
  - `getJobBySlug(category: "career" | "graduate", slug: string, draftKey?: string): Promise<Job | null>`
  - `Job.id` が `Job.slug: string` に変わる

- [ ] **Step 1: `Job` 型を変更し、配列とヘルパーを削除する**

`src/app/data/jobs.ts` から以下を**削除する**。

- `export const careerJobs: Job[] = [ ... ];`
- `export const graduateJobs: Job[] = [ ... ];`
- `export function getCareerJobById(...)`
- `export function getGraduateJobById(...)`

残すのは `Job` インターフェースのみ。Task 4 と同じ理由で、型変更と配列削除を同じタスクで行う（`id: number` を前提にした配列が型エラーになるため）。

続いて `Job` インターフェースの先頭を変更する。

```ts
export interface Job {
  /** URLの末尾に使う識別子。既存求人は "1"〜"7" */
  slug: string;
  title: string;
  department: string;
  // 以降は変更なし
```

`id: number;` の行を `slug: string;` に置き換える。他のフィールドはそのまま。

この時点で `src/app/pages/` 配下と `src/app/career` / `graduate` / `jobs` のルートに型エラーが出る。Task 9 で解消するため、このタスクでは `npm test` が通ることだけを確認する。

- [ ] **Step 2: 失敗するテストを書く**

`src/app/lib/cms/jobs.test.ts` を作成する。

```ts
import { describe, expect, it } from "vitest";
import { toJob, type CmsJob } from "./jobs";

function base(): CmsJob {
  return {
    id: "generated-id",
    slug: "1",
    employmentCategory: "career",
    title: "Webコーダー・HTMLコーダー",
    department: "メディアコンテンツ部",
    departmentDescription: "部署紹介テキスト",
    type: "エンジニア",
    description: "概要",
    background: "募集背景",
    requirements: ["実務経験1年以上"],
    responsibilities: ["Web制作・コーディング"],
    salary: "月給220,000円〜",
    location: "福井県坂井市",
    employmentType: "正社員",
  };
}

describe("toJob", () => {
  it("CMSレスポンスをJobへ変換する", () => {
    const job = toJob(base());
    expect(job?.slug).toBe("1");
    expect(job?.title).toBe("Webコーダー・HTMLコーダー");
    expect(job?.requirements).toEqual(["実務経験1年以上"]);
  });

  it("任意フィールドが未設定ならundefinedのままにする", () => {
    const job = toJob(base());
    expect(job?.welcomeSkills).toBeUndefined();
    expect(job?.devEnvironment).toBeUndefined();
    expect(job?.benefits).toBeUndefined();
  });

  it("任意の配列フィールドを引き継ぐ", () => {
    const job = toJob({ ...base(), welcomeSkills: ["EC-CUBE経験"], benefits: ["社保完備"] });
    expect(job?.welcomeSkills).toEqual(["EC-CUBE経験"]);
    expect(job?.benefits).toEqual(["社保完備"]);
  });

  it("開発環境のカスタムフィールドを引き継ぐ", () => {
    const job = toJob({
      ...base(),
      devEnvironment: {
        fieldId: "devEnvironment",
        tech: ["HTML5/CSS3"],
        versionControl: ["SourceTree"],
        designTools: ["Figma"],
        workStyle: ["営業と連携"],
      },
    });
    expect(job?.devEnvironment).toEqual({
      tech: ["HTML5/CSS3"],
      versionControl: ["SourceTree"],
      designTools: ["Figma"],
      workStyle: ["営業と連携"],
    });
  });

  it("開発環境の一部が未設定でも空配列で埋める", () => {
    const job = toJob({
      ...base(),
      devEnvironment: { fieldId: "devEnvironment", tech: ["TypeScript"] },
    });
    expect(job?.devEnvironment).toEqual({
      tech: ["TypeScript"],
      versionControl: [],
      designTools: [],
      workStyle: [],
    });
  });

  it("slugが空ならnullを返す", () => {
    expect(toJob({ ...base(), slug: "" })).toBeNull();
  });

  it("タイトルが空ならnullを返す", () => {
    expect(toJob({ ...base(), title: "" })).toBeNull();
  });
});
```

`devEnvironment` の部分欠落を空配列で埋めるのは、`JobDetail.tsx` が4つの配列を前提に `.map()` するため。`undefined` が混じると実行時エラーになる。

- [ ] **Step 3: テストが失敗することを確認**

Run: `npm test -- jobs`
Expected: FAIL（`toJob` が存在しない）

- [ ] **Step 4: 実装する**

`src/app/lib/cms/jobs.ts` を作成する。

```ts
import type { Job } from "../../data/jobs";
import { cmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";

const ENDPOINT = "jobs";

export type EmploymentCategory = "career" | "graduate";

/** microCMSのカスタムフィールドは fieldId を伴って返る */
interface CmsDevEnvironment {
  fieldId: string;
  tech?: string[];
  versionControl?: string[];
  designTools?: string[];
  workStyle?: string[];
}

export interface CmsJob {
  id: string;
  slug: string;
  employmentCategory: string;
  title: string;
  department: string;
  departmentDescription: string;
  type: string;
  description: string;
  background: string;
  requirements?: string[];
  responsibilities?: string[];
  salary: string;
  location: string;
  employmentType: string;
  welcomeSkills?: string[];
  appealPoints?: string[];
  workHours?: string;
  holidays?: string;
  trialPeriod?: string;
  benefits?: string[];
  selectionProcess?: string[];
  devEnvironment?: CmsDevEnvironment;
}

/** CMSレスポンスを既存のJobへ変換する。必須が欠けていればnull */
export function toJob(cms: CmsJob): Job | null {
  if (!cms.slug) return null;
  if (!cms.title) return null;

  return {
    slug: cms.slug,
    title: cms.title,
    department: cms.department ?? "",
    departmentDescription: cms.departmentDescription ?? "",
    type: cms.type ?? "",
    description: cms.description ?? "",
    background: cms.background ?? "",
    requirements: cms.requirements ?? [],
    responsibilities: cms.responsibilities ?? [],
    salary: cms.salary ?? "",
    location: cms.location ?? "",
    employmentType: cms.employmentType ?? "",
    welcomeSkills: cms.welcomeSkills,
    appealPoints: cms.appealPoints,
    workHours: cms.workHours,
    holidays: cms.holidays,
    trialPeriod: cms.trialPeriod,
    benefits: cms.benefits,
    selectionProcess: cms.selectionProcess,
    devEnvironment: cms.devEnvironment
      ? {
          tech: cms.devEnvironment.tech ?? [],
          versionControl: cms.devEnvironment.versionControl ?? [],
          designTools: cms.devEnvironment.designTools ?? [],
          workStyle: cms.devEnvironment.workStyle ?? [],
        }
      : undefined,
  };
}

function mapValid(list: CmsJob[]): Job[] {
  return list.flatMap((cms) => {
    const job = toJob(cms);
    if (!job) {
      console.error(`[cms] 求人 ${cms.id} に必須フィールドの欠落があるため一覧から除外しました`);
      return [];
    }
    return [job];
  });
}

export async function getJobs(category: EmploymentCategory): Promise<Job[]> {
  const contents = await fetchAll<CmsJob>(({ limit, offset }) =>
    cmsClient.getList<CmsJob>({
      endpoint: ENDPOINT,
      queries: {
        limit,
        offset,
        filters: `employmentCategory[equals]${category}`,
        orders: "slug",
      },
    }) as Promise<CmsListResponse<CmsJob>>
  );
  return mapValid(contents);
}

export async function getJobBySlug(
  category: EmploymentCategory,
  slug: string,
  draftKey?: string
): Promise<Job | null> {
  const response = await cmsClient.getList<CmsJob>({
    endpoint: ENDPOINT,
    queries: {
      limit: 1,
      filters: `employmentCategory[equals]${category}[and]slug[equals]${slug}`,
      ...(draftKey ? { draftKey } : {}),
    },
    customRequestInit: draftKey ? { cache: "no-store" } : undefined,
  });

  const first = response.contents[0];
  return first ? toJob(first) : null;
}
```

- [ ] **Step 5: テストが通ることを確認**

Run: `npm test -- jobs`
Expected: PASS（7 passed）

- [ ] **Step 6: コミット**

```bash
git add src/app/lib/cms/jobs.ts src/app/lib/cms/jobs.test.ts src/app/data/jobs.ts
git commit -m "feat: 求人のmicroCMSマッピング層を追加"
```

---

### Task 6: 本文HTMLのサニタイズと描画コンポーネント

**Files:**
- Create: `src/app/lib/html.ts`
- Test: `src/app/lib/html.test.ts`
- Create: `src/app/components/CmsBody.tsx`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: なし
- Produces:
  - `sanitizeCmsHtml(html: string): string`
  - `<CmsBody html={string} className?={string} />`
  - CSSクラス `.cms-body`

- [ ] **Step 1: 失敗するテストを書く**

`src/app/lib/html.test.ts` を作成する。

```ts
import { describe, expect, it } from "vitest";
import { sanitizeCmsHtml } from "./html";

describe("sanitizeCmsHtml", () => {
  it("許可タグはそのまま残す", () => {
    const html = "<h2>見出し</h2><p>本文<strong>強調</strong></p><ul><li>項目</li></ul>";
    expect(sanitizeCmsHtml(html)).toBe(html);
  });

  it("scriptタグを除去する", () => {
    const result = sanitizeCmsHtml('<p>本文</p><script>alert("xss")</script>');
    expect(result).not.toContain("script");
    expect(result).toContain("<p>本文</p>");
  });

  it("onerror属性を除去する", () => {
    const result = sanitizeCmsHtml('<img src="x" onerror="alert(1)">');
    expect(result).not.toContain("onerror");
  });

  it("javascript:スキームのリンクを除去する", () => {
    const result = sanitizeCmsHtml('<a href="javascript:alert(1)">link</a>');
    expect(result).not.toContain("javascript:");
  });

  it("iframeを除去する", () => {
    const result = sanitizeCmsHtml('<iframe src="https://example.com"></iframe>');
    expect(result).not.toContain("iframe");
  });

  it("外部リンクにrel属性を付ける", () => {
    const result = sanitizeCmsHtml('<a href="https://example.com" target="_blank">link</a>');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it("空文字は空文字を返す", () => {
    expect(sanitizeCmsHtml("")).toBe("");
  });
});
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test -- html`
Expected: FAIL（`./html` が解決できない）

- [ ] **Step 3: 実装する**

`src/app/lib/html.ts` を作成する。

```ts
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "h2", "h3", "h4",
  "p", "br", "hr",
  "strong", "em", "u", "s",
  "ul", "ol", "li",
  "a", "img",
  "blockquote",
  "table", "thead", "tbody", "tr", "th", "td",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "width", "height"];

/**
 * microCMSのリッチエディタが返すHTMLを描画前に無害化する。
 * CMSに書き込める人が訪問者のブラウザでスクリプトを実行できる状態を作らないため。
 */
export function sanitizeCmsHtml(html: string): string {
  if (!html) return "";

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/|#)/i,
  });

  // target="_blank" のリンクに rel を補う（タブナビング対策）
  return clean.replace(
    /<a\s+([^>]*?)target="_blank"([^>]*?)>/gi,
    (match, before, after) =>
      match.includes("rel=")
        ? match
        : `<a ${before}target="_blank"${after} rel="noopener noreferrer">`
  );
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test -- html`
Expected: PASS（7 passed）

失敗する場合は `rel` を補う置換の正規表現を調整する。期待する挙動は「`target="_blank"` があり `rel` が無いリンクに `rel="noopener noreferrer"` が付く」こと。

- [ ] **Step 5: `CmsBody` コンポーネントを作成**

`src/app/components/CmsBody.tsx` を作成する。

```tsx
import { sanitizeCmsHtml } from "../lib/html";

interface CmsBodyProps {
  html: string;
  className?: string;
}

/** CMSのリッチエディタ本文を描画する。サニタイズはここで必ず通す */
export default function CmsBody({ html, className }: CmsBodyProps) {
  return (
    <div
      className={`cms-body${className ? ` ${className}` : ""}`}
      dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(html) }}
    />
  );
}
```

`"use client"` を付けないこと。サーバー側で描画すればサニタイズ後のHTMLだけがブラウザへ渡る。

- [ ] **Step 6: `.cms-body` の体裁をCSSに定義**

`src/styles/index.css` の末尾に追記する。既存の `ContentsDetail.tsx` の見出しスタイル（20px・太字・左に4px #4346BE の罫・上マージン90px）を再現する。

```css
/* ===== CMS本文（microCMSリッチエディタ由来のHTML）===== */
.cms-body {
  font-family: var(--font-noto), sans-serif;
  font-size: 16px;
  line-height: 32px;
}

.cms-body h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  margin-top: 90px;
  margin-bottom: 16px;
  border-left: 4px solid #4346BE;
  padding-left: 14px;
}

.cms-body h2:first-child {
  margin-top: 0;
}

.cms-body h3 {
  font-size: 20px;
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 12px;
}

.cms-body p {
  margin-bottom: 24px;
}

.cms-body strong {
  font-weight: 700;
}

.cms-body ul,
.cms-body ol {
  margin-bottom: 24px;
  padding-left: 1.5em;
}

.cms-body ul {
  list-style: disc;
}

.cms-body ol {
  list-style: decimal;
}

.cms-body li {
  margin-bottom: 8px;
}

.cms-body a {
  color: #0074b9;
  text-decoration: underline;
}

.cms-body img {
  max-width: 100%;
  height: auto;
  margin: 32px 0;
}

.cms-body blockquote {
  margin: 24px 0;
  padding: 16px 20px;
  border-left: 4px solid #d0d0d0;
  background: #f7f7f7;
}
```

実装前に `src/app/pages/ContentsDetail.tsx` の既存の見出しスタイルを読み、数値が一致しているか確認すること。見た目を変えないことが仕様の成功基準の1つ。

- [ ] **Step 7: ビルドを確認**

Run: `npm run build`
Expected: 成功

- [ ] **Step 8: コミット**

```bash
git add src/app/lib/html.ts src/app/lib/html.test.ts src/app/components/CmsBody.tsx src/styles/index.css
git commit -m "feat: CMS本文HTMLのサニタイズと描画コンポーネントを追加"
```

---

### Task 7: お知らせページをCMS化

**Files:**
- Modify: `src/app/data/news.ts`（`newsItems` 配列とヘルパーを削除）
- Modify: `src/app/news/page.tsx`
- Modify: `src/app/news/[id]/page.tsx`
- Modify: `src/app/pages/NewsList.tsx`
- Modify: `src/app/pages/NewsDetail.tsx`

**Interfaces:**
- Consumes: `getAllNews()`、`getNewsDetail()`（Task 3）、`CmsBody`（Task 6）
- Produces: `NewsList` が `{ items: NewsItem[] }` を受け取る、`NewsDetail` が `{ news: NewsItem }` を受け取る（変更なし）

- [ ] **Step 1: `src/app/data/news.ts` からデータ本体を削除**

以下を削除する。

- `export const newsItems: NewsItem[] = [];`
- `export function getNewsById(...)`
- `export function getNewsByCategory(...)`

残すのは `NewsItem` インターフェース、`newsCategories`、`NewsCategoryId` 型のみ。カテゴリの絞り込みは `NewsList` 内の `useState` で行うため、ヘルパーは不要になる。

- [ ] **Step 2: `NewsList` をprops受け取りに変更**

`src/app/pages/NewsList.tsx` の import 文を変更する。

```tsx
import { newsCategories, type NewsCategoryId, type NewsItem } from "../data/news";
```

コンポーネント定義を変更する。

```tsx
interface NewsListProps {
  items: NewsItem[];
}

export default function NewsList({ items }: NewsListProps) {
```

ファイル内の `newsItems` という参照をすべて `items` に置き換える。カテゴリ絞り込みは次の形にする（既存が `getNewsByCategory` を呼んでいる場合はこれに置き換える）。

```tsx
const filtered = selectedCategory === 'all'
  ? items
  : items.filter((item) => item.category === selectedCategory);
```

一覧の各行のリンク先を、外部URLの有無で切り替える。

```tsx
{filtered.map((item) => (
  item.externalUrl ? (
    <a
      key={item.id}
      href={item.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="（既存のクラスをそのまま）"
    >
      {/* 既存の行の中身 */}
    </a>
  ) : (
    <Link key={item.id} href={`/news/${item.id}`} className="（既存のクラスをそのまま）">
      {/* 既存の行の中身 */}
    </Link>
  )
))}
```

行の中身のマークアップは既存のものを維持すること。変えるのはラッパー要素だけ。

- [ ] **Step 3: `src/app/news/page.tsx` でCMSから取得**

```tsx
import Layout from "../components/layout/Layout";
import NewsList from "../pages/NewsList";
import { getAllNews } from "../lib/cms/news";

export const revalidate = 600;

export const metadata = {
  title: "お知らせ | エクシート採用サイト",
  description: "エクシートの採用に関するお知らせをご覧いただけます。",
};

export default async function NewsPage() {
  const items = await getAllNews();

  return (
    <Layout>
      <NewsList items={items} />
    </Layout>
  );
}
```

- [ ] **Step 4: `src/app/news/[id]/page.tsx` を書き換える**

```tsx
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import NewsDetail from "../../pages/NewsDetail";
import { getAllNews, getNewsDetail } from "../../lib/cms/news";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export const revalidate = 600;

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((item) => ({ id: item.id }));
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled } = await draftMode();

  const news = await getNewsDetail(id, isEnabled ? draftKey : undefined);

  if (!news) {
    notFound();
  }

  return (
    <Layout>
      <NewsDetail news={news} />
    </Layout>
  );
}
```

`isEnabled` が false のときは `draftKey` を無視する。クエリに `draftKey` を付けただけで未公開記事が読めてしまう状態を防ぐため。

- [ ] **Step 5: `NewsDetail` の本文描画を `CmsBody` に変更**

`src/app/pages/NewsDetail.tsx` で `news.content` を文字列として描画している箇所を探し、次に置き換える。

```tsx
import CmsBody from "../components/CmsBody";

// 本文を描画している箇所
<CmsBody html={news.content} />
```

`NewsDetail.tsx` の先頭の `"use client"` は残してよい（`CmsBody` 自体はサーバーでもクライアントでも描画できるが、サニタイズをクライアントで走らせないために、可能なら `"use client"` を外して検討する。外すと `useState` 等が使えなくなるため、使っていなければ外す）。

- [ ] **Step 6: 型チェックとビルド**

Run: `npx tsc --noEmit`
Expected: `newsItems` を参照していた箇所のエラーが0件

Run: `npm run build`
Expected: 成功（`.env.local` にmicroCMSの値が設定済みであること。未設定ならStep 1の環境変数エラーで止まる）

- [ ] **Step 7: 手動確認**

Run: `npm run dev`

- `/news` を開き、CMSに登録したお知らせが一覧に出ること
- 外部URLを設定したお知らせが外部サイトへ遷移すること
- 外部URLなしのお知らせが `/news/<id>` へ遷移し、本文が表示されること

- [ ] **Step 8: コミット**

```bash
git add src/app/data/news.ts src/app/news src/app/pages/NewsList.tsx src/app/pages/NewsDetail.tsx
git commit -m "feat: お知らせページをmicroCMS参照に切り替え"
```

---

### Task 8: コンテンツ記事ページをCMS化

**Files:**
- Modify: `src/app/data/contents.ts`（`contentItems` 配列を削除）
- Modify: `src/app/contents/page.tsx`
- Modify: `src/app/contents/[id]/page.tsx`
- Modify: `src/app/pages/ContentsList.tsx`
- Modify: `src/app/pages/ContentsDetail.tsx`

**Interfaces:**
- Consumes: `getAllContents()`、`getContentDetail()`（Task 4）、`getRelatedContents()`（Task 4で引数化）、`CmsBody`（Task 6）
- Produces: `ContentsList` が `{ items: ContentItem[] }`、`ContentsDetail` が `{ content: ContentItem; relatedContents: ContentItem[] }` を受け取る

- [ ] **Step 1: `src/app/data/contents.ts` の状態を確認**

`contentItems` 配列は Task 4 Step 1 で削除済み。残っているのが型定義、`contentCategories`、`contentTags`、`getCategoryColor`、引数化済みヘルパー群だけであることを確認する。

Run: `grep -n "contentItems" src/app/data/contents.ts`
Expected: 一致なし

- [ ] **Step 2: `ContentsList` をprops受け取りに変更**

`src/app/pages/ContentsList.tsx` の import を変更する。

```tsx
import {
  contentCategories,
  contentTags,
  getCategoryColor,
  getContentsFiltered,
  type ContentCategoryId,
  type ContentItem,
} from "../data/contents";
```

コンポーネント定義を変更する。

```tsx
interface ContentsListProps {
  items: ContentItem[];
}

export default function ContentsList({ items }: ContentsListProps) {
```

ファイル内の `contentItems` 参照を `items` に置き換える。`getContentsFiltered` を呼んでいる箇所は第1引数に `items` を渡す形にする。

```tsx
const filtered = getContentsFiltered(items, selectedCategory, selectedTag);
```

- [ ] **Step 3: `src/app/contents/page.tsx` でCMSから取得**

```tsx
import Layout from "../components/layout/Layout";
import ContentsList from "../pages/ContentsList";
import { getAllContents } from "../lib/cms/contents";

export const revalidate = 600;

export default async function ContentsPage() {
  const items = await getAllContents();

  return (
    <Layout>
      <ContentsList items={items} />
    </Layout>
  );
}
```

既存ファイルに `metadata` がある場合は残すこと。

- [ ] **Step 4: `src/app/contents/[id]/page.tsx` を書き換える**

```tsx
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import ContentsDetail from "../../pages/ContentsDetail";
import { getRelatedContents } from "../../data/contents";
import { getAllContents, getContentDetail } from "../../lib/cms/contents";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export const revalidate = 600;

export async function generateStaticParams() {
  const items = await getAllContents();
  return items.map((item) => ({ id: item.id }));
}

export default async function ContentsDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled } = await draftMode();

  const content = await getContentDetail(id, isEnabled ? draftKey : undefined);

  if (!content) {
    notFound();
  }

  const allContents = await getAllContents();
  const relatedContents = getRelatedContents(allContents, content.id, 3);

  return (
    <Layout>
      <ContentsDetail content={content} relatedContents={relatedContents} />
    </Layout>
  );
}
```

- [ ] **Step 5: `ContentsDetail` を書き換える**

`src/app/pages/ContentsDetail.tsx` で3つの変更を行う。

1. props に `relatedContents` を追加し、`getRelatedContents` の呼び出しを削除する

```tsx
import { type ContentItem, getCategoryColor } from "../data/contents";
import CmsBody from "../components/CmsBody";

interface ContentsDetailProps {
  content: ContentItem;
  relatedContents: ContentItem[];
}

export default function ContentsDetail({ content, relatedContents }: ContentsDetailProps) {
```

`const relatedContents = getRelatedContents(content.id, 3);` の行を削除する。

2. 自作Markdownパーサ `renderContent` の定義（19行目付近から始まる関数全体）を削除し、呼び出し箇所を置き換える

```tsx
{/* 旧: {renderContent(content.content)} */}
<CmsBody html={content.content} />
```

3. 会社見学記事の特別扱いを文字列比較にする

```tsx
const isCompanyVisitArticle = content.id === '31';
```

- [ ] **Step 6: 型チェック**

Run: `npx tsc --noEmit`
Expected: エラー0件。`contentItems` を参照していた箇所が残っていれば修正する（`Home.tsx` は Task 10 で対応するため、この時点ではエラーが出る。`Home.tsx` のエラーのみ残っていてよい）

- [ ] **Step 7: 手動確認**

Run: `npm run dev`

- `/contents` でカテゴリ・タグの絞り込みが動くこと
- `/contents/2` が表示され、**見出しの体裁が従来と同じ**であること（左の青い罫・20px・太字）
- 関連記事が3件表示されること

- [ ] **Step 8: コミット**

```bash
git add src/app/data/contents.ts src/app/contents src/app/pages/ContentsList.tsx src/app/pages/ContentsDetail.tsx
git commit -m "feat: コンテンツ記事ページをmicroCMS参照に切り替え"
```

---

### Task 9: 求人ページをCMS化

**Files:**
- Modify: `src/app/data/jobs.ts`（配列とヘルパーを削除）
- Modify: `src/app/jobs/page.tsx`
- Modify: `src/app/career/page.tsx`
- Modify: `src/app/graduate/page.tsx`
- Modify: `src/app/career/[id]/page.tsx`
- Modify: `src/app/graduate/[id]/page.tsx`
- Modify: `src/app/pages/JobsList.tsx`
- Modify: `src/app/pages/Career.tsx`
- Modify: `src/app/pages/Graduate.tsx`
- Modify: `src/app/pages/JobDetail.tsx`

**Interfaces:**
- Consumes: `getJobs()`、`getJobBySlug()`（Task 5）、`getAllContents()`（Task 4）
- Produces: `JobsList` が `{ careerJobs: Job[]; graduateJobs: Job[] }`、`Career` / `Graduate` が `{ jobs: Job[] }` を受け取る

- [ ] **Step 1: `src/app/data/jobs.ts` の状態を確認**

配列とヘルパーは Task 5 Step 1 で削除済み。`Job` インターフェースだけが残っていることを確認する。

Run: `grep -n "careerJobs\|graduateJobs\|getCareerJobById\|getGraduateJobById" src/app/data/jobs.ts`
Expected: 一致なし

- [ ] **Step 2: `Career` をprops受け取りに変更**

`src/app/pages/Career.tsx`。

```tsx
import { type Job } from "../data/jobs";

interface CareerProps {
  jobs: Job[];
}

export default function Career({ jobs }: CareerProps) {
```

ファイル内の `careerJobs` 参照を `jobs` に置き換える。求人へのリンク生成を `slug` に変える。

```tsx
<Link href={`/career/${job.slug}`}>
```

- [ ] **Step 3: `Graduate` をprops受け取りに変更**

`src/app/pages/Graduate.tsx` に同じ変更を加える。`graduateJobs` を `jobs` に、リンクを `/graduate/${job.slug}` にする。

- [ ] **Step 4: `JobsList` をprops受け取りに変更**

`src/app/pages/JobsList.tsx`。

```tsx
import { type Job } from "../data/jobs";

interface JobsListProps {
  careerJobs: Job[];
  graduateJobs: Job[];
}

export default function JobsList({ careerJobs, graduateJobs }: JobsListProps) {
```

import 文から `careerJobs, graduateJobs` を削除する（`Job` 型のみ残す）。ファイル内でのリンク生成を `slug` に変える。求人がどちらの区分かでパスが変わるため、既存のロジックに合わせて `/career/${job.slug}` と `/graduate/${job.slug}` を使い分けること。

- [ ] **Step 5: `JobDetail` のリンク生成を `slug` に変更**

`src/app/pages/JobDetail.tsx` で `job.id` を使っている箇所を `job.slug` に置き換える。

- [ ] **Step 6: 一覧系の `page.tsx` 3ファイルを書き換える**

`src/app/career/page.tsx`。

```tsx
import Layout from "../components/layout/Layout";
import Career from "../pages/Career";
import { getJobs } from "../lib/cms/jobs";

export const revalidate = 600;

export default async function CareerPage() {
  const jobs = await getJobs("career");

  return (
    <Layout>
      <Career jobs={jobs} />
    </Layout>
  );
}
```

`src/app/graduate/page.tsx`。

```tsx
import Layout from "../components/layout/Layout";
import Graduate from "../pages/Graduate";
import { getJobs } from "../lib/cms/jobs";

export const revalidate = 600;

export default async function GraduatePage() {
  const jobs = await getJobs("graduate");

  return (
    <Layout>
      <Graduate jobs={jobs} />
    </Layout>
  );
}
```

`src/app/jobs/page.tsx`（既存の `Suspense` と `metadata` は維持する）。

```tsx
import { Suspense } from "react";

import Layout from "../components/layout/Layout";
import JobsList from "../pages/JobsList";
import { getJobs } from "../lib/cms/jobs";

export const revalidate = 600;

export const metadata = {
  title: "募集中の求人 | エクシート採用サイト",
  description: "エクシートで現在募集中の求人一覧です。キャリア採用・新卒採用の求人情報をご覧いただけます。",
};

export default async function JobsPage() {
  const [careerJobs, graduateJobs] = await Promise.all([
    getJobs("career"),
    getJobs("graduate"),
  ]);

  return (
    <Suspense fallback={<div className="px-8 py-24">Loading...</div>}>
      <Layout>
        <JobsList careerJobs={careerJobs} graduateJobs={graduateJobs} />
      </Layout>
    </Suspense>
  );
}
```

- [ ] **Step 7: 求人詳細の `page.tsx` 2ファイルを書き換える**

`src/app/career/[id]/page.tsx`。

```tsx
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import JobDetail from "../../pages/JobDetail";
import { getJobBySlug, getJobs } from "../../lib/cms/jobs";
import { getAllContents } from "../../lib/cms/contents";
import type { ContentItem } from "../../data/contents";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export const revalidate = 600;

export async function generateStaticParams() {
  const jobs = await getJobs("career");
  return jobs.map((job) => ({ id: job.slug }));
}

// キャリア採用に関連するコンテンツを取得
function getRelatedContentsForCareer(items: ContentItem[]): ContentItem[] {
  return items
    .filter(item =>
      item.tags.includes('キャリア採用') ||
      item.tags.includes('Career') ||
      item.tags.includes('インタビュー') ||
      item.category === 'members' ||
      item.category === 'environment'
    )
    .slice(0, 3);
}

export default async function CareerJobDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled } = await draftMode();

  const job = await getJobBySlug("career", id, isEnabled ? draftKey : undefined);

  if (!job) {
    notFound();
  }

  const allContents = await getAllContents();
  const relatedContents = getRelatedContentsForCareer(allContents);

  return (
    <Layout>
      <JobDetail job={job} type="career" relatedContents={relatedContents} />
    </Layout>
  );
}
```

`src/app/graduate/[id]/page.tsx` も同じ構造にする。既存ファイルの関連コンテンツ抽出ロジック（新卒向けのタグ条件）をそのまま引数受け取りの形に変え、`getJobBySlug("graduate", id, ...)` と `type="graduate"` を使う。

- [ ] **Step 8: 型チェック**

Run: `npx tsc --noEmit`
Expected: `Home.tsx` 以外のエラーが0件

- [ ] **Step 9: 手動確認**

Run: `npm run dev`

- `/career` に7件の求人が出ること
- `/career/1` が表示され、開発環境・福利厚生などの任意項目が従来どおり出ること
- `/jobs` の絞り込みが動くこと
- `/graduate` が0件でもエラーにならないこと（新卒求人は現在0件）

- [ ] **Step 10: コミット**

```bash
git add src/app/data/jobs.ts src/app/jobs src/app/career src/app/graduate src/app/pages/JobsList.tsx src/app/pages/Career.tsx src/app/pages/Graduate.tsx src/app/pages/JobDetail.tsx
git commit -m "feat: 求人ページをmicroCMS参照に切り替え"
```

---

### Task 10: トップページをCMS化

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/app/pages/Home.tsx`

**Interfaces:**
- Consumes: `getAllNews()`、`getAllContents()`
- Produces: `App` と `Home` が `{ news: NewsItem[]; contents: ContentItem[] }` を受け取る

- [ ] **Step 1: `src/app/page.tsx` でCMSから取得**

```tsx
import App from "./App";
import { getAllNews } from "./lib/cms/news";
import { getAllContents } from "./lib/cms/contents";

export const revalidate = 600;

export default async function Page() {
  const [news, contents] = await Promise.all([getAllNews(), getAllContents()]);

  return <App news={news} contents={contents} />;
}
```

- [ ] **Step 2: `src/app/App.tsx` でpropsを中継**

```tsx
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import type { NewsItem } from "./data/news";
import type { ContentItem } from "./data/contents";

interface AppProps {
  news: NewsItem[];
  contents: ContentItem[];
}

export default function App({ news, contents }: AppProps) {
  return (
    <Layout>
      <Home news={news} contents={contents} />
    </Layout>
  );
}
```

- [ ] **Step 3: `Home` をprops受け取りに変更**

`src/app/pages/Home.tsx` の import を変更する。

```tsx
import { contentCategories, getCategoryColor, type ContentItem } from "../data/contents";
import type { NewsItem } from "../data/news";
```

コンポーネント定義を変更する。

```tsx
interface HomeProps {
  news: NewsItem[];
  contents: ContentItem[];
}

export default function Home({ news, contents }: HomeProps) {
```

ファイル内の `contentItems` 参照（345行目付近と529行目付近の2箇所）を `contents` に置き換える。

- [ ] **Step 4: ハードコードされたお知らせをCMS参照に置き換える**

`src/app/pages/Home.tsx` の230行目付近、お知らせセクションの中の配列リテラルを置き換える。

変更前（ハードコードされた1件）。

```tsx
{[
  { date: '2026.07.03', text: '福井労働局主催「高校生サマー求人企業説明会」に参加いたします', href: 'https://jsite.mhlw.go.jp/fukui-roudoukyoku/hw/gakusei_tokusetsusite_00010.html' }
].map((item, index) => (
  <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="flex gap-8 max-[539px]:flex-col max-[539px]:gap-1 hover:opacity-70" style={{ fontFamily: 'var(--font-noto), sans-serif', fontSize: '16px' }}>
    <span className="font-normal whitespace-nowrap">{item.date}</span>
    <span className="font-medium">{item.text}</span>
  </a>
))}
```

変更後（CMSの最新5件。外部URLの有無でリンク先を切り替える）。

```tsx
{news.slice(0, 5).map((item) => {
  const label = (
    <>
      <span className="font-normal whitespace-nowrap">{item.date}</span>
      <span className="font-medium">{item.title}</span>
    </>
  );
  const className = "flex gap-8 max-[539px]:flex-col max-[539px]:gap-1 hover:opacity-70";
  const style = { fontFamily: 'var(--font-noto), sans-serif', fontSize: '16px' };

  return item.externalUrl ? (
    <a key={item.id} href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {label}
    </a>
  ) : (
    <Link key={item.id} href={`/news/${item.id}`} className={className} style={style}>
      {label}
    </Link>
  );
})}
```

お知らせが0件のときは何も表示されない。現状の見た目を保つため、0件時に「現在お知らせはありません」と出す必要があるかは、実装後に目視で判断してから決める（レイアウトが崩れるなら追加する）。

- [ ] **Step 5: 型チェックとビルド**

Run: `npx tsc --noEmit`
Expected: エラー0件

Run: `npm run build`
Expected: 成功

- [ ] **Step 6: 全テストを実行**

Run: `npm test`
Expected: 全件PASS

- [ ] **Step 7: 手動確認**

Run: `npm run dev`

- `/` のお知らせ欄にCMSのお知らせが出ること
- コンテンツ欄・インタビュー欄が従来どおり表示されること

- [ ] **Step 8: コミット**

```bash
git add src/app/page.tsx src/app/App.tsx src/app/pages/Home.tsx
git commit -m "feat: トップページのお知らせとコンテンツをmicroCMS参照に切り替え"
```

---

### Task 11: Webhook受信による再検証

**Files:**
- Create: `src/app/api/revalidate/route.ts`
- Create: `src/app/lib/cms/signature.ts`
- Test: `src/app/lib/cms/signature.test.ts`
- Modify: `src/app/lib/cms/news.ts`、`contents.ts`、`jobs.ts`（キャッシュタグを付ける）

**Interfaces:**
- Consumes: なし
- Produces:
  - `verifyWebhookSignature(body: string, signature: string | null, secret: string): boolean`
  - `POST /api/revalidate`

- [ ] **Step 1: 署名検証の失敗するテストを書く**

`src/app/lib/cms/signature.test.ts` を作成する。

```ts
import { createHmac } from "crypto";
import { describe, expect, it } from "vitest";
import { verifyWebhookSignature } from "./signature";

const SECRET = "test-secret";

function sign(body: string): string {
  return createHmac("sha256", SECRET).update(body).digest("hex");
}

describe("verifyWebhookSignature", () => {
  it("正しい署名を受け入れる", () => {
    const body = JSON.stringify({ api: "news" });
    expect(verifyWebhookSignature(body, sign(body), SECRET)).toBe(true);
  });

  it("署名が無ければ拒否する", () => {
    expect(verifyWebhookSignature("{}", null, SECRET)).toBe(false);
  });

  it("署名が空文字なら拒否する", () => {
    expect(verifyWebhookSignature("{}", "", SECRET)).toBe(false);
  });

  it("改ざんされた本文を拒否する", () => {
    const signature = sign(JSON.stringify({ api: "news" }));
    expect(verifyWebhookSignature(JSON.stringify({ api: "jobs" }), signature, SECRET)).toBe(false);
  });

  it("別のシークレットで作られた署名を拒否する", () => {
    const body = JSON.stringify({ api: "news" });
    const wrong = createHmac("sha256", "other-secret").update(body).digest("hex");
    expect(verifyWebhookSignature(body, wrong, SECRET)).toBe(false);
  });

  it("長さの違う署名でも例外を投げずにfalseを返す", () => {
    const body = JSON.stringify({ api: "news" });
    expect(verifyWebhookSignature(body, "abc", SECRET)).toBe(false);
  });
});
```

最後のテストが重要。`crypto.timingSafeEqual` は長さの違うバッファを渡すと例外を投げる。そのまま500を返すと、攻撃者に「署名の長さが違う」という情報を与えるうえ、正常系のログがエラーで埋まる。

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test -- signature`
Expected: FAIL（`./signature` が解決できない）

- [ ] **Step 3: 実装する**

`src/app/lib/cms/signature.ts` を作成する。

```ts
import { createHmac, timingSafeEqual } from "crypto";

/**
 * microCMSのWebhook署名（X-MICROCMS-Signature）を検証する。
 * シークレットとリクエストボディからHMAC-SHA256を作り、タイミング安全に比較する。
 */
export function verifyWebhookSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const expected = createHmac("sha256", secret).update(body).digest("hex");

  const actualBuf = Buffer.from(signature, "utf8");
  const expectedBuf = Buffer.from(expected, "utf8");

  // timingSafeEqualは長さ違いで例外を投げるため、先に長さを見る
  if (actualBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(actualBuf, expectedBuf);
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test -- signature`
Expected: PASS（6 passed）

- [ ] **Step 5: 取得関数にキャッシュタグを付ける**

`src/app/lib/cms/news.ts` の `getAllNews` の `cmsClient.getList` 呼び出しに `customRequestInit` を追加する。

```ts
cmsClient.getList<CmsNews>({
  endpoint: ENDPOINT,
  queries: { limit, offset, orders: "-date" },
  customRequestInit: { next: { tags: ["news"] } },
}) as Promise<CmsListResponse<CmsNews>>
```

`getNewsDetail` の下書きでない場合も同様に `{ next: { tags: ["news"] } }` を付ける（`draftKey` があるときは `{ cache: "no-store" }` を使うので、どちらか一方になる）。

```ts
customRequestInit: draftKey
  ? { cache: "no-store" }
  : { next: { tags: ["news"] } },
```

`contents.ts` には `["contents"]`、`jobs.ts` には `["jobs"]` のタグを、同じ形で全ての `getList` / `getListDetail` 呼び出しに付ける。

- [ ] **Step 6: Webhookエンドポイントを実装**

`src/app/api/revalidate/route.ts` を作成する。

```ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "../../lib/cms/signature";

const KNOWN_TAGS = new Set(["news", "contents", "jobs"]);

export async function POST(request: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[revalidate] MICROCMS_WEBHOOK_SECRET が未設定です");
    return NextResponse.json({ message: "server misconfigured" }, { status: 500 });
  }

  // 署名はボディの生文字列から計算されるため、JSONパースより先にテキストで受ける
  const body = await request.text();
  const signature = request.headers.get("x-microcms-signature");

  if (!verifyWebhookSignature(body, signature, secret)) {
    console.warn("[revalidate] 署名検証に失敗したリクエストを拒否しました");
    return NextResponse.json({ message: "invalid signature" }, { status: 401 });
  }

  let api: string | undefined;
  try {
    api = (JSON.parse(body) as { api?: string }).api;
  } catch {
    return NextResponse.json({ message: "invalid payload" }, { status: 400 });
  }

  if (!api || !KNOWN_TAGS.has(api)) {
    return NextResponse.json({ message: `unknown api: ${api}` }, { status: 400 });
  }

  revalidateTag(api);
  console.log(`[revalidate] タグ ${api} を再検証しました`);

  return NextResponse.json({ revalidated: true, tag: api });
}
```

- [ ] **Step 7: ローカルで動作確認**

`npm run dev` を起動した状態で、別のターミナルから正しい署名付きリクエストを送る。

```bash
BODY='{"api":"news"}'
SECRET='（.env.localのMICROCMS_WEBHOOK_SECRETと同じ値）'
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.*= //')
curl -i -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "X-MICROCMS-Signature: $SIG" \
  -d "$BODY"
```

Expected: `200` と `{"revalidated":true,"tag":"news"}`

署名を変えて再送し、`401` が返ることも確認する。

```bash
curl -i -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "X-MICROCMS-Signature: deadbeef" \
  -d "$BODY"
```

Expected: `401`

- [ ] **Step 8: 全テストとビルド**

Run: `npm test`
Expected: 全件PASS

Run: `npm run build`
Expected: 成功

- [ ] **Step 9: コミット**

```bash
git add src/app/lib/cms/signature.ts src/app/lib/cms/signature.test.ts src/app/api/revalidate src/app/lib/cms/news.ts src/app/lib/cms/contents.ts src/app/lib/cms/jobs.ts
git commit -m "feat: microCMS Webhookによるオンデマンド再検証を追加"
```

---

### Task 12: 下書きプレビュー

**Files:**
- Create: `src/app/api/draft/route.ts`
- Create: `src/app/api/draft/disable/route.ts`

**Interfaces:**
- Consumes: なし（詳細ページ側の `draftMode()` 対応は Task 7〜9 で実装済み）
- Produces: `GET /api/draft`、`GET /api/draft/disable`

- [ ] **Step 1: プレビュー開始エンドポイントを実装**

`src/app/api/draft/route.ts` を作成する。

```ts
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** CMSの種類ごとに、プレビュー先のパスの作り方を決める */
const PATH_BUILDERS: Record<string, (id: string) => string> = {
  news: (id) => `/news/${id}`,
  contents: (id) => `/contents/${id}`,
};

export async function GET(request: Request) {
  const secret = process.env.DRAFT_PREVIEW_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "server misconfigured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const givenSecret = searchParams.get("secret");
  const api = searchParams.get("api");
  const contentId = searchParams.get("contentId");
  const draftKey = searchParams.get("draftKey");

  if (givenSecret !== secret) {
    return NextResponse.json({ message: "invalid secret" }, { status: 401 });
  }

  if (!api || !contentId || !draftKey) {
    return NextResponse.json(
      { message: "api / contentId / draftKey が必要です" },
      { status: 400 }
    );
  }

  const buildPath = PATH_BUILDERS[api];
  if (!buildPath) {
    return NextResponse.json({ message: `preview未対応のapi: ${api}` }, { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  const target = new URL(buildPath(contentId), request.url);
  target.searchParams.set("draftKey", draftKey);

  return NextResponse.redirect(target);
}
```

求人（`jobs`）は contentId ではなく `slug` でURLが決まるため、このエンドポイントでは扱わない。求人のプレビューは管理画面上の入力内容確認で代替する（必要になった時点で `slug` を引く処理を足す）。

- [ ] **Step 2: プレビュー終了エンドポイントを実装**

`src/app/api/draft/disable/route.ts` を作成する。

```ts
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL("/", request.url));
}
```

- [ ] **Step 3: ローカルで動作確認**

`npm run dev` を起動する。

まず不正なシークレットで拒否されることを確認する。

```bash
curl -i "http://localhost:3000/api/draft?secret=wrong&api=contents&contentId=2&draftKey=dummy"
```

Expected: `401`

次にmicroCMSの管理画面で記事を下書き保存し、「画面プレビュー」から遷移して下書き内容が表示されることを確認する。管理画面の画面プレビュー設定には次のURLを登録する。

```
http://localhost:3000/api/draft?secret=<DRAFT_PREVIEW_SECRET>&api=contents&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}
```

本番用には `http://localhost:3000` を本番URLに置き換えたものを別途登録する。

- [ ] **Step 4: ビルド**

Run: `npm run build`
Expected: 成功

- [ ] **Step 5: コミット**

```bash
git add src/app/api/draft
git commit -m "feat: microCMSの下書きプレビュー(Draft Mode)に対応"
```

---

### Task 13: 既存データの移行スクリプト

**Files:**
- Create: `scripts/migrate-to-microcms.ts`
- Modify: `package.json`（スクリプト登録）

**Interfaces:**
- Consumes: 既存の `src/app/data/contents.ts` の `contentItems`、`jobs.ts` の `careerJobs` / `graduateJobs`
- Produces: `npm run migrate:cms`

> **このタスクは Task 1 の直後に実行する。** Task 4 と Task 5 で入力元のデータ配列を削除するため、その前に投入を終えておく必要がある。もし順序を誤って先に削除してしまった場合は、`git show <削除前のコミット>:src/app/data/contents.ts > /tmp/contents.ts` のように取り出して使う。

- [ ] **Step 1: 移行スクリプトを作成**

`scripts/migrate-to-microcms.ts` を作成する。

```ts
/**
 * 既存の静的データ（src/app/data/*.ts）をmicroCMSへ下書きとして投入する。
 * 一度だけ使う想定だが、やり直せるよう冪等（同じcontentIdへのPUT）にしている。
 *
 * 実行: npm run migrate:cms
 * 前提: .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY が設定済み
 */
import { createClient } from "microcms-js-sdk";
import { marked } from "marked";

import { contentItems } from "../src/app/data/contents";
import { careerJobs, graduateJobs } from "../src/app/data/jobs";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

const client = createClient({
  serviceDomain: requireEnv("MICROCMS_SERVICE_DOMAIN"),
  apiKey: requireEnv("MICROCMS_WRITE_API_KEY"),
});

/** 既存の "YYYY.MM.DD" をmicroCMSが受け取れるISO 8601に変換する */
function toIso(dotted: string): string {
  const [year, month, day] = dotted.split(".");
  return `${year}-${month}-${day}T00:00:00.000Z`;
}

/** 既存の簡易Markdown本文をリッチエディタ用のHTMLに変換する */
function toHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

async function migrateContents() {
  for (const item of contentItems) {
    const contentId = String(item.id);
    await client.update({
      endpoint: "contents",
      contentId,
      content: {
        title: item.title,
        description: item.description,
        body: toHtml(item.content),
        category: item.category,
        tags: item.tags,
        displayDate: toIso(item.publishedAt),
        // image は管理画面から手動アップロードする
      },
    });
    console.log(`contents/${contentId} を投入しました: ${item.title}`);
  }
}

async function migrateJobs() {
  const all = [
    ...careerJobs.map((job) => ({ job, employmentCategory: "career" as const })),
    ...graduateJobs.map((job) => ({ job, employmentCategory: "graduate" as const })),
  ];

  for (const { job, employmentCategory } of all) {
    const slug = String((job as unknown as { id: number }).id);
    const contentId = `${employmentCategory}-${slug}`;

    await client.update({
      endpoint: "jobs",
      contentId,
      content: {
        slug,
        employmentCategory: [employmentCategory],
        title: job.title,
        department: job.department,
        departmentDescription: job.departmentDescription,
        type: job.type,
        description: job.description,
        background: job.background,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
        salary: job.salary,
        location: job.location,
        employmentType: job.employmentType,
        welcomeSkills: job.welcomeSkills,
        appealPoints: job.appealPoints,
        workHours: job.workHours,
        holidays: job.holidays,
        trialPeriod: job.trialPeriod,
        benefits: job.benefits,
        selectionProcess: job.selectionProcess,
        devEnvironment: job.devEnvironment
          ? { fieldId: "devEnvironment", ...job.devEnvironment }
          : undefined,
      },
    });
    console.log(`jobs/${contentId} を投入しました: ${job.title}`);
  }
}

async function main() {
  console.log("=== microCMSへの移行を開始します ===");
  await migrateContents();
  await migrateJobs();
  console.log("=== 完了。管理画面で内容を確認し、画像を設定してから公開してください ===");
}

main().catch((error) => {
  console.error("移行に失敗しました:", error);
  process.exit(1);
});
```

`employmentCategory` を配列で渡しているのは、microCMSのセレクトフィールドが配列を受け取るため。単一選択に設定していても配列で送る。

繰り返しフィールド（`requirements` など）が配列で受け付けられない場合は、スキーマを「テキストフィールドの繰り返し」ではなく「複数行テキスト」にするか、`[{ fieldId: "item", value: "..." }]` の形に変える必要がある。1件試して形を確認してから全件流すこと。

- [ ] **Step 2: `package.json` にスクリプトを登録**

```json
"migrate:cms": "tsx --env-file=.env.local scripts/migrate-to-microcms.ts"
```

- [ ] **Step 3: 1件だけで試す**

`migrateContents()` の `for` を一時的に `contentItems.slice(0, 1)` に変えて実行する。

Run: `npm run migrate:cms`
Expected: `contents/2 を投入しました` が出力され、管理画面に下書きが1件現れる

管理画面で本文のHTMLが崩れていないか、見出しが `<h2>` になっているかを確認する。問題があればスキーマかMarkdown変換を直す。

- [ ] **Step 4: 全件を投入する**

`slice(0, 1)` を元に戻して実行する。

Run: `npm run migrate:cms`
Expected: contents 12件、jobs 7件の投入ログ

- [ ] **Step 5: 管理画面で画像を設定して公開する**

12記事それぞれに、`public/images/contents/` の対応する画像をアップロードして設定する。対応表は移行前の `src/app/data/contents.ts` の `image` フィールドを参照する。設定後、各記事を公開する。求人7件も内容を確認して公開する。

- [ ] **Step 6: コミット**

```bash
git add scripts/migrate-to-microcms.ts package.json
git commit -m "chore: 既存データをmicroCMSへ移行するスクリプトを追加"
```

---

### Task 14: 担当者向け操作手順書と最終確認

**Files:**
- Create: `docs/cms-operation.md`
- Modify: `docs/progress.md`

**Interfaces:**
- Consumes: なし
- Produces: 運用ドキュメント

- [ ] **Step 1: 操作手順書を作成**

`docs/cms-operation.md` を作成する。非エンジニアが読む前提で、画面の言葉で書くこと。含める内容。

- microCMSへのログイン方法
- お知らせを1件追加する手順（新規作成 → 日付・タイトル・カテゴリ・本文を入力 → 下書き保存 → 画面プレビュー → 公開）
- 外部サイトへのリンクだけを載せたいときは「外部リンクURL」に入力し、本文は空でよいこと
- 記事に画像を入れる手順（メディアから選択）
- 公開日時を予約する手順と、**実行時刻が多少前後する可能性があるため、時間厳守の告知は手動公開を推奨**すること
- 公開してもサイトに出ないときの対処（10分待つ、それでも出なければ担当エンジニアへ連絡）
- 編集履歴から過去の内容を確認する方法
- やってはいけないこと（カテゴリの選択肢を勝手に増やす、`slug` を既存求人で変更する — URLが変わり既存リンクが切れる）

- [ ] **Step 2: `docs/progress.md` に今回の変更を追記**

既存の進捗メモの形式に合わせて、microCMS導入の完了と、設定した環境変数・Webhook・プレビューURLの登録先を記録する。

- [ ] **Step 3: 全テストを実行**

Run: `npm test`
Expected: 全件PASS

- [ ] **Step 4: 本番ビルドを確認**

Run: `npm run build`
Expected: 成功。生成されたページ数が従来（33ページ）と同等以上であること

- [ ] **Step 5: 既存URLの疎通を確認**

`npm run start` で本番ビルドを起動し、以下が200で表示されることを確認する。

```
/
/news
/contents
/contents/2
/contents/31
/jobs
/career
/career/1
/graduate
```

- [ ] **Step 6: Vercelの環境変数を登録**

Vercelのプロジェクト設定に以下を登録する（`MICROCMS_WRITE_API_KEY` は登録しない）。

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `MICROCMS_WEBHOOK_SECRET`
- `DRAFT_PREVIEW_SECRET`

- [ ] **Step 7: microCMSのWebhookと画面プレビューを本番URLで設定**

3つのAPI（news / contents / jobs）それぞれに設定する。

- Webhook種別「カスタム通知」、URL `https://<本番ドメイン>/api/revalidate`、シークレットに `MICROCMS_WEBHOOK_SECRET` と同じ値
- 通知タイミングで「コンテンツの公開」「コンテンツの公開（予約設定による操作）」「コンテンツの更新」「コンテンツの非公開」「コンテンツの削除」をONにする
- 画面プレビューURL `https://<本番ドメイン>/api/draft?secret=<DRAFT_PREVIEW_SECRET>&api=contents&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}`（APIごとに `api=` を変える）

- [ ] **Step 8: 本番で受け入れ確認**

- microCMSでお知らせを1件作成して公開し、数秒〜1分でトップページと `/news` に出ること
- 下書きの記事が画面プレビューで見えること
- 公開前の記事が通常のURLでは `404` になること
- 予約公開を5分後に設定し、時刻を過ぎたら反映されること

- [ ] **Step 9: コミット**

```bash
git add docs/cms-operation.md docs/progress.md
git commit -m "docs: CMS運用手順書を追加し進捗を更新"
```

---

## 作業量の目安

| タスク | 内容 | 目安 |
|---|---|---|
| Task 1 | 基盤整備 | 30分 |
| Task 2 | 全件取得ユーティリティ | 30分 |
| Task 3〜5 | マッピング層 ×3 | 各45分 |
| Task 6 | サニタイズ・CSS | 45分 |
| Task 7〜10 | ページのCMS化 ×4 | 各60〜90分 |
| Task 11 | Webhook再検証 | 45分 |
| Task 12 | 下書きプレビュー | 30分 |
| Task 13 | 移行スクリプト＋画像12枚の手作業 | 2〜3時間 |
| Task 14 | 手順書・本番設定・受け入れ確認 | 1.5時間 |

**あなた（依頼者）側の作業**

1. microCMSのアカウント作成・サービス作成
2. 3つのAPIスキーマ作成（第4節の表のとおり。手作業で30分程度）
3. APIキー2本の発行と共有
4. 記事画像12枚の管理画面アップロード（Task 13 Step 5。分担可能）
5. 本番受け入れ確認
