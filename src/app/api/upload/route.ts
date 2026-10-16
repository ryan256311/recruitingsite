import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

// Vercelはリクエストボディを4.5MBに制限している（設定では変えられない）。
// 5MBを許すと、応募者はファイル選択後に原因のわからない失敗に遭う。
const MAX_SIZE = 4 * 1024 * 1024;

const EXTENSION_MAP: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

const UPLOAD_TYPES = new Set(["resume", "careerHistory", "portfolio"]);

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

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
        { message: "ファイルサイズは4MB以下にしてください" },
        { status: 400 }
      );
    }

    // 保管先が未設定のときにダミーのURLを返してはいけない。
    // 応募者の画面では成功に見えるのに履歴書が消えるため、ここで止める。
    const bucket = requireEnv("R2_BUCKET_NAME");
    const endpoint = requireEnv("R2_ENDPOINT");

    const client = new S3Client({
      region: "auto",
      endpoint,
      credentials: {
        accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
      },
    });

    const extension = EXTENSION_MAP[file.type] ?? "";
    const day = new Date().toISOString().split("T")[0];
    const key = `${day}/${fileType}/${randomUUID()}${extension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        Metadata: {
          originalName: encodeURIComponent(file.name),
          uploadType: fileType,
        },
      })
    );

    // 取得用のURLはここでは返さない。
    // 返すと応募者のブラウザに署名が渡り、他の応募書類を開く手がかりになる。
    return NextResponse.json({ key, fileName: file.name });
  } catch (error) {
    console.error("[upload] アップロードに失敗しました", error);
    return NextResponse.json(
      { message: "ファイルのアップロードに失敗しました" },
      { status: 500 }
    );
  }
}
