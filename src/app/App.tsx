import svgPaths from "../imports/svg-corg4qlf3y";
import img3 from "../assets/1989e711943a09dca66285d0e18edafbafe3fb9c.png";
import imgSitetopEngineerEyeSp1 from "../assets/2723acada69546ad44390f5e3d6b8730eb9c9744.png";
import img5 from "../assets/e6f7b37fca2d865e3f35dae1ac050a9f0649c3e5.png";
import imgFireShotCapture193CareersMujiCom1 from "../assets/20381856004e60259556c5cc5cb1eaa849237729.png";
import img91 from "../assets/f9da79649950583e5a4c4c0c18a62dca2f7a3db4.png";
import imgInstagramGlyphBlack from "../assets/f171275cdf27d311fd0a3b1f6ef7b82227a50ce2.png";
import { img2, imgSitetopEngineerEyeSp, imgSitetopEngineerEyeSp2, imgSitetopEngineerEyeSp3, imgFireShotCapture193CareersMujiCom } from "../imports/svg-v6ipn";

export default function App() {
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden">
      {/* Fixed Internship Badge Button - Bottom Right */}
      <button className="fixed bottom-8 right-8 z-50 w-[180px] h-[180px] rounded-full bg-[#F4EDDD] flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow">
        <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '20px', color: '#313131' }}>
          <p className="font-semibold mb-0">インターンシップ</p>
          <p className="font-semibold mb-0">会社見学会</p>
          <p className="font-semibold text-[13px]">はこちら</p>
        </div>
      </button>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
        <div className="max-w-[1920px] mx-auto px-20 py-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="w-[270px] h-10">
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 270 39.735">
                <path d={svgPaths.p2c5ae000} fill="#313131" />
                <path d={svgPaths.p23d25000} fill="#313131" />
                <path d={svgPaths.p13a86400} fill="#313131" />
                <path d={svgPaths.p23b37280} fill="#313131" />
                <path d={svgPaths.p2c54d400} fill="#313131" />
                <path d={svgPaths.p103c400} fill="#313131" />
                <path d={svgPaths.p2ee8dd00} fill="#313131" />
                <path d={svgPaths.p2393ea00} fill="#313131" />
                <path d={svgPaths.p600d680} fill="#313131" />
                <path d={svgPaths.p234cf100} fill="#313131" />
                <path d={svgPaths.p2005b500} fill="#313131" />
                <path d={svgPaths.p10e22f00} fill="#313131" />
                <path d={svgPaths.pdf97f80} fill="#313131" />
                <path d={svgPaths.p2d43f100} fill="#313131" />
                <path d={svgPaths.p27f24300} fill="#313131" />
                <path d={svgPaths.p245aa400} fill="#313131" />
                <path d={svgPaths.p2c033880} fill="#313131" />
                <path d={svgPaths.p34bea300} fill="#313131" />
                <path d={svgPaths.p1460fb80} fill="#313131" />
              </svg>
            </div>
            <p className="font-medium tracking-[0.54px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Recruitment Site
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-12">
            <a href="#" className="font-bold tracking-[0.42px]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
              新卒採用
            </a>
            <a href="#" className="font-bold tracking-[0.42px]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
              キャリア採用
            </a>
            <a href="#" className="font-bold tracking-[0.42px]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
              よくある質問
            </a>
            <button className="bg-[#0064c8] opacity-70 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2">
              会社見学会にエントリー
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="white" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-black">
        <div className="max-w-[1920px] mx-auto px-20">
          {/* Nav + FV Title Row */}
          <div className="flex">
            {/* Left: Nav Section */}
            <div className="w-[200px] pr-8 relative">
              {/* Section Number */}
              <div className="flex items-center gap-4 mb-2">
                <span className="text-[#313131] text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
                <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>
                  {`<nav>`}
                </code>
              </div>

              {/* Menu Header */}
              <div className="flex items-center gap-4 mb-8 mt-8">
                <div className="w-2 h-2">
                  <svg className="block w-full h-full" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                </div>
                <span className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>
                  Menu
                </span>
              </div>

              {/* Menu Items */}
              <div className="space-y-4 ml-6">
                {[
                  { label: 'News', active: true },
                  { label: 'Company', active: false },
                  { label: 'News', active: false },
                  { label: 'Interview', active: false },
                  { label: 'Contents', active: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-3 h-3">
                      <svg className="block w-full h-full" fill="none" viewBox="0 0 11 11">
                        <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-px bg-[#707070] mx-8"></div>

            {/* Right: FV Title Section */}
            <div className="flex-1 pl-8">
              {/* Section Decoration */}
              <div className="mb-8">
                <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>
                  {`<h1 class="message">`}
                </code>
              </div>

              <h1 className="font-bold tracking-[2.34px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '78px', lineHeight: '107px' }}>
                <span className="text-[#0074b9]">紙×デジタル</span>
                <br />
                情報発信を最適化
              </h1>
            </div>
          </div>

          {/* Hero Image with Mask - 1900px × 1050px */}
          <div className="relative w-full h-[1050px] mx-auto rounded-2xl overflow-hidden mt-12">
            <div
              className="absolute inset-0"
              style={{
                maskImage: `url('${img2}')`,
                maskSize: 'cover',
                maskPosition: 'center',
                WebkitMaskImage: `url('${img2}')`,
                WebkitMaskSize: 'cover',
                WebkitMaskPosition: 'center'
              }}
            >
              <img src={img3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* News & Recruitment Section */}
      <section className="relative py-24 border-b border-black">
        {/* Section Decoration */}
        <div className="absolute top-6 left-5 flex items-center gap-4">
          <span className="text-[#313131] text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-6 left-14">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>
            {`<section class="news">`}
          </code>
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-black"></div>
        
        <div className="max-w-[1920px] mx-auto px-20">
          <div className="grid grid-cols-2 gap-32">
            {/* お知らせ */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="font-bold tracking-[1.08px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>
                  お知らせ
                </h2>
                <div className="w-10 h-px bg-[#707070]"></div>
              </div>
              <div className="space-y-4">
                {[
                  { date: '2025.04.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2025.03.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2025.02.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2025.01.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2024.10.21', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-8" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                    <span className="font-semibold whitespace-nowrap">{item.date}</span>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 採用情報 */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="font-bold tracking-[1.08px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>
                  採用情報
                </h2>
                <div className="w-10 h-px bg-[#707070]"></div>
              </div>
              <div className="space-y-6">
                {['キャリア採用向け', '新卒採用向け', 'インターンシップ'].map((item, index) => (
                  <div key={index} className="border border-[#707070] rounded-md p-5 bg-white opacity-44">
                    <p className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Message Section */}
      <section className="relative py-24 border-b border-black">
        {/* Section Decoration */}
        <div className="absolute top-6 left-5 flex items-center gap-4">
          <span className="text-[#313131] text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-6 left-14">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>
            {`<section class="company">`}
          </code>
        </div>
        
        <div className="max-w-[1920px] mx-auto px-20">
          <div className="grid grid-cols-2 gap-32">
            <div>
              <h2 className="font-bold tracking-[1.62px] mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '54px', lineHeight: '96px' }}>
                "やってみたい"が、
                <br />
                動き出す場所。
                <br />
                挑戦を楽しみ、
                <br />
                成長を重ねる
                <br />
                <br />
                ―その先にある未来へ。
              </h2>
            </div>
            <div>
              <div className="mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                <p className="mb-4">私たちは、紙とデジタルの融合によって、</p>
                <p className="mb-4">マーケティングの新しい可能性を切り拓いています。</p>
                <p className="mb-4">部署の垣根を超えてアイデアが飛び交い、個々の挑戦がチームの力になる、そんな風土がここにはあります。</p>
                <p className="mb-4">&nbsp;</p>
                <p className="mb-4">「もっとこうしたら、面白くなる」</p>
                <p className="mb-4">「これは誰かの心を動かせるはず」</p>
                <p className="mb-4">そんな想いを持って動ける人にこそ、</p>
                <p className="mb-4">この場所はぴったりです。</p>
                <p className="mb-4">&nbsp;</p>
                <p className="mb-4">さあ、私たちと一緒に。</p>
                <p>変化を恐れず、未来を描く仲間になりませんか？</p>
              </div>
              <button className="border border-[#707070] bg-white rounded-full px-8 py-3 flex items-center gap-4">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>エクシートとは</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="relative py-24 border-b border-black">
        {/* Section Decoration */}
        <div className="absolute top-6 left-5 flex items-center gap-4">
          <span className="text-[#313131] text-center" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
        </div>
        <div className="absolute top-6 left-14">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>
            {`<section class="interview">`}
          </code>
        </div>
        
        <div className="max-w-[1920px] mx-auto px-20">
          <h2 className="font-bold tracking-[2.16px] mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '72px' }}>
            仲間を知る
          </h2>
          <p className="mb-16 max-w-[1025px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。紙とデジタルの融合を軸に、それぞれが専門性を活かしながら新しい価値を生み出しています。日々の仕事や関わりの中で生まれるリアルな声を、社員インタビューやクロストークを通じてご紹介します。
          </p>

          {/* Decorative circles background */}
          <div className="relative mb-16">
            <div className="flex gap-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="relative w-[440px] h-[440px] rounded-2xl overflow-hidden"
                  style={{ 
                    maskImage: `url('${imgSitetopEngineerEyeSp2}')`,
                    maskSize: 'cover',
                    maskPosition: 'center',
                    WebkitMaskImage: `url('${imgSitetopEngineerEyeSp2}')`,
                    WebkitMaskSize: 'cover',
                    WebkitMaskPosition: 'center'
                  }}
                >
                  <img src={imgSitetopEngineerEyeSp1} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-bold mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px', lineHeight: '72px' }}>
            インタビュー & クロストーク
          </h3>

          {/* Interview Cards */}
          <div className="grid grid-cols-5 gap-10">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item}>
                <div className="bg-[#505050] rounded-2xl w-[370px] h-[370px] mb-4"></div>
                <div className="mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px', lineHeight: '32px' }}>
                  <p className="mb-0">プレイヤーからリーダーへ</p>
                  <p>昇格を通じて描く自己成長の軌跡</p>
                </div>
                <div className="flex gap-2">
                  <span className="border border-[#707070] bg-white rounded-full px-3 py-1" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                    #インタビュー
                  </span>
                  <span className="border border-[#707070] bg-white rounded-full px-3 py-1" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                    #職種：デザイナー
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environment Section */}
      <section className="relative py-24 bg-[#0074b9]">
        <div className="absolute inset-0">
          <img src={img91} alt="" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative max-w-[1920px] mx-auto px-20">
          <div className="grid grid-cols-2 gap-32">
            {/* Code snippet decoration */}
            <div>
              <div className="bg-white inline-block px-2 mb-8">
                <code className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>
                  {`<section class="environment">`}
                </code>
              </div>
              
              {/* Environment Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#505050] rounded-2xl h-[285px]"></div>
                <div className="bg-[#505050] rounded-2xl h-[560px] row-span-2"></div>
                <div className="bg-[#505050] rounded-2xl h-[560px] row-span-2"></div>
                <div className="bg-[#505050] rounded-tl-2xl rounded-tr-2xl h-[38px]"></div>
                <div className="bg-[#505050] rounded-bl-2xl rounded-br-2xl h-[285px]"></div>
                <div className="bg-[#505050] rounded-2xl h-[442px]"></div>
                <div className="bg-[#505050] rounded-tl-2xl rounded-tr-2xl h-[195px]"></div>
              </div>
            </div>

            <div className="text-white">
              <h2 className="font-bold tracking-[2.16px] mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '72px' }}>
                環境を知る
              </h2>
              <p className="mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                当社では、「挑戦を楽しみながら、安心して働ける環境をつくる」という考えのもと、働きやすく成長しやすい職場づくりに取り組んでいます。ここでは、当社のカルチャーや福利厚生、人事制度など、日々の仕事を支える環境についてご紹介します。
              </p>
              <button className="border border-[#707070] bg-white text-[#313131] rounded-full px-8 py-3 flex items-center gap-4">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>働く環境をのぞく</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contents Section */}
      <section className="py-24 border-b border-black">
        <div className="max-w-[1920px] mx-auto px-20">
          <div className="grid grid-cols-[300px_1fr] gap-16">
            {/* Sidebar */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-2">
                    <svg className="block w-full h-full" fill="none" viewBox="0 0 9 9.05359">
                      <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                    </svg>
                  </div>
                  <span className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>
                    Category
                  </span>
                </div>
                <div className="space-y-4 ml-8">
                  {[
                    { label: '全て', active: true },
                    { label: '会社を知る', active: false },
                    { label: '仕事を知る', active: false },
                    { label: '仲間を知る', active: false },
                    { label: '環境を知る', active: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-3 h-3">
                        <svg className="block w-full h-full" fill="none" viewBox="0 0 11 11">
                          <path clipRule="evenodd" d={item.active ? svgPaths.pf417300 : svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-2 h-2">
                    <svg className="block w-full h-full" fill="none" viewBox="0 0 9 9.05359">
                      <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                    </svg>
                  </div>
                  <span className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>
                    Tag
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 ml-8">
                  {['#インタビュー', '#職種：デザイナー', '#クロストーク', '#制度', '#新卒採用', '#キャリア採用'].map((tag, index) => (
                    <span key={index} className="border border-[#707070] bg-white rounded-full px-3 py-1" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div>
              <h2 className="font-bold mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>
                コンテンツ
              </h2>
              
              <div className="grid grid-cols-3 gap-10 mb-12">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item}>
                    <div className="bg-[#505050] rounded-2xl w-[370px] h-[370px] mb-4"></div>
                    <div className="mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px', lineHeight: '32px' }}>
                      <p className="mb-0">プレイヤーからリーダーへ</p>
                      <p>昇格を通じて描く自己成長の軌跡</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="border border-[#707070] bg-white rounded-full px-3 py-1" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                        #インタビュー
                      </span>
                      <span className="border border-[#707070] bg-white rounded-full px-3 py-1" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                        #職種：デザイナー
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="border border-[#707070] bg-white rounded-full px-8 py-3 flex items-center gap-4">
                  <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>もっと見る</span>
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                    <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Info Section */}
      <section className="py-24 border-b border-black">
        <div className="max-w-[1920px] mx-auto px-20">
          {/* Decorative circles background */}
          <div className="relative mb-16">
            <div className="flex gap-8 justify-center">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="relative w-[440px] h-[440px] rounded-2xl overflow-hidden"
                  style={{ 
                    maskImage: `url('${imgSitetopEngineerEyeSp2}')`,
                    maskSize: 'cover',
                    maskPosition: 'center',
                    WebkitMaskImage: `url('${imgSitetopEngineerEyeSp2}')`,
                    WebkitMaskSize: 'cover',
                    WebkitMaskPosition: 'center'
                  }}
                >
                  <img src={img5} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-32">
            <div>
              <h2 className="font-bold tracking-[2.16px] mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '72px' }}>
                採用について
              </h2>
            </div>
            <div>
              <div className="mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                <p className="mb-4">当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。</p>
                <p className="mb-4">さあ、私たちと一緒に。変化を恐れず、未来を描く仲間になりませんか？</p>
                <p>あなたのエントリーをお待ちしております。</p>
              </div>
              <button className="border border-[#707070] bg-white rounded-full px-8 py-3 flex items-center gap-4 mb-8">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>募集要項</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 border-b border-black">
        <div className="max-w-[1920px] mx-auto px-20">
          <div className="mb-8">
            <h2 className="font-bold tracking-[2.16px] mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px' }}>
              Let ideas (X)plode.
            </h2>
            <p className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '28px', lineHeight: '32px' }}>
              変化を楽しみ挑戦し続けよう。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-6">
              <button className="w-full border border-[#707070] bg-white rounded-md p-5 text-left">
                <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  インターンシップ
                </span>
              </button>
              <button className="w-full border border-[#707070] bg-[#333] text-white rounded-md p-5 text-left">
                <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  キャリア採用エントリー
                </span>
              </button>
              <button className="w-full border border-[#707070] bg-[#333] text-white rounded-md p-5 text-left">
                <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  27卒エントリー
                </span>
              </button>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3">
                  <svg className="block w-full h-full" fill="none" viewBox="0 0 13.0063 13.0838">
                    <path d={svgPaths.pfae6600} fill="#4346BE" />
                  </svg>
                </div>
                <span className="font-normal" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '22px', lineHeight: '22px' }}>
                  Pickup
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  'エクシートとは',
                  'お知らせ',
                  '仲間を知る',
                  'コーポレートサイト',
                  '環境を知る',
                  '募集要項',
                  'よくある質問'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4">
                      <svg className="block w-full h-full" fill="none" viewBox="0 0 14 14">
                        <path clipRule="evenodd" d={svgPaths.p17cd8580} fill="#4346BE" fillRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white">
        <div className="max-w-[1920px] mx-auto px-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-8">
              <div className="w-[270px] h-10">
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 270 39.735">
                  <path d={svgPaths.p2c5ae000} fill="#212121" />
                  <path d={svgPaths.p23d25000} fill="#212121" />
                  <path d={svgPaths.p13a86400} fill="#212121" />
                  <path d={svgPaths.p23b37280} fill="#212121" />
                  <path d={svgPaths.p2c54d400} fill="#212121" />
                  <path d={svgPaths.p103c400} fill="#212121" />
                  <path d={svgPaths.p2ee8dd00} fill="#212121" />
                  <path d={svgPaths.p2393ea00} fill="#212121" />
                  <path d={svgPaths.p600d680} fill="#212121" />
                  <path d={svgPaths.p234cf100} fill="#212121" />
                  <path d={svgPaths.p2005b500} fill="#212121" />
                  <path d={svgPaths.p10e22f00} fill="#212121" />
                  <path d={svgPaths.pdf97f80} fill="#212121" />
                  <path d={svgPaths.p2d43f100} fill="#212121" />
                  <path d={svgPaths.p27f24300} fill="#212121" />
                  <path d={svgPaths.p245aa400} fill="#212121" />
                  <path d={svgPaths.p2c033880} fill="#212121" />
                  <path d={svgPaths.p34bea300} fill="#212121" />
                  <path d={svgPaths.p1460fb80} fill="#212121" />
                </svg>
              </div>
              <p className="font-medium tracking-[0.54px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#272727' }}>
                Recruitment Site
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-6 h-6">
                <img src={imgInstagramGlyphBlack} alt="Instagram" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <div className="border-t border-black pt-8">
            <p className="text-right font-normal tracking-[0.36px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#333' }}>
              ©株式会社エクシート All Rights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}