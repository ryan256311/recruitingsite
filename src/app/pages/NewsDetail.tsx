"use client";

import Link from "next/link";
import { NewsItem } from "../data/news";
import svgPaths from "../../imports/svg-corg4qlf3y";

interface NewsDetailProps {
  news: NewsItem;
}

export default function NewsDetail({ news }: NewsDetailProps) {
  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<article class="news-detail">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8 pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
            <Link href="/" className="text-[#707070] hover:text-[#313131]">TOP</Link>
            <span className="text-[#707070]">/</span>
            <Link href="/news" className="text-[#707070] hover:text-[#313131]">お知らせ</Link>
            <span className="text-[#707070]">/</span>
            <span className="text-[#313131]">{news.title}</span>
          </nav>

          {/* Date & Category */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-[#707070]"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
            >
              {news.date}
            </span>
            <span
              className={`text-white text-xs px-3 py-1 rounded-full ${
                news.category === 'graduate' ? 'bg-[#4346BE]' :
                news.category === 'news' ? 'bg-[#0064c8]' : 'bg-[#707070]'
              }`}
              style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
            >
              {news.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold tracking-[0.72px] mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px', lineHeight: '1.4' }}>
            {news.title}
          </h1>
        </div>
      </section>

      {/* ===== Content Section (02) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="content">`}</code>
        </div>

        <div className="max-w-[800px] mx-auto px-8">
          <div
            className="prose prose-lg max-w-none"
            style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '2' }}
          >
            {news.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index} className="mb-6">{paragraph}</p>
              ) : (
                <br key={index} />
              )
            ))}
          </div>
        </div>
      </section>

      {/* ===== Back Button Section (03) ===== */}
      <section className="relative py-16 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="navigation">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex justify-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-10 py-4 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-2 h-3 rotate-180" fill="none" viewBox="0 0 7.32727 12.4">
                <path d={svgPaths.p36961f00} fill="#2A2A2A" />
              </svg>
              <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                お知らせ一覧へ戻る
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
