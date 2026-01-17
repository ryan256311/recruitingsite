"use client";

import { useState } from "react";
import Link from "next/link";
import { contentItems, contentCategories, contentTags, ContentCategoryId, getCategoryColor } from "../data/contents";
import svgPaths from "../../imports/svg-corg4qlf3y";

const ITEMS_PER_PAGE = 12;

export default function ContentsList() {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategoryId>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredContents = contentItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const tagMatch = !selectedTag || item.tags.includes(selectedTag);
    return categoryMatch && tagMatch;
  });

  // ページネーション計算
  const totalPages = Math.ceil(filteredContents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedContents = filteredContents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryClick = (categoryId: ContentCategoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // フィルター変更時は1ページ目に戻る
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1); // フィルター変更時は1ページ目に戻る
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページ上部にスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="contents">`}</code>
        </div>

        <div className="pl-[80px] pr-20 pt-8">
          <h1 className="font-bold tracking-[2.34px] mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>
            Contents
          </h1>
          <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            エクシートについて、さまざまな角度からご紹介します。
          </p>
        </div>
      </section>

      {/* ===== Contents List Section (02) ===== */}
      <section className="relative py-24 border-b border-black/15 overflow-visible">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="contents-list">`}</code>
        </div>

        <div className="pl-[80px] pr-20">
          <div className="flex gap-[7.29%] items-start">
            {/* Sidebar */}
            <div className="w-[307px] min-w-[250px] shrink-0 self-start sticky top-[100px]">
              {/* Categories */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Category</span>
                </div>
                <div className="space-y-3 ml-5">
                  {contentCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category.id ? 'font-bold' : ''}`}
                      style={{
                        backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                        color: selectedCategory === category.id ? '#FFFFFF' : '#313131',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category.id) {
                          e.currentTarget.style.backgroundColor = category.color;
                          e.currentTarget.style.color = '#FFFFFF';
                          const svg = e.currentTarget.querySelector('path');
                          if (svg) svg.setAttribute('fill', '#FFFFFF');
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category.id) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#313131';
                          const svg = e.currentTarget.querySelector('path');
                          if (svg) svg.setAttribute('fill', '#707070');
                        }
                      }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                        <path
                          clipRule="evenodd"
                          d={svgPaths.pf417300}
                          fill={selectedCategory === category.id ? '#FFFFFF' : '#707070'}
                          fillRule="evenodd"
                        />
                      </svg>
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Tag</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contentTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`border rounded-full px-3 py-1 transition-colors ${
                        selectedTag === tag
                          ? 'bg-[#4346BE] text-white border-[#4346BE]'
                          : 'bg-white text-[#313131] border-[#707070] hover:bg-[#333] hover:text-white hover:border-[#333]'
                      }`}
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contents Grid */}
            <div>
              <h2 className="font-bold mb-10" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>コンテンツ</h2>

              <div className="flex flex-wrap gap-x-[20px] gap-y-[60px] mb-[70px]" style={{ width: '1150px' }}>
                {paginatedContents.map((item) => (
                  <Link
                    key={item.id}
                    href={`/contents/${item.id}`}
                    className="group w-[370px]"
                  >
                    {/* Image placeholder */}
                    <div className="bg-[#505050] rounded-2xl aspect-square mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-white/30">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    {/* Category */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(item.category) }}></div>
                      <span className="text-sm font-medium" style={{ fontFamily: 'Noto Sans JP, sans-serif', color: '#313131' }}>
                        {item.categoryLabel}
                      </span>
                    </div>
                    {/* Title */}
                    <div className="mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '28px' }}>
                      <p className="line-clamp-2">{item.title}</p>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#707070] text-[#707070] text-xs px-3 py-1 rounded-full"
                          style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {filteredContents.length === 0 && (
                <p className="text-center py-12 text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  該当するコンテンツはありません。
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                  {/* 前へボタン */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      currentPage === 1
                        ? 'border-[#e0e0e0] text-[#e0e0e0] cursor-not-allowed'
                        : 'border-[#707070] text-[#313131] hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-2 h-3 rotate-180" fill="none" viewBox="0 0 7.32727 12.4">
                      <path d={svgPaths.p36961f00} fill={currentPage === 1 ? '#e0e0e0' : '#313131'} />
                    </svg>
                  </button>

                  {/* ページ番号 */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? 'bg-[#4346BE] text-white'
                          : 'border border-[#707070] text-[#313131] hover:bg-gray-100'
                      }`}
                      style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}
                    >
                      {page}
                    </button>
                  ))}

                  {/* 次へボタン */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      currentPage === totalPages
                        ? 'border-[#e0e0e0] text-[#e0e0e0] cursor-not-allowed'
                        : 'border-[#707070] text-[#313131] hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                      <path d={svgPaths.p36961f00} fill={currentPage === totalPages ? '#e0e0e0' : '#313131'} />
                    </svg>
                  </button>
                </div>
              )}

              {/* 件数表示 */}
              {filteredContents.length > 0 && (
                <p className="text-center mt-8 text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                  {filteredContents.length}件中 {startIndex + 1}〜{Math.min(startIndex + ITEMS_PER_PAGE, filteredContents.length)}件を表示
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
