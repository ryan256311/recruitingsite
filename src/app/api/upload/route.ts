import { NextRequest, NextResponse } from "next/server";

import { signFileId } from "../../lib/applications/fileLink";
import { uploadApplicationFile } from "../../lib/applications/upload";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

/**
 * Vercelはリクエストボディを4.5MBに制限している（設定では変えられない）。
 * ファイルはbase64にしてApps Scriptへ渡すため約1.34倍に膨らむ。
 * 3MBなら base64 で約4.0MB となり、余裕を持って収まる。
 */
const MAX_SIZE = 3 * 1024 * 1024;

const UPLOAD_TYPES = new Set(["resume", "careerHistory", "portfolio"]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const fileType = String(formData.get("type") ?? "");

    if (!file) {
      return NextResponse.json({ message: "ファイルが選択されていません" }, { status: 400 });
    }

    if (!UPLOAD_TYPES.has(fileType)) {
      return NextResponse.json({ message: "ファイルの種類が不正です" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "PDF、Word、JPG、PNG形式のファイルのみアップロード可能です" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "ファイルサイズは3MB以下にしてください" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const { fileId } = await uploadApplicationFile({
      // 応募者が付けたファイル名をそのまま保存先に使う。閲覧時に誰の書類か分かるため
      name: `${fileType}_${file.name}`,
      mimeType: file.type,
      data: buffer.toString("base64"),
    });

    // 署名を添えて返し、送信時に「このIDは自分が発行したもの」と確認できるようにする
    return NextResponse.json({ fileId, fileName: file.name, token: signFileId(fileId) });
  } catch (error) {
    console.error("[upload] アップロードに失敗しました", error);
    return NextResponse.json(
      { message: "ファイルのアップロードに失敗しました" },
      { status: 500 }
    );
  }
}
