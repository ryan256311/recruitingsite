export interface CmsListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export type GetListPage<T> = (queries: {
  limit: number;
  offset: number;
}) => Promise<CmsListResponse<T>>;

/** microCMSのGET APIは1回で最大100件しか返さないため、全件揃うまで繰り返す */
export async function fetchAll<T>(getPage: GetListPage<T>, pageSize = 100): Promise<T[]> {
  const all: T[] = [];
  let offset = 0;

  for (;;) {
    const page = await getPage({ limit: pageSize, offset });
    all.push(...page.contents);

    // contentsが空になったら、totalCountの値に関わらず打ち切る（無限ループ防止）
    if (page.contents.length === 0) break;
    if (all.length >= page.totalCount) break;

    offset += pageSize;
  }

  return all;
}
