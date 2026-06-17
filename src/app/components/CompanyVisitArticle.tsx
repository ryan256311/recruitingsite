"use client";

import Link from "next/link";
import svgPaths from "../../imports/svg-corg4qlf3y";
import companyImage1 from "../../assets/company-1.jpg";
import cardImage1 from "../../assets/environment-1.jpg";
import cardImage2 from "../../assets/footer-slide-3.jpg";
import cardImage3 from "../../assets/environment-2.jpg";

/**
 * 会社見学会記事（id 31）専用のリッチレイアウト。
 * /company-visit ページと同じデザイン言語で記事本文を表現する。
 * ContentsDetail のヒーロー（パンくず・タイトル・タグ）と関連記事は維持し、
 * 本セクションが汎用マークダウン本文の代わりに描画される。
 */

const ACCENT = "#0064c8";

const FEATURES = [
  {
    title: "応募前でも参加OK",
    description:
      "応募するか迷っている段階でも大歓迎です。「まずは話を聞いてみたい」「雰囲気を知りたい」という方も、見学だけで終わっても全く問題ありません。",
  },
  {
    title: "私服で参加OK",
    description:
      "リラックスしてお話しできるよう、私服でお越しください。社員も普段着で勤務しているので、ありのままの職場の雰囲気を感じていただけます。",
  },
  {
    title: "選考に一切影響しない",
    description:
      "見学会への参加は選考に一切影響しません。「お互いを知る場」として設定しているため、評価を気にせず自由に見学・質問していただけます。",
  },
  {
    title: "オンライン参加も可能",
    description:
      "ショート見学会とカジュアルトークはオンラインでも実施。遠方の方や移動時間を節約したい方も、気軽にご参加いただけます。",
  },
];

const STYLES = [
  {
    title: "通常見学会",
    time: "約2時間30分",
    format: "本社訪問",
    description:
      "オフィスを実際に訪問し、社員と直接対話しながら会社の雰囲気を体感できます。じっくり見学したい方向けです。",
    recommended: true,
  },
  {
    title: "ショート見学会",
    time: "約1時間30分",
    format: "本社訪問 / オンライン",
    description:
      "時間が限られている方向けのコンパクトな見学会です。事業説明と質疑応答を中心に、効率的に会社を理解できます。",
    recommended: false,
  },
  {
    title: "カジュアルトーク",
    time: "約30分",
    format: "オンライン",
    description:
      "気軽に話を聞いてみたい方向けです。選考とは関係なく、ざっくばらんに疑問や不安を解消できる場です。",
    recommended: false,
  },
];

const COMPARISON = [
  { label: "参加条件", general: "応募者のみ", exceet: "誰でもOK" },
  { label: "服装", general: "スーツ推奨", exceet: "私服OK" },
  { label: "選考への影響", general: "評価対象になることも", exceet: "一切なし" },
  { label: "所要時間", general: "2〜3時間", exceet: "30分〜2.5時間（選べる）" },
  { label: "参加形式", general: "対面のみ", exceet: "対面 / オンライン" },
  { label: "参加人数", general: "1人のみ", exceet: "1人 / 友人同伴OK" },
  { label: "雰囲気", general: "かしこまった雰囲気", exceet: "カジュアル・リラックス" },
];

const VOICES = [
  {
    name: "Aさん（27歳・エンジニア）",
    comment:
      "他社の見学会では緊張して本音で話せませんでしたが、エクシートは本当にカジュアルな雰囲気で、何でも質問できました。私服OKというのもリラックスできた大きな要因です。",
  },
  {
    name: "Bさん（25歳・デザイナー）",
    comment:
      "応募前に参加できるのが良かったです。実際のオフィスを見て社員と話すことで「ここで働きたい」という気持ちが固まりました。合わなければ応募しなくてもいい、というプレッシャーのなさが逆に良かったです。",
  },
  {
    name: "Cさん（24歳・新卒）",
    comment:
      "30分のカジュアルトークから始められたのが、参加のハードルを下げてくれました。雰囲気が良かったので、後日改めて通常見学会にも参加しました。",
  },
];

