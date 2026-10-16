// クライアント側のフックを使わないため、サーバーコンポーネントとして描画する。
import Link from "next/link";
import { type ContentItem, getCategoryColor } from "../data/contents";
import svgPaths from "../../imports/svg-corg4qlf3y";
import ContentPhoto from "../components/ContentPhoto";
import CompanyVisitArticle from "../components/CompanyVisitArticle";
import CmsBody from "../components/CmsBody";

interface ContentsDetailProps {
  content: ContentItem;
  relatedContents: ContentItem[];
}

export default function ContentsDetail({ content, relatedContents }: ContentsDetailProps) {
  // 会社見学会の記事は専用のリッチレイアウトで表示する（contentId 31）
  const isCompanyVisitArticle = content.id === '31';


  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-[90px] max-[1039px]:pt-[68px] max-[539px]:pt-[58px] pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px] max-[1039px]:top-[75px] max-[539px]:top-[59px] max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px] max-[1039px]:top-[75px] max-[539px]:top-[59px] max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<article class="contents-detail">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8 pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 flex-wrap" style={{ fontFamily: 'var(--font-noto), sans-serif', fontSize: '14px' }}>
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

          {/* Category */}
          <div className="mb-4 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getCategoryColor(content.category) }}></div>
            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-noto), sans-serif', color: '#313131' }}>
              {content.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-h1 tracking-[1.92px] mb-4 max-[1039px]:!text-[40px] max-[539px]:!text-[32px]">
            {content.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#707070] text-[#707070] text-xs px-3 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-noto), sans-serif' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {isCompanyVisitArticle ? (
        <CompanyVisitArticle />
      ) : (
       <>
      {/* ===== Featured Image Section (02) ===== */}
      <section className="relative py-12 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="featured-image">`}</code>
        </div>

        <div className="max-w-[900px] mx-auto px-8">
          {/* Featured image (写真があれば表示、無ければプレースホルダー) */}
          <div className="aspect-[16/9] bg-gray-200 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-[#707070]">
              <svg className="w-20 h-20 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <ContentPhoto src={content.image} alt={content.title} />
          </div>
        </div>
      </section>

      {/* ===== Content Section (03) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="content">`}</code>
        </div>

        <div className="max-w-[1000px] mx-auto px-8">
          <CmsBody html={content.content} />
        </div>
      </section>
       </>
      )}

      {/* ===== Related Contents Section (04) ===== */}
      {relatedContents.length > 0 && (
        <section className="relative py-24 border-b border-black/15">
          <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
            <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>04</span>
          </div>
          <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
            <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="related">`}</code>
          </div>

          <div className="max-w-[1180px] mx-auto px-8">
            <h2 className="text-h2 mb-8 max-[539px]:!text-[26px]">
              関連記事
            </h2>
            <div className="grid grid-cols-3 gap-6 max-[1039px]:grid-cols-2 max-[539px]:grid-cols-1">
              {relatedContents.map((item) => (
                <Link
                  key={item.id}
                  href={`/contents/${item.id}`}
                  className="block border border-[#e0e0e0] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Thumbnail (写真があれば表示、無ければプレースホルダー) */}
                  <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-[#707070]">
                      <svg className="w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <ContentPhoto src={item.image} alt={item.title} />
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(item.category) }}></div>
                      <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-noto), sans-serif', color: '#313131' }}>
                        {item.categoryLabel}
                      </span>
                    </div>
                    <h3
                      className="font-bold line-clamp-2"
                      style={{ fontFamily: 'var(--font-noto), sans-serif', fontSize: '20px', lineHeight: '1.5' }}
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
        <div className="absolute top-[6px] left-[14px] max-[539px]:top-0 max-[539px]:left-[6px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{relatedContents.length > 0 ? '05' : '04'}</span>
        </div>
        <div className="absolute top-[6px] left-[54px] max-[539px]:top-0 max-[539px]:left-[30px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: 'var(--marker-font-size)' }}>{`<section class="navigation">`}</code>
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
              <span className="font-bold" style={{ fontFamily: 'var(--font-noto), sans-serif', fontSize: '16px' }}>
                コンテンツ一覧へ戻る
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
