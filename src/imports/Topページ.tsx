import svgPaths from "./svg-corg4qlf3y";
import clsx from "clsx";
import img3 from "figma:asset/1989e711943a09dca66285d0e18edafbafe3fb9c.png";
import imgSitetopEngineerEyeSp1 from "figma:asset/2723acada69546ad44390f5e3d6b8730eb9c9744.png";
import img5 from "figma:asset/e6f7b37fca2d865e3f35dae1ac050a9f0649c3e5.png";
import imgFireShotCapture193CareersMujiCom1 from "figma:asset/20381856004e60259556c5cc5cb1eaa849237729.png";
import img91 from "figma:asset/f9da79649950583e5a4c4c0c18a62dca2f7a3db4.png";
import imgInstagramGlyphBlack from "figma:asset/f171275cdf27d311fd0a3b1f6ef7b82227a50ce2.png";
import { img2, imgSitetopEngineerEyeSp, imgSitetopEngineerEyeSp2, imgSitetopEngineerEyeSp3, imgFireShotCapture193CareersMujiCom } from "./svg-v6ipn";
type TopHelperProps = {
  additionalClassNames?: string;
};

function TopHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<TopHelperProps>) {
  return (
    <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className={clsx("absolute flex items-center justify-center w-0", additionalClassNames)}>
      <div className="flex-none rotate-[90deg]">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute size-[11px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[33px] w-[118px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118 33">
        {children}
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};
type Helper5Props = {
  additionalClassNames?: string;
};

function Helper5({ children, additionalClassNames = "" }: React.PropsWithChildren<Helper5Props>) {
  return (
    <div className={clsx("absolute h-[39.735px] w-[270px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 270 39.735">
        <g id="ã°ã«ã¼ã 42">{children}</g>
      </svg>
    </div>
  );
}
type ArrowRight2Props = {
  additionalClassNames?: string;
};

function ArrowRight2({ additionalClassNames = "" }: ArrowRight2Props) {
  return (
    <div className={clsx("absolute size-[14px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <path clipRule="evenodd" d={svgPaths.p17cd8580} fill="var(--fill-0, #4346BE)" fillRule="evenodd" id="arrow-right" />
      </svg>
    </div>
  );
}
type Helper4Props = {
  additionalClassNames?: string;
};

function Helper4({ additionalClassNames = "" }: Helper4Props) {
  return (
    <div className={clsx("absolute h-0 left-0 w-[1920px]", additionalClassNames)}>
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 1">
          <line id="ç· 15" stroke="var(--stroke-0, black)" x2="1920" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className="absolute contents left-[203px] top-[6152px]">
      <Helper3 additionalClassNames="left-[203px] top-[6152px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[216.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6154px]">{text}</p>
    </div>
  );
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return (
    <div className={clsx("absolute h-[33px] w-[146px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146 33">
        <path d={svgPaths.p39fbb4f0} fill="var(--fill-0, white)" id="ãã¹ 488" opacity="0.71" stroke="var(--stroke-0, #707070)" />
      </svg>
    </div>
  );
}
type Helper2Props = {
  additionalClassNames?: string;
};

function Helper2({ additionalClassNames = "" }: Helper2Props) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <path d={svgPaths.pf18ea00} fill="var(--fill-0, white)" id="ãã¹ 488" opacity="0.71" stroke="var(--stroke-0, #707070)" />
    </Wrapper>
  );
}
type Image2Props = {
  additionalClassNames?: string;
};

function Image2({ additionalClassNames = "" }: Image2Props) {
  return (
    <div style={{ maskImage: `url('${imgSitetopEngineerEyeSp2}')` }} className={additionalClassNames}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img5} />
    </div>
  );
}
type Image1Props = {
  additionalClassNames?: string;
};

function Image1({ additionalClassNames = "" }: Image1Props) {
  return <Image2 additionalClassNames={clsx("absolute h-[946.614px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[376.892px_262.948px] mask-size-[440px_440px] w-[1682.869px]", additionalClassNames)} />;
}
type ImageProps = {
  additionalClassNames?: string;
};

function Image({ additionalClassNames = "" }: ImageProps) {
  return <Image2 additionalClassNames={clsx("absolute h-[954.217px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1024.9px_265.944px] mask-size-[440px_440px] w-[1696.385px]", additionalClassNames)} />;
}
type SitetopEngineerEyeSpImage2Props = {
  additionalClassNames?: string;
};

function SitetopEngineerEyeSpImage2({ additionalClassNames = "" }: SitetopEngineerEyeSpImage2Props) {
  return (
    <div style={{ maskImage: `url('${imgSitetopEngineerEyeSp3}')` }} className={clsx("absolute h-[1022.635px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[4.453px_614.471px] mask-size-[400px_400px] w-[1260.111px]", additionalClassNames)}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSitetopEngineerEyeSp1} />
    </div>
  );
}
type SitetopEngineerEyeSpImage1Props = {
  additionalClassNames?: string;
};

function SitetopEngineerEyeSpImage1({ additionalClassNames = "" }: SitetopEngineerEyeSpImage1Props) {
  return (
    <div style={{ maskImage: `url('${imgSitetopEngineerEyeSp2}')` }} className={clsx("absolute h-[885.139px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.204px_9.635px] mask-size-[440px_440px] w-[1090.686px]", additionalClassNames)}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSitetopEngineerEyeSp1} />
    </div>
  );
}
type SitetopEngineerEyeSpImageProps = {
  additionalClassNames?: string;
};

function SitetopEngineerEyeSpImage({ additionalClassNames = "" }: SitetopEngineerEyeSpImageProps) {
  return (
    <div style={{ maskImage: `url('${imgSitetopEngineerEyeSp}')` }} className={clsx("absolute h-[1299.039px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[936px_779px] mask-size-[510px_510px] w-[1600.702px]", additionalClassNames)}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSitetopEngineerEyeSp1} />
    </div>
  );
}
type ArrowRight1Props = {
  additionalClassNames?: string;
};

function ArrowRight1({ additionalClassNames = "" }: ArrowRight1Props) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames}>
      <path clipRule="evenodd" d={svgPaths.pf417300} fill="var(--fill-0, #4346BE)" fillRule="evenodd" id="arrow-right" />
    </Wrapper1>
  );
}
type ArrowRightProps = {
  additionalClassNames?: string;
};

function ArrowRight({ additionalClassNames = "" }: ArrowRightProps) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames}>
      <path clipRule="evenodd" d={svgPaths.p24470100} fill="var(--fill-0, #4346BE)" fillRule="evenodd" id="arrow-right" />
    </Wrapper1>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={clsx("absolute h-[9.054px] w-[9px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9.05359">
        <path d="M9 0V9.05359H0L9 0Z" fill="var(--fill-0, #4346BE)" id="ãã¹ 487" />
      </svg>
    </div>
  );
}
type ArrowViewmoreProps = {
  additionalClassNames?: string;
};

