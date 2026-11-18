import { describe, expect, it } from "vitest";
import type { Job } from "../../data/jobs";
import {
  serializeJsonLd,
  toBaseSalary,
  toEmploymentTypes,
  toJobDescriptionHtml,
  toJobPostingJsonLd,
  toPostalAddress,
} from "./jobPosting";

function job(over: Partial<Job> = {}): Job {
  return {
    slug: "web-coder",
    postedAt: "2026-10-16T03:02:11.725Z",
    title: "Webコーダー・HTMLコーダー",
    showOnCareer: true,
    department: "メディアコンテンツ部",
    departmentDescription: "部署紹介",
    type: "エンジニア",
    description: "WordPress構築を担当。",
    background: "EC新事業立ち上げに伴い募集。",
    requirements: ["実務経験1年以上", "普通自動車免許"],
    responsibilities: ["Web制作", "ECサイト構築"],
    salary: "月給220,000円〜380,000円（スキル・経験による）\n昇給年1回",
    location: "福井県坂井市春江町中庄61-32（春江本社）\nえちぜん鉄道 西春江ハートピア駅より徒歩約10分",
    employmentType: "正社員",
    ...over,
  };
}

describe("toEmploymentTypes", () => {
  it("雇用形態の表記を Google の値にする", () => {
    expect(toEmploymentTypes("正社員")).toEqual(["FULL_TIME"]);
    expect(toEmploymentTypes("契約社員")).toEqual(["TEMPORARY"]);
    expect(toEmploymentTypes("契約社員 / 正社員")).toEqual(["FULL_TIME", "TEMPORARY"]);
    expect(toEmploymentTypes("パート・アルバイト")).toEqual(["PART_TIME"]);
  });

  it("読み取れない表記は OTHER", () => {
    expect(toEmploymentTypes("応相談")).toEqual(["OTHER"]);
  });
});

describe("toBaseSalary", () => {
  it("月給の範囲を読み取る", () => {
    expect(toBaseSalary("月給220,000円〜380,000円（スキル・経験による）")).toEqual({
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: { "@type": "QuantitativeValue", minValue: 220000, maxValue: 380000, unitText: "MONTH" },
    });
  });

  it("万円表記と、上限なしを読み取る", () => {
    expect(toBaseSalary("年収300万円〜")?.value).toEqual({
      "@type": "QuantitativeValue",
      value: 3000000,
      unitText: "YEAR",
    });
  });

  it("金額が書かれていなければ出さない（推測しない）", () => {
    expect(toBaseSalary("※詳細は面談時にご説明します")).toBeUndefined();
    expect(toBaseSalary("")).toBeUndefined();
  });

  it("2行目以降は読まない", () => {
    expect(toBaseSalary("応相談\n月給200,000円")).toBeUndefined();
  });
});

describe("toPostalAddress", () => {
  it("都道府県・市区町村・番地に分ける。括弧書きは除く", () => {
    expect(toPostalAddress("福井県坂井市春江町中庄61-32（春江本社）\n駅から徒歩10分")).toEqual({
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: "福井県",
      addressLocality: "坂井市",
      streetAddress: "春江町中庄61-32",
    });
  });

  it("都道府県だけでも使う", () => {
    expect(toPostalAddress("福井県")).toEqual({
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: "福井県",
    });
  });

  it("読み取れなくても国は入れる（必須）", () => {
    expect(toPostalAddress("本社")).toEqual({ "@type": "PostalAddress", addressCountry: "JP" });
  });
});

describe("toJobDescriptionHtml", () => {
  it("HTMLとして安全にエスケープし、箇条書きは ul にする", () => {
    const html = toJobDescriptionHtml(job({ description: "<b>概要</b> & 説明" }));
    expect(html).toContain("<p>&lt;b&gt;概要&lt;/b&gt; &amp; 説明</p>");
    expect(html).toContain("<p>【仕事内容】</p><ul><li>Web制作</li><li>ECサイト構築</li></ul>");
    expect(html).toContain("【給与】<br>月給220,000円〜380,000円（スキル・経験による）<br>昇給年1回");
  });

  it("空の欄は出さない", () => {
    expect(toJobDescriptionHtml(job())).not.toContain("【歓迎するスキル・マインド】");
  });
});

describe("toJobPostingJsonLd", () => {
  it("必須項目をそろえる", () => {
    const d = toJobPostingJsonLd(job());
    expect(d).toMatchObject({
      "@type": "JobPosting",
      title: "Webコーダー・HTMLコーダー",
      datePosted: "2026-10-16",
      hiringOrganization: { name: "株式会社エクシート", sameAs: "https://exceet.co.jp/" },
      jobLocation: { "@type": "Place", address: { addressCountry: "JP", addressRegion: "福井県" } },
      employmentType: ["FULL_TIME"],
    });
    expect(d?.baseSalary).toBeDefined();
  });

  it("給与が読み取れなければ baseSalary を出さない", () => {
    expect(toJobPostingJsonLd(job({ salary: "※詳細は面談時にご説明します" }))).not.toHaveProperty("baseSalary");
  });

  it("掲載日（必須）がなければ出さない", () => {
    expect(toJobPostingJsonLd(job({ postedAt: undefined }))).toBeNull();
  });
});

describe("serializeJsonLd", () => {
  it("</script> で抜け出せないよう < をエスケープする", () => {
    const s = serializeJsonLd({ description: "</script><script>alert(1)</script>" });
    expect(s).not.toContain("</script>");
    expect(JSON.parse(s).description).toBe("</script><script>alert(1)</script>");
  });
});
