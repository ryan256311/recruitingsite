import { describe, expect, it, vi } from "vitest";
import { fetchAll, type CmsListResponse } from "./fetchAll";

function fakeApi(total: number) {
  const all = Array.from({ length: total }, (_, i) => ({ id: i + 1 }));
  return vi.fn(
    async ({ limit, offset }: { limit: number; offset: number }): Promise<CmsListResponse<{ id: number }>> => ({
      contents: all.slice(offset, offset + limit),
      totalCount: total,
      offset,
      limit,
    })
  );
}

describe("fetchAll", () => {
  it("1ページに収まる件数をそのまま返す", async () => {
    const api = fakeApi(3);
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(3);
    expect(api).toHaveBeenCalledTimes(1);
  });

  it("APIの既定10件を超えても全件返す", async () => {
    const api = fakeApi(12);
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(12);
    expect(result[11].id).toBe(12);
  });

  it("1ページ上限を超える件数をページングして全件返す", async () => {
    const api = fakeApi(250);
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(250);
    expect(api).toHaveBeenCalledTimes(3);
    expect(result[249].id).toBe(250);
  });

  it("0件のときは空配列を返し、追加リクエストをしない", async () => {
    const api = fakeApi(0);
    const result = await fetchAll(api, 100);
    expect(result).toEqual([]);
    expect(api).toHaveBeenCalledTimes(1);
  });

  it("totalCountが嘘でもcontentsが空になれば止まる", async () => {
    const api = vi.fn(async ({ limit, offset }: { limit: number; offset: number }) => ({
      contents: offset === 0 ? [{ id: 1 }] : [],
      totalCount: 999,
      offset,
      limit,
    }));
    const result = await fetchAll(api, 100);
    expect(result).toHaveLength(1);
    expect(api).toHaveBeenCalledTimes(2);
  });

  it("既定のページサイズは100である", async () => {
    const api = fakeApi(1);
    await fetchAll(api);
    expect(api).toHaveBeenCalledWith({ limit: 100, offset: 0 });
  });
});
