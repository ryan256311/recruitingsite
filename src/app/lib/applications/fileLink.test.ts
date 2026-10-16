import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildDriveUrl, isValidFileId, signFileId, verifyFileId } from "./fileLink";

const FILE_ID = "1VpEdkbBI4SOugwcpBjBSy6W2hQ3PO28okELNsuMxs3o";

beforeEach(() => {
  process.env.FILE_ACCESS_SECRET = "test-file-secret";
});

afterEach(() => {
  delete process.env.FILE_ACCESS_SECRET;
});

describe("signFileId / verifyFileId", () => {
  it("自分で署名したものは検証を通る", () => {
    expect(verifyFileId(FILE_ID, signFileId(FILE_ID))).toBe(true);
  });

  it("別のファイルの署名では通らない", () => {
    const other = "1neNptf8jLASxO6AuISGdY32YX1xOGo7wVDRGaUUQHvJ";
    expect(verifyFileId(other, signFileId(FILE_ID))).toBe(false);
  });

  it("署名が改ざんされていたら通らない", () => {
    const token = signFileId(FILE_ID);
    const tampered = token.slice(0, -1) + (token.endsWith("a") ? "b" : "a");
    expect(verifyFileId(FILE_ID, tampered)).toBe(false);
  });

  it("署名が空なら通らない", () => {
    expect(verifyFileId(FILE_ID, "")).toBe(false);
    expect(verifyFileId(FILE_ID, undefined)).toBe(false);
  });

  it("長さの違う署名でも例外を投げずにfalseを返す", () => {
    expect(() => verifyFileId(FILE_ID, "short")).not.toThrow();
    expect(verifyFileId(FILE_ID, "short")).toBe(false);
  });

  it("シークレットが変わると以前の署名は通らない", () => {
    const token = signFileId(FILE_ID);
    process.env.FILE_ACCESS_SECRET = "another-secret";
    expect(verifyFileId(FILE_ID, token)).toBe(false);
  });
});

describe("isValidFileId", () => {
  it("ドライブのファイルIDの形式を受け入れる", () => {
    expect(isValidFileId(FILE_ID)).toBe(true);
    // ハイフンとアンダースコアを含むIDも実在する
    expect(isValidFileId("1a-bC_2dEfGhIjKlMnOpQrStUvWxYz0123")).toBe(true);
  });

  it("実在しないほど短いIDは拒否する", () => {
    expect(isValidFileId("1a-b_C2")).toBe(false);
  });

  it("記号の混ざった値を拒否する（シートの数式やURLを仕込ませない）", () => {
    expect(isValidFileId("=1+1")).toBe(false);
    expect(isValidFileId("https://drive.google.com/x")).toBe(false);
    expect(isValidFileId("../../etc/passwd")).toBe(false);
  });

  it("空や極端に長い値を拒否する", () => {
    expect(isValidFileId("")).toBe(false);
    expect(isValidFileId("a".repeat(600))).toBe(false);
  });
});

describe("buildDriveUrl", () => {
  it("ドライブで開けるURLを組み立てる", () => {
    expect(buildDriveUrl(FILE_ID)).toBe(`https://drive.google.com/file/d/${FILE_ID}/view`);
  });

  it("IDが未設定なら空文字を返す（添付なしの応募を壊さない）", () => {
    expect(buildDriveUrl("")).toBe("");
  });
});