function ArrowViewmore({ additionalClassNames = "" }: ArrowViewmoreProps) {
  return (
    <div className={clsx("absolute h-[12.4px] w-[7.327px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.32727 12.4">
        <path d={svgPaths.p36961f00} fill="var(--fill-0, #2A2A2A)" id="arrow-viewmore" />
      </svg>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("absolute h-0 top-[1760.5px] w-[40px]", additionalClassNames)}>
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1">
          <line id="ç· 13" stroke="var(--stroke-0, #707070)" x2="40" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}

function Component22() {
  return (
    <div className="absolute contents left-[359.74px] top-[1701px]" data-name="グループ 471">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[433.24px] not-italic text-[#313131] text-[36px] text-center text-nowrap top-[1701px] tracking-[1.08px] translate-x-[-50%]">お知らせ</p>
      <Helper additionalClassNames="left-[362.5px]" />
    </div>
  );
}

function Component23() {
  return (
    <div className="absolute contents leading-[33px] left-[361.64px] not-italic text-[#313131] text-[18px] text-nowrap top-[1795px]" data-name="グループ 472">
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] left-[409.14px] text-center top-[1795px] translate-x-[-50%]">2025.04.01</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] left-[506px] top-[1795px]">キャリア採用：2025年度キャリア採用選考情報を公開しました</p>
    </div>
  );
}

function Component37() {
  return (
    <div className="absolute contents leading-[33px] left-[361.64px] not-italic text-[#313131] text-[18px] text-nowrap top-[1833px]" data-name="グループ 472">
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] left-[409.14px] text-center top-[1833px] translate-x-[-50%]">2025.03.01</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] left-[506px] top-[1833px]">キャリア採用：2025年度キャリア採用選考情報を公開しました</p>
    </div>
  );
}

function Component44() {
  return (
    <div className="absolute contents leading-[33px] left-[361.64px] not-italic text-[#313131] text-[18px] text-nowrap top-[1871px]" data-name="グループ 472">
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] left-[409.14px] text-center top-[1871px] translate-x-[-50%]">2025.02.01</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] left-[506px] top-[1871px]">キャリア採用：2025年度キャリア採用選考情報を公開しました</p>
    </div>
  );
}

function Component45() {
  return (
    <div className="absolute contents leading-[33px] left-[361.64px] not-italic text-[#313131] text-[18px] text-nowrap top-[1909px]" data-name="グループ 472">
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] left-[409.14px] text-center top-[1909px] translate-x-[-50%]">2025.01.01</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] left-[506px] top-[1909px]">キャリア採用：2025年度キャリア採用選考情報を公開しました</p>
    </div>
  );
}

function Component46() {
  return (
    <div className="absolute contents leading-[33px] left-[361.64px] not-italic text-[#313131] text-[18px] text-nowrap top-[1947px]" data-name="グループ 472">
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] left-[409.14px] text-center top-[1947px] translate-x-[-50%]">2024.10.21</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] left-[506px] top-[1947px]">キャリア採用：2025年度キャリア採用選考情報を公開しました</p>
    </div>
  );
}

function Component24() {
  return (
    <div className="absolute contents left-[359.74px] top-[1701px]" data-name="グループ 473">
      <Component22 />
      <Component23 />
      <Component37 />
      <Component44 />
      <Component45 />
      <Component46 />
    </div>
  );
}

function Component47() {
  return (
    <div className="absolute contents left-[1149px] top-[1701px]" data-name="グループ 471">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1149px] not-italic text-[#313131] text-[36px] text-nowrap top-[1701px] tracking-[1.08px]">採用情報</p>
      <Helper additionalClassNames="left-[1150.5px]" />
    </div>
  );
}

