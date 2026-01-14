// 求人データ型定義
export interface Job {
  id: number;
  title: string;
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
}

// キャリア採用の求人データ
export const careerJobs: Job[] = [
  {
    id: 1,
    title: 'Webコーダー・HTMLコーダー',
    department: 'Web制作部',
    departmentDescription: 'Web制作部は、Webサイトの構築・実装を担当する部署です。WordPress構築やPHP開発、HTML/CSSコーディングなど、クライアントのWebサイト制作を行っています。',
    type: 'エンジニア',
    description: 'WordPress構築・PHP/Webサイト実装を担当していただきます。',
    background: 'Web制作案件の増加に伴い、コーディングスキルを持つ人材を募集しています。',
    requirements: [
      'HTML/CSSの実務経験',
      'WordPressの構築経験',
      'PHPの基本的な理解',
      'レスポンシブデザインの実装経験',
    ],
    responsibilities: [
      'Webサイトのコーディング',
      'WordPress構築・カスタマイズ',
      'PHPによる機能実装',
      'サイト保守・更新作業',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '正社員',
  },
  {
    id: 2,
    title: 'ルート営業',
    department: '営業部',
    departmentDescription: '営業部は、既存顧客へのルート営業や新規開拓を担当する部署です。印刷・Webマーケティングのソリューションをお客様に提案しています。',
    type: '営業',
    description: '福井の印刷・Webマーケティング会社でのルート営業をお任せします。未経験の方も歓迎です。',
    background: '事業拡大に伴い、営業体制を強化するため募集しています。',
    requirements: [
      '普通自動車免許（必須）',
      '未経験可',
      'コミュニケーション能力',
      '基本的なPCスキル',
    ],
    responsibilities: [
      '既存顧客への定期訪問',
      '印刷・Web制作の提案',
      '見積作成・受注対応',
      '顧客との関係構築',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '正社員',
  },
  {
    id: 3,
    title: '印刷製本機での製造・補助スタッフ',
    department: '製造部',
    departmentDescription: '製造部は、印刷物の製造・加工を担当する部署です。印刷機の操作から製本、後加工まで一貫した生産体制を整えています。',
    type: '製造',
    description: '印刷製本機での製造や補助スタッフとして、紙を積んだり、紙の後加工などを担当していただきます。',
    background: '生産体制の強化のため、製造スタッフを募集しています。',
    requirements: [
      '未経験可',
      '体力に自信のある方',
      'チームワークを大切にできる方',
      '丁寧な作業ができる方',
    ],
    responsibilities: [
      '印刷製本機の操作補助',
      '紙の積み込み作業',
      '後加工作業（折り、裁断など）',
      '製品の検品・梱包',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '契約社員',
  },
  {
    id: 4,
    title: '印刷機オペレーター',
    department: '製造部',
    departmentDescription: '製造部は、印刷物の製造・加工を担当する部署です。印刷機の操作から製本、後加工まで一貫した生産体制を整えています。',
    type: '製造',
    description: '福井の印刷会社で印刷機オペレーターとして活躍していただきます。',
    background: '印刷需要の安定に伴い、オペレーターを増員募集しています。',
    requirements: [
      '印刷機の操作経験者優遇',
      '未経験の方も応相談',
      '機械操作に興味がある方',
      '責任感を持って作業できる方',
    ],
    responsibilities: [
      '印刷機の操作・調整',
      '印刷品質の管理',
      '機械のメンテナンス',
      '生産スケジュールの管理',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '契約社員 / 正社員',
  },
  {
    id: 5,
    title: '企画営業職（推し活グッズ事業）',
    department: '営業部',
    departmentDescription: '営業部は、印刷・Web・グッズ制作など幅広いソリューションをお客様に提案しています。推し活グッズ事業では、オリジナルグッズの企画・提案を行っています。',
    type: '営業',
    description: '推し活グッズ事業の企画営業を担当していただきます。',
    background: '推し活グッズ事業の拡大に伴い、企画営業職を募集しています。',
    requirements: [
      '営業経験者優遇',
      '企画提案に興味がある方',
      'トレンドに敏感な方',
      'コミュニケーション能力',
    ],
    responsibilities: [
      '推し活グッズの企画提案',
      '新規顧客の開拓',
      '既存顧客へのフォロー',
      '市場調査・トレンド分析',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '正社員',
  },
  {
    id: 6,
    title: '企画営業',
    department: '営業部',
    departmentDescription: '営業部は、既存顧客へのルート営業や新規開拓を担当する部署です。印刷・Webマーケティングのソリューションをお客様に提案しています。',
    type: '営業',
    description: '福井の印刷・WEBマーケティング会社での企画営業をお任せします。未経験の方も歓迎です。',
    background: '事業拡大に伴い、営業体制を強化するため募集しています。',
    requirements: [
      '普通自動車免許（必須）',
      '未経験可',
      'コミュニケーション能力',
      '企画提案に興味がある方',
    ],
    responsibilities: [
      '印刷・Web制作の企画提案',
      '新規顧客の開拓',
      '既存顧客への提案営業',
      '見積作成・受注対応',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '正社員',
  },
  {
    id: 7,
    title: '営業事務',
    department: '営業部',
    departmentDescription: '営業部は、既存顧客へのルート営業や新規開拓を担当する部署です。営業事務は営業活動をサポートする重要な役割を担っています。',
    type: '事務',
    description: '営業部門の事務サポートを担当していただきます。',
    background: '営業体制の強化に伴い、事務サポートスタッフを募集しています。',
    requirements: [
      '基本的なPCスキル（Word、Excel）',
      '事務経験者優遇',
      'コミュニケーション能力',
      '丁寧な対応ができる方',
    ],
    responsibilities: [
      '見積書・請求書の作成',
      '電話・メール対応',
      '受発注管理',
      '営業資料の作成補助',
    ],
    salary: '※詳細は面談時にご説明します',
    location: '福井県',
    employmentType: '契約社員',
  },
];

// 新卒採用の求人データ
export const graduateJobs: Job[] = [
  // 新卒採用の求人は現在準備中です
];

// IDで求人を取得するヘルパー関数
export function getCareerJobById(id: number): Job | undefined {
  return careerJobs.find(job => job.id === id);
}

export function getGraduateJobById(id: number): Job | undefined {
  return graduateJobs.find(job => job.id === id);
}
