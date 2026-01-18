"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import svgPaths from "../../imports/svg-corg4qlf3y";
import { careerJobs, graduateJobs, Job } from "../data/jobs";

type JobType = 'all' | 'career' | 'graduate';

interface JobWithType extends Job {
  jobType: 'career' | 'graduate';
}

// すべての求人を統合
const allJobs: JobWithType[] = [
  ...careerJobs.map(job => ({ ...job, jobType: 'career' as const })),
  ...graduateJobs.map(job => ({ ...job, jobType: 'graduate' as const })),
];

const jobTypeFilters = [
  { id: 'all' as JobType, label: 'すべて' },
  { id: 'career' as JobType, label: 'キャリア採用' },
  { id: 'graduate' as JobType, label: '新卒採用' },
];

// 職種一覧を動的に抽出
const occupations = ['all', ...Array.from(new Set(allJobs.map(job => job.type)))];
const occupationLabels: Record<string, string> = {
  'all': 'すべて',
  'エンジニア': 'エンジニア',
  '営業': '営業',
  '製造': '製造',
  '事務': '事務',
};

// 雇用形態フィルター
const employmentTypes = [
  { id: 'all', label: 'すべて' },
  { id: '正社員', label: '正社員' },
  { id: '契約社員', label: '契約社員' },
  { id: 'アルバイト・パート', label: 'アルバイト・パート' },
];

export default function JobsList() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<JobType>('all');
  const [selectedOccupation, setSelectedOccupation] = useState<string>('all');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('all');

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "career" || type === "graduate") {
      setSelectedType(type as JobType);
    }
  }, [searchParams]);

  const filteredJobs = allJobs.filter(job => {
    const typeMatch = selectedType === 'all' || job.jobType === selectedType;
    const occupationMatch = selectedOccupation === 'all' || job.type === selectedOccupation;
    // 雇用形態は「契約社員 / 正社員」のように複数含む場合があるので、部分一致で判定
    const employmentMatch = selectedEmploymentType === 'all' || job.employmentType.includes(selectedEmploymentType);
    return typeMatch && occupationMatch && employmentMatch;
  });

  const handleTypeClick = (type: JobType) => {
    setSelectedType(type);
  };

  const handleOccupationClick = (occupation: string) => {
    setSelectedOccupation(occupation);
  };

  const handleEmploymentTypeClick = (employmentType: string) => {
    setSelectedEmploymentType(employmentType);
  };

  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="jobs">`}</code>
        </div>

        <div className="pl-[80px] pr-20 pt-8">
          <h1 className="font-bold tracking-[1.92px] mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '64px', lineHeight: '1.2' }}>
            Jobs
          </h1>
          <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            只今募集中の求人をご紹介します。
          </p>
        </div>
      </section>

      {/* ===== Jobs List Section (02) ===== */}
      <section className="relative py-24 border-b border-black/15 overflow-visible">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="jobs-list">`}</code>
        </div>

        <div className="pl-[80px] pr-20">
          <div className="flex gap-[7.29%] items-start">
            {/* Sidebar */}
            <div className="w-[307px] min-w-[250px] shrink-0 self-start sticky top-[100px]">
              {/* Job Type Filter */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Filter</span>
                </div>
                <div className="space-y-3 ml-5">
                  {jobTypeFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleTypeClick(filter.id)}
                      className="flex items-center gap-3 w-full text-left hover:opacity-70 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                        <path
                          clipRule="evenodd"
                          d={svgPaths.pf417300}
                          fill={selectedType === filter.id ? '#4346BE' : '#707070'}
                          fillRule="evenodd"
                        />
                      </svg>
                      <span
                        className={selectedType === filter.id ? 'font-bold' : ''}
                        style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                      >
                        {filter.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupation Filter */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Occupation</span>
                </div>
                <div className="space-y-3 ml-5">
                  {occupations.map((occupation) => (
                    <button
                      key={occupation}
                      onClick={() => handleOccupationClick(occupation)}
                      className="flex items-center gap-3 w-full text-left hover:opacity-70 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                        <path
                          clipRule="evenodd"
                          d={svgPaths.pf417300}
                          fill={selectedOccupation === occupation ? '#4346BE' : '#707070'}
                          fillRule="evenodd"
                        />
                      </svg>
                      <span
                        className={selectedOccupation === occupation ? 'font-bold' : ''}
                        style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                      >
                        {occupationLabels[occupation] || occupation}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Employment Type Filter */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Employment</span>
                </div>
                <div className="space-y-3 ml-5">
                  {employmentTypes.map((employment) => (
                    <button
                      key={employment.id}
                      onClick={() => handleEmploymentTypeClick(employment.id)}
                      className="flex items-center gap-3 w-full text-left hover:opacity-70 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                        <path
                          clipRule="evenodd"
                          d={svgPaths.pf417300}
                          fill={selectedEmploymentType === employment.id ? '#4346BE' : '#707070'}
                          fillRule="evenodd"
                        />
                      </svg>
                      <span
                        className={selectedEmploymentType === employment.id ? 'font-bold' : ''}
                        style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                      >
                        {employment.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 9 9.05359">
                    <path d="M9 0V9.05359H0L9 0Z" fill="#4346BE" />
                  </svg>
                  <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '16px' }}>Links</span>
                </div>
                <div className="space-y-3 ml-5">
                  <Link
                    href="/career"
                    className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                      <path clipRule="evenodd" d={svgPaths.pf417300} fill="#707070" fillRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>キャリア採用について</span>
                  </Link>
                  <Link
                    href="/graduate"
                    className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 11 11">
                      <path clipRule="evenodd" d={svgPaths.pf417300} fill="#707070" fillRule="evenodd" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>新卒採用について</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="flex-1" style={{ maxWidth: '1150px' }}>
              <h2 className="font-bold mb-10" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>
                募集中の求人
                <span className="ml-4 text-[#707070] font-normal" style={{ fontSize: '18px' }}>
                  （{filteredJobs.length}件）
                </span>
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-12">
                {filteredJobs.map((job) => (
                  <Link
                    key={`${job.jobType}-${job.id}`}
                    href={`/${job.jobType}/${job.id}`}
                    className="block border border-[#707070] rounded-2xl p-8 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
                        {job.title}
                      </h3>
                      <span
                        className={`text-white text-sm px-3 py-1 rounded-full ${
                          job.jobType === 'career' ? 'bg-[#0064c8]' : 'bg-[#4346BE]'
                        }`}
                        style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
                      >
                        {job.jobType === 'career' ? 'キャリア' : '新卒'}
                      </span>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                        {job.department}
                      </span>
                      <span className="border border-[#707070] rounded-full px-3 py-1 text-sm" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                      {job.description}
                    </p>
                    <div className="mt-6 pt-4 border-t border-[#e0e0e0]">
                      <div className="flex items-center gap-2 text-sm text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <p className="text-center py-12 text-[#707070]" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  該当する求人はありません。
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
