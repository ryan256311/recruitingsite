import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Validation schema
const contactSchema = z.object({
  inquiryType: z.string().min(1, "お問い合わせ種別を選択してください"),
  recruitmentType: z.string().min(1, "採用区分を選択してください"),
  jobs: z.array(z.string()),
  name: z.string().min(1, "お名前を入力してください"),
  furigana: z.string().min(1, "フリガナを入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z.string().optional(),
  portfolioUrl: z.string().optional(),
  message: z.string().optional(),
  privacyAgreed: z.boolean().refine((val) => val === true, "プライバシーポリシーへの同意が必要です"),
  resumeUrl: z.string().optional(),
  resumeName: z.string().optional(),
  careerHistoryUrl: z.string().optional(),
  careerHistoryName: z.string().optional(),
  portfolioFileUrl: z.string().optional(),
  portfolioFileName: z.string().optional(),
});

// XSS protection - escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { message: firstError?.message || "入力内容に誤りがあります" },
        { status: 400 }
      );
    }

    const data = result.data;

    // Escape all user input
    const escapedData = {
      inquiryType: escapeHtml(data.inquiryType),
      recruitmentType: escapeHtml(data.recruitmentType),
      jobs: data.jobs.map(escapeHtml),
      name: escapeHtml(data.name),
      furigana: escapeHtml(data.furigana),
      email: escapeHtml(data.email),
      phone: data.phone ? escapeHtml(data.phone) : "",
      portfolioUrl: data.portfolioUrl ? escapeHtml(data.portfolioUrl) : "",
      message: data.message ? escapeHtml(data.message) : "",
      resumeUrl: data.resumeUrl || "",
      resumeName: data.resumeName ? escapeHtml(data.resumeName) : "",
      careerHistoryUrl: data.careerHistoryUrl || "",
      careerHistoryName: data.careerHistoryName ? escapeHtml(data.careerHistoryName) : "",
      portfolioFileUrl: data.portfolioFileUrl || "",
      portfolioFileName: data.portfolioFileName ? escapeHtml(data.portfolioFileName) : "",
    };

    // Build file attachments section
    let attachmentsHtml = "";
    if (escapedData.resumeUrl) {
      attachmentsHtml += `<p><strong>履歴書:</strong> <a href="${escapedData.resumeUrl}">${escapedData.resumeName}</a></p>`;
    }
    if (escapedData.careerHistoryUrl) {
      attachmentsHtml += `<p><strong>職務経歴書:</strong> <a href="${escapedData.careerHistoryUrl}">${escapedData.careerHistoryName}</a></p>`;
    }
    if (escapedData.portfolioFileUrl) {
      attachmentsHtml += `<p><strong>ポートフォリオ（ファイル）:</strong> <a href="${escapedData.portfolioFileUrl}">${escapedData.portfolioFileName}</a></p>`;
    }
    if (escapedData.portfolioUrl) {
      attachmentsHtml += `<p><strong>ポートフォリオ（URL）:</strong> <a href="${escapedData.portfolioUrl}">${escapedData.portfolioUrl}</a></p>`;
    }

    // Send email to admin
    const adminEmailResult = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@resend.dev",
      to: process.env.ADMIN_EMAIL || "recruit@exceet.co.jp",
      replyTo: data.email,
      subject: `【採用サイト】${escapedData.inquiryType}のお問い合わせ - ${escapedData.name}様`,
      html: `
        <h2>採用サイトからお問い合わせがありました</h2>

        <h3>お問い合わせ内容</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; width: 150px;"><strong>お問い合わせ種別</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.inquiryType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>採用区分</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.recruitmentType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>応募職種</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.jobs.join(", ") || "未選択"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>お名前</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>フリガナ</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.furigana}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>メールアドレス</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${escapedData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>電話番号</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.phone || "未入力"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;"><strong>その他</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapedData.message ? escapedData.message.replace(/\n/g, "<br>") : "未入力"}</td>
          </tr>
        </table>

        ${attachmentsHtml ? `<h3>添付ファイル</h3>${attachmentsHtml}` : ""}

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">このメールは採用サイトのお問い合わせフォームから自動送信されています。</p>
      `,
    });

    if (adminEmailResult.error) {
      console.error("Admin email error:", adminEmailResult.error);
      throw new Error("メール送信に失敗しました");
    }

    // Send confirmation email to applicant
    const userEmailResult = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@resend.dev",
      to: data.email,
      subject: "【株式会社エクシート】お問い合わせを受け付けました",
      html: `
        <p>${escapedData.name} 様</p>

        <p>この度は株式会社エクシートの採用サイトよりお問い合わせいただき、誠にありがとうございます。</p>

        <p>以下の内容でお問い合わせを受け付けました。<br>
        内容を確認の上、3営業日以内に担当者よりご連絡いたします。</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

        <h3>お問い合わせ内容</h3>
        <p><strong>お問い合わせ種別:</strong> ${escapedData.inquiryType}</p>
        <p><strong>採用区分:</strong> ${escapedData.recruitmentType}</p>
        <p><strong>応募職種:</strong> ${escapedData.jobs.join(", ") || "未選択"}</p>
        <p><strong>お名前:</strong> ${escapedData.name}</p>
        <p><strong>フリガナ:</strong> ${escapedData.furigana}</p>
        <p><strong>メールアドレス:</strong> ${escapedData.email}</p>
        <p><strong>電話番号:</strong> ${escapedData.phone || "未入力"}</p>
        ${escapedData.message ? `<p><strong>その他:</strong><br>${escapedData.message.replace(/\n/g, "<br>")}</p>` : ""}

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

        <p>ご不明な点がございましたら、下記までお問い合わせください。</p>

        <p>
          株式会社エクシート 採用担当<br>
          TEL: 0776-97-8466<br>
          Email: recruit@exceet.co.jp
        </p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          ※このメールは自動送信されています。このメールに返信いただいてもお答えできない場合がございます。<br>
          ※心当たりのない場合は、お手数ですが本メールを破棄していただきますようお願いいたします。
        </p>
      `,
    });

    if (userEmailResult.error) {
      console.error("User email error:", userEmailResult.error);
      // Don't fail the request if user email fails, admin has received it
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "エラーが発生しました。しばらく経ってからもう一度お試しください。" },
      { status: 500 }
    );
  }
}
