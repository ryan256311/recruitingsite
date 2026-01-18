"use client";

import Link from "next/link";
import svgPaths from "../../imports/svg-corg4qlf3y";
import companyImage1 from "../../assets/2723acada69546ad44390f5e3d6b8730eb9c9744.png";
import companyImage2 from "../../assets/e6f7b37fca2d865e3f35dae1ac050a9f0649c3e5.png";
import companyImage3 from "../../assets/20381856004e60259556c5cc5cb1eaa849237729.png";

export default function CompanyVisit() {
  return (
    <>
      {/* ===== ファーストビュー Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="fv">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8 pt-8">
          {/* Breadcrumb */}
          <nav className="mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
            <ol className="flex items-center gap-2 text-gray-600">
              <li><Link href="/" className="hover:text-[#0064c8]">TOP</Link></li>
              <li>/</li>
              <li className="text-[#313131] font-medium">会社見学</li>
            </ol>
          </nav>

          {/* 2カラムレイアウト */}
          <div className="flex gap-16 items-center">
            {/* 左側: テキストとCTA */}
            <div className="flex-1">
              {/* キャッチコピー */}
              <h1 className="text-h1 tracking-[1.92px] mb-6">
                入社後の不安を、<br />
                見学で解消する。
              </h1>

              {/* リードテキスト */}
              <p className="text-lg mb-10" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '32px' }}>
                ネットの情報だけでは分からない、リアルな職場の空気。<br />
                エクシートの会社見学で、働く環境を自分の目で確かめてください。
              </p>

              {/* CTA */}
              <div>
                <Link
                  href="/contact?type=company-visit"
                  className="bg-[#0064c8] text-white rounded-full px-12 py-4 font-bold inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px' }}
                >
                  会社見学に申し込む
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                    <path d={svgPaths.p190b2b48} fill="white" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 右側: 画像 */}
            <div className="w-[45%] shrink-0">
              <img
                src={companyImage1.src}
                alt="会社見学の様子"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 共感セクション (02) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="empathy">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12 text-center">
            <h2 className="text-h2 tracking-[1.08px] \1">
              こんな不安、ありませんか？
            </h2>
          </div>

          <div className="max-w-[800px] mx-auto space-y-4">
            {[
              '求人情報だけでは、実際の職場の雰囲気が分からない',
              '入社後に「思っていたのと違う」とギャップを感じたくない',
              '社員の方と直接話して、リアルな働き方を知りたい'
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-50 rounded-lg p-6">
                <svg className="w-6 h-6 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="#0064c8" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '28px' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px' }}>
            エクシートの会社見学なら、その不安を解消できます。
          </p>
        </div>
      </section>

      {/* ===== 解決策（見学で得られること） Section (03) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="benefits">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-h2 tracking-[1.08px] \1">
              会社見学で得られる3つのこと
            </h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'リアルな職場環境',
                description: 'オフィスの雰囲気、社員同士のコミュニケーション、働く環境を実際に目で見て確認できます。',
                image: companyImage1
              },
              {
                number: '02',
                title: '率直な社員の声',
                description: '現場で働く社員と直接対話し、やりがいや働き方についてざっくばらんに質問できます。',
                image: companyImage2
              },
              {
                number: '03',
                title: '入社後のイメージ',
                description: '事業内容や組織体制を詳しく知ることで、入社後の自分を具体的にイメージできます。',
                image: companyImage3
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden">
                {/* 画像 */}
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src={item.image.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* コンテンツ */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#0064c8] font-bold leading-none" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px' }}>
                      {item.number}
                    </span>
                    <h3 className="font-bold leading-none m-0" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 社会的証明 Section (04) ===== */}
      <section className="relative py-24 border-b border-black/15 bg-gray-50">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="proof">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12 text-center">
            <h2 className="text-h2 tracking-[1.08px] \1">
              参加者の声
            </h2>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="font-bold text-[#0064c8]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px' }}>95</span>
              <span className="font-bold text-[#0064c8]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '36px' }}>%</span>
            </div>
            <p className="font-medium" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
              過去3年間の参加者満足度
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                name: 'Aさん（27歳・エンジニア）',
                comment: 'オフィスの開放的な雰囲気と、社員の方々の穏やかな人柄に惹かれました。実際に見学したことで、ここで働きたいという気持ちが固まりました。'
              },
              {
                name: 'Bさん（25歳・デザイナー）',
                comment: '事前に抱いていた不安が全て解消されました。質問にも丁寧に答えていただき、入社後のイメージが明確になりました。'
              },
              {
                name: 'Cさん（24歳・新卒）',
                comment: '社員の方が実際に働いている様子を見られたのが良かったです。カジュアルな雰囲気で質問もしやすく、リラックスして参加できました。'
              }
            ].map((voice, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-[#e0e0e0]">
                <p className="mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px' }}>
                  {voice.comment}
                </p>
                <p className="font-bold text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif', color: '#0064c8' }}>
                  {voice.name}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/contact?type=company-visit"
              className="border-2 border-[#0064c8] bg-white text-[#0064c8] rounded-full px-10 py-3 font-bold inline-flex items-center gap-3 hover:bg-[#0064c8] hover:text-white transition-colors"
              style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
            >
              会社見学に申し込む
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 見学スタイル Section (05) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>05</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="visit-styles">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-h2 tracking-[1.08px] \1">3つの見学スタイル</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: '通常見学会',
                time: '約2時間30分',
                format: '本社訪問',
                description: 'オフィスを実際に訪問し、社員と直接対話しながら会社の雰囲気を体感できます。事業説明から職場見学、座談会まで充実した内容です。',
                recommended: true
              },
              {
                title: 'ショート見学会',
                time: '約1時間30分',
                format: '本社訪問 / オンライン',
                description: '時間が限られている方向けのコンパクトな見学会です。事業説明と質疑応答を中心に、効率的に会社を理解できます。',
                recommended: false
              },
              {
                title: 'カジュアルトーク',
                time: '約30分',
                format: 'オンライン',
                description: '気軽に話を聞いてみたい方向けです。選考とは関係なく、ざっくばらんに疑問や不安を解消できる場です。',
                recommended: false
              }
            ].map((style, index) => (
              <div key={index} className="border border-[#e0e0e0] rounded-2xl p-6 relative">
                {style.recommended && (
                  <div className="absolute -top-3 left-6 bg-[#0064c8] text-white px-4 py-1 rounded-full text-xs font-bold">
                    おすすめ
                  </div>
                )}
                <h3 className="font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                  {style.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#0064c8" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{style.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#0064c8" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{style.format}</span>
                  </div>
                </div>
                <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px' }}>
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 当日の流れ Section (06) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>06</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="schedule">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-h2 tracking-[1.08px] \1">当日の流れ（通常見学会）</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="max-w-[800px] mx-auto space-y-6">
            {[
              { time: '14:50 - 15:00', title: '受付', description: 'ご来社・受付' },
              { time: '15:00 - 15:20', title: '会社紹介', description: '事業内容、ビジョン、サービスについてご説明します' },
              { time: '15:20 - 15:50', title: 'オフィス見学', description: '実際の職場を見ながら、働く環境をご紹介します' },
              { time: '15:50 - 16:20', title: '社員との座談会', description: '現場社員とざっくばらんにお話しできる時間です' },
              { time: '16:20 - 16:30', title: '質疑応答・個別相談', description: '疑問点や気になることを何でもご質問ください' }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="shrink-0 w-[140px]">
                  <span className="font-bold text-[#0064c8]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
                    {item.time}
                  </span>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold mb-1" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[800px] mx-auto bg-[#0064c8]/10 border-l-4 border-[#0064c8] rounded-lg p-6">
            <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px' }}>
              ※ タイムスケジュールは目安です。ご希望に応じて柔軟に調整いたします。
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/contact?type=company-visit"
              className="bg-[#0064c8] text-white rounded-full px-12 py-4 font-bold inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
            >
              会社見学に申し込む
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="white" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 見学前→見学後 Section (07) ===== */}
      <section className="relative py-24 border-b border-black/15 bg-gray-50">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>07</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="transformation">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12 text-center">
            <h2 className="text-h2 tracking-[1.08px] \1">
              見学前 → 見学後の変化
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-12 max-w-[900px] mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-[#e0e0e0]">
              <div className="text-center mb-4">
                <span className="inline-block bg-gray-300 text-white px-4 py-2 rounded-full font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                  見学前
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  '求人票の情報だけでは不安',
                  '職場の雰囲気が分からない',
                  '入社後のギャップが心配'
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px', color: '#666' }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-[#0064c8]">
              <div className="text-center mb-4">
                <span className="inline-block bg-[#0064c8] text-white px-4 py-2 rounded-full font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                  見学後
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  '実際の職場を見て安心できた',
                  '社員の雰囲気が良く働きやすそう',
                  '入社後のイメージが明確になった'
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#0064c8" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px', color: '#313131' }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section (08) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>08</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="faq">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-h2 tracking-[1.08px] \1">よくある質問</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="max-w-[900px] mx-auto space-y-6">
            {[
              {
                question: '服装はどうすればいいですか？',
                answer: '私服でお越しください。リラックスした雰囲気でお話しできればと思います。'
              },
              {
                question: '1人で参加しても大丈夫ですか？',
                answer: 'もちろんです。ほとんどの方がお一人でご参加されています。リラックスしてお越しください。'
              },
              {
                question: 'オンラインでの参加は可能ですか？',
                answer: 'はい、可能です。ショート見学会とカジュアルトークはオンラインでも実施しております。お申し込み時にオンライン希望の旨をお知らせください。'
              },
              {
                question: '所要時間はどのくらいですか？',
                answer: '通常見学会は約2時間30分、ショート見学会は約1時間30分、カジュアルトークは約30分です。'
              },
              {
                question: '友人と一緒に参加できますか？',
                answer: 'はい、可能です。お申し込み時に参加人数をお知らせください。'
              },
              {
                question: '見学会への参加は選考に影響しますか？',
                answer: '見学会への参加は選考には一切影響しません。まずは会社を知っていただくことが目的ですので、お気軽にご参加ください。'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-[#e0e0e0] rounded-lg p-6">
                <h3 className="font-bold mb-3 flex items-start gap-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                  <span className="bg-[#0064c8] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">Q</span>
                  {faq.question}
                </h3>
                <p className="pl-9" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '24px', color: '#555' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== クロージングCTA Section (09) ===== */}
      <section className="relative py-24 border-b border-black/15 bg-[#0064c8]">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-white" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>09</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-white" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="cta">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="text-center text-white">
            <h2 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px', lineHeight: '1.4' }}>
              入社後の不安を、<br />
              見学で解消しませんか？
            </h2>
            <p className="mb-10 text-lg" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '32px' }}>
              まずは気軽にお申し込みください。<br />
              オフィス見学やカジュアルトークからでも大歓迎です。
            </p>
            <Link
              href="/contact?type=company-visit"
              className="bg-white text-[#0064c8] rounded-full px-16 py-5 font-bold inline-flex items-center gap-3 hover:bg-gray-100 transition-colors"
              style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}
            >
              会社見学に申し込む
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="#0064c8" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
