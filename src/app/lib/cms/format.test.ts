import { describe, expect, it } from "vitest";
import { formatCmsDate } from "./format";

describe("formatCmsDate", () => {
  it("ISO 8601をYYYY.MM.DD形式にする", () => {
    expect(formatCmsDate("2026-07-03T00:00:00.000Z")).toBe("2026.07.03");
  });

  it("月日を2桁でゼロ埋めする", () => {
    expect(formatCmsDate("2024-01-05T00:00:00.000Z")).toBe("2024.01.05");
  });

  it("日本時間の日付として扱う（UTC深夜のずれを防ぐ）", () => {
    // UTC 2026-07-02T15:00:00Z = JST 2026-07-03 00:00
    expect(formatCmsDate("2026-07-02T15:00:00.000Z")).toBe("2026.07.03");
  });

  it("年をまたぐ深夜でも日本時間の日付になる", () => {
    // UTC 2025-12-31T15:00:00Z = JST 2026-01-01 00:00
    expect(formatCmsDate("2025-12-31T15:00:00.000Z")).toBe("2026.01.01");
  });

  it("空文字や不正な値では空文字を返す", () => {
    expect(formatCmsDate("")).toBe("");
    expect(formatCmsDate("not-a-date")).toBe("");
  });
});
