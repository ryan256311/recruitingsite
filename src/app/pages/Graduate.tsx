"use client";

import Link from "next/link";
import svgPaths from "../../imports/svg-corg4qlf3y";
import { graduateJobs } from "../data/jobs";

export default function Graduate() {
  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-24 border-b border-black/15 relative">
        {/* Vertical line - right of nav section */}
        <div className="absolute top-0 left-[248px] w-px h-full bg-[#e0e0e0] z-0 pointer-events-none"></div>

        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="graduate">`}</code>
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
                { label: '仕事環境', id: 'work-environment' },
                { label: '募集要項', id: 'requirements' },
                { label: '選考フロー', id: 'selection-flow' },
                { label: '募集中の求人', id: 'job-listings' },
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
          <div className="flex-1 py-8 pr-20 max-w-[1400px] pl-[4%]">
            <h1 className="text-h1 tracking-[1.92px] mb-8">
              新卒採用
            </h1>
            <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              UIターンも歓迎。地域で挑戦しながら成長できる環境です。<br />
              未来を創る仲間として、一緒に学び続けませんか。
            </p>
          </div>
        </div>
      </section>

      {/* ===== 仕事環境 Section (02) ===== */}
      <section id="work-environment" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="work-environment">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>仕事環境</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            {[
              { title: 'UIターン歓迎', description: '県内外からの移住も含めて働きやすい環境を整備' },
              { title: '課題解決型の仕事', description: '営業職でも提案型のスタイルで成長できます' },
              { title: '学び続ける文化', description: '研修・メンター制度で着実にスキルを伸ばせます' },
            ].map((item, index) => (
              <div key={index} className="border border-[#707070] rounded-2xl p-8">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '28px' }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-10">
            <h3 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>成長を支える仕組み</h3>
            <p className="mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              新卒の皆さんが、地域で安心してスタートを切れるよう支援体制を整えています。<br />
              基礎力から実務まで、段階的に成長できる環境です。
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>入社前研修（内定者向けオンライン講座）</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>新入社員研修（ビジネスマナー・業界知識・専門スキル）</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>定期的なフォローアップ研修（1年目・2年目・3年目）</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>資格取得支援制度</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 募集要項 Section (03) ===== */}
      <section id="requirements" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>03</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="requirements">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>募集要項</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <div className="border border-[#707070] rounded-2xl overflow-hidden">
            <table className="w-full" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
              <tbody>
                {[
                  { label: '募集対象', value: '2027年3月卒業見込みの方（大学院・大学・短大・専門学校）' },
                  { label: '雇用形態', value: '正社員' },
                  { label: '勤務地', value: '福井県坂井市春江町中庄61-32（春江本社）' },
                  { label: '勤務時間', value: '9:00〜18:10（休憩70分）' },
                  { label: '初任給', value: '学歴・職種により決定' },
                  { label: '募集職種', value: '課題解決型営業／ディレクター／エンジニア' },
                  { label: '休日休暇', value: '日祝／年末年始／お盆（年間休日105日）' },
                  { label: '福利厚生', value: '社会保険完備、駐車場完備、研修・資格取得支援' },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <th className="text-left py-5 px-8 w-[200px] font-semibold border-r border-[#e0e0e0]">{item.label}</th>
                    <td className="py-5 px-8">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 試験内容とフロー図 Section (04) ===== */}
      <section id="selection-flow" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>04</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="selection-flow">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>試験内容とフロー図</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          <p className="mb-10" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '30px' }}>
            大学のキャリアセンターや行政のUIターン施策とも連携し、情報提供の機会を広げています。
          </p>

          <div className="flex items-center justify-between max-w-[1100px] mx-auto mb-12">
            {[
              { step: 'STEP 01', title: 'エントリー', description: 'Webからの\nエントリー' },
              { step: 'STEP 02', title: '説明会・面談', description: 'キャリアセンター\n行政施策も活用' },
              { step: 'STEP 03', title: '書類選考', description: 'ES・履歴書' },
              { step: 'STEP 04', title: '一次面接', description: 'グループ面接\n＋適性検査' },
              { step: 'STEP 05', title: '最終面接', description: '役員面接' },
              { step: 'STEP 06', title: '内定', description: '内定通知' },
            ].map((item, index, arr) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <span className="inline-block bg-[#4346BE] text-white text-sm px-4 py-1 rounded-full mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.step}</span>
                  <h3 className="font-bold mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{item.title}</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{item.description}</p>
                </div>
                {index < arr.length - 1 && (
                  <svg className="w-5 h-5 mx-3 text-[#4346BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>選考のポイント</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>学生時代に力を入れたこと、挑戦したことをお聞かせください</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>選考期間は約1ヶ月程度です</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>会社説明会は随時開催しています。お気軽にご参加ください</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 現在募集中の求人 Section (05) ===== */}
      <section id="job-listings" className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>05</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="job-listings">`}</code>
        </div>

        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>現在募集中の求人</h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          {graduateJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-6 mb-12">
                {graduateJobs.map((job) => (
                  <Link key={job.id} href={`/graduate/${job.id}`} className="block border border-[#707070] rounded-2xl p-8 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{job.title}</h3>
                    </div>
                    <div className="mb-4">
                      <span className="bg-[#4346BE] text-white text-sm px-3 py-1 rounded-full" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>27卒</span>
                    </div>
                    <div className="flex gap-3 mb-4">
                      <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{job.department}</span>
                      <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{job.type}</span>
                    </div>
                    <p className="text-gray-600" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{job.description}</p>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center gap-6">
                <a href="#" className="inline-flex items-center gap-4 bg-[#4346BE] text-white rounded-full px-10 py-4 hover:bg-[#3335a0] transition-colors">
                  <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>27卒エントリーする</span>
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                    <path d={svgPaths.p190b2b48} fill="white" />
                  </svg>
                </a>
                <Link href="/company-visit" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-10 py-4 hover:bg-gray-50 transition-colors">
                  <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>会社見学に参加する</span>
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                    <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-12 mb-12">
              <div className="text-center max-w-[600px] mx-auto">
                <h3 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                  現在、新卒採用の募集は行っておりません
                </h3>
                <p className="mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                  新卒採用にご興味をお持ちの方は、お気軽にお問い合わせください。<br />
                  会社見学やカジュアル面談のご希望も承っております。
                </p>
                <Link href="/contact" className="inline-flex items-center gap-4 bg-[#4346BE] text-white rounded-full px-10 py-4 hover:bg-[#3335a0] transition-colors">
                  <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>お問い合わせはこちら</span>
                  <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                    <path d={svgPaths.p190b2b48} fill="white" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
