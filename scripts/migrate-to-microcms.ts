/**
 * 既存の静的データ（scripts/legacy/）をmicroCMSへ下書きとして投入する。
 *
 * 実行:
 *   npm run migrate:cms -- --dry-run   # 送信内容をファイルに書き出すだけ（CMSに触らない）
 *   npm run migrate:cms                # 実際に投入する
 *
 * 前提: .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY が設定済み
 *
 * 一度だけ使う想定だが、やり直せるよう冪等（同じcontentIdへのPUT）にしている。
 * 画像は送らない。投入後に管理画面から手動でアップロードしてから公開する。
 */
import { writeFileSync } from "fs";
import { createClient } from "microcms-js-sdk";

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
const DRY_RUN_OUTPUT = "migrate-dry-run.json";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

function createWriteClient() {
  return createClient({
    serviceDomain: requireEnv("MICROCMS_SERVICE_DOMAIN"),
    apiKey: requireEnv("MICROCMS_WRITE_API_KEY"),
  });
}

async function main() {
  const contents = (contentItems as LegacyContent[]).map(buildContentPayload);

  const jobs = [
    ...(careerJobs as LegacyJob[]).map((job) => buildJobPayload(job, "career" as EmploymentCategory)),
    ...(graduateJobs as LegacyJob[]).map((job) => buildJobPayload(job, "graduate" as EmploymentCategory)),
  ];

  console.log(`対象: コンテンツ記事 ${contents.length}件 / 求人 ${jobs.length}件`);

  if (DRY_RUN) {
    writeFileSync(
      DRY_RUN_OUTPUT,
      JSON.stringify({ contents, jobs }, null, 2),
      "utf8"
    );
    console.log(`[dry-run] 送信内容を ${DRY_RUN_OUTPUT} に書き出しました。CMSには何も送っていません。`);
    console.log("[dry-run] 手動アップロードが必要な画像:");
    for (const payload of contents) {
      console.log(`  contents/${payload.contentId} ← ${payload.imageToUploadManually}`);
    }
    return;
  }

  const client = createWriteClient();

  for (const payload of contents) {
    await client.create({
      endpoint: "contents",
      contentId: payload.contentId,
      content: payload.content,
      isDraft: true,
    });
    console.log(`contents/${payload.contentId} を下書き投入しました`);
  }

  for (const payload of jobs) {
    await client.create({
      endpoint: "jobs",
      contentId: payload.contentId,
      content: payload.content,
      isDraft: true,
    });
    console.log(`jobs/${payload.contentId} を下書き投入しました`);
  }

  console.log("=== 完了 ===");
  console.log("管理画面で内容を確認し、各記事に画像を設定してから公開してください。");
  console.log("手動アップロードが必要な画像:");
  for (const payload of contents) {
    console.log(`  contents/${payload.contentId} ← ${payload.imageToUploadManually}`);
  }
}

main().catch((error) => {
  console.error("移行に失敗しました:", error);
  process.exit(1);
});
