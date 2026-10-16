function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

export interface UploadInput {
  name: string;
  mimeType: string;
  /** base64エンコードしたファイルの中身 */
  data: string;
}

/**
 * 応募書類をApps Script経由でGoogleドライブの非公開フォルダへ保存する。
 *
 * Apps Scriptは処理に失敗してもHTTP 200で `{"ok":false}` を返すため、
 * ステータスコードだけで成否を判断しない。
 */
export async function uploadApplicationFile(file: UploadInput): Promise<{ fileId: string }> {
  const url = requireEnv("GAS_WEBHOOK_URL");
  const secret = requireEnv("GAS_WEBHOOK_SECRET");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, action: "upload", file }),
    cache: "no-store",
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Apps Scriptが${response.status}を返しました: ${text.slice(0, 200)}`);
  }

  let body: { ok?: boolean; fileId?: string; error?: string };
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(
      `Apps Scriptの応答がJSONではありません。ウェブアプリのアクセス権限を確認してください: ${text.slice(0, 200)}`
    );
  }

  if (!body.ok || !body.fileId) {
    throw new Error(`応募書類の保存に失敗しました: ${body.error ?? "理由不明"}`);
  }

  return { fileId: body.fileId };
}
