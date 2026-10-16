import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { buildFileUrl, isValidObjectKey } from "../../lib/applications/fileLink";
import { submitApplication } from "../../lib/applications/submit";

/**
 * 応募内容をGoogleスプレッドシートに記録する。
 *
 * メール送信サービスには依存しない。記録の正本はスプレッドシートの1行で、
 * 通知メールはApps Script側から送る。メールが送れなくても応募は成立させる。
 */

const optionalKey = z
  .string()
  .optional()
  .refine((v) => !v || isValidObjectKey(v), "添付ファイルの指定が不正です");

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
  // 保管先のキーだけを受け取る。取得用URLはこちらで組み立てる
  resumeKey: optionalKey,
  resumeName: z.string().optional(),
  careerHistoryKey: optionalKey,
  careerHistoryName: z.string().optional(),
  portfolioFileKey: optionalKey,
  portfolioFileName: z.string().optional(),
});

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
  const origin = new URL(request.url).origin;

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
      resumeUrl: buildFileUrl(origin, data.resumeKey ?? ""),
      resumeName: data.resumeName ?? "",
      careerHistoryUrl: buildFileUrl(origin, data.careerHistoryKey ?? ""),
      careerHistoryName: data.careerHistoryName ?? "",
      portfolioFileUrl: buildFileUrl(origin, data.portfolioFileKey ?? ""),
      portfolioFileName: data.portfolioFileName ?? "",
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