const BENEFITS = [
  {
    number: "01",
    title: "リアルな職場環境",
    description:
      "オフィスの雰囲気、社員同士のコミュニケーション、働く環境を実際に目で見て確認できます。求人票では分からない生の情報を得られます。",
    image: cardImage1,
  },
  {
    number: "02",
    title: "率直な社員の声",
    description:
      "現場で働く社員と直接対話し、やりがいや働き方についてざっくばらんに質問できます。カジュアルな雰囲気なら聞きにくいことも聞きやすくなります。",
    image: cardImage2,
  },
  {
    number: "03",
    title: "入社後のイメージ",
    description:
      "事業内容や組織体制を詳しく知ることで、入社後の自分を具体的にイメージできます。",
    image: cardImage3,
  },
];

const FAQ = [
  {
    question: "服装はどうすればいいですか？",
    answer: "私服でお越しください。リラックスした雰囲気でお話しできればと思います。",
  },
  {
    question: "1人で参加しても大丈夫ですか？",
    answer:
      "もちろんです。ほとんどの方がお一人でご参加されています。リラックスしてお越しください。",
  },
  {
    question: "オンラインでの参加は可能ですか？",
    answer:
      "はい、可能です。ショート見学会とカジュアルトークはオンラインでも実施しております。お申し込み時にオンライン希望の旨をお知らせください。",
  },
  {
    question: "見学会への参加は選考に影響しますか？",
    answer:
      "見学会への参加は選考には一切影響しません。まずは会社を知っていただくことが目的ですので、お気軽にご参加ください。",
  },
];

function SectionHeading({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2
        className="font-bold tracking-[1.08px] mb-2"
        style={{ fontFamily: "Noto Sans JP, sans-serif", fontSize: "32px" }}
      >
        {children}
      </h2>
      {!center && <div className="w-12 h-px bg-[#313131]"></div>}
    </div>
  );
}

