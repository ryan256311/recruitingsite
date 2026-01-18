"use client";

import { useState } from "react";
import Link from "next/link";
import { newsItems, newsCategories, NewsCategoryId } from "../data/news";
import svgPaths from "../../imports/svg-corg4qlf3y";

export default function NewsList() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategoryId>('all');

  const filteredNews = selectedCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="news">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8 pt-8">
          <h1 className="font-bold tracking-[1.92px] mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '64px', lineHeight: '1.2' }}>
            お知らせ
          </h1>
          <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            採用に関するお知らせやイベント情報をお届けします。
          </p>
        </div>
      </section>

      {/* ===== News List Section (02) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="news-list">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex gap-16">
            {/* Sidebar */}
            <div className="w-[200px] shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                  <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                </svg>
                <span className="font-bold" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Category</span>
              </div>
              <div className="space-y-3">
                {newsCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-3 w-full text-left hover:opacity-70 transition-opacity ${
                      selectedCategory === category.id ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                      <path
                        clipRule="evenodd"
                        d={svgPaths.pf417300}
                        fill={selectedCategory === category.id ? '#4346BE' : '#707070'}
                        fillRule="evenodd"
                      />
                    </svg>
                    <span
                      className={selectedCategory === category.id ? 'font-bold' : ''}
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                    >
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* News List */}
            <div className="flex-1">
              <div className="space-y-0">
                {filteredNews.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className={`flex items-start gap-6 py-6 hover:bg-gray-50 transition-colors ${
                      index !== filteredNews.length - 1 ? 'border-b border-[#e0e0e0]' : ''
                    }`}
                  >
                    <span
                      className="text-[#707070] shrink-0"
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    >
                      {item.date}
                    </span>
                    <span
                      className={`shrink-0 text-white text-xs px-3 py-1 rounded-full ${
                        item.category === 'graduate' ? 'bg-[#4346BE]' :
                        item.category === 'news' ? 'bg-[#0064c8]' : 'bg-[#707070]'
                      }`}
                      style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                    >
                      {item.categoryLabel}
                    </span>
                    <span
                      className="flex-1 hover:underline"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <p className="text-center py-12 text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  該当するお知らせはありません。
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
