import { describe, expect, it } from "vitest";
import { sanitizeCmsHtml } from "./html";

describe("sanitizeCmsHtml", () => {
  it("許可タグはそのまま残す", () => {
    const html = "<h2>見出し</h2><p>本文<strong>強調</strong></p><ul><li>項目</li></ul>";
    expect(sanitizeCmsHtml(html)).toBe(html);
  });

  it("scriptタグを除去する", () => {
    const result = sanitizeCmsHtml('<p>本文</p><script>alert("xss")</script>');
    expect(result).not.toContain("script");
    expect(result).toContain("<p>本文</p>");
  });

  it("onerror属性を除去する", () => {
    const result = sanitizeCmsHtml('<img src="x" onerror="alert(1)">');
    expect(result).not.toContain("onerror");
  });

  it("onclick属性を除去する", () => {
    const result = sanitizeCmsHtml('<p onclick="alert(1)">本文</p>');
    expect(result).not.toContain("onclick");
    expect(result).toContain("本文");
  });

  it("javascript:スキームのリンクを除去する", () => {
    const result = sanitizeCmsHtml('<a href="javascript:alert(1)">link</a>');
    expect(result).not.toContain("javascript:");
  });

  it("iframeを除去する", () => {
    const result = sanitizeCmsHtml('<iframe src="https://example.com"></iframe>');
    expect(result).not.toContain("iframe");
  });

  it("httpsリンクは残す", () => {
    const result = sanitizeCmsHtml('<a href="https://example.com">link</a>');
    expect(result).toContain('href="https://example.com"');
  });

  it("相対パスのリンクは残す", () => {
    const result = sanitizeCmsHtml('<a href="/contents/2">link</a>');
    expect(result).toContain('href="/contents/2"');
  });

  it("外部リンクにrel属性を付ける", () => {
    const result = sanitizeCmsHtml('<a href="https://example.com" target="_blank">link</a>');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it("既にrelがある外部リンクを二重に書き換えない", () => {
    const result = sanitizeCmsHtml(
      '<a href="https://example.com" target="_blank" rel="noopener">link</a>'
    );
    expect(result.match(/rel=/g)).toHaveLength(1);
  });

  it("空文字は空文字を返す", () => {
    expect(sanitizeCmsHtml("")).toBe("");
  });
});
