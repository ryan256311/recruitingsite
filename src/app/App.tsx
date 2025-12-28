import svgPaths from "../imports/svg-corg4qlf3y";
import heroImage from "../assets/1989e711943a09dca66285d0e18edafbafe3fb9c.png";
import companyImage1 from "../assets/2723acada69546ad44390f5e3d6b8730eb9c9744.png";
import companyImage2 from "../assets/e6f7b37fca2d865e3f35dae1ac050a9f0649c3e5.png";
import companyImage3 from "../assets/20381856004e60259556c5cc5cb1eaa849237729.png";
import imgInstagramGlyphBlack from "../assets/f171275cdf27d311fd0a3b1f6ef7b82227a50ce2.png";

export default function App() {
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden relative">
      {/* Global vertical lines */}
      <div className="fixed top-0 left-[40px] w-px h-full bg-[#e0e0e0] z-10 pointer-events-none"></div>
      <div className="fixed top-0 left-[248px] w-px h-full bg-[#e0e0e0] z-10 pointer-events-none"></div>

      {/* ===== Header ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
        <div className="max-w-[1920px] mx-auto px-20 py-6 flex items-center justify-between">
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
            <span className="font-medium tracking-[0.54px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px' }}>
              Recruitment Site
            </span>
          </div>
          <nav className="flex items-center gap-12">
            <a href="#" className="font-bold tracking-[0.42px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>新卒採用</a>
            <a href="#" className="font-bold tracking-[0.42px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>キャリア採用</a>
            <a href="#" className="font-bold tracking-[0.42px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>よくある質問</a>
            <a href="#" className="bg-[#0064c8] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
              会社見学会にエントリー
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="white" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* ===== Nav/FV Title Section (01) ===== */}
      <section className="pt-32 border-b border-black relative">
        {/* Section Number */}
        <div className="absolute top-36 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>

        <div className="flex">
          {/* Nav Area (40px ~ 248px) */}
          <div className="w-[248px] shrink-0 py-8 pl-[54px] pr-[14px]">
            <div className="mb-6">
              <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<nav>`}</code>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
              </svg>
              <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Menu</span>
            </div>
            <div className="space-y-3 ml-5">
              {['News', 'Company', 'News', 'Interview', 'Contents'].map((item, index) => (
                <a key={index} href="#" className="flex items-center gap-3 hover:opacity-70">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                    <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>{item}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FV Title Area (248px ~) */}
          <div className="flex-1 py-8 pl-[14px] pr-20">
            <div className="mb-8">
              <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="message">`}</code>
            </div>
            <h1 className="font-bold tracking-[2.34px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '78px', lineHeight: '120px' }}>
              <span className="text-[#0074b9]">紙×デジタル</span>
              <br />
              情報発信を最適化
            </h1>
          </div>
        </div>

        {/* FV Image */}
        <div className="w-full">
          <img src={heroImage} alt="オフィスで働く社員たち" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* ===== News Section (02) ===== */}
      <section className="relative py-24 border-b border-black">
        <div className="absolute top-6 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="news">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-2 gap-32">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-bold tracking-[1.08px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>お知らせ</h2>
                <div className="w-12 h-px bg-[#313131]"></div>
              </div>
              <div className="space-y-4">
                {[
                  { date: '2025.04.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2025.03.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2025.02.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2025.01.01', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' },
                  { date: '2024.10.21', text: 'キャリア採用：2025年度キャリア採用選考情報を公開しました' }
                ].map((item, index) => (
                  <a key={index} href="#" className="flex gap-8 hover:opacity-70" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                    <span className="font-semibold whitespace-nowrap">{item.date}</span>
                    <span className="font-medium">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-bold tracking-[1.08px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>採用情報</h2>
                <div className="w-12 h-px bg-[#313131]"></div>
              </div>
              <div className="space-y-4">
                {['キャリア採用向け', '新卒採用向け', 'インターンシップ'].map((item, index) => (
                  <a key={index} href="#" className="block border border-[#707070] rounded-md p-5 bg-white hover:bg-gray-50 transition-colors">
                    <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px' }}>{item}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Company Section (03) ===== */}
      <section className="relative py-24 border-b border-black">
        <div className="absolute top-6 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="company">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-2 gap-24 mb-16">
            <div>
              <h2 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '48px', lineHeight: '80px' }}>
                "やってみたい"が、<br />動き出す場所。<br />挑戦を楽しみ、<br />成長を重ねる<br /><br />―その先にある未来へ。
              </h2>
            </div>
            <div>
              <div className="mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                <p className="mb-6">私たちは、紙とデジタルの融合によって、<br />マーケティングの新しい可能性を切り拓いています。</p>
                <p className="mb-6">部署の垣根を超えてアイデアが飛び交い、個々の挑戦が<br />チームの力になる、そんな風土がここにはあります。</p>
                <p className="mb-6">「もっとこうしたら、面白くなる」<br />「これは誰かの心を動かせるはず」<br />そんな想いを持って動ける人にこそ、<br />この場所はぴったりです。</p>
                <p>さあ、私たちと一緒に。<br />変化を恐れず、未来を描く仲間になりませんか？</p>
              </div>
              <a href="#" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>エクシートとは</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[companyImage1, companyImage2, companyImage3, companyImage1].map((img, index) => (
              <div key={index} className="rounded-2xl overflow-hidden">
                <img src={img} alt={`社員の様子${index + 1}`} className="w-full h-[300px] object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interview Head Section (04) ===== */}
      <section className="relative py-24 border-b border-black">
        <div className="absolute top-6 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="interview">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-[400px_1fr] gap-16">
            <h2 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>仲間を知る</h2>
            <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。紙とデジタルの融合を軸に、それぞれが専門性を活かしながら新しい価値を生み出しています。日々の仕事や関わりの中で生まれるリアルな声を、社員インタビューやクロストークを通じてご紹介します。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Interview Content Section ===== */}
      <section className="relative py-16 border-b border-black">
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section roll="interview-contents">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <h3 className="font-bold mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>インタビュー & クロストーク</h3>
          <div className="grid grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <a key={item} href="#" className="group">
                <div className="bg-[#505050] rounded-2xl aspect-square mb-4"></div>
                <div className="mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '28px' }}>
                  <p>プレイヤーからリーダーへ</p>
                  <p>昇格を通じて描く自己成長の軌跡</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>#インタビュー</span>
                  <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>#職種：デザイナー</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Environment Section (05) ===== */}
      <section className="relative py-24 bg-gradient-to-r from-[#0074b9] to-[#0064c8]">
        <div className="absolute top-6 left-[14px]">
          <span className="text-white" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>05</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <span className="bg-white px-2 py-0.5">
            <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="environment">`}</code>
          </span>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-2 gap-24">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#505050] rounded-2xl h-[200px]"></div>
              <div className="bg-[#505050] rounded-2xl h-[200px]"></div>
              <div className="bg-[#505050] rounded-2xl h-[400px]"></div>
              <div className="bg-[#505050] rounded-2xl h-[400px]"></div>
              <div className="bg-[#505050] rounded-2xl h-[200px]"></div>
              <div className="bg-[#505050] rounded-2xl h-[200px]"></div>
            </div>
            <div className="text-white flex flex-col justify-center">
              <h2 className="font-bold mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>環境を知る</h2>
              <p className="mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                当社では、「挑戦を楽しみながら、安心して働ける環境をつくる」という考えのもと、働きやすく成長しやすい職場づくりに取り組んでいます。ここでは、当社のカルチャーや福利厚生、人事制度など、日々の仕事を支える環境についてご紹介します。
              </p>
              <a href="#" className="inline-flex items-center gap-4 border border-white bg-white text-[#313131] rounded-full px-8 py-3 w-fit hover:bg-gray-100 transition-colors">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>働く環境をのぞく</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contents Section (06) ===== */}
      <section className="relative py-24 border-b border-black">
        <div className="absolute top-6 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>06</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="contents">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-[280px_1fr] gap-16">
            <div>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Category</span>
                </div>
                <div className="space-y-3 ml-5">
                  {['全て', '会社を知る', '仕事を知る', '仲間を知る', '環境を知る'].map((item, index) => (
                    <a key={index} href="#" className="flex items-center gap-3 hover:opacity-70">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                        <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                      </svg>
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Tag</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['#インタビュー', '#職種：デザイナー', '#クロストーク', '#制度', '#新卒採用', '#キャリア採用'].map((tag, index) => (
                    <a key={index} href="#" className="border border-[#707070] rounded-full px-3 py-1 hover:bg-gray-100 transition-colors" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{tag}</a>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-10" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>コンテンツ</h2>
              <div className="grid grid-cols-3 gap-8 mb-12">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <a key={item} href="#" className="group">
                    <div className="bg-[#505050] rounded-2xl aspect-square mb-4"></div>
                    <div className="mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '28px' }}>
                      <p>プレイヤーからリーダーへ</p>
                      <p>昇格を通じて描く自己成長の軌跡</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>#インタビュー</span>
                      <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>#職種：デザイナー</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex justify-center">
                <a href="#" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                  <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>もっと見る</span>
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                    <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Recruit Section (07) ===== */}
      <section className="relative py-24 border-b border-black">
        <div className="absolute top-6 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>07</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="recruit">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-5 gap-4 mb-16">
            {[companyImage1, companyImage2, companyImage3, companyImage1, companyImage2].map((img, index) => (
              <div key={index} className="rounded-2xl overflow-hidden">
                <img src={img} alt={`採用イメージ${index + 1}`} className="w-full h-[200px] object-cover" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-24">
            <h2 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>採用について</h2>
            <div>
              <div className="mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                <p className="mb-4">当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。</p>
                <p className="mb-4">さあ、私たちと一緒に。変化を恐れず、未来を描く仲間になりませんか？</p>
                <p>あなたのエントリーをお待ちしております。</p>
              </div>
              <a href="#" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>募集要項</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer Section (08) ===== */}
      <section className="relative py-24 border-b border-black">
        <div className="absolute top-6 left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>08</span>
        </div>
        <div className="absolute top-6 left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="(X)plode">`}</code>
        </div>
        <div className="pl-[262px] pr-20">
          <div className="grid grid-cols-2 gap-24">
            <div>
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px', lineHeight: '1.1' }}>Let ideas (X)plode.</h2>
              <p className="font-bold mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '24px' }}>変化を楽しみ挑戦し続けよう。</p>
              <div className="space-y-4 max-w-[400px]">
                <a href="#" className="block border border-[#707070] bg-white rounded-md p-5 hover:bg-gray-50 transition-colors">
                  <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>インターンシップ</span>
                </a>
                <a href="#" className="block border border-[#707070] bg-[#333] text-white rounded-md p-5 hover:bg-[#444] transition-colors">
                  <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>キャリア採用エントリー</span>
                </a>
                <a href="#" className="block border border-[#707070] bg-[#333] text-white rounded-md p-5 hover:bg-[#444] transition-colors">
                  <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>27卒エントリー</span>
                </a>
              </div>
              <div className="mt-8">
                <a href="#" className="inline-block">
                  <img src={imgInstagramGlyphBlack} alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 13.0063 13.0838">
                  <path d={svgPaths.pfae6600} fill="#4346BE" />
                </svg>
                <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px' }}>Pickup</span>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {['エクシートとは', 'お知らせ', '仲間を知る', 'コーポレートサイト', '環境を知る', '募集要項', 'よくある質問'].map((item, index) => (
                  <a key={index} href="#" className="flex items-center gap-3 hover:opacity-70">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                      <path clipRule="evenodd" d={svgPaths.p17cd8580} fill="#4346BE" fillRule="evenodd" />
                    </svg>
                    <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer Bottom ===== */}
      <footer className="py-12 bg-white">
        <div className="pl-[262px] pr-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-[200px] h-8">
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
              <span className="font-medium tracking-[0.54px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#272727' }}>Recruitment Site</span>
            </div>
            <p className="font-normal tracking-[0.36px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#333' }}>©株式会社エクシート All Rights</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
