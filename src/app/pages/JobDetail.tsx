"use client";

import Link from "next/link";
import svgPaths from "../../imports/svg-corg4qlf3y";
import { Job } from "../data/jobs";
import { ContentItem } from "../data/contents";
import jobImage from "../../assets/2723acada69546ad44390f5e3d6b8730eb9c9744.png";

interface JobDetailProps {
  job: Job;
  type: 'career' | 'graduate';
  relatedContents?: ContentItem[];
}

export default function JobDetail({ job, type, relatedContents = [] }: JobDetailProps) {
  const isCareer = type === 'career';
  const backLink = isCareer ? '/career' : '/graduate';
  const backLabel = isCareer ? 'キャリア採用' : '新卒採用';
  const badgeColor = isCareer ? 'bg-[#0064c8]' : 'bg-[#4346BE]';
  const badgeLabel = isCareer ? 'キャリア' : '27卒';

  return (
    <>
      {/* ===== Breadcrumb & Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        {/* Vertical line - right of nav section */}
        <div className="absolute top-0 left-[248px] w-px h-full bg-[#e0e0e0] z-0 pointer-events-none"></div>

        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<article class="job-detail">`}</code>
        </div>

        <div className="flex pt-8">
          {/* Section Nav - Left Side */}
          <div className="w-[248px] shrink-0 py-8 pl-[80px] pr-[14px]">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
              </svg>
              <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Contents</span>
            </div>
            <div className="space-y-3 ml-[8px]">
              {[
                { label: '募集背景', id: 'background' },
                { label: '部署について', id: 'department' },
                { label: '仕事内容', id: 'responsibilities' },
                { label: '応募資格', id: 'requirements' },
                { label: '募集要項', id: 'details' },
                ...(relatedContents.length > 0 ? [{ label: '関連コンテンツ', id: 'related' }] : []),
                { label: '応募', id: 'apply' },
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
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-3 hover:opacity-70"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                    <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                  </svg>
                  <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Main Content - Right Side */}
          <div className="flex-1 py-8 flex gap-12 max-w-[1400px] mx-auto">
            {/* Text Content */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <nav className="mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                <ol className="flex items-center gap-2 text-gray-600">
                  <li><Link href="/" className="hover:text-[#0064c8]">TOP</Link></li>
                  <li>/</li>
                  <li><Link href={backLink} className="hover:text-[#0064c8]">{backLabel}</Link></li>
                  <li>/</li>
                  <li className="text-[#313131] font-medium">{job.title}</li>
                </ol>
              </nav>

              {/* Title & Badge */}
              <div className="flex items-start gap-6 mb-6">
                <h1 className="font-bold tracking-[1.5px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '48px', lineHeight: '1.3' }}>
                  {job.title}
                </h1>
                <span className={`${badgeColor} text-white text-sm px-4 py-2 rounded-full mt-3`} style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  {badgeLabel}
                </span>
              </div>

              {/* Tags */}
              <div className="flex gap-3 mb-8">
                <span className="border border-[#707070] rounded-full px-4 py-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                  {job.department}
                </span>
                <span className="border border-[#707070] rounded-full px-4 py-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                  {job.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg mb-10" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '18px', lineHeight: '32px' }}>
                {job.description}
              </p>

              {/* Apply Button */}
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('apply');
                  if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className={`${badgeColor} text-white rounded-full px-10 py-4 font-bold inline-flex items-center gap-3 hover:opacity-90 transition-opacity`}
                style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
              >
                このポジションに応募する
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                  <path d={svgPaths.p190b2b48} fill="white" />
                </svg>
              </a>
            </div>

            {/* Job Image */}
            <div className="w-[40%] shrink-0" style={{ aspectRatio: '1 / .65' }}>
              <img
                src={jobImage.src}
                alt={`${job.title}の仕事風景`}
                className="object-cover rounded-2xl"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 募集背景 Section (02) ===== */}
      <section id="background" className="relative py-20 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="background">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>募集背景</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            {job.background}
          </p>
        </div>
      </section>

      {/* ===== 部署について Section (03) ===== */}
      <section id="department" className="relative py-20 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="department">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>部署について</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{job.department}</h3>
            <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              {job.departmentDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 仕事内容 Section (04) ===== */}
      <section id="responsibilities" className="relative py-20 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="responsibilities">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>仕事内容</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <ul className="space-y-4">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <svg className="w-3 h-3 mt-2 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '28px' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 応募資格 Section (05) ===== */}
      <section id="requirements" className="relative py-20 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>05</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="requirements">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>応募資格</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <ul className="space-y-4">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <svg className="w-3 h-3 mt-2 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '28px' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 募集要項 Section (06) ===== */}
      <section id="details" className="relative py-20 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: "Verdana, sans-serif", fontSize: "10px" }}>
            06
          </span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: "Verdana, sans-serif", fontSize: "10px" }}>
            {`<section class="details">`}
          </code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: "Noto Sans JP, sans-serif", fontSize: "36px" }}>
              募集要項
            </h2>
            <div className="w-12 h-px bg-[#313131]" />
          </div>

          <div className="border border-[#707070] rounded-2xl overflow-hidden">
            <table className="w-full" style={{ fontFamily: "Noto Sans JP, sans-serif", fontSize: "16px" }}>
              <tbody>
                {[
                  { label: "雇用形態", value: job.employmentType },
                  { label: "勤務地", value: job.location },
                  { label: "給与", value: job.salary },
                  { label: "部署", value: job.department },
                  { label: "職種", value: job.type },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <th className="text-left py-5 px-8 w-[200px] font-semibold border-r border-[#e0e0e0]">
                      {item.label}
                    </th>
                    <td className="py-5 px-8">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 関連コンテンツ Section (07) ===== */}
      {relatedContents.length > 0 && (
        <section id="related" className="relative py-20 border-b border-black/15">
          <div className="absolute top-[6px] left-[14px]">
            <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>07</span>
          </div>
          <div className="absolute top-[6px] left-[54px]">
            <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="related">`}</code>
          </div>

          <div className="max-w-[1180px] mx-auto px-8">
            <div className="mb-8">
              <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>関連コンテンツ</h2>
              <div className="w-12 h-px bg-[#313131]"></div>
            </div>

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
                      <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    {/* Category & Tags */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[#4346BE] text-xs font-bold"
                        style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                      >
                        {item.categoryLabel}
                      </span>
                      {item.tags.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="text-[#707070] text-xs"
                          style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {/* Title */}
                    <h3
                      className="font-bold line-clamp-2"
                      style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '1.5' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contents"
                className="inline-flex items-center gap-3 text-[#4346BE] hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
              >
                コンテンツ一覧を見る
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#4346BE" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== 応募ボタン Section (07/08) ===== */}
      <section id="apply" className="relative py-20 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{relatedContents.length > 0 ? '08' : '07'}</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="apply">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '32px' }}>
              この求人に応募する
            </h2>
            <p className="mb-10 text-gray-600" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '28px' }}>
              ご興味をお持ちいただけましたら、ぜひご応募ください。<br />
              ご応募お待ちしております。
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className={`${badgeColor} text-white rounded-full px-12 py-4 font-bold flex items-center gap-3 hover:opacity-90 transition-opacity`}
                style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
              >
                この求人に応募する
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                  <path d={svgPaths.p190b2b48} fill="white" />
                </svg>
              </a>
              <Link
                href={backLink}
                className="border border-[#707070] bg-white rounded-full px-12 py-4 font-bold flex items-center gap-3 hover:bg-gray-50 transition-colors"
                style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
              >
                求人一覧に戻る
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
