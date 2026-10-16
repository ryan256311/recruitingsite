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
