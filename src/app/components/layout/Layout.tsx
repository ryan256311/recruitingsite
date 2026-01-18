"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import svgPaths from "../../../imports/svg-corg4qlf3y";
import imgInstagramGlyphBlack from "../../../assets/f171275cdf27d311fd0a3b1f6ef7b82227a50ce2.png";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden relative">
      {/* Global vertical line - lowest layer */}
      <div className="fixed top-0 left-[40px] w-px h-full bg-[#e0e0e0] z-0 pointer-events-none"></div>

      {/* ===== Header ===== */}
      <header
        className={`fixed z-50 ${isScrolled ? 'top-[10px] left-[2.08%] right-[2.08%] bg-gray-50/85 backdrop-blur-sm rounded-[25px]' : 'top-0 left-0 right-0 bg-white border-b border-black/15'}`}
        style={{
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, top 450ms ease, left 450ms ease, right 450ms ease, border-radius 450ms ease'
        }}
      >
        <div className="px-[2.08%] max-[839px]:px-[10px] py-6 max-[539px]:py-[10px] min-[540px]:max-[1039px]:py-[15px] min-[540px]:max-[1039px]:w-[840px] min-[540px]:max-[1039px]:max-w-[90.5%] min-[540px]:max-[1039px]:mx-auto min-[540px]:max-[1039px]:px-0 flex items-center justify-between">
          {/* Mobile: Hamburger menu (left) - shown below 1039px */}
          <button
            className="flex min-[1040px]:hidden flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            <span className={`block w-6 h-0.5 bg-[#313131] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#313131] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#313131] transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Logo + Text (center on mobile, left on desktop) */}
          <Link href="/" className={`flex items-center transition-all duration-[450ms] max-[1039px]:absolute max-[1039px]:left-1/2 max-[1039px]:-translate-x-1/2 max-[1039px]:flex-col max-[1039px]:gap-1 ${isScrolled ? 'gap-[2.4vw]' : 'gap-[3.26vw]'}`}>
            <div className={`transition-all duration-[450ms] max-[539px]:w-[170px] min-[540px]:max-[1039px]:w-[180px] ${isScrolled ? 'w-[240px]' : 'w-[270px]'}`} style={{ aspectRatio: '270/39.735' }}>
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 270 39.735">
                <path d={svgPaths.p2c5ae000} fill="#313131" />
                <path d={svgPaths.p23d25000} fill="#313131" />
                <path d={svgPaths.p13a86400} fill="#313131" />
                <path d={svgPaths.p23b37280} fill="#313131" />
                <path d={svgPaths.p2c54d400} fill="#313131" />
                <path d={svgPaths.p103c400} fill="#313131" />
                <path d={svgPaths.p2ee8dd00} fill="#313131" />
                <path d={svgPaths.p2393ea00} fill="#313131" />
                <path d={svgPaths.p600d680} fill="#313131" />
                <path d={svgPaths.p234cf100} fill="#313131" />
                <path d={svgPaths.p2005b500} fill="#313131" />
                <path d={svgPaths.p10e22f00} fill="#313131" />
                <path d={svgPaths.pdf97f80} fill="#313131" />
                <path d={svgPaths.p2d43f100} fill="#313131" />
                <path d={svgPaths.p27f24300} fill="#313131" />
                <path d={svgPaths.p245aa400} fill="#313131" />
                <path d={svgPaths.p2c033880} fill="#313131" />
                <path d={svgPaths.p34bea300} fill="#313131" />
                <path d={svgPaths.p1460fb80} fill="#313131" />
              </svg>
            </div>
            <span
              className={`font-medium tracking-[0.54px] transition-all duration-[450ms] max-[539px]:!text-[10px] min-[540px]:max-[1039px]:!text-[12px] ${isScrolled ? 'text-[16px]' : 'text-[18px]'}`}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Recruitment Site
            </span>
          </Link>

          {/* Navigation (right) */}
          <nav className="flex items-center gap-[2.4vw]">
            {/* Desktop navigation - hidden below 1039px */}
            <div className="hidden min-[1040px]:flex items-center gap-[1.36vw]">
              <Link href="/graduate" className="font-bold tracking-[0.42px] whitespace-nowrap" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>新卒採用</Link>
              <Link href="/career" className="font-bold tracking-[0.42px] whitespace-nowrap" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '14px' }}>キャリア採用</Link>
            </div>
            <Link href="/company-visit" className="bg-[#0064c8] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 whitespace-nowrap w-[210px] max-[1039px]:w-auto max-[1039px]:px-[14px] max-[1039px]:h-[38px] max-[1039px]:py-0 max-[1039px]:rounded-[8px]" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '12px' }}>
              <span className="hidden min-[1040px]:inline">会社見学会にエントリー</span>
              <span className="min-[1040px]:hidden">ENTRY</span>
              <svg className="w-2 h-3 hidden min-[1040px]:block" fill="none" viewBox="0 0 7 11.8462">
                <path d={svgPaths.p190b2b48} fill="white" />
              </svg>
            </Link>
          </nav>
        </div>

        {/* Mobile menu dropdown - shown below 1039px */}
        <div
          className={`min-[1040px]:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-[40px] py-6 border-t border-black/10">
            <div className="flex flex-col gap-4">
              {[
                { label: '新卒採用', href: '/graduate', delay: '0ms' },
                { label: 'キャリア採用', href: '/career', delay: '50ms' },
                { label: '募集中の求人', href: '/jobs', delay: '100ms' },
                { label: 'お問い合わせ', href: '/contact', delay: '150ms' },
              ].map((item, index) => (
                item.href.startsWith('#') ? (
                  <a
                    key={index}
                    href={item.href}
                    className={`font-bold tracking-[0.42px] py-2 transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{
                      fontFamily: 'Noto Sans JP, sans-serif',
                      fontSize: '14px',
                      transitionDelay: isMobileMenuOpen ? item.delay : '0ms'
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className={`font-bold tracking-[0.42px] py-2 transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{
                      fontFamily: 'Noto Sans JP, sans-serif',
                      fontSize: '14px',
                      transitionDelay: isMobileMenuOpen ? item.delay : '0ms'
                    }}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      {children}

      {/* ===== Recruit Section ===== */}
      <section className="relative border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>07</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="recruit">`}</code>
        </div>
        <div className="overflow-hidden pt-[40px]">
          <div className="flex items-center gap-6 pl-[80px] animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-6 shrink-0">
                {[
                  { width: 440 },
                  { width: 510 },
                  { width: 440 },
                  { width: 400 },
                  { width: 440 },
                  { width: 510 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="shrink-0 rounded-2xl overflow-hidden bg-gray-200"
                    style={{ width: `${item.width}px`, aspectRatio: '1/1' }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      採用イメージ{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-black/15 mt-[20px]"></div>
        <div className="py-24">
          <div className="max-w-[1180px] mx-auto flex justify-between">
            <h2 className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '72px', lineHeight: '1.2' }}>採用について</h2>
            <div className="w-[630px]">
              <div className="mb-8" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px', lineHeight: '32px' }}>
                <p className="mb-4">当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。</p>
                <p className="mb-4">さあ、私たちと一緒に。変化を恐れず、未来を描く仲間になりませんか？</p>
                <p>あなたのエントリーをお待ちしております。</p>
              </div>
              <Link href="/jobs" className="inline-flex items-center gap-4 border border-[#707070] bg-white rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                <span style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>募集要項</span>
                <svg className="w-2 h-3" fill="none" viewBox="0 0 7.32727 12.4">
                  <path d={svgPaths.p36961f00} fill="#2A2A2A" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer Section ===== */}
      <section className="relative py-24 border-b border-black/15">
        <div className="absolute top-[6px] left-[14px]">
          <span className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>08</span>
        </div>
        <div className="absolute top-[6px] left-[54px]">
          <code className="text-[#313131]" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '10px' }}>{`<section class="(X)plode">`}</code>
        </div>
        <div className="pl-[80px] pr-20">
          <div className="grid grid-cols-2 gap-24">
            <div>
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '72px', lineHeight: '1.1' }}>Let ideas (X)plode.</h2>
              <p className="font-bold mb-12" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '24px' }}>変化を楽しみ挑戦し続けよう。</p>
              <div className="space-y-4 max-w-[400px]">
                <Link href="/company-visit" className="block border border-[#707070] bg-white rounded-md p-5 hover:bg-gray-50 transition-colors">
                  <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>会社見学</span>
                </Link>
                <Link href="/contact?type=career" className="block border border-[#707070] bg-[#333] text-white rounded-md p-5 hover:bg-[#444] transition-colors">
                  <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>キャリア採用エントリー</span>
                </Link>
                <Link href="/contact?type=graduate" className="block border border-[#707070] bg-[#333] text-white rounded-md p-5 hover:bg-[#444] transition-colors">
                  <span className="font-semibold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>27卒エントリー</span>
                </Link>
              </div>
              <div className="mt-8">
                <a href="#" className="inline-block">
                  <img src={imgInstagramGlyphBlack.src} alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 13.0063 13.0838">
                  <path d={svgPaths.pfae6600} fill="#4346BE" />
                </svg>
                <span style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px' }}>Pickup</span>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                {[
                  { label: 'エクシートとは', href: '/contents', external: false },
                  { label: 'コーポレートサイト', href: 'https://exceet.co.jp/', external: true },
                  { label: 'お知らせ', href: '/news', external: false },
                  { label: 'プライバシーポリシー', href: 'https://exceet.co.jp/privacy/', external: true },
                  { label: '募集中の求人', href: '/jobs', external: false },
                  { label: 'お問い合わせ', href: '/contact', external: false },
                ].map((item, index) => (
                  item.external ? (
                    <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                        <path clipRule="evenodd" d={svgPaths.p17cd8580} fill="#4346BE" fillRule="evenodd" />
                      </svg>
                      <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item.label}</span>
                    </a>
                  ) : (
                    <Link key={index} href={item.href} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                        <path clipRule="evenodd" d={svgPaths.p17cd8580} fill="#4346BE" fillRule="evenodd" />
                      </svg>
                      <span className="font-bold" style={{ fontFamily: 'Noto Sans JP, sans-serif', fontSize: '16px' }}>{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer Bottom ===== */}
      <footer className="py-12 bg-white">
        <div className="pl-[80px] pr-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-[200px] h-8">
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 270 39.735">
                  <path d={svgPaths.p2c5ae000} fill="#212121" />
                  <path d={svgPaths.p23d25000} fill="#212121" />
                  <path d={svgPaths.p13a86400} fill="#212121" />
                  <path d={svgPaths.p23b37280} fill="#212121" />
                  <path d={svgPaths.p2c54d400} fill="#212121" />
                  <path d={svgPaths.p103c400} fill="#212121" />
                  <path d={svgPaths.p2ee8dd00} fill="#212121" />
                  <path d={svgPaths.p2393ea00} fill="#212121" />
                  <path d={svgPaths.p600d680} fill="#212121" />
                  <path d={svgPaths.p234cf100} fill="#212121" />
                  <path d={svgPaths.p2005b500} fill="#212121" />
                  <path d={svgPaths.p10e22f00} fill="#212121" />
                  <path d={svgPaths.pdf97f80} fill="#212121" />
                  <path d={svgPaths.p2d43f100} fill="#212121" />
                  <path d={svgPaths.p27f24300} fill="#212121" />
                  <path d={svgPaths.p245aa400} fill="#212121" />
                  <path d={svgPaths.p2c033880} fill="#212121" />
                  <path d={svgPaths.p34bea300} fill="#212121" />
                  <path d={svgPaths.p1460fb80} fill="#212121" />
                </svg>
              </div>
              <span className="font-medium tracking-[0.54px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#272727' }}>Recruitment Site</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://exceet.co.jp/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal tracking-[0.36px] hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#333' }}
              >
                プライバシーポリシー
              </a>
              <p className="font-normal tracking-[0.36px]" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#333' }}>©株式会社エクシート All Rights</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
