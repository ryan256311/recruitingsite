import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

/**
 * サーバーレス実行環境に持ち込んではいけない依存を見張る。
 *
 * jsdom は本番のNextランタイムで ERR_REQUIRE_ESM を起こして
 * ページの再生成を失敗させた実績がある（html-encoding-sniffer が
 * ESM専用の @exodus/bytes を require するため）。
 * ビルドは通ってしまい、デプロイして初めて露見するので、
 * 依存ツリーの側で止める。
 */

interface LockPackage {
  dev?: boolean;
  devOptional?: boolean;
}

function productionPackageNames(): Set<string> {
  const lockPath = join(process.cwd(), "package-lock.json");
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    packages: Record<string, LockPackage>;
  };

  const names = new Set<string>();
  for (const [path, meta] of Object.entries(lock.packages)) {
    if (!path.startsWith("node_modules/")) continue;
    if (meta.dev || meta.devOptional) continue;
    // ネストした node_modules/a/node_modules/b にも対応する
    names.add(path.slice(path.lastIndexOf("node_modules/") + "node_modules/".length));
  }
  return names;
}

describe("本番依存ツリー", () => {
  it("jsdom を含まない（Vercelのランタイムで読み込みに失敗するため）", () => {
    expect(productionPackageNames()).not.toContain("jsdom");
  });

  it("ESM専用で require できない @exodus/bytes を含まない", () => {
    expect(productionPackageNames()).not.toContain("@exodus/bytes");
  });
});
