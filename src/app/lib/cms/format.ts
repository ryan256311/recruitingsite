/** microCMSのISO 8601日時を、サイト表記の YYYY.MM.DD（日本時間）に整形する */
export function formatCmsDate(iso: string): string {
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  // 日本時間に寄せてから年月日を取り出す（UTCのまま扱うと日付が1日ずれる）
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = jst.getUTCFullYear();
  const month = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jst.getUTCDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}
