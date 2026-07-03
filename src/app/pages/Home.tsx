"use client";

import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-corg4qlf3y";
import ContentPhoto from "../components/ContentPhoto";
import fvImage1 from "../../assets/fv-1.jpg";
import fvImage2 from "../../assets/fv-2.jpg";
import fvImage3 from "../../assets/fv-3.jpg";
import companySlide1 from "../../assets/company-slide-1.jpg";
import companySlide2 from "../../assets/company-slide-2.jpg";
import companySlide3 from "../../assets/company-slide-3.jpg";
import companySlide4 from "../../assets/company-slide-4.jpg";
import companySlide5 from "../../assets/company-slide-5.jpg";
import companySlide6 from "../../assets/company-slide-6.jpg";
import companySlide7 from "../../assets/company-slide-7.jpg";
import environment1 from "../../assets/environment-1.jpg";
import environment2 from "../../assets/environment-2.jpg";
import environment3 from "../../assets/environment-3.jpg";
import environment4 from "../../assets/environment-4.jpg";
import environment5 from "../../assets/environment-5.jpg";
import environment6 from "../../assets/environment-6.jpg";
import environment7 from "../../assets/environment-7.png";
import { contentItems, contentCategories, getCategoryColor } from "../data/contents";
import Link from "next/link";

// FV Slideshow images
const slideshowImages = [fvImage1, fvImage2, fvImage3];

// Company section (03) slider images
const companySlideImages = [
  { img: companySlide1, widthClass: "w-[440px] max-[1039px]:w-[300px] max-[539px]:w-[220px]" },
  { img: companySlide2, widthClass: "w-[510px] max-[1039px]:w-[350px] max-[539px]:w-[255px]" },
  { img: companySlide3, widthClass: "w-[440px] max-[1039px]:w-[300px] max-[539px]:w-[220px]" },
  { img: companySlide4, widthClass: "w-[400px] max-[1039px]:w-[280px] max-[539px]:w-[210px]" },
  { img: companySlide5, widthClass: "w-[440px] max-[1039px]:w-[300px] max-[539px]:w-[220px]" },
  { img: companySlide6, widthClass: "w-[510px] max-[1039px]:w-[350px] max-[539px]:w-[255px]" },
  { img: companySlide7, widthClass: "w-[440px] max-[1039px]:w-[300px] max-[539px]:w-[220px]" },
];

// カテゴリアイコン(Lucide / MITライセンス相当のラインアイコンをインライン化)
const categoryIconPaths: Record<string, JSX.Element> = {
  all: (
    <>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </>
  ),
  company: (
    <>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
      <path d="M12 10h.01" /><path d="M12 14h.01" />
      <path d="M16 10h.01" /><path d="M16 14h.01" />
      <path d="M8 10h.01" /><path d="M8 14h.01" />
    </>
  ),
  work: (
    <>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </>
  ),
  members: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  environment: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  dialogue: (
    <>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </>
  ),
};

function CategoryIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {categoryIconPaths[id] ?? categoryIconPaths.all}
    </svg>
  );
}

