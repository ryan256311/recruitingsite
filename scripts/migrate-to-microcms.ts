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
 * --overwrite について:
 *   PATCHで更新するため、送っていないフィールド（手動設定したアイキャッチ画像など）は
 *   保持される。ただし本文やタイトルは移行元のデータで上書きされるので、
 *   投入後に管理画面で加えた編集は失われる。既定でスキップしているのはこのため。
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

/**
 * 「既にそのcontentIdが存在する」エラーかどうか。
 *
 * 事前のGETで存在確認はできない。投入したコンテンツは下書きなので、
 * draftKeyなしのGETでは404が返り「存在しない」と判定されてしまう。
 * そこで作成を試し、microCMSが返す重複エラーで判断する。
 */
function isAlreadyExists(error: unknown): boolean {
  return (
    isMicroCMSRequestError(error) &&
    error.status === 400 &&
    /already exists/i.test(error.message)
  );
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
      if (OVERWRITE) {
        // PATCHなので、送っていないフィールド（画像など）は保持される
        await client.update({
          endpoint,
          contentId: payload.contentId,
          content: payload.content,
        });
        console.log(`  update ${endpoint}/${payload.contentId}`);
        result.created += 1;
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
      if (!OVERWRITE && isAlreadyExists(error)) {
        console.log(`  skip   ${endpoint}/${payload.contentId}（既に存在します）`);
        result.skipped += 1;
        continue;
      }
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
    console.warn("[警告] 既存コンテンツの本文・タイトル等を移行元のデータで上書きします（画像は保持されます）。");
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
