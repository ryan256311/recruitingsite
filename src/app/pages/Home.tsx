"use client";

import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-corg4qlf3y";
import heroImage from "../../assets/1989e711943a09dca66285d0e18edafbafe3fb9c.png";
import companyImage1 from "../../assets/2723acada69546ad44390f5e3d6b8730eb9c9744.png";
import companyImage2 from "../../assets/e6f7b37fca2d865e3f35dae1ac050a9f0649c3e5.png";
import companyImage3 from "../../assets/20381856004e60259556c5cc5cb1eaa849237729.png";

// FV Slideshow images
const slideshowImages = [heroImage, companyImage1, companyImage2, companyImage3];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== Nav/FV Title Section (01) ===== */}
      <section className="pt-32 pb-[20px] border-b border-black/15 relative">
        {/* Second vertical line - FV section only */}
        <div className="absolute top-0 left-[248px] w-px h-full bg-[#e0e0e0] z-0 pointer-events-none"></div>

        {/* Section Number */}
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<nav>`}</code>
        </div>
        <div className="absolute top-[102px] left-[262px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="message">`}</code>
        </div>

        <div className="flex pt-8">
          {/* Nav Area */}
          <div className="w-[248px] shrink-0 py-8 pl-[80px] pr-[14px]">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
              </svg>
              <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Menu</span>
            </div>
            <div className="space-y-3 ml-[8px]">
              {[
                { label: 'News', id: 'news' },
                { label: 'Company', id: 'company' },
                { label: 'Interview', id: 'interview' },
                { label: 'Environment', id: 'environment' },
                { label: 'Contents', id: 'contents' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      const headerOffset = 100;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="flex items-center gap-3 hover:opacity-70"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                    <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FV Title Area */}
          <div className="flex-1 py-8 pl-[21.4%] pr-20">
            <h1 className="font-bold tracking-[2.34px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '78px', lineHeight: '120px' }}>
              <span className="text-[#0074b9]">紙×デジタル</span>
              <br />
              情報発信を最適化
            </h1>
          </div>
        </div>

        {/* FV Image Slideshow */}
        <div className="w-[98.95%] ml-auto relative z-10" style={{ aspectRatio: '1900/1050', minHeight: '400px' }}>
          {slideshowImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`オフィスで働く社員たち ${index + 1}`}
              className={`w-full h-full object-cover rounded-tl-[15px] rounded-bl-[15px] slideshow-image ${index === currentSlide ? 'slideshow-visible' : 'slideshow-hidden'} ${index === 0 ? '' : 'absolute top-0 left-0'}`}
            />
          ))}
        </div>
      </section>

      {/* ===== News Section (02) ===== */}
      <section id="news" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="news">`}</code>
        </div>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-between">
            <div className="w-[54.58%]">
              <div className="mb-8">
                <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>お知らせ</h2>
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
            <div className="w-[34.33%]">
              <div className="mb-8">
                <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>採用情報</h2>
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
      <section id="company" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="company">`}</code>
        </div>
        <div className="pl-[80px] pr-20">
          <div className="flex justify-between mb-16">
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
        </div>
        <div className="border-t border-black/15 mt-16 mb-[20px]"></div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-6 pl-[80px] animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 shrink-0">
                {[
                  { img: companyImage1, width: 440 },
                  { img: companyImage2, width: 510 },
                  { img: companyImage3, width: 440 },
                  { img: companyImage1, width: 400 },
                  { img: companyImage2, width: 440 },
                  { img: companyImage3, width: 510 },
                ].map((item, index) => (
                  <div key={index} className="shrink-0 rounded-2xl overflow-hidden" style={{ width: `${item.width}px` }}>
                    <img src={item.img.src} alt={`社員の様子${index + 1}`} className="w-full aspect-square object-cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-black/15 mt-[20px]"></div>
      </section>

      {/* ===== Interview Head Section (04) ===== */}
      <section id="interview" className="relative pt-[150px] pb-[120px] border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="interview">`}</code>
        </div>
        <div className="pl-[80px] pr-20">
          <div className="grid grid-cols-[400px_1fr] gap-16">
            <h2 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>仲間を知る</h2>
            <p className="max-w-[1025px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。紙とデジタルの融合を軸に、それぞれが専門性を活かしながら新しい価値を生み出しています。日々の仕事や関わりの中で生まれるリアルな声を、社員インタビューやクロストークを通じてご紹介します。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Interview Content Section ===== */}
      <section className="relative pt-[124px] pb-[135px] border-b border-black/15">
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section roll="interview-contents">`}</code>
        </div>
        <div className="pl-[80px] pr-20">
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
      <section id="environment" className="relative bg-gradient-to-r from-[#0074b9] to-[#0064c8]">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-white" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>05</span>
        </div>
        <div className="absolute top-[6px] left-[54px] z-10">
          <span className="bg-white px-2 py-0.5">
            <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="environment">`}</code>
          </span>
        </div>
        <div className="pl-[80px] pr-20">
          <div className="flex gap-[214px]">
            <div className="w-[800px] flex gap-[20px] h-[800px] overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <div className="flex flex-col gap-4 animate-scroll-down">
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex flex-col gap-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-[#505050] rounded-2xl w-full" style={{ aspectRatio: '400/560' }}></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex flex-col gap-4 animate-scroll-up">
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex flex-col gap-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-[#505050] rounded-2xl w-full" style={{ aspectRatio: '400/560' }}></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[630px] text-white flex flex-col justify-center">
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
      <section id="contents" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>06</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="contents">`}</code>
        </div>
        <div className="pl-[80px] pr-20">
          <div className="flex gap-[7.29%]">
            <div className="w-[307px] min-w-[250px] shrink-0">
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
              <div className="w-[1150px] flex flex-wrap gap-x-[20px] gap-y-[60px] mb-[70px]">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <a key={item} href="#" className="group w-[370px]">
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
      <section className="relative border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>07</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="recruit">`}</code>
        </div>
        <div className="overflow-hidden pt-[40px]">
          <div className="flex items-center gap-6 pl-[80px] animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 shrink-0">
                {[
                  { img: companyImage1, width: 440 },
                  { img: companyImage2, width: 510 },
                  { img: companyImage3, width: 440 },
                  { img: companyImage1, width: 400 },
                  { img: companyImage2, width: 440 },
                  { img: companyImage3, width: 510 },
                ].map((item, index) => (
                  <div key={index} className="shrink-0 rounded-2xl overflow-hidden" style={{ width: `${item.width}px` }}>
                    <img src={item.img.src} alt={`採用イメージ${index + 1}`} className="w-full aspect-square object-cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-black/15 mt-[20px]"></div>
        <div className="py-24">
          <div className="max-w-[1180px] mx-auto flex justify-between">
            <h2 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>採用について</h2>
            <div className="w-[630px]">
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
    </>
  );
}