function Component25() {
  return (
    <div className="absolute contents left-[1149px] top-[1795px]" data-name="グループ 474">
      <div className="absolute bg-white border border-[#707070] border-solid h-[68px] left-[1149px] opacity-[0.44] rounded-[5px] top-[1795px] w-[412px]" data-name="長方形 74" />
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[33px] left-[1174px] not-italic text-[#313131] text-[20px] text-nowrap top-[1816px]">キャリア採用向け</p>
    </div>
  );
}

function Component48() {
  return (
    <div className="absolute contents left-[1149px] top-[1869px]" data-name="グループ 474">
      <div className="absolute bg-white border border-[#707070] border-solid h-[68px] left-[1149px] opacity-[0.44] rounded-[5px] top-[1869px] w-[412px]" data-name="長方形 74" />
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[33px] left-[1174px] not-italic text-[#313131] text-[20px] text-nowrap top-[1890px]">新卒採用向け</p>
    </div>
  );
}

function Component49() {
  return (
    <div className="absolute contents left-[1149px] top-[1943px]" data-name="グループ 474">
      <div className="absolute bg-white border border-[#707070] border-solid h-[68px] left-[1149px] opacity-[0.44] rounded-[5px] top-[1943px] w-[412px]" data-name="長方形 74" />
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[33px] left-[1174px] not-italic text-[#313131] text-[20px] text-nowrap top-[1964px]">インターンシップ</p>
    </div>
  );
}

function Component26() {
  return (
    <div className="absolute contents left-[1149px] top-[1701px]" data-name="グループ 475">
      <Component47 />
      <Component25 />
      <Component48 />
      <Component49 />
    </div>
  );
}

function Component27() {
  return (
    <div className="absolute contents left-[1472px] top-[2690px]" data-name="グループ 476">
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1472px] not-italic text-[#313131] text-[16px] text-nowrap top-[2690px]">エクシートとは</p>
      <ArrowViewmore additionalClassNames="left-[1608px] top-[2698.8px]" />
    </div>
  );
}

function Component28() {
  return (
    <div className="absolute contents left-[1440px] top-[2682px]" data-name="グループ 477">
      <div className="absolute bg-white border border-[#707070] border-solid h-[44px] left-[1440px] rounded-[29px] top-[2682px] w-[207px]" data-name="長方形 75" />
      <Component27 />
    </div>
  );
}

function Component29() {
  return (
    <div className="absolute contents left-[1440px] top-[2251px]" data-name="グループ 478">
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] h-[380px] leading-[32px] left-[1440px] not-italic text-[#313131] text-[16px] top-[2251px] w-[405px]">
        <p className="mb-0">私たちは、紙とデジタルの融合によって、</p>
        <p className="mb-0">マーケティングの新しい可能性を切り拓いています。</p>
        <p className="mb-0">部署の垣根を超えてアイデアが飛び交い、個々の挑戦がチームの力になる、そんな風土がここにはあります。</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">「もっとこうしたら、面白くなる」</p>
        <p className="mb-0">「これは誰かの心を動かせるはず」</p>
        <p className="mb-0">そんな想いを持って動ける人にこそ、</p>
        <p className="mb-0">この場所はぴったりです。</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">さあ、私たちと一緒に。</p>
        <p>変化を恐れず、未来を描く仲間になりませんか？</p>
      </div>
      <Component28 />
    </div>
  );
}

function Component18() {
  return (
    <Helper5 additionalClassNames="left-[41px] top-[37.19px]">
      <path d={svgPaths.p2c5ae000} fill="var(--fill-0, #313131)" id="ãã¹ 27" />
      <path d={svgPaths.p23d25000} fill="var(--fill-0, #313131)" id="ãã¹ 28" />
      <path d={svgPaths.p13a86400} fill="var(--fill-0, #313131)" id="ãã¹ 29" />
      <path d={svgPaths.p23b37280} fill="var(--fill-0, #313131)" id="ãã¹ 30" />
      <path d={svgPaths.p2c54d400} fill="var(--fill-0, #313131)" id="ãã¹ 31" />
      <path d={svgPaths.p103c400} fill="var(--fill-0, #313131)" id="ãã¹ 32" />
      <path d={svgPaths.p2ee8dd00} fill="var(--fill-0, #313131)" id="ãã¹ 33" />
      <path d={svgPaths.p2393ea00} fill="var(--fill-0, #313131)" id="ãã¹ 34" />
      <path d={svgPaths.p600d680} fill="var(--fill-0, #313131)" id="ãã¹ 35" />
      <path d={svgPaths.p234cf100} fill="var(--fill-0, #313131)" id="ãã¹ 36" />
      <path d={svgPaths.p2005b500} fill="var(--fill-0, #313131)" id="ãã¹ 37" />
      <path d={svgPaths.p10e22f00} fill="var(--fill-0, #313131)" id="ãã¹ 38" />
      <path d={svgPaths.pdf97f80} fill="var(--fill-0, #313131)" id="ãã¹ 39" />
      <path d={svgPaths.p2d43f100} fill="var(--fill-0, #313131)" id="ãã¹ 40" />
      <path d={svgPaths.p27f24300} fill="var(--fill-0, #313131)" id="ãã¹ 41" />
      <path d={svgPaths.p245aa400} fill="var(--fill-0, #313131)" id="ãã¹ 42" />
      <path d={svgPaths.p2c033880} fill="var(--fill-0, #313131)" id="ãã¹ 43" />
      <path d={svgPaths.p34bea300} fill="var(--fill-0, #313131)" id="ãã¹ 44" />
      <path d={svgPaths.p1460fb80} fill="var(--fill-0, #313131)" id="ãã¹ 45" />
    </Helper5>
  );
}

function Component11() {
  return (
    <div className="absolute contents left-[41px] top-[37.19px]" data-name="レイヤー 1-2">
      <Component18 />
    </div>
  );
}

function Component16() {
  return (
    <div className="absolute contents left-[41px] top-[37.19px]" data-name="レイヤー 2-2">
      <Component11 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents left-[41px] top-[37.19px]" data-name="レイヤー 2">
      <Component16 />
    </div>
  );
}

function Component21() {
  return (
    <div className="absolute contents left-[1678px] top-[46.52px]" data-name="グループ 460">
      <p className="absolute font-['Roboto:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[normal] left-[1766px] text-[16px] text-center text-nowrap text-white top-[46.52px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        会社見学会にエントリー
      </p>
      <div className="absolute h-[11.846px] left-[1855px] top-[51.66px] w-[7px]" data-name="arrow-viewmore">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 11.8462">
          <path d={svgPaths.p190b2b48} fill="var(--fill-0, white)" id="arrow-viewmore" />
        </svg>
      </div>
    </div>
  );
}

function Component20() {
  return (
    <div className="absolute contents left-[1660px] top-[34px]" data-name="グループ 459">
      <div className="absolute bg-[#0064c8] h-[46px] left-[1660px] opacity-70 rounded-[25px] top-[34px] w-[220px]" data-name="長方形 41" />
      <Component21 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute contents left-[20px] top-[525px]" data-name="マスクグループ 1">
      <div className="absolute h-[1060px] left-[15px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5px_3px] mask-size-[1900px_1050px] top-[522px] w-[1907px]" data-name="画像 2" style={{ maskImage: `url('${img2}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img3} />
      </div>
    </div>
  );
}

function Component30() {
  return (
    <div className="absolute contents left-[88px] top-[236px]" data-name="グループ 479">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[107px] not-italic text-[#313131] text-[16px] text-nowrap top-[236px]">Menu</p>
      <Helper1 additionalClassNames="left-[88px] top-[242.68px]" />
    </div>
  );
}

function Component34() {
  return (
    <div className="absolute contents left-[96px] top-[374px]" data-name="グループ 483">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[117px] not-italic text-[#313131] text-[16px] text-nowrap top-[374px]">Interview</p>
      <ArrowRight additionalClassNames="left-[96px] top-[379px]" />
    </div>
  );
}

function Component35() {
  return (
    <div className="absolute contents left-[96px] top-[407px]" data-name="グループ 484">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[117px] not-italic text-[#313131] text-[16px] text-nowrap top-[407px]">Contents</p>
      <ArrowRight additionalClassNames="left-[96px] top-[412px]" />
    </div>
  );
}

function Component33() {
  return (
    <div className="absolute contents left-[96px] top-[341px]" data-name="グループ 482">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[117px] not-italic text-[#313131] text-[16px] text-nowrap top-[341px]">News</p>
      <ArrowRight additionalClassNames="left-[96px] top-[346px]" />
    </div>
  );
}

function Component32() {
  return (
    <div className="absolute contents left-[96px] top-[308px]" data-name="グループ 481">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[117px] not-italic text-[#313131] text-[16px] text-nowrap top-[308px]">Company</p>
      <ArrowRight additionalClassNames="left-[96px] top-[313px]" />
    </div>
  );
}

function Component31() {
  return (
    <div className="absolute contents left-[96px] top-[275px]" data-name="グループ 480">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[117px] not-italic text-[#313131] text-[16px] text-nowrap top-[275px]">News</p>
      <ArrowRight1 additionalClassNames="left-[96px] top-[280px]" />
    </div>
  );
}

function Component12() {
  return (
    <div className="absolute contents left-[142px] top-[2890px]" data-name="マスクグループ 2">
      <SitetopEngineerEyeSpImage additionalClassNames="left-[-794px] top-[2111px]" />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute contents left-[672px] top-[2925px]" data-name="マスクグループ 3">
      <SitetopEngineerEyeSpImage1 additionalClassNames="left-[659.8px] top-[2915.36px]" />
    </div>
  );
}

function Component3() {
  return (
    <div className="absolute contents left-[1132px] top-[2945px]" data-name="マスクグループ 4">
      <SitetopEngineerEyeSpImage2 additionalClassNames="left-[1127.55px] top-[2330.53px]" />
    </div>
  );
}

function Component4() {
  return (
    <div className="absolute contents left-[1552px] top-[2925px]" data-name="マスクグループ 5">
      <Image additionalClassNames="left-[527.1px] top-[2659.06px]" />
    </div>
  );
}

function Component5() {
  return (
    <div className="absolute contents left-[-318px] top-[2925px]" data-name="マスクグループ 6">
      <Image1 additionalClassNames="left-[-694.89px] top-[2662.05px]" />
    </div>
  );
}

function Component36() {
  return (
    <div className="absolute contents left-[80px] top-[4510px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[80px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[93.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#インタビュ－</p>
    </div>
  );
}

function Component53() {
  return (
    <div className="absolute contents left-[203px] top-[4510px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[203px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[216.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#職種：デザイナー</p>
    </div>
  );
}

function Component38() {
  return (
    <div className="absolute contents left-[80px] top-[4510px]" data-name="グループ 487">
      <Component36 />
      <Component53 />
    </div>
  );
}

function Component39() {
  return (
    <div className="absolute contents left-[80px] top-[4014px]" data-name="グループ 488">
      <div className="absolute bg-[#505050] left-[80px] rounded-[15px] size-[370px] top-[4014px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[80.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[4420px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component38 />
    </div>
  );
}

function Component50() {
  return (
    <div className="absolute contents left-[470px] top-[4510px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[470px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[483.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#インタビュ－</p>
    </div>
  );
}

function Component54() {
  return (
    <div className="absolute contents left-[593px] top-[4510px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[593px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[606.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#職種：デザイナー</p>
    </div>
  );
}

function Component51() {
  return (
    <div className="absolute contents left-[470px] top-[4510px]" data-name="グループ 487">
      <Component50 />
      <Component54 />
    </div>
  );
}

function Component52() {
  return (
    <div className="absolute contents left-[470px] top-[4014px]" data-name="グループ 488">
      <div className="absolute bg-[#505050] left-[470px] rounded-[15px] size-[370px] top-[4014px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[470.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[4420px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component51 />
    </div>
  );
}

function Component55() {
  return (
    <div className="absolute contents left-[860px] top-[4510px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[860px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[873.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#インタビュ－</p>
    </div>
  );
}

function Component56() {
  return (
    <div className="absolute contents left-[983px] top-[4510px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[983px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[996.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#職種：デザイナー</p>
    </div>
  );
}

function Component57() {
  return (
    <div className="absolute contents left-[860px] top-[4510px]" data-name="グループ 487">
      <Component55 />
      <Component56 />
    </div>
  );
}

function Component58() {
  return (
    <div className="absolute contents left-[860px] top-[4014px]" data-name="グループ 488">
      <div className="absolute bg-[#505050] left-[860px] rounded-[15px] size-[370px] top-[4014px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[860.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[4420px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component57 />
    </div>
  );
}

function Component59() {
  return (
    <div className="absolute contents left-[1250px] top-[4510px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[1250px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1263.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#インタビュ－</p>
    </div>
  );
}

function Component73() {
  return (
    <div className="absolute contents left-[1373px] top-[4510px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[1373px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1386.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#職種：デザイナー</p>
    </div>
  );
}

function Component74() {
  return (
    <div className="absolute contents left-[1250px] top-[4510px]" data-name="グループ 487">
      <Component59 />
      <Component73 />
    </div>
  );
}

function Component81() {
  return (
    <div className="absolute contents left-[1250px] top-[4014px]" data-name="グループ 488">
      <div className="absolute bg-[#505050] left-[1250px] rounded-[15px] size-[370px] top-[4014px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1250.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[4420px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component74 />
    </div>
  );
}

function Component82() {
  return (
    <div className="absolute contents left-[1640px] top-[4510px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[1640px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1653.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#インタビュ－</p>
    </div>
  );
}

function Component84() {
  return (
    <div className="absolute contents left-[1763px] top-[4510px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[1763px] top-[4510px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1776.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[4512px]">#職種：デザイナー</p>
    </div>
  );
}

function Component86() {
  return (
    <div className="absolute contents left-[1640px] top-[4510px]" data-name="グループ 487">
      <Component82 />
      <Component84 />
    </div>
  );
}

function Component99() {
  return (
    <div className="absolute contents left-[1640px] top-[4014px]" data-name="グループ 488">
      <div className="absolute bg-[#505050] left-[1640px] rounded-[15px] size-[370px] top-[4014px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1640.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[4420px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component86 />
    </div>
  );
}

function Component100() {
  return (
    <div className="absolute contents left-[1147px] top-[5427px]" data-name="グループ 476">
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1147px] not-italic text-[#313131] text-[16px] text-nowrap top-[5427px]">働く環境をのぞく</p>
      <ArrowViewmore additionalClassNames="left-[1299px] top-[5435.8px]" />
    </div>
  );
}

function Component41() {
  return (
    <div className="absolute contents left-[1115px] top-[5419px]" data-name="グループ 490">
      <div className="absolute bg-white border border-[#707070] border-solid h-[44px] left-[1115px] rounded-[29px] top-[5419px] w-[223px]" data-name="長方形 75" />
      <Component100 />
    </div>
  );
}

function Component42() {
  return (
    <div className="absolute contents left-[81px] top-[4678px]" data-name="グループ 491">
      <div className="absolute bg-[#505050] h-[560px] left-[501px] rounded-[16px] top-[4736px] w-[400px]" data-name="長方形 89" />
      <div className="absolute bg-[#505050] h-[442px] left-[501px] rounded-tl-[16px] rounded-tr-[16px] top-[5316px] w-[400px]" data-name="長方形 92" />
      <div className="absolute bg-[#505050] h-[560px] left-[81px] rounded-[16px] top-[4983px] w-[400px]" data-name="長方形 93" />
      <div className="absolute bg-[#505050] h-[285px] left-[81px] rounded-bl-[16px] rounded-br-[16px] top-[4678px] w-[400px]" data-name="長方形 94" />
      <div className="absolute bg-[#505050] h-[195px] left-[81px] rounded-tl-[16px] rounded-tr-[16px] top-[5563px] w-[400px]" data-name="長方形 95" />
      <div className="absolute bg-[#505050] h-[38px] left-[501px] rounded-bl-[16px] rounded-br-[16px] top-[4678px] w-[400px]" data-name="長方形 96" />
    </div>
  );
}

function Component43() {
  return (
    <div className="absolute contents left-[54px] top-[4691px]" data-name="グループ 492">
      <div className="absolute bg-white h-[14px] left-[54px] top-[4692px] w-[161px]" data-name="長方形 97" />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[4691px]">{`<section class=“environment”>`}</p>
    </div>
  );
}

function Component101() {
  return (
    <div className="absolute contents left-[80px] top-[6152px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[80px] top-[6152px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[93.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6154px]">#インタビュ－</p>
    </div>
  );
}

function Component60() {
  return (
    <div className="absolute contents left-[90px] top-[6116px]" data-name="グループ 509">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[109px] not-italic text-[#313131] text-[16px] text-nowrap top-[6116px]">Tag</p>
      <Helper1 additionalClassNames="left-[90px] top-[6123.68px]" />
    </div>
  );
}

function Component68() {
  return (
    <div className="absolute contents left-[80px] top-[6190px]" data-name="グループ 518">
      <Wrapper additionalClassNames="left-[80px] top-[6190px]">
        <path d={svgPaths.p2de8b480} fill="var(--fill-0, white)" id="ãã¹ 488" opacity="0.71" stroke="var(--stroke-0, #707070)" />
      </Wrapper>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[93.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6192px]">#クロストーク</p>
    </div>
  );
}

function Component69() {
  return (
    <div className="absolute contents left-[203px] top-[6190px]" data-name="グループ 519">
      <div className="absolute h-[33px] left-[203px] top-[6190px] w-[62px]" data-name="パス 488">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 33">
          <path d={svgPaths.pc95f400} fill="var(--fill-0, white)" id="ãã¹ 488" opacity="0.71" stroke="var(--stroke-0, #707070)" />
        </svg>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[216.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6192px]">#制度</p>
    </div>
  );
}

function Component70() {
  return (
    <div className="absolute contents left-[80px] top-[6228px]" data-name="グループ 520">
      <div className="absolute h-[33px] left-[80px] top-[6228px] w-[90.104px]" data-name="パス 488">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.1038 33">
          <path d={svgPaths.p1e203880} fill="var(--fill-0, white)" id="ãã¹ 488" opacity="0.71" stroke="var(--stroke-0, #707070)" />
        </svg>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[93.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6230px]">#新卒採用</p>
    </div>
  );
}

function Component71() {
  return (
    <div className="absolute contents left-[175.1px] top-[6228px]" data-name="グループ 521">
      <Wrapper additionalClassNames="left-[175.1px] top-[6228px]">
        <path d={svgPaths.p26d00950} fill="var(--fill-0, white)" id="ãã¹ 488" opacity="0.71" stroke="var(--stroke-0, #707070)" />
      </Wrapper>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[188.19px] not-italic text-[#313131] text-[14px] text-nowrap top-[6230px]">#キャリア採用</p>
    </div>
  );
}

function Component61() {
  return (
    <div className="absolute contents left-[80px] top-[6116px]" data-name="グループ 510">
      <Component101 />
      <Text text="#職種：デザイナー" />
      <Component60 />
      <Text text="#職種：デザイナー" />
      <Component68 />
      <Component69 />
      <Component70 />
      <Component71 />
    </div>
  );
}

function Component62() {
  return (
    <div className="absolute contents left-[90px] top-[5858px]" data-name="グループ 511">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[109px] not-italic text-[#313131] text-[16px] text-nowrap top-[5858px]">Category</p>
      <Helper1 additionalClassNames="left-[90px] top-[5864.68px]" />
    </div>
  );
}

function Component63() {
  return (
    <div className="absolute contents left-[98px] top-[5996px]" data-name="グループ 512">
      <p className="absolute font-['Verdana:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] left-[119px] not-italic text-[#313131] text-[16px] text-nowrap top-[5996px]">仲間を知る</p>
      <ArrowRight additionalClassNames="left-[98px] top-[6001px]" />
    </div>
  );
}

function Component64() {
  return (
    <div className="absolute contents left-[98px] top-[6029px]" data-name="グループ 513">
      <p className="absolute font-['Verdana:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] left-[119px] not-italic text-[#313131] text-[16px] text-nowrap top-[6029px]">環境を知る</p>
      <ArrowRight additionalClassNames="left-[98px] top-[6034px]" />
    </div>
  );
}

function Component65() {
  return (
    <div className="absolute contents left-[98px] top-[5963px]" data-name="グループ 514">
      <p className="absolute font-['Verdana:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] left-[119px] not-italic text-[#313131] text-[16px] text-nowrap top-[5963px]">仕事を知る</p>
      <ArrowRight additionalClassNames="left-[98px] top-[5968px]" />
    </div>
  );
}

function Component66() {
  return (
    <div className="absolute contents left-[98px] top-[5930px]" data-name="グループ 515">
      <p className="absolute font-['Verdana:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] left-[119px] not-italic text-[#313131] text-[16px] text-nowrap top-[5930px]">会社を知る</p>
      <ArrowRight additionalClassNames="left-[98px] top-[5935px]" />
    </div>
  );
}

function Component67() {
  return (
    <div className="absolute contents left-[98px] top-[5897px]" data-name="グループ 516">
      <p className="absolute font-['Verdana:Regular','Noto_Sans_JP:Regular',sans-serif] leading-[16px] left-[119px] not-italic text-[#313131] text-[16px] text-nowrap top-[5897px]">全て</p>
      <ArrowRight1 additionalClassNames="left-[98px] top-[5902px]" />
    </div>
  );
}

function Component80() {
  return (
    <div className="absolute contents left-[90px] top-[5858px]" data-name="グループ 530">
      <Component62 />
      <Component63 />
      <Component64 />
      <Component65 />
      <Component66 />
      <Component67 />
    </div>
  );
}

function Component102() {
  return (
    <div className="absolute contents left-[927px] top-[6476px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[927px] top-[6476px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[940.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6478px]">#インタビュ－</p>
    </div>
  );
}

function Component103() {
  return (
    <div className="absolute contents left-[1050px] top-[6476px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[1050px] top-[6476px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1063.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6478px]">#職種：デザイナー</p>
    </div>
  );
}

function Component104() {
  return (
    <div className="absolute contents left-[927px] top-[6476px]" data-name="グループ 487">
      <Component102 />
      <Component103 />
    </div>
  );
}

function Component76() {
  return (
    <div className="absolute contents left-[927px] top-[5980px]" data-name="グループ 526">
      <div className="absolute bg-[#505050] left-[927px] rounded-[15px] size-[370px] top-[5980px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[927.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[6386px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component104 />
    </div>
  );
}

function Component105() {
  return (
    <div className="absolute contents left-[537px] top-[6476px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[537px] top-[6476px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[550.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6478px]">#インタビュ－</p>
    </div>
  );
}

function Component106() {
  return (
    <div className="absolute contents left-[660px] top-[6476px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[660px] top-[6476px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[673.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6478px]">#職種：デザイナー</p>
    </div>
  );
}

function Component107() {
  return (
    <div className="absolute contents left-[537px] top-[6476px]" data-name="グループ 487">
      <Component105 />
      <Component106 />
    </div>
  );
}

function Component72() {
  return (
    <div className="absolute contents left-[537px] top-[5980px]" data-name="グループ 522">
      <div className="absolute bg-[#505050] left-[537px] rounded-[15px] size-[370px] top-[5980px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[537.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[6386px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component107 />
    </div>
  );
}

function Component108() {
  return (
    <div className="absolute contents left-[1317px] top-[6476px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[1317px] top-[6476px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1330.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6478px]">#インタビュ－</p>
    </div>
  );
}

function Component109() {
  return (
    <div className="absolute contents left-[1440px] top-[6476px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[1440px] top-[6476px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1453.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[6478px]">#職種：デザイナー</p>
    </div>
  );
}

function Component110() {
  return (
    <div className="absolute contents left-[1317px] top-[6476px]" data-name="グループ 487">
      <Component108 />
      <Component109 />
    </div>
  );
}

function Component75() {
  return (
    <div className="absolute contents left-[1317px] top-[5980px]" data-name="グループ 525">
      <div className="absolute bg-[#505050] left-[1317px] rounded-[15px] size-[370px] top-[5980px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1317.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[6386px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component110 />
    </div>
  );
}

function Component111() {
  return (
    <div className="absolute contents left-[927px] top-[7065px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[927px] top-[7065px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[940.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[7067px]">#インタビュ－</p>
    </div>
  );
}

function Component112() {
  return (
    <div className="absolute contents left-[1050px] top-[7065px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[1050px] top-[7065px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1063.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[7067px]">#職種：デザイナー</p>
    </div>
  );
}

function Component113() {
  return (
    <div className="absolute contents left-[927px] top-[7065px]" data-name="グループ 487">
      <Component111 />
      <Component112 />
    </div>
  );
}

function Component77() {
  return (
    <div className="absolute contents left-[927px] top-[6569px]" data-name="グループ 527">
      <div className="absolute bg-[#505050] left-[927px] rounded-[15px] size-[370px] top-[6569px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[927.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[6975px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component113 />
    </div>
  );
}

function Component114() {
  return (
    <div className="absolute contents left-[537px] top-[7065px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[537px] top-[7065px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[550.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[7067px]">#インタビュ－</p>
    </div>
  );
}

function Component115() {
  return (
    <div className="absolute contents left-[660px] top-[7065px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[660px] top-[7065px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[673.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[7067px]">#職種：デザイナー</p>
    </div>
  );
}

function Component116() {
  return (
    <div className="absolute contents left-[537px] top-[7065px]" data-name="グループ 487">
      <Component114 />
      <Component115 />
    </div>
  );
}

function Component78() {
  return (
    <div className="absolute contents left-[537px] top-[6569px]" data-name="グループ 528">
      <div className="absolute bg-[#505050] left-[537px] rounded-[15px] size-[370px] top-[6569px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[537.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[6975px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component116 />
    </div>
  );
}

function Component117() {
  return (
    <div className="absolute contents left-[1317px] top-[7065px]" data-name="グループ 485">
      <Helper2 additionalClassNames="left-[1317px] top-[7065px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1330.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[7067px]">#インタビュ－</p>
    </div>
  );
}

function Component118() {
  return (
    <div className="absolute contents left-[1440px] top-[7065px]" data-name="グループ 502">
      <Helper3 additionalClassNames="left-[1440px] top-[7065px]" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1453.08px] not-italic text-[#313131] text-[14px] text-nowrap top-[7067px]">#職種：デザイナー</p>
    </div>
  );
}

function Component119() {
  return (
    <div className="absolute contents left-[1317px] top-[7065px]" data-name="グループ 487">
      <Component117 />
      <Component118 />
    </div>
  );
}

function Component79() {
  return (
    <div className="absolute contents left-[1317px] top-[6569px]" data-name="グループ 529">
      <div className="absolute bg-[#505050] left-[1317px] rounded-[15px] size-[370px] top-[6569px]" data-name="長方形 89" />
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1317.08px] not-italic text-[#313131] text-[20px] text-nowrap top-[6975px]">
        <p className="mb-0">プレイヤーからリーダーへ</p>
        <p>昇格を通じて描く自己成長の軌跡</p>
      </div>
      <Component119 />
    </div>
  );
}

function Component6() {
  return (
    <div className="absolute contents left-[1670px] top-[824px]" data-name="マスクグループ 7">
      <div className="absolute h-[1080px] left-[1637px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[33px_886px] mask-size-[161px_95px] top-[-62px] w-[1920px]" data-name="FireShot Capture 193 - 新卒採用 - 良品計画 - [careers.muji.com]" style={{ maskImage: `url('${imgFireShotCapture193CareersMujiCom}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFireShotCapture193CareersMujiCom1} />
      </div>
    </div>
  );
}

function Component40() {
  return (
    <div className="absolute contents left-[1660px] top-[816px]" data-name="グループ 489">
      <div className="absolute left-[1660px] size-[180px] top-[816px]" data-name="楕円形 4">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 180">
          <circle cx="90" cy="90" fill="var(--fill-0, #F4EDDD)" id="æ¥åå½¢ 4" r="90" />
        </svg>
      </div>
      <div className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[20px] left-[1750.35px] not-italic text-[#313131] text-[0px] text-center text-nowrap top-[928px] translate-x-[-50%]">
        <p className="mb-0 text-[14px]">インターンシップ</p>
        <p className="mb-0 text-[14px]">会社見学会</p>
        <p className="text-[13px]">はこちら</p>
      </div>
      <Component6 />
    </div>
  );
}

function Component7() {
  return (
    <div className="absolute contents left-[285px] top-[7352px]" data-name="マスクグループ 8">
      <SitetopEngineerEyeSpImage additionalClassNames="left-[-651px] top-[6573px]" />
    </div>
  );
}

function Component8() {
  return (
    <div className="absolute contents left-[815px] top-[7387px]" data-name="マスクグループ 9">
      <SitetopEngineerEyeSpImage1 additionalClassNames="left-[802.8px] top-[7377.37px]" />
    </div>
  );
}

function Component9() {
  return (
    <div className="absolute contents left-[1275px] top-[7407px]" data-name="マスクグループ 10">
      <SitetopEngineerEyeSpImage2 additionalClassNames="left-[1270.55px] top-[6792.53px]" />
    </div>
  );
}

function Component10() {
  return (
    <div className="absolute contents left-[1695px] top-[7387px]" data-name="マスクグループ 11">
      <Image additionalClassNames="left-[670.1px] top-[7121.06px]" />
    </div>
  );
}

function Component13() {
  return (
    <div className="absolute contents left-[-175px] top-[7387px]" data-name="マスクグループ 12">
      <Image1 additionalClassNames="left-[-551.89px] top-[7124.05px]" />
    </div>
  );
}

function Component83() {
  return (
    <div className="absolute contents left-[-175px] top-[7352px]" data-name="グループ 533">
      <Component7 />
      <Component8 />
      <Component9 />
      <Component10 />
      <Component13 />
    </div>
  );
}

function Component19() {
  return (
    <Helper5 additionalClassNames="left-[80px] top-[9025px]">
      <path d={svgPaths.p2c5ae000} fill="var(--fill-0, #212121)" id="ãã¹ 27" />
      <path d={svgPaths.p23d25000} fill="var(--fill-0, #212121)" id="ãã¹ 28" />
      <path d={svgPaths.p13a86400} fill="var(--fill-0, #212121)" id="ãã¹ 29" />
      <path d={svgPaths.p23b37280} fill="var(--fill-0, #212121)" id="ãã¹ 30" />
      <path d={svgPaths.p2c54d400} fill="var(--fill-0, #212121)" id="ãã¹ 31" />
      <path d={svgPaths.p103c400} fill="var(--fill-0, #212121)" id="ãã¹ 32" />
      <path d={svgPaths.p2ee8dd00} fill="var(--fill-0, #212121)" id="ãã¹ 33" />
      <path d={svgPaths.p2393ea00} fill="var(--fill-0, #212121)" id="ãã¹ 34" />
      <path d={svgPaths.p600d680} fill="var(--fill-0, #212121)" id="ãã¹ 35" />
      <path d={svgPaths.p234cf100} fill="var(--fill-0, #212121)" id="ãã¹ 36" />
      <path d={svgPaths.p2005b500} fill="var(--fill-0, #212121)" id="ãã¹ 37" />
      <path d={svgPaths.p10e22f00} fill="var(--fill-0, #212121)" id="ãã¹ 38" />
      <path d={svgPaths.pdf97f80} fill="var(--fill-0, #212121)" id="ãã¹ 39" />
      <path d={svgPaths.p2d43f100} fill="var(--fill-0, #212121)" id="ãã¹ 40" />
      <path d={svgPaths.p27f24300} fill="var(--fill-0, #212121)" id="ãã¹ 41" />
      <path d={svgPaths.p245aa400} fill="var(--fill-0, #212121)" id="ãã¹ 42" />
      <path d={svgPaths.p2c033880} fill="var(--fill-0, #212121)" id="ãã¹ 43" />
      <path d={svgPaths.p34bea300} fill="var(--fill-0, #212121)" id="ãã¹ 44" />
      <path d={svgPaths.p1460fb80} fill="var(--fill-0, #212121)" id="ãã¹ 45" />
    </Helper5>
  );
}

function Component14() {
  return (
    <div className="absolute contents left-[80px] top-[9025px]" data-name="レイヤー 1-2">
      <Component19 />
    </div>
  );
}

function Component17() {
  return (
    <div className="absolute contents left-[80px] top-[9025px]" data-name="レイヤー 2-2">
      <Component14 />
    </div>
  );
}

function Component15() {
  return (
    <div className="absolute contents left-[80px] top-[9025px]" data-name="レイヤー 2">
      <Component17 />
    </div>
  );
}

function Component85() {
  return (
    <div className="absolute contents left-[1024px] top-[7168px]" data-name="グループ 535">
      <div className="absolute bg-white border border-[#707070] border-solid h-[44px] left-[1024px] rounded-[29px] top-[7168px] w-[176px]" data-name="長方形 75" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[1056px] not-italic text-[#313131] text-[16px] text-nowrap top-[7176px]">もっと見る</p>
      <ArrowViewmore additionalClassNames="left-[1161.93px] top-[7184.8px]" />
    </div>
  );
}

function Component87() {
  return (
    <div className="absolute contents left-[960px] top-[8125px]" data-name="グループ 537">
      <div className="absolute bg-white border border-[#707070] border-solid h-[44px] left-[960px] rounded-[29px] top-[8125px] w-[176px]" data-name="長方形 75" />
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] leading-[32px] left-[992px] not-italic text-[#313131] text-[16px] text-nowrap top-[8133px]">募集要項</p>
      <ArrowViewmore additionalClassNames="left-[1097.93px] top-[8141.8px]" />
    </div>
  );
}

function Component88() {
  return (
    <div className="absolute contents left-0 top-[8269px]" data-name="グループ 538">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[8281px]">{`<section class=“(X)plode”>`}</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[8281px] translate-x-[-50%]">08</p>
      <Helper4 additionalClassNames="top-[8269px]" />
    </div>
  );
}

function Component120() {
  return (
    <div className="absolute contents left-[80px] top-[8759px]" data-name="グループ 474">
      <div className="absolute bg-[#333] border border-[#707070] border-solid h-[68px] left-[80px] rounded-[5px] top-[8759px] w-[412px]" data-name="長方形 74" />
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[33px] left-[229px] not-italic text-[16px] text-nowrap text-white top-[8779px]">27卒エントリー</p>
    </div>
  );
}

function Component89() {
  return (
    <div className="absolute contents left-[1227px] top-[8459px]" data-name="グループ 539">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1253px] not-italic text-[#313131] text-[18px] text-nowrap top-[8459px]">エクシートとは</p>
      <ArrowRight2 additionalClassNames="left-[1227px] top-[8463px]" />
    </div>
  );
}

function Component90() {
  return (
    <div className="absolute contents left-[1227px] top-[8515px]" data-name="グループ 540">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1253px] not-italic text-[#313131] text-[18px] text-nowrap top-[8515px]">仲間を知る</p>
      <ArrowRight2 additionalClassNames="left-[1227px] top-[8519px]" />
    </div>
  );
}

function Component91() {
  return (
    <div className="absolute contents left-[1227px] top-[8571px]" data-name="グループ 541">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1253px] not-italic text-[#313131] text-[18px] text-nowrap top-[8571px]">環境を知る</p>
      <ArrowRight2 additionalClassNames="left-[1227px] top-[8575px]" />
    </div>
  );
}

function Component92() {
  return (
    <div className="absolute contents left-[1227px] top-[8627px]" data-name="グループ 542">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1253px] not-italic text-[#313131] text-[18px] text-nowrap top-[8627px]">募集要項</p>
      <ArrowRight2 additionalClassNames="left-[1227px] top-[8631px]" />
    </div>
  );
}

function Component93() {
  return (
    <div className="absolute contents left-[1227px] top-[8683px]" data-name="グループ 543">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1253px] not-italic text-[#313131] text-[18px] text-nowrap top-[8683px]">よくある質問</p>
      <ArrowRight2 additionalClassNames="left-[1227px] top-[8687px]" />
    </div>
  );
}

function Component94() {
  return (
    <div className="absolute contents left-[1213px] top-[8392px]" data-name="グループ 544">
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[22px] left-[1240.95px] not-italic text-[#313131] text-[22px] text-nowrap top-[8392px]">Pickup</p>
      <div className="absolute h-[13.084px] left-[1213px] top-[8401.2px] w-[13.006px]" data-name="パス 487">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0063 13.0838">
          <path d={svgPaths.pfae6600} fill="var(--fill-0, #4346BE)" id="ãã¹ 487" />
        </svg>
      </div>
    </div>
  );
}

function Component95() {
  return (
    <div className="absolute contents left-[1459px] top-[8459px]" data-name="グループ 545">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1485px] not-italic text-[#313131] text-[18px] text-nowrap top-[8459px]">お知らせ</p>
      <ArrowRight2 additionalClassNames="left-[1459px] top-[8463px]" />
    </div>
  );
}

function Component96() {
  return (
    <div className="absolute contents left-[1459px] top-[8515px]" data-name="グループ 546">
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[normal] left-[1485px] not-italic text-[#313131] text-[18px] text-nowrap top-[8515px]">コーポレートサイト</p>
      <ArrowRight2 additionalClassNames="left-[1459px] top-[8519px]" />
    </div>
  );
}

function Component97() {
  return (
    <div className="absolute contents left-[80px] top-[8610px]" data-name="グループ 547">
      <div className="absolute bg-white border border-[#707070] border-solid h-[68px] left-[80px] rounded-[5px] top-[8610px] w-[412px]" data-name="長方形 74" />
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[33px] left-[222px] not-italic text-[#313131] text-[16px] text-nowrap top-[8630px]">インターンシップ</p>
    </div>
  );
}

function Component98() {
  return (
    <div className="absolute contents left-[80px] top-[8685px]" data-name="グループ 548">
      <div className="absolute bg-[#333] border border-[#707070] border-solid h-[68px] left-[80px] rounded-[5px] top-[8685px] w-[412px]" data-name="長方形 74" />
      <p className="absolute font-['Noto_Sans_JP:SemiBold',sans-serif] leading-[33px] left-[198px] not-italic text-[16px] text-nowrap text-white top-[8705px]">キャリア採用エントリー</p>
    </div>
  );
}

export default function Top() {
  return (
    <div className="bg-white relative size-full" data-name="TOPページ">
      <div className="absolute h-[1080px] left-0 top-[4678px] w-[1920px]" data-name="長方形 91">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img91} />
      </div>
      <Component24 />
      <Component26 />
      <div className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[96px] left-[80px] not-italic text-[#313131] text-[54px] text-nowrap top-[2211px] tracking-[1.62px]">
        <p className="mb-0">“やってみたい”が、</p>
        <p className="mb-0">動き出す場所。</p>
        <p className="mb-0">挑戦を楽しみ、</p>
        <p className="mb-0">成長を重ねる</p>
        <p className="mb-0">&nbsp;</p>
        <p>―その先にある未来へ。</p>
      </div>
      <Component29 />
      <TopHelper additionalClassNames="h-[9009px] left-[40.5px] top-[105.5px]">
        <div className="h-0 relative w-[9009px]" data-name="線 14">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9009 1">
              <line id="ç· 14" stroke="var(--stroke-0, black)" x2="9009" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </TopHelper>
      <Helper4 additionalClassNames="top-[2111px]" />
      <Helper4 additionalClassNames="top-[112.5px]" />
      <Component1 />
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[16px] left-[1344.37px] not-italic text-[#313131] text-[14px] text-center text-nowrap top-[49px] tracking-[0.42px] translate-x-[-50%]">新卒採用</p>
      <Component20 />
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[16px] left-[1441.45px] not-italic text-[#313131] text-[14px] text-center text-nowrap top-[49px] tracking-[0.42px] translate-x-[-50%]">キャリア採用</p>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[16px] left-[1552.45px] not-italic text-[#313131] text-[14px] text-center text-nowrap top-[49px] tracking-[0.42px] translate-x-[-50%]">よくある質問</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[71.23px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[125px] translate-x-[-50%]">{`<nav>`}</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[263px] not-italic text-[#313131] text-[10px] text-nowrap top-[125px]">{`<h1 class="message">`}</p>
      <TopHelper additionalClassNames="h-[1482.5px] left-[248.5px] top-[113px]">
        <div className="h-0 relative w-[1482.5px]" data-name="線 18">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1482.5 1">
              <line id="ç· 18" stroke="var(--stroke-0, black)" x2="1482.5" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </TopHelper>
      <div className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[107px] left-[660px] not-italic text-[#313131] text-[0px] text-[78px] text-nowrap top-[218px] tracking-[2.34px]">
        <p className="mb-0 text-[#0074b9]">紙×デジタル</p>
        <p>情報発信を最適化</p>
      </div>
      <Helper4 additionalClassNames="top-[1595px]" />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[1607px]">{`<section class="news">`}</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[2123px]">{`<section class="company">`}</p>
      <Helper4 additionalClassNames="top-[2870px]" />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[3804px]">{`<section roll="interview-contents">`}</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] h-[88px] leading-[32px] left-[590px] not-italic text-[#313131] text-[16px] top-[3564px] w-[1025px]">当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。紙とデジタルの融合を軸に、それぞれが専門性を活かしながら新しい価値を生み出しています。日々の仕事や関わりの中で生まれるリアルな声を、社員インタビューやクロストークを通じてご紹介します。</p>
      <Component />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[125px] translate-x-[-50%]">01</p>
      <Component30 />
      <Component34 />
      <Component35 />
      <Component33 />
      <Component32 />
      <Component31 />
      <Helper4 additionalClassNames="top-[3420px]" />
      <Component12 />
      <Component2 />
      <Component3 />
      <Component4 />
      <Component5 />
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[72px] left-[80px] not-italic text-[#313131] text-[36px] text-nowrap top-[3888px] tracking-[1.08px]">{`インタビュー & クロストーク`}</p>
      <Component39 />
      <Component52 />
      <Component58 />
      <Component81 />
      <Component99 />
      <Helper4 additionalClassNames="top-[3792px]" />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[3432px]">{`<section class=“interview”>`}</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[1607px] translate-x-[-50%]">02</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[2123px] translate-x-[-50%]">03</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[3432px] translate-x-[-50%]">04</p>
      <p className="absolute font-['Noto_Sans_JP:Medium',sans-serif] h-[88px] leading-[32px] left-[1115px] not-italic text-[16px] text-white top-[5280px] w-[629px]">当社では、「挑戦を楽しみながら、安心して働ける環境をつくる」という考えのもと、働きやすく成長しやすい職場づくりに取り組んでいます。ここでは、当社のカルチャーや福利厚生、人事制度など、日々の仕事を支える環境についてご紹介します。</p>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[72px] left-[1115px] not-italic text-[72px] text-nowrap text-white top-[5150px] tracking-[2.16px]">環境を知る</p>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[72px] left-[80px] not-italic text-[#313131] text-[72px] text-nowrap top-[3564px] tracking-[2.16px]">仲間を知る</p>
      <Component41 />
      <Component42 />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[4690px] translate-x-[-50%]">05</p>
      <Component43 />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[5770px]">{`<section class="contents”>`}</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[5770px] translate-x-[-50%]">06</p>
      <Component61 />
      <Component80 />
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[72px] left-[537px] not-italic text-[#313131] text-[36px] text-nowrap top-[5854px]">コンテンツ</p>
      <Component76 />
      <Component72 />
      <Component75 />
      <Component77 />
      <Component78 />
      <Component79 />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[371px] text-[#313131] text-[18px] text-nowrap top-[47px] tracking-[0.54px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Recruitment Site
      </p>
      <Component40 />
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[54px] not-italic text-[#313131] text-[10px] text-nowrap top-[7324px]">{`<section class=“recruit”>`}</p>
      <p className="absolute font-['Verdana:Regular',sans-serif] leading-[16px] left-[20.14px] not-italic text-[#313131] text-[10px] text-center text-nowrap top-[7324px] translate-x-[-50%]">07</p>
      <Helper4 additionalClassNames="top-[7312px]" />
      <Component83 />
      <Component15 />
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium leading-[normal] left-[410px] text-[#272727] text-[18px] text-nowrap top-[9032.87px] tracking-[0.54px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Recruitment Site
      </p>
      <p className="absolute font-['Roboto:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[16px] left-[1678px] text-[#333] text-[12px] text-nowrap top-[9036.87px] tracking-[0.36px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ©株式会社エクシート All Rights
      </p>
      <div className="absolute font-['Noto_Sans_JP:Medium',sans-serif] h-[122px] leading-[32px] left-[960px] not-italic text-[#313131] text-[16px] top-[7952px] w-[629px]">
        <p className="mb-0">当社では、「変化を楽しみ挑戦し続ける」「アイデアを形にする」という行動指針をもとに、職種や部署を超えて連携し合い、チームでの成果を追求しています。</p>
        <p className="mb-0">さあ、私たちと一緒に。変化を恐れず、未来を描く仲間になりませんか？</p>
        <p>あなたのエントリーをお待ちしております。</p>
      </div>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[72px] left-[408px] not-italic text-[#313131] text-[72px] text-nowrap top-[7953px] tracking-[2.16px]">採用について</p>
      <Component85 />
      <Component87 />
      <Component88 />
      <Component120 />
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold leading-[normal] left-[80px] text-[#313131] text-[72px] text-nowrap top-[8368px] tracking-[2.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Let ideas (X)plode.
      </p>
      <p className="absolute font-['Noto_Sans_JP:Bold',sans-serif] leading-[32px] left-[80px] not-italic text-[#313131] text-[28px] text-nowrap top-[8474px]">変化を楽しみ挑戦し続けよう。</p>
      <Helper4 additionalClassNames="top-[8974px]" />
      <div className="absolute h-[21.99px] left-[80px] top-[8866.01px] w-[22px]" data-name="Instagram_Glyph_Black">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgInstagramGlyphBlack} />
      </div>
      <Component89 />
      <Component90 />
      <Component91 />
      <Component92 />
      <Component93 />
      <Component94 />
      <Component95 />
      <Component96 />
      <Component97 />
      <Component98 />
    </div>
  );
}