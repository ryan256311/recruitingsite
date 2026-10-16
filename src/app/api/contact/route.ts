import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { buildDriveUrl, isValidFileId, verifyFileId } from "../../lib/applications/fileLink";
import { submitApplication } from "../../lib/applications/submit";

/**
 * 応募内容をGoogleスプレッドシートに記録する。
 *
 * メール送信サービスには依存しない。記録の正本はスプレッドシートの1行で、
 * 通知メールはApps Script側から送る。メールが送れなくても応募は成立させる。
 */

const attachment = z
  .object({
    fileId: z.string(),
    fileName: z.string().optional(),
    token: z.string(),
  })
  .optional();

const contactSchema = z.object({
  inquiryType: z.string().min(1, "お問い合わせ種別を選択してください"),
  recruitmentType: z.string().min(1, "採用区分を選択してください"),
  jobs: z.array(z.string()).default([]),
  name: z.string().min(1, "お名前を入力してください"),
  furigana: z.string().min(1, "フリガナを入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().optional(),
  portfolioUrl: z.string().optional(),
  message: z.string().optional(),
  privacyAgreed: z.boolean().refine((v) => v === true, "プライバシーポリシーへの同意が必要です"),
  resume: attachment,
  careerHistory: attachment,
  portfolioFile: attachment,
});

type Attachment = z.infer<typeof attachment>;

/**
 * 添付のファイルIDを、アップロード時に発行した署名で確かめる。
 *
 * 署名が合わないものは添付なしとして扱う。無関係なIDを送り込まれて、
 * スプレッドシートに他人のファイルへのリンクが並ぶのを防ぐ。
 */
function resolveAttachment(value: Attachment): { url: string; name: string } {
  if (!value?.fileId) return { url: "", name: "" };

  if (!isValidFileId(value.fileId) || !verifyFileId(value.fileId, value.token)) {
    console.warn("[contact] 署名が一致しない添付ファイルを無視しました");
    return { url: "", name: "" };
  }

  return { url: buildDriveUrl(value.fileId), name: value.fileName ?? "" };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "入力内容を読み取れませんでした" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { message: firstError?.message ?? "入力内容に誤りがあります" },
      { status: 400 }
    );
  }

  const data = result.data;
  const resume = resolveAttachment(data.resume);
  const careerHistory = resolveAttachment(data.careerHistory);
  const portfolioFile = resolveAttachment(data.portfolioFile);

  try {
    const { row, mailError } = await submitApplication({
      inquiryType: data.inquiryType,
      recruitmentType: data.recruitmentType,
      jobs: data.jobs,
      name: data.name,
      furigana: data.furigana,
      email: data.email,
      phone: data.phone ?? "",
      portfolioUrl: data.portfolioUrl ?? "",
      message: data.message ?? "",
      resumeUrl: resume.url,
      resumeName: resume.name,
      careerHistoryUrl: careerHistory.url,
      careerHistoryName: careerHistory.name,
      portfolioFileUrl: portfolioFile.url,
      portfolioFileName: portfolioFile.name,
    });

    if (mailError) {
      // 応募者には成功を返す。記録は残っているので、応募は受け付けられている
      console.error(`[contact] ${row}行目を記録しましたが、メール送信に失敗しました: ${mailError}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] 応募の記録に失敗しました", error);
    return NextResponse.json(
      { message: "エラーが発生しました。しばらく経ってからもう一度お試しください。" },
      { status: 500 }
    );
  }
}
