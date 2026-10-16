import { toSafeApplication, type Application } from "./sheet";

export interface SubmitResult {
  /** スプレッドシートの何行目に記録されたか */
  row: number;
  /** 記録はできたがメール送信に失敗した場合の理由 */
  mailError?: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が設定されていません`);
  return value;
}

/**
 * 応募内容をApps Scriptへ渡し、スプレッドシートに記録する。
 *
 * Apps Scriptのウェブアプリは、処理に失敗してもHTTP 200で
 * `{"ok":false,...}` を返す。ステータスコードだけを見ると
 * 記録できていないのに成功として扱ってしまうため、本文まで確認する。
 */
export async function submitApplication(data: Application): Promise<SubmitResult> {
  const url = requireEnv("GAS_WEBHOOK_URL");
  const secret = requireEnv("GAS_WEBHOOK_SECRET");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, data: toSafeApplication(data) }),
    // 記録は応募の成否そのものなので、キャッシュされては困る
    cache: "no-store",
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Apps Scriptが${response.status}を返しました: ${text.slice(0, 200)}`);
  }

  let body: { ok?: boolean; row?: number; error?: string; mailError?: string };
  try {
    body = JSON.parse(text);
  } catch {
    // デプロイ設定が「全員」でない場合、Googleのログイン画面のHTMLが返る
    throw new Error(
      `Apps Scriptの応答がJSONではありません。ウェブアプリのアクセス権限を確認してください: ${text.slice(0, 200)}`
    );
  }

  if (!body.ok) {
    throw new Error(`Apps Scriptが記録に失敗しました: ${body.error ?? "理由不明"}`);
  }

  return { row: body.row ?? 0, ...(body.mailError ? { mailError: body.mailError } : {}) };
}
