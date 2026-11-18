// 求人データ型定義
// データ本体はmicroCMSが保持する。取得は src/app/lib/cms/jobs.ts 経由。
export interface Job {
  /** URLの末尾に使う識別子（半角英字。例：web-coder） */
  slug: string;
  /** 最初に公開した日時（ISO 8601）。検索エンジン向けの掲載日に使う */
  postedAt?: string;
  title: string;
  /** キャリア採用ページ(/career)に掲載するか。microCMSで切り替える */
  showOnCareer: boolean;
  department: string;
  departmentDescription: string;
  type: string;
  description: string;
  background: string;
  requirements: string[];
  responsibilities: string[];
  salary: string;
  location: string;
  employmentType: string;
  // オプショナルフィールド（詳細情報）
  welcomeSkills?: string[];
  devEnvironment?: {
    tech: string[];
    versionControl: string[];
    designTools: string[];
    workStyle: string[];
  };
  appealPoints?: string[];
  workHours?: string;
  holidays?: string;
  trialPeriod?: string;
  benefits?: string[];
  selectionProcess?: string[];
}
