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
    console.error("[draft] DRAFT_PREVIEW_SECRET が未設定です");
    return NextResponse.json({ message: "server misconfigured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const givenSecret = searchParams.get("secret");
  const api = searchParams.get("api");
  const contentId = searchParams.get("contentId");
  const draftKey = searchParams.get("draftKey");

  // secret検証がないと、誰でもDraft Modeを有効化して未公開の下書きを読めてしまう
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
