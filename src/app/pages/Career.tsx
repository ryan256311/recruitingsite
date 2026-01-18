"use client";

import Link from "next/link";
import svgPaths from "../../imports/svg-corg4qlf3y";
import { careerJobs } from "../data/jobs";

// 現在募集中の求人（Webデザイナーとフロントエンドエンジニアのみ表示）
const displayedJobs = careerJobs.filter(job =>
  job.id === 1 || job.id === 2 // Webデザイナー(id:1), フロントエンドエンジニア(id:2)
);

export default function Career() {
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
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="career">`}</code>
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
              キャリア採用
            </h1>
            <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              ルーティンではなく、新しい価値を生み出す仕事に挑戦しませんか。<br />
              BtoBの現場で課題解決に向き合い、学び続ける仲間を求めています。
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
              { title: '新規事業に関われる', description: 'BtoB向けEC構築や社内ツール開発など立ち上げに携われます' },
              { title: 'BtoB×課題解決', description: 'お客様の課題に向き合い、提案から実装までを担います' },
              { title: '学習支援が充実', description: 'Udemy受け放題や研修・セミナー参加支援で成長を後押し' },
            ].map((item, index) => (
              <div key={index} className="border border-[#707070] rounded-2xl p-8">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '28px' }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-10">
            <h3 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>キャリアパス</h3>
            <p className="mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
              入社後は、経験を活かして即戦力として成果を出せる環境を用意しています。<br />
              新規事業や改善提案にも積極的に関わり、変化を楽しめる方が成長できるフェーズです。
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>定期的な1on1面談によるキャリア相談</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>社内公募制度による部署異動の機会</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>外部研修・資格取得支援制度</span>
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
                  { label: '雇用形態', value: '正社員' },
                  { label: '勤務地', value: '福井県坂井市春江町中庄61-32（春江本社）' },
                  { label: '勤務時間', value: '9:00〜18:10（休憩70分）' },
                  { label: '給与', value: '月給 220,000円〜380,000円（スキル・経験による）' },
                  { label: '休日休暇', value: '日祝／年末年始／お盆（年間休日105日）' },
                  { label: '福利厚生', value: '社会保険完備、駐車場完備、社員旅行・親睦行事' },
                  { label: '求める人物像', value: '問題解決力・ロジカル思考・優先度判断ができる方' },
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
            Indeedからのご応募は原則24時間以内にご返信します。スピード感のある選考で進めます。
          </p>

          <div className="flex items-center justify-between max-w-[1000px] mx-auto mb-12">
            {[
              { step: 'STEP 01', title: '書類選考', description: '履歴書・職務経歴書\nポートフォリオ' },
              { step: 'STEP 02', title: '一次面接', description: '人事担当者との\nオンライン面接' },
              { step: 'STEP 03', title: '二次面接', description: '部門責任者との\n対面面接' },
              { step: 'STEP 04', title: '最終面接', description: '役員面接' },
              { step: 'STEP 05', title: '内定', description: '条件提示・\n入社日調整' },
            ].map((item, index, arr) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <span className="inline-block bg-[#0064c8] text-white text-sm px-4 py-1 rounded-full mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.step}</span>
                  <h3 className="font-bold mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{item.title}</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{item.description}</p>
                </div>
                {index < arr.length - 1 && (
                  <svg className="w-6 h-6 mx-4 text-[#0064c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>これまでのご経験と、当社での活躍イメージをお聞かせください</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>書類選考から内定まで約2〜3週間程度です</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>一次面接はオンラインで実施、二次面接以降は対面を予定しています</span>
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

          <div className="grid grid-cols-2 gap-6 mb-12">
            {displayedJobs.map((job) => (
              <Link key={job.id} href={`/career/${job.id}`} className="block border border-[#707070] rounded-2xl p-8 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>{job.title}</h3>
                  <span className="bg-[#0064c8] text-white text-sm px-3 py-1 rounded-full" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>キャリア</span>
                </div>
                <div className="flex gap-4 mb-4">
                  <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{job.department}</span>
                  <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{job.type}</span>
                </div>
                <p className="text-gray-600" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{job.description}</p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <a href="#" className="inline-flex items-center gap-4 bg-[#0064c8] text-white rounded-full px-10 py-4 hover:bg-[#0054a8] transition-colors">
              <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>キャリア採用にエントリーする</span>
              <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="white" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