// Environment section (05) slider images (left column scrolls down, right column scrolls up)
const environmentImagesLeft = [environment1, environment2, environment3, environment4];
const environmentImagesRight = [environment5, environment6, environment7];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== Nav/FV Title Section (01) ===== */}
      <section className="pt-[90px] max-[1039px]:pt-[68px] max-[539px]:pt-[58px] pb-[20px] border-b border-black/15 relative">
        {/* Second vertical line - FV section only */}
        <div className="absolute top-0 left-[248px] w-px h-full bg-[#e0e0e0] z-0 pointer-events-none max-[1039px]:hidden"></div>

        {/* Section Number */}
        <div className="absolute top-[102px] left-[14px] max-[1039px]:top-[75px] max-[539px]:top-[59px] max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px] max-[1039px]:hidden">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<nav>`}</code>
        </div>
        <div className="absolute top-[102px] left-[262px] max-[1039px]:top-[75px] max-[1039px]:left-[54px] max-[539px]:top-[59px] max-[539px]:left-[28px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<h1 class="message">`}</code>
        </div>

        <div className="flex max-[1039px]:flex-col-reverse">
          {/* Nav Area */}
          <div className="relative w-[248px] shrink-0 pt-[110px] pb-8 pl-[80px] pr-[14px] max-[1039px]:w-full max-[1039px]:pl-[82px] max-[1039px]:pr-[20px] max-[1039px]:pt-[40px] max-[1039px]:pb-[40px] max-[539px]:pl-[40px] max-[539px]:pr-[20px]">
            {/* <nav> marker - tablet only, top-left of nav area */}
            <div className="hidden max-[1039px]:block absolute top-0 left-[48px] max-[539px]:left-[28px]">
              <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<nav>`}</code>
            </div>
            <div className="flex items-center gap-3 mb-6 max-[1039px]:hidden max-[539px]:hidden">
              <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
              </svg>
              <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Menu</span>
            </div>
            <div className="space-y-3 ml-[8px] max-[1039px]:grid max-[1039px]:grid-cols-none max-[1039px]:grid-flow-col max-[1039px]:grid-rows-3 max-[1039px]:gap-x-8 max-[1039px]:gap-y-[14px] max-[1039px]:space-y-0 max-[1039px]:ml-0 max-[1039px]:max-w-[400px] max-[539px]:grid-cols-none max-[539px]:grid-flow-col max-[539px]:grid-rows-3">
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
                  <span className="text-[16px] max-[1039px]:font-medium max-[539px]:font-medium max-[539px]:text-[14px]" style={{ fontFamily: 'Verdana, sans-serif' }}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FV Title Area */}
          <div className="flex-1 py-[85px] flex justify-center max-[1039px]:justify-start max-[1039px]:pl-[80px] max-[1039px]:pr-[20px] max-[1039px]:py-[50px] max-[1039px]:border-b max-[1039px]:border-black/15 max-[539px]:pl-[40px] max-[539px]:pr-[20px] max-[539px]:py-[50px] max-[539px]:border-b max-[539px]:border-black/15">
            <h1 className="font-bold tracking-[2.34px] max-[1039px]:!text-[48px] max-[1039px]:!leading-[1.4] max-[539px]:!text-[36px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '78px', lineHeight: '120px' }}>
              <span className="text-[#0074b9]">紙×デジタル</span>
              <br />
              情報発信を
              <br className="hidden max-[1039px]:block" />
              最適化
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
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="news">`}</code>
        </div>
        <div className="pl-[80px] pr-20 max-[539px]:pl-[40px] max-[539px]:pr-[40px]">
          <div className="flex justify-between max-[1039px]:flex-col max-[1039px]:gap-12">
            <div className="w-[54.58%] max-[1039px]:w-full">
              <div className="mb-8">
                <h2 className="font-bold tracking-[1.08px] mb-2 max-[539px]:!text-[26px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>お知らせ</h2>
                <div className="w-12 h-[2px] bg-[#313131] max-[539px]:w-[34px]"></div>
              </div>
              <div className="space-y-4">
                {[
                  { date: '2026.07.03', text: '福井労働局主催「高校生サマー求人企業説明会」に参加いたします', href: 'https://jsite.mhlw.go.jp/fukui-roudoukyoku/hw/gakusei_tokusetsusite_00010.html' }
                ].map((item, index) => (
                  <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="flex gap-8 max-[539px]:flex-col max-[539px]:gap-1 hover:opacity-70" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                    <span className="font-normal whitespace-nowrap">{item.date}</span>
                    <span className="font-medium">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="w-[34.33%] max-[1039px]:w-full">
              <div className="mb-8">
                <h2 className="font-bold tracking-[1.08px] mb-2 max-[539px]:!text-[26px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>採用情報</h2>
                <div className="w-12 h-[2px] bg-[#313131] max-[539px]:w-[34px]"></div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'キャリア採用向け', href: '/jobs/career', variant: 'invert' },
                  { label: '新卒採用向け', href: '/jobs/graduate' },
                  { label: '会社見学', href: '/company-visit', variant: 'blue' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`block border rounded-md p-5 transition-colors ${
                      item.variant === 'blue'
                        ? 'border-[#0064c8] bg-[#0064c8] text-white hover:bg-[#0057b0]'
                        : item.variant === 'invert'
                        ? 'border-[#313131] bg-[#313131] text-white hover:bg-[#4a4a4a]'
                        : 'border-[#707070] bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px' }}>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Company Section (03) ===== */}
      <section id="company" className="relative pt-24">
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="company">`}</code>
        </div>
        <div className="pl-[80px] pr-20 max-[539px]:pl-[40px] max-[539px]:pr-[40px]">
          <div className="flex justify-between mb-16 max-[1039px]:flex-col max-[1039px]:gap-10">
            <div>
              <h2 className="font-bold max-[1039px]:!text-[36px] max-[1039px]:!leading-[1.5] max-[539px]:!text-[26px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '48px', lineHeight: '80px' }}>
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
              <Link href="/contents?category=company" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>エクシートとは</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-black/15 mt-16 mb-[20px]"></div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-6 max-[539px]:gap-3 pl-[80px] max-[539px]:pl-[40px] animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 max-[539px]:gap-3 shrink-0">
                {companySlideImages.map((item, index) => (
                  <div key={index} className={`shrink-0 rounded-2xl overflow-hidden ${item.widthClass}`}>
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
      <section id="interview" className="relative pt-[150px] pb-[120px] max-[539px]:pt-[80px] max-[539px]:pb-[60px] border-b border-black/15">
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>04</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="interview">`}</code>
        </div>
        <div className="pl-[80px] pr-20 max-[539px]:pl-[40px] max-[539px]:pr-[40px]">
          <div className="grid grid-cols-[400px_1fr] gap-16 max-[1039px]:grid-cols-1 max-[1039px]:gap-6">
            <h2 className="font-bold max-[1039px]:!text-[48px] max-[539px]:!text-[26px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>仲間を知る</h2>
            <p className="max-w-[1025px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。紙とデジタルの融合を軸に、それぞれが専門性を活かしながら新しい価値を生み出しています。日々の仕事や関わりの中で生まれるリアルな声を、社員インタビューやクロストークを通じてご紹介します。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Interview Content Section ===== */}
      <section className="relative pt-[124px] pb-[135px] border-b border-black/15">
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section roll="interview-contents">`}</code>
        </div>
        <div className="pl-[80px] pr-20 max-[539px]:pl-[40px] max-[539px]:pr-[40px]">
          <h3 className="font-bold mb-12 max-[539px]:!text-[26px] max-[539px]:mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>インタビュー &<br />クロストーク</h3>
          <div className="grid grid-cols-5 gap-6 max-[1039px]:grid-cols-3 max-[539px]:grid-cols-1">
            {contentItems
              .filter(item => item.tags.includes('インタビュー'))
              .sort((a, b) => new Date(b.publishedAt.replace(/\./g, '-')).getTime() - new Date(a.publishedAt.replace(/\./g, '-')).getTime())
              .slice(0, 5)
              .map((item) => (
              <Link key={item.id} href={`/contents/${item.id}`} className="group">
                <div className="bg-[#505050] rounded-2xl aspect-square mb-4 relative overflow-hidden">
                  <ContentPhoto src={item.image} alt={item.title} />
                </div>
                <div className="mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '28px' }}>
                  <p className="line-clamp-2">{item.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>#{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Environment Section (05) ===== */}
      <section id="environment" className="relative bg-gradient-to-r from-[#0074b9] to-[#0064c8]">
        {/* このセクションは青背景でページ全体の縦ガイド線が隠れるため、白の縦線を独自に配置(Layoutの線と同じ左位置) */}
        <div className="absolute top-0 bottom-0 left-[40px] max-[539px]:left-[20px] w-px bg-white/40 z-0 pointer-events-none"></div>
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-white" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>05</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px] z-10">
          <span className="bg-white px-2 py-0.5">
            <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="environment">`}</code>
          </span>
        </div>
        <div className="relative z-[1] pl-[80px] pr-20 max-[539px]:pl-[40px] max-[539px]:pr-[40px] max-[1039px]:py-16">
          <div className="min-[1040px]:gap-[clamp(48px,6vw,120px)] flex min-[1040px]:min-h-[675px] min-[1040px]:items-stretch max-[1039px]:flex-col max-[1039px]:gap-10">
            <div className="min-[1040px]:w-[clamp(480px,50vw,860px)] min-[1040px]:shrink-0 min-[1040px]:relative max-[1039px]:w-full">
              {/* 縦スクロール(2列)スライダー: PC(>1039px)で表示。幅=56.25vw(連続縮小)→ 正方形なので高さもスライダーに連動。セクション高さの下限675pxは親のmin-hで担保 */}
              <div className="w-full min-[1040px]:absolute min-[1040px]:inset-0 flex gap-[20px] overflow-hidden max-[1039px]:hidden">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex flex-col gap-4 animate-scroll-down">
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex flex-col gap-4">
                        {environmentImagesLeft.map((image, index) => (
                          <div key={index} className="rounded-2xl overflow-hidden w-full" style={{ aspectRatio: '400/560' }}>
                            <img src={image.src} alt={`働く環境${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex flex-col gap-4 animate-scroll-up">
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex flex-col gap-4">
                        {environmentImagesRight.map((image, index) => (
                          <div key={index} className="rounded-2xl overflow-hidden w-full" style={{ aspectRatio: '400/560' }}>
                            <img src={image.src} alt={`働く環境${index + 4}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* 横スクロール(2行)スライダー: タブレット・スマホ(≤1039px)で表示。上段=右→左 / 下段=左→右。負マージンでセクションの左右パディングを打ち消し全幅表示 */}
              <div className="hidden max-[1039px]:flex max-[1039px]:flex-col gap-4 max-[1039px]:-mx-[80px] max-[539px]:-mx-[40px]">
                <div className="overflow-hidden">
                  <div className="flex w-max animate-scroll-h-left">
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex gap-4 shrink-0 pr-4">
                        {environmentImagesLeft.map((image, index) => (
                          <div key={index} className="shrink-0 rounded-2xl overflow-hidden w-[220px] max-[539px]:w-[150px]" style={{ aspectRatio: '400/560' }}>
                            <img src={image.src} alt={`働く環境${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="flex w-max animate-scroll-h-right">
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className="flex gap-4 shrink-0 pr-4">
                        {environmentImagesRight.map((image, index) => (
                          <div key={index} className="shrink-0 rounded-2xl overflow-hidden w-[220px] max-[539px]:w-[150px]" style={{ aspectRatio: '400/560' }}>
                            <img src={image.src} alt={`働く環境${index + 4}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[630px] text-white flex flex-col justify-center min-w-0 max-[1039px]:w-full">
              <h2 className="font-bold mb-8 max-[1039px]:!text-[48px] max-[539px]:!text-[26px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: 'clamp(48px, 4.5vw, 72px)', lineHeight: '1.2' }}>環境を知る</h2>
              <p className="mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                当社では、「挑戦を楽しみながら、安心して働ける環境をつくる」という考えのもと、働きやすく成長しやすい職場づくりに取り組んでいます。ここでは、当社のカルチャーや福利厚生、人事制度など、日々の仕事を支える環境についてご紹介します。
              </p>
              <Link href="/contents?category=environment" className="inline-flex items-center gap-4 border border-white bg-white text-[#313131] rounded-full px-8 py-3 w-fit hover:bg-gray-100 transition-colors">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>働く環境をのぞく</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contents Section (06) ===== */}
      <section id="contents" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>06</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="contents">`}</code>
        </div>
        <div className="pl-[80px] pr-20 max-[539px]:pl-[40px] max-[539px]:pr-[40px]">
          <div className="flex gap-[7.29%] max-[1400px]:gap-[5%] max-[1200px]:flex-col max-[1200px]:gap-10">
            <div className="w-[307px] min-w-[250px] max-[1200px]:w-full">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Category</span>
                </div>
                <div className="space-y-3 ml-5 max-[1200px]:flex max-[1200px]:flex-wrap max-[1200px]:gap-2 max-[1200px]:space-y-0 max-[1200px]:ml-0">
                  {contentCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-all max-[1200px]:w-auto max-[1200px]:gap-1.5 max-[1200px]:rounded-full max-[1200px]:px-3 max-[1200px]:py-1 max-[1200px]:border ${selectedCategory === category.id ? 'font-bold max-[1200px]:border-transparent' : 'max-[1200px]:border-[#707070] max-[1200px]:!bg-transparent max-[1200px]:!text-[#313131]'}`}
                      style={{
                        backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                        color: selectedCategory === category.id ? '#FFFFFF' : '#313131',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category.id) {
                          e.currentTarget.style.backgroundColor = category.color;
                          e.currentTarget.style.color = '#FFFFFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category.id) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#313131';
                        }
                      }}
                    >
                      <CategoryIcon id={category.id} className="w-[18px] h-[18px] shrink-0 max-[1200px]:w-4 max-[1200px]:h-4" />
                      <span className="max-[1200px]:!text-[14px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{category.label}</span>
                    </button>
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
                  {['Career', '新卒採用', 'キャリア採用', 'カルチャー', 'インタビュー', '制度'].map((tag, index) => (
                    <Link
                      key={index}
                      href={`/contents?tag=${tag}`}
                      className="border border-[#707070] rounded-full px-3 py-1 hover:bg-[#333] hover:text-white hover:border-[#333] transition-colors"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="grow shrink basis-[843px] min-[1201px]:min-w-[700px] max-[1200px]:basis-auto max-[1200px]:w-full">
              <h2 className="font-bold mb-10 max-[539px]:!text-[26px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>コンテンツ</h2>
              {(() => {
                const filtered = contentItems
                  .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
                  .sort((a, b) => new Date(b.publishedAt.replace(/\./g, '-')).getTime() - new Date(a.publishedAt.replace(/\./g, '-')).getTime());

                // 投稿が0件の場合は準備中メッセージを表示
                if (filtered.length === 0) {
                  return (
                    <div className="w-full max-w-[1150px] py-24 text-center text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px' }}>
                      現在準備中です。
                    </div>
                  );
                }

                // 表示上限: PC(>1200px)=6件、スマホ・タブレット(≤1200px)=4件(5,6件目はCSSで非表示)
                return (
                  <>
                    <div className="w-full max-w-[1150px] flex flex-wrap gap-x-[20px] gap-y-[60px] max-[539px]:gap-y-10 mb-[70px]">
                      {filtered.slice(0, 6).map((item, idx) => (
                      <Link key={item.id} href={`/contents/${item.id}`} className={`group basis-[calc(33.333%-14px)] min-w-[240px] max-[1039px]:basis-[calc(50%-10px)] max-[1039px]:min-w-0 max-[539px]:basis-full ${idx >= 4 ? 'max-[1200px]:hidden' : ''}`}>
                        <div className="bg-[#505050] rounded-2xl aspect-square mb-4 relative overflow-hidden">
                          <ContentPhoto src={item.image} alt={item.title} />
                        </div>
                        {/* カテゴリ */}
                        <div className="mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(item.category) }}></div>
                          <span className="text-sm font-medium" style={{ fontFamily: 'Noto Sans JP, sans-serif', color: '#313131' }}>
                            {item.categoryLabel}
                          </span>
                        </div>
                        {/* タイトル */}
                        <div className="mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '28px' }}>
                          <p className="line-clamp-2">{item.title}</p>
                        </div>
                        {/* タグ */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="border border-[#707070] text-[#707070] text-xs px-3 py-1 rounded-full" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>#{tag}</span>
                          ))}
                        </div>
                      </Link>
                      ))}
                    </div>
                    {/* もっと見る: 表示件数(PC6/モバイル4)を超える投稿がある時のみ表示 */}
                    {filtered.length > 4 && (
                      <div className={`flex justify-center ${filtered.length <= 6 ? 'min-[1201px]:hidden' : ''}`}>
                        <Link href="/contents" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                          <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>もっと見る</span>
                          <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                            <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
