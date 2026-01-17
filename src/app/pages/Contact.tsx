"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import svgPaths from "../../imports/svg-corg4qlf3y";

export default function Contact() {
  const searchParams = useSearchParams();
  const [inquiryType, setInquiryType] = useState<string>("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  useEffect(() => {
    const type = searchParams.get("type");
    const job = searchParams.get("job");

    if (type === "company-visit") {
      setInquiryType("会社見学");
    } else if (type === "career" || type === "graduate") {
      setInquiryType("選考への応募");
    }

    if (job) {
      setSelectedJobs([decodeURIComponent(job)]);
    }
  }, [searchParams]);

  const handleJobToggle = (job: string) => {
    setSelectedJobs(prev =>
      prev.includes(job)
        ? prev.filter(j => j !== job)
        : [...prev, job]
    );
  };
  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="contact">`}</code>
        </div>

        <div className="pl-[80px] pr-20 pt-8">
          <h1 className="font-bold tracking-[2.34px] mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>
            Contact
          </h1>
          <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            採用に関するお問い合わせはこちらからお願いいたします。
          </p>
        </div>
      </section>

      {/* ===== Contact Form Section (02) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="contact-form">`}</code>
        </div>

        <div className="max-w-[900px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>
              お問い合わせフォーム
            </h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          {/* お問い合わせ前の注意事項 */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
              お問い合わせの前に
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  採用に関するご質問、選考へのご応募、会社見学のご希望など、お気軽にお問い合わせください。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  通常、3営業日以内にご返信いたします。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  <span className="text-red-600">*</span> は必須項目です。
                </span>
              </li>
            </ul>
          </div>

          {/* WordPress MwWPform 埋め込みエリア */}
          {/*
            ここにWordPressのMwWPformを埋め込みます。
            方法1: iframeで埋め込み
            方法2: WordPressをヘッドレスCMSとして使用し、APIでフォームデータを送信
            方法3: Next.jsをWordPressテーマの一部として運用
          */}
          <div className="border border-[#e0e0e0] rounded-2xl p-8 min-h-[600px]">
            {/* プレースホルダーフォーム - 実際はMwWPformに置き換え */}
            <div className="space-y-8">
              {/* お問い合わせ種別 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  お問い合わせ種別 <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['選考への応募', 'カジュアル面談', '会社見学'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="inquiry_type"
                        value={item}
                        checked={inquiryType === item}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-4 h-4 accent-[#4346BE]"
                      />
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 応募職種 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  応募職種 <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  ※複数選択可
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    'Webコーダー・HTMLコーダー',
                    'ルート営業',
                    '印刷製本機での製造・補助スタッフ',
                    '印刷機オペレーター',
                    '企画営業職（推し活グッズ事業）',
                    '企画営業',
                    '営業事務',
                  ].map((job) => (
                    <label key={job} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job)}
                        onChange={() => handleJobToggle(job)}
                        className="w-4 h-4 accent-[#4346BE]"
                      />
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{job}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* お名前 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  お名前 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-[#707070] rounded-lg px-4 py-3"
                  placeholder="山田 太郎"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                  disabled
                />
              </div>

              {/* フリガナ */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  フリガナ <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-[#707070] rounded-lg px-4 py-3"
                  placeholder="ヤマダ タロウ"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                  disabled
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  メールアドレス <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border border-[#707070] rounded-lg px-4 py-3"
                  placeholder="example@email.com"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                  disabled
                />
              </div>

              {/* 電話番号 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  電話番号
                </label>
                <input
                  type="tel"
                  className="w-full border border-[#707070] rounded-lg px-4 py-3"
                  placeholder="03-1234-5678"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                  disabled
                />
              </div>

              {/* 履歴書の添付 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  履歴書の添付 <span className="text-red-600">*</span>
                </label>
                <div className="border border-[#707070] border-dashed rounded-lg p-6 text-center bg-gray-50">
                  <svg className="w-10 h-10 mx-auto mb-3 text-[#707070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', color: '#707070' }}>
                    ファイルをドラッグ＆ドロップ、または
                  </p>
                  <label className="inline-block">
                    <span
                      className="text-[#4346BE] underline cursor-pointer"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                    >
                      ファイルを選択
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      disabled
                    />
                  </label>
                </div>
              </div>

              {/* 職務経歴書の添付 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  職務経歴書の添付 <span className="text-red-600">*</span>
                </label>
                <div className="border border-[#707070] border-dashed rounded-lg p-6 text-center bg-gray-50">
                  <svg className="w-10 h-10 mx-auto mb-3 text-[#707070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', color: '#707070' }}>
                    ファイルをドラッグ＆ドロップ、または
                  </p>
                  <label className="inline-block">
                    <span
                      className="text-[#4346BE] underline cursor-pointer"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                    >
                      ファイルを選択
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      disabled
                    />
                  </label>
                </div>
              </div>

              {/* その他 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  その他
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  ※ポートフォリオ等の情報があればここに記載してください
                </p>
                <textarea
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 min-h-[120px]"
                  placeholder="ポートフォリオURL、GitHubアカウント、その他アピールしたい情報など"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                  disabled
                />
              </div>

              {/* プライバシーポリシー同意 */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 mt-0.5 accent-[#4346BE]"
                    disabled
                  />
                  <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                    <a href="https://exceet.co.jp/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#4346BE] underline hover:opacity-70 transition-opacity">プライバシーポリシー</a>に同意する <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>

              {/* 送信ボタン */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-4 bg-[#4346BE] text-white rounded-full px-12 py-4 hover:bg-[#3335a0] transition-colors cursor-not-allowed opacity-60"
                  disabled
                >
                  <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>送信する</span>
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                    <path d={svgPaths.p190b2b48} fill="white" />
                  </svg>
                </button>
              </div>

              {/* プレースホルダーメッセージ */}
              <div className="text-center pt-4 border-t border-[#e0e0e0]">
                <p className="text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                  ※ このフォームはプレースホルダーです。<br />
                  実際の運用時はWordPress MwWPformを埋め込んでください。
                </p>
              </div>
            </div>
          </div>

          {/* 他のお問い合わせ方法 */}
          <div className="mt-16 text-center">
            <h3 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
              その他のお問い合わせ方法
            </h3>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#4346BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  recruit@example.co.jp
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#4346BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  03-1234-5678（採用担当直通）
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
