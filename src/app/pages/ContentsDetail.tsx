"use client";

import Link from "next/link";
import { ContentItem, getRelatedContents } from "../data/contents";
import svgPaths from "../../imports/svg-corg4qlf3y";

interface ContentsDetailProps {
  content: ContentItem;
}

export default function ContentsDetail({ content }: ContentsDetailProps) {
  const relatedContents = getRelatedContents(content.id, 3);

  // Markdownのシンプルなパース（##見出しのみ対応）
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={elements.length} className="mb-6">
            {currentParagraph.join('\n')}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        flushParagraph();
        elements.push(
          <h2 key={index} className="font-bold text-2xl mt-10 mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushParagraph();
        elements.push(
          <h3 key={index} className="font-bold text-xl mt-8 mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        flushParagraph();
        elements.push(
          <h4 key={index} className="font-bold text-lg mt-6 mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
            {line.replace('#### ', '')}
          </h4>
        );
      } else if (line.startsWith('- ')) {
        flushParagraph();
        elements.push(
          <li key={index} className="ml-6 mb-2 list-disc">
            {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        );
      } else if (line.trim() === '') {
        flushParagraph();
      } else {
        currentParagraph.push(line.replace(/\*\*(.*?)\*\*/g, '$1'));
      }
    });
    flushParagraph();

    return elements;
  };

  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<article class="contents-detail">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8 pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 flex-wrap" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
            <Link href="/" className="text-[#707070] hover:text-[#313131]">TOP</Link>
            <span className="text-[#707070]">/</span>
            <Link href="/contents" className="text-[#707070] hover:text-[#313131]">Contents</Link>
            <span className="text-[#707070]">/</span>
            <Link href={`/contents?category=${content.category}`} className="text-[#707070] hover:text-[#313131]">
              {content.categoryLabel}
            </Link>
            <span className="text-[#707070]">/</span>
            <span className="text-[#313131]">{content.title}</span>
          </nav>

          {/* Category & Tags */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className="bg-[#4346BE] text-white text-xs px-3 py-1 rounded-full"
              style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
            >
              {content.categoryLabel}
            </span>
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#707070] text-[#707070] text-xs px-3 py-1 rounded-full"
                style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-bold tracking-[0.72px] mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px', lineHeight: '1.4' }}>
            {content.title}
          </h1>

          {/* Published Date */}
          <p className="text-[#707070]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px' }}>
            {content.publishedAt}
          </p>
        </div>
      </section>

      {/* ===== Featured Image Section (02) ===== */}
      <section className="relative py-12 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="featured-image">`}</code>
        </div>

        <div className="max-w-[900px] mx-auto px-8">
          {/* Image placeholder */}
          <div className="aspect-[16/9] bg-gray-200 rounded-2xl relative">
            <div className="absolute inset-0 flex items-center justify-center text-[#707070]">
              <svg className="w-20 h-20 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Content Section (03) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="content">`}</code>
        </div>

        <div className="max-w-[800px] mx-auto px-8">
          <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '2' }}>
            {renderContent(content.content)}
          </div>
        </div>
      </section>

      {/* ===== Related Contents Section (04) ===== */}
      {relatedContents.length > 0 && (
        <section className="relative py-24 border-b border-black/15">
          <div className="absolute top-[6px] left-[14px]">
            <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
          </div>
          <div className="absolute top-[6px] left-[54px]">
            <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="related">`}</code>
          </div>

          <div className="max-w-[1180px] mx-auto px-8">
            <h2 className="font-bold mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '24px' }}>
              関連記事
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {relatedContents.map((item) => (
                <Link
                  key={item.id}
                  href={`/contents/${item.id}`}
                  className="block border border-[#e0e0e0] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[#707070]">
                      <svg className="w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <span
                      className="text-[#4346BE] text-xs font-bold mb-2 block"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                    >
                      {item.categoryLabel}
                    </span>
                    <h3
                      className="font-bold line-clamp-2"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', lineHeight: '1.5' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Back Button Section (05) ===== */}
      <section className="relative py-16 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{relatedContents.length > 0 ? '05' : '04'}</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="navigation">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex justify-center">
            <Link
              href="/contents"
              className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-10 py-4 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-2 h-3 rotate-180" fill="none" viewBox="0 0 7.32727 12.4">
                <path d={svgPaths.p36961f00} fill="#2A2A2A" />
              </svg>
              <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                コンテンツ一覧へ戻る
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
