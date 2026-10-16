/**
 * 既存の静的データ（scripts/legacy/）をmicroCMSへ下書きとして投入する。
 *
 * 実行:
 *   npm run migrate:cms -- --dry-run    送信内容をファイルに書き出すだけ（CMSに触らない）
 *   npm run migrate:cms                 実際に投入する（既存コンテンツはスキップ）
 *   npm run migrate:cms -- --overwrite  既存コンテンツも上書きする（下の警告を読むこと）
 *
 * 前提: .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY が設定済みで、
 *       APIキーに一時的に POST / PUT 権限が付与されていること。
 *       投入が終わったら権限を GET のみに戻す。
 *
 * --overwrite の危険性:
 *   このスクリプトは画像を送らない（アイキャッチは管理画面から手動で設定する運用）。
 *   公開後に上書きすると、手動で設定した画像が消え、記事が下書きに戻る。
 *   そうなると画像なしの記事は一覧から除外され、記事URLは404になる。
 *   既定でスキップしているのはこのため。
 */
import { writeFileSync } from "fs";
import { createClient, isMicroCMSRequestError } from "microcms-js-sdk";

import { contentItems } from "./legacy/contents.legacy";
import { careerJobs, graduateJobs } from "./legacy/jobs.legacy";
import {
  buildContentPayload,
  buildJobPayload,
  type EmploymentCategory,
  type LegacyContent,
  type LegacyJob,
} from "./migrate-payloads";

const DRY_RUN = process.argv.includes("--dry-run");
const OVERWRITE = process.argv.includes("--overwrite");
const DRY_RUN_OUTPUT = "migrate-dry-run.json";

type CmsClient = ReturnType<typeof createClient>;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

function createWriteClient(): CmsClient {
  return createClient({
    serviceDomain: requireEnv("MICROCMS_SERVICE_DOMAIN"),
    // Hobbyプランはキーを1つしか作れないため、サイト用と同じキーに
    // 一時的に書き込み権限を付けて使う
    apiKey: process.env.MICROCMS_WRITE_API_KEY || requireEnv("MICROCMS_API_KEY"),
  });
}

/** 既にそのcontentIdのコンテンツが存在するか（下書きも含めて判定する） */
async function exists(client: CmsClient, endpoint: string, contentId: string): Promise<boolean> {
  try {
    await client.getListDetail({
      endpoint,
      contentId,
      customRequestInit: { cache: "no-store" },
    });
    return true;
  } catch (error) {
    if (isMicroCMSRequestError(error) && error.status === 404) return false;
    throw error;
  }
}

interface UpsertResult {
  created: number;
  skipped: number;
  failed: number;
}

async function upsertAll(
  client: CmsClient,
  endpoint: string,
  payloads: { contentId: string; content: Record<string, unknown> }[]
): Promise<UpsertResult> {
  const result: UpsertResult = { created: 0, skipped: 0, failed: 0 };

  for (const payload of payloads) {
    // 1件の失敗で全体が止まらないよう、レコードごとに握る
    try {
      if (!OVERWRITE && (await exists(client, endpoint, payload.contentId))) {
        console.log(`  skip   ${endpoint}/${payload.contentId}（既に存在します）`);
        result.skipped += 1;
        continue;
      }

      await client.create({
        endpoint,
        contentId: payload.contentId,
        content: payload.content,
        isDraft: true,
      });
      console.log(`  create ${endpoint}/${payload.contentId}`);
      result.created += 1;
    } catch (error) {
      console.error(`  FAILED ${endpoint}/${payload.contentId}:`, error);
      result.failed += 1;
    }
  }

  return result;
}

async function main() {
  const contents = (contentItems as LegacyContent[]).map(buildContentPayload);

  const jobs = [
    ...(careerJobs as LegacyJob[]).map((job) => buildJobPayload(job, "career" as EmploymentCategory)),
    ...(graduateJobs as LegacyJob[]).map((job) => buildJobPayload(job, "graduate" as EmploymentCategory)),
  ];

  console.log(`対象: コンテンツ記事 ${contents.length}件 / 求人 ${jobs.length}件`);

  if (DRY_RUN) {
    writeFileSync(DRY_RUN_OUTPUT, JSON.stringify({ contents, jobs }, null, 2), "utf8");
    console.log(`[dry-run] 送信内容を ${DRY_RUN_OUTPUT} に書き出しました。CMSには何も送っていません。`);
    printImageChecklist(contents);
    return;
  }

  if (OVERWRITE) {
    console.warn("[警告] --overwrite が指定されています。");
    console.warn("[警告] 既存コンテンツを上書きし、手動設定したアイキャッチ画像が消え、記事は下書きに戻ります。");
  }

  const client = createWriteClient();

  console.log("コンテンツ記事を投入します");
  const contentResult = await upsertAll(client, "contents", contents);

  console.log("求人を投入します");
  const jobResult = await upsertAll(client, "jobs", jobs);

  console.log("=== 結果 ===");
  console.log(`contents: 作成 ${contentResult.created} / スキップ ${contentResult.skipped} / 失敗 ${contentResult.failed}`);
  console.log(`jobs:     作成 ${jobResult.created} / スキップ ${jobResult.skipped} / 失敗 ${jobResult.failed}`);

  if (contentResult.failed + jobResult.failed > 0) {
    console.error("失敗したレコードがあります。上のログを確認して、修正後に再実行してください（既存分はスキップされます）。");
    process.exitCode = 1;
    return;
  }

  console.log("管理画面で内容を確認し、各記事に画像を設定してから公開してください。");
  printImageChecklist(contents);
  console.log("投入が終わったら、APIキーの POST / PUT 権限を外してください。");
}

function printImageChecklist(contents: { contentId: string; imageToUploadManually: string }[]) {
  console.log("手動アップロードが必要な画像:");
  for (const payload of contents) {
    console.log(`  contents/${payload.contentId} ← ${payload.imageToUploadManually}`);
  }
}

main().catch((error) => {
  console.error("移行に失敗しました:", error);
  process.exit(1);
});
