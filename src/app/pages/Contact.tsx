"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import svgPaths from "../../imports/svg-corg4qlf3y";

interface ContactFormData {
  inquiryType: string;
  recruitmentType: string;
  jobs: string[];
  name: string;
  furigana: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  message: string;
  privacyAgreed: boolean;
}

interface UploadedFile {
  name: string;
  url: string;
  size: number;
}

const JOB_OPTIONS = [
  'Webコーダー・HTMLコーダー',
  'ルート営業',
  '印刷製本機での製造・補助スタッフ',
  '印刷機オペレーター',
  '企画営業職（推し活グッズ事業）',
  '企画営業',
  '営業事務',
  'その他',
];

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function Contact() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // File states
  const [resume, setResume] = useState<UploadedFile | null>(null);
  const [careerHistory, setCareerHistory] = useState<UploadedFile | null>(null);
  const [portfolio, setPortfolio] = useState<UploadedFile | null>(null);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      inquiryType: '',
      recruitmentType: '',
      jobs: [],
      name: '',
      furigana: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      message: '',
      privacyAgreed: false,
    },
  });

  const recruitmentType = watch('recruitmentType');
  const selectedJobs = watch('jobs');

  // URL parameters handling
  useEffect(() => {
    const type = searchParams.get("type");
    const job = searchParams.get("job");

    if (type === "company-visit") {
      setValue('inquiryType', '会社見学');
    } else if (type === "career") {
      setValue('inquiryType', '選考への応募');
      setValue('recruitmentType', 'キャリア採用');
    } else if (type === "graduate") {
      setValue('inquiryType', '選考への応募');
      setValue('recruitmentType', '新卒採用');
    }

    if (job) {
      setValue('jobs', [decodeURIComponent(job)]);
    }
  }, [searchParams, setValue]);

  // File validation
  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'PDF、Word、JPG、PNG形式のみアップロード可能です';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'ファイルサイズは5MB以下にしてください';
    }
    return null;
  };

  // File upload handler
  const handleFileUpload = async (
    file: File,
    fileType: 'resume' | 'careerHistory' | 'portfolio'
  ) => {
    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }

    setUploadingFile(fileType);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', fileType);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('ファイルのアップロードに失敗しました');
      }

      const data = await response.json();
      const uploadedFile: UploadedFile = {
        name: file.name,
        url: data.url,
        size: file.size,
      };

      switch (fileType) {
        case 'resume':
          setResume(uploadedFile);
          break;
        case 'careerHistory':
          setCareerHistory(uploadedFile);
          break;
        case 'portfolio':
          setPortfolio(uploadedFile);
          break;
      }
    } catch (err) {
      alert('ファイルのアップロードに失敗しました。もう一度お試しください。');
    } finally {
      setUploadingFile(null);
    }
  };

  // Form submit handler
  const onSubmit = async (data: ContactFormData) => {
    // Validation
    if (!resume) {
      alert('履歴書を添付してください');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          resumeUrl: resume?.url,
          resumeName: resume?.name,
          careerHistoryUrl: careerHistory?.url,
          careerHistoryName: careerHistory?.name,
          portfolioFileUrl: portfolio?.url,
          portfolioFileName: portfolio?.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'エラーが発生しました');
      }

      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Job checkbox toggle
  const handleJobToggle = (job: string) => {
    const current = selectedJobs || [];
    if (current.includes(job)) {
      setValue('jobs', current.filter(j => j !== job));
    } else {
      setValue('jobs', [...current, job]);
    }
  };

  // Success message
  if (submitStatus === 'success') {
    return (
      <>
        <section className="pt-32 pb-16 border-b border-black/15 relative">
          <div className="pl-[80px] pr-20 pt-8">
            <h1 className="text-h1 font-roboto tracking-[1.92px] mb-4">
              Contact
            </h1>
          </div>
        </section>
        <section className="py-24">
          <div className="max-w-[600px] mx-auto px-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
              <svg className="w-16 h-16 mx-auto mb-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="font-bold text-2xl mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                送信完了
              </h2>
              <p className="text-[#707070] mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '1.8' }}>
                お問い合わせありがとうございます。<br />
                内容を確認の上、3営業日以内にご連絡いたします。<br />
                確認メールを送信しましたので、ご確認ください。
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-[#4346BE] hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
              >
                <span>トップページに戻る</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                  <path d={svgPaths.p190b2b48} fill="#4346BE" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ===== Hero Section (01) ===== */}
      <section className="pt-32 pb-16 border-b border-black/15 relative">
        <div className="absolute top-[102px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>01</span>
        </div>
        <div className="absolute top-[102px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<h1 class="contact">`}</code>
        </div>

        <div className="pl-[80px] pr-20 pt-8">
          <h1 className="text-h1 font-roboto tracking-[1.92px] mb-4">
            Contact
          </h1>
          <p style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
            採用に関するお問い合わせはこちらからお願いいたします。
          </p>
        </div>
      </section>

      {/* ===== Contact Form Section (02) ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>02</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="contact-form">`}</code>
        </div>

        <div className="max-w-[900px] mx-auto px-8">
          <div className="mb-12">
            <h2 className="font-bold tracking-[1.08px] mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '36px' }}>
              お問い合わせフォーム
            </h2>
            <div className="w-12 h-px bg-[#313131]"></div>
          </div>

          {/* お問い合わせ前の注意事項 */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h3 className="font-bold mb-4" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
              お問い合わせの前に
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  採用に関するご質問、選考へのご応募、会社見学のご希望など、お気軽にお問い合わせください。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  通常、3営業日以内にご返信いたします。
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-3 h-3 mt-1.5 shrink-0" fill="none" viewBox="0 0 11 11">
                  <path clipRule="evenodd" d={svgPaths.pf417300} fill="#4346BE" fillRule="evenodd" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  <span className="text-red-600">*</span> は必須項目です。
                </span>
              </li>
            </ul>
          </div>

          {/* Error message */}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-600" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>
                {errorMessage || 'エラーが発生しました。もう一度お試しください。'}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="border border-[#e0e0e0] rounded-2xl p-8">
            <div className="space-y-8">
              {/* お問い合わせ種別 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  お問い合わせ種別 <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['選考への応募', 'カジュアル面談', '会社見学'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={item}
                        {...register('inquiryType', { required: 'お問い合わせ種別を選択してください' })}
                        className="w-4 h-4 accent-[#4346BE]"
                      />
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item}</span>
                    </label>
                  ))}
                </div>
                {errors.inquiryType && (
                  <p className="text-red-600 text-sm mt-2">{errors.inquiryType.message}</p>
                )}
              </div>

              {/* 採用区分 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  採用区分 <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['新卒採用', 'キャリア採用'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={item}
                        {...register('recruitmentType', { required: '採用区分を選択してください' })}
                        className="w-4 h-4 accent-[#4346BE]"
                      />
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item}</span>
                    </label>
                  ))}
                </div>
                {errors.recruitmentType && (
                  <p className="text-red-600 text-sm mt-2">{errors.recruitmentType.message}</p>
                )}
              </div>

              {/* 応募職種 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  応募職種 <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  ※複数選択可
                </p>
                <div className="flex flex-wrap gap-4">
                  {JOB_OPTIONS.map((job) => (
                    <label key={job} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedJobs?.includes(job) || false}
                        onChange={() => handleJobToggle(job)}
                        className="w-4 h-4 accent-[#4346BE]"
                      />
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{job}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* お名前 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  お名前 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'お名前を入力してください' })}
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4346BE] focus:border-transparent"
                  placeholder="山田 太郎"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              {/* フリガナ */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  フリガナ <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register('furigana', { required: 'フリガナを入力してください' })}
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4346BE] focus:border-transparent"
                  placeholder="ヤマダ タロウ"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                />
                {errors.furigana && (
                  <p className="text-red-600 text-sm mt-2">{errors.furigana.message}</p>
                )}
              </div>

              {/* メールアドレス */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  メールアドレス <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'メールアドレスを入力してください',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '正しいメールアドレスを入力してください',
                    },
                  })}
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4346BE] focus:border-transparent"
                  placeholder="example@email.com"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              {/* 電話番号 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  電話番号
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4346BE] focus:border-transparent"
                  placeholder="03-1234-5678"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                />
              </div>

              {/* 履歴書の添付 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  履歴書の添付 <span className="text-red-600">*</span>
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  PDF、Word、JPG、PNG形式（5MB以下）
                </p>
                {resume ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{resume.name}</span>
                    <button
                      type="button"
                      onClick={() => setResume(null)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      削除
                    </button>
                  </div>
                ) : (
                  <div className="border border-[#707070] border-dashed rounded-lg p-6 text-center bg-gray-50">
                    {uploadingFile === 'resume' ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin text-[#4346BE]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>アップロード中...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mx-auto mb-3 text-[#707070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', color: '#707070' }}>
                          ファイルをドラッグ＆ドロップ、または
                        </p>
                        <label className="inline-block">
                          <span
                            className="text-[#4346BE] underline cursor-pointer"
                            style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                          >
                            ファイルを選択
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'resume');
                            }}
                          />
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* 職務経歴書の添付（キャリア採用の場合） */}
              {recruitmentType === 'キャリア採用' && (
                <div>
                  <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                    職務経歴書の添付
                  </label>
                  <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                    PDF、Word、JPG、PNG形式（5MB以下）
                  </p>
                  {careerHistory ? (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{careerHistory.name}</span>
                      <button
                        type="button"
                        onClick={() => setCareerHistory(null)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        削除
                      </button>
                    </div>
                  ) : (
                    <div className="border border-[#707070] border-dashed rounded-lg p-6 text-center bg-gray-50">
                      {uploadingFile === 'careerHistory' ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5 animate-spin text-[#4346BE]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>アップロード中...</span>
                        </div>
                      ) : (
                        <>
                          <svg className="w-10 h-10 mx-auto mb-3 text-[#707070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', color: '#707070' }}>
                            ファイルをドラッグ＆ドロップ、または
                          </p>
                          <label className="inline-block">
                            <span
                              className="text-[#4346BE] underline cursor-pointer"
                              style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                            >
                              ファイルを選択
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, 'careerHistory');
                              }}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ポートフォリオ（ファイル） */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  ポートフォリオ（ファイル）
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  PDF、Word、JPG、PNG形式（5MB以下）
                </p>
                {portfolio ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>{portfolio.name}</span>
                    <button
                      type="button"
                      onClick={() => setPortfolio(null)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      削除
                    </button>
                  </div>
                ) : (
                  <div className="border border-[#707070] border-dashed rounded-lg p-6 text-center bg-gray-50">
                    {uploadingFile === 'portfolio' ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin text-[#4346BE]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>アップロード中...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 mx-auto mb-3 text-[#707070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px', color: '#707070' }}>
                          ファイルをドラッグ＆ドロップ、または
                        </p>
                        <label className="inline-block">
                          <span
                            className="text-[#4346BE] underline cursor-pointer"
                            style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}
                          >
                            ファイルを選択
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'portfolio');
                            }}
                          />
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* ポートフォリオ（URL） */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  ポートフォリオ（URL）
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  ポートフォリオサイト、GitHub、Behance等のURLを入力してください
                </p>
                <input
                  type="url"
                  {...register('portfolioUrl')}
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4346BE] focus:border-transparent"
                  placeholder="https://example.com/portfolio"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                />
              </div>

              {/* その他 */}
              <div>
                <label className="block font-bold mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  その他
                </label>
                <p className="text-sm text-[#707070] mb-3" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
                  ※自己PR、志望動機、その他アピールしたい情報など
                </p>
                <textarea
                  {...register('message')}
                  className="w-full border border-[#707070] rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#4346BE] focus:border-transparent"
                  placeholder="自由にご記入ください"
                  style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}
                />
              </div>

              {/* プライバシーポリシー同意 */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('privacyAgreed', { required: 'プライバシーポリシーへの同意が必要です' })}
                    className="w-5 h-5 mt-0.5 accent-[#4346BE]"
                  />
                  <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                    <a href="https://exceet.co.jp/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#4346BE] underline hover:opacity-70 transition-opacity">プライバシーポリシー</a>に同意する <span className="text-red-600">*</span>
                  </span>
                </label>
                {errors.privacyAgreed && (
                  <p className="text-red-600 text-sm mt-2">{errors.privacyAgreed.message}</p>
                )}
              </div>

              {/* 送信ボタン */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-4 bg-[#4346BE] text-white rounded-full px-12 py-4 transition-colors ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#3335a0]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>送信中...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>送信する</span>
                      <svg className="w-2 h-3" fill="none" viewBox="0 0 7 11.8462">
                        <path d={svgPaths.p190b2b48} fill="white" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* 他のお問い合わせ方法 */}
          <div className="mt-16 text-center">
            <h3 className="font-bold mb-6" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '20px' }}>
              その他のお問い合わせ方法
            </h3>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#4346BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  recruit@exceet.co.jp
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#4346BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>
                  0776-97-8466（採用担当直通）
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
