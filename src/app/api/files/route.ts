import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { isValidObjectKey, verifyObjectKey } from "../../lib/applications/fileLink";

/** 署名付きURLの有効時間。リンクを押してから開くまでの猶予があれば足りる */
const EXPIRES_IN_SECONDS = 300;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

/**
 * スプレッドシートや通知メールのリンクから応募書類を開く。
 *
 * 保管先のバケットは非公開なので、ここで都度 短時間だけ有効なURLを発行して転送する。
 * 署名はファイル単位なので、1件分のリンクから他の応募書類へはたどれない。
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") ?? "";
  const token = searchParams.get("token");

  if (!isValidObjectKey(key)) {
    return NextResponse.json({ message: "ファイルの指定が不正です" }, { status: 400 });
  }

  try {
    if (!verifyObjectKey(key, token)) {
      console.warn("[files] 署名が一致しないリクエストを拒否しました");
      return NextResponse.json({ message: "このリンクは無効です" }, { status: 401 });
    }

    const client = new S3Client({
      region: "auto",
      endpoint: requireEnv("R2_ENDPOINT"),
      credentials: {
        accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
      },
    });

    const url = await getSignedUrl(
      client,
      new GetObjectCommand({ Bucket: requireEnv("R2_BUCKET_NAME"), Key: key }),
      { expiresIn: EXPIRES_IN_SECONDS }
    );

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("[files] 署名付きURLの発行に失敗しました", error);
    return NextResponse.json({ message: "ファイルを取得できませんでした" }, { status: 500 });
  }
}