export default function CompanyVisitArticle() {
  return (
    <div style={{ fontFamily: "Noto Sans JP, sans-serif" }}>
      {/* ===== リード（キャッチ） ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2
                className="font-bold mb-6"
                style={{ fontFamily: "Noto Sans JP, sans-serif", fontSize: "32px", lineHeight: 1.4 }}
              >
                入社後の不安を、
                <br />
                見学で解消する。
              </h2>
              <p style={{ fontSize: "18px", lineHeight: "32px" }}>
                求人情報やWebサイトだけでは分からない、リアルな職場の空気。エクシートの会社見学会で、働く環境を自分の目で確かめてください。応募前でも、私服でも、オンラインでも大歓迎です。
              </p>
            </div>
            <div className="w-full md:w-[45%] shrink-0">
              <img
                src={companyImage1.src}
                alt="会社見学の様子"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== こんな不安、ありませんか？ ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading center>こんな不安、ありませんか？</SectionHeading>
          <div className="max-w-[800px] mx-auto space-y-4">
            {[
              "求人情報だけでは、実際の職場の雰囲気が分からない",
              "入社後に「思っていたのと違う」とギャップを感じたくない",
              "社員の方と直接話して、リアルな働き方を知りたい",
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-50 rounded-lg p-6">
                <svg className="w-6 h-6 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontSize: "16px", lineHeight: "28px" }}>{text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 font-bold" style={{ fontSize: "18px" }}>
            エクシートの会社見学会なら、その不安を解消できます。
          </p>
        </div>
      </section>

      {/* ===== エクシートの会社見学会の特徴 ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading>エクシートの会社見学会の特徴</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, index) => (
              <div key={index} className="border border-[#e0e0e0] rounded-2xl p-6 flex gap-4">
                <svg className="w-7 h-7 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold mb-2" style={{ fontSize: "20px" }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "24px", color: "#555" }}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3つの見学スタイル ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading>3つの見学スタイル</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STYLES.map((style, index) => (
              <div key={index} className="border border-[#e0e0e0] rounded-2xl p-6 relative">
                {style.recommended && (
                  <div className="absolute -top-3 left-6 bg-[#0064c8] text-white px-4 py-1 rounded-full text-xs font-bold">
                    おすすめ
                  </div>
                )}
                <h3 className="font-bold mb-3" style={{ fontSize: "20px" }}>{style.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ fontSize: "14px" }}>{style.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span style={{ fontSize: "14px" }}>{style.format}</span>
                  </div>
                </div>
                <p style={{ fontSize: "14px", lineHeight: "24px", color: "#555" }}>{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== エクシート vs 一般的な会社見学会 ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading>一般的な会社見学会 vs エクシート</SectionHeading>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ fontSize: "14px" }}>
              <thead>
                <tr>
                  <th className="border border-[#e0e0e0] bg-gray-50 p-4 text-left w-1/4">項目</th>
                  <th className="border border-[#e0e0e0] bg-gray-50 p-4 text-left">一般的な会社見学会</th>
                  <th className="border border-[#0064c8] bg-[#0064c8]/10 p-4 text-left font-bold" style={{ color: ACCENT }}>
                    エクシートの会社見学会
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-[#e0e0e0] p-4 font-bold bg-gray-50">{row.label}</td>
                    <td className="border border-[#e0e0e0] p-4" style={{ color: "#666" }}>{row.general}</td>
                    <td className="border border-[#0064c8] p-4 font-medium" style={{ color: "#313131", background: "rgba(0,100,200,0.04)" }}>
                      {row.exceet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 参加者の声 ===== */}
      <section className="relative py-20 border-b border-black/15 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading center>参加者の声</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VOICES.map((voice, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-[#e0e0e0]">
                <p className="mb-4" style={{ fontSize: "14px", lineHeight: "24px" }}>{voice.comment}</p>
                <p className="font-bold text-sm" style={{ color: ACCENT }}>{voice.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 会社見学会で得られる3つのこと ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading>会社見学会で得られる3つのこと</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((item, index) => (
              <div key={index} className="bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img src={item.image.src} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold leading-none" style={{ fontFamily: "Roboto, sans-serif", fontSize: "18px", color: ACCENT }}>
                      {item.number}
                    </span>
                    <h3 className="font-bold leading-none m-0" style={{ fontSize: "20px" }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: "24px", color: "#555" }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== よくある質問 ===== */}
      <section className="relative py-20 border-b border-black/15">
        <div className="max-w-[1000px] mx-auto px-8">
          <SectionHeading>よくある質問</SectionHeading>
          <div className="max-w-[900px] mx-auto space-y-6">
            {FAQ.map((faq, index) => (
              <div key={index} className="border border-[#e0e0e0] rounded-lg p-6">
                <h3 className="font-bold mb-3 flex items-start gap-3" style={{ fontSize: "18px" }}>
                  <span className="bg-[#0064c8] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">Q</span>
                  {faq.question}
                </h3>
                <p className="pl-9" style={{ fontSize: "14px", lineHeight: "24px", color: "#555" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== クロージングCTA ===== */}
      <section className="relative py-20 border-b border-black/15 bg-[#0064c8]">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="text-center text-white">
            <h2 className="font-bold mb-6" style={{ fontSize: "32px", lineHeight: 1.4 }}>
              入社後の不安を、見学で解消しませんか？
            </h2>
            <p className="mb-10" style={{ fontSize: "18px", lineHeight: "32px" }}>
              まずは気軽にお申し込みください。
              <br />
              オフィス見学やカジュアルトークからでも大歓迎です。
            </p>
            <Link
              href="/contact?type=company-visit"
              className="bg-white rounded-full px-16 py-5 font-bold inline-flex items-center gap-3 hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "Noto Sans JP, sans-serif", fontSize: "20px", color: ACCENT }}
            >
              会社見学に申し込む
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill={ACCENT} />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
