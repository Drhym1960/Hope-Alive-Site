export const SCHOLARSHIP_SESSION = "2026/2027";

export type EducationLevel = "primary" | "secondary" | "university";

export type FeeLine = {
  label: string;
  /** Null when the source document did not print an amount. */
  amount: number | null;
};

export type Beneficiary = {
  id: string;
  name: string;
  level: EducationLevel;
  session: typeof SCHOLARSHIP_SESSION;
  /** Null until the individual school is confirmed. */
  institution: string | null;
  total: number;
  fees: FeeLine[];
};

export const LEVEL_LABELS: Record<EducationLevel, string> = {
  primary: "Primary School",
  secondary: "Secondary School",
  university: "University",
};

const PRIMARY_FEES: FeeLine[] = [
  { label: "Tuition Fee", amount: 25_000 },
  { label: "Uniform/Sportwear", amount: 10_000 },
  { label: "Textbooks", amount: 10_000 },
  { label: "Desk", amount: 2_000 },
  { label: "PTA", amount: 1_000 },
];

const SECONDARY_FEES: FeeLine[] = [
  { label: "Tuition Fee", amount: 29_000 },
  { label: "Desk", amount: 3_000 },
  { label: "Uniform/Sportwear", amount: 13_000 },
  { label: "File/Textbooks", amount: 12_500 },
  { label: "Maintenance/Exam", amount: 6_000 },
  { label: "Biometric/Sport Levy", amount: 1_500 },
  { label: "Development", amount: 1_500 },
  { label: "Levy/Library", amount: 3_000 },
  { label: "Excursion/Fire Service", amount: 3_000 },
  { label: "Laboratory Fee/PTA", amount: 1_500 },
  { label: "Medical", amount: null },
];

const PRIMARY_NAMES = [
  "Tersugh Kula",
  "Myomuter Kula",
  "Avadoo Audu",
  "Bem Sedooter Faustina",
  "Nguumbur Peter",
  "Yimase Puusu",
  "Teryima Gbaden",
  "Msughshater Gbaden",
  "Terseer Sachia",
  "Terfa Sachia",
  "Erdoo Kajo",
  "Ordidi Tersoo",
];

const SECONDARY_NAMES = [
  "Yimase Iorse",
  "Terseer Precious",
  "Bem Senater David",
  "Oryiman Torbunde",
  "Terhemen Torbunde",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeCohort(
  names: string[],
  level: EducationLevel,
  total: number,
  fees: FeeLine[],
  institution: string | null = null,
): Beneficiary[] {
  return names.map((name) => ({
    id: `${level}-${slugify(name)}`,
    name,
    level,
    session: SCHOLARSHIP_SESSION,
    institution,
    total,
    fees,
  }));
}

export const beneficiaries: Beneficiary[] = [
  ...makeCohort(PRIMARY_NAMES, "primary", 48_000, PRIMARY_FEES),
  ...makeCohort(SECONDARY_NAMES, "secondary", 75_000, SECONDARY_FEES),
  {
    id: "university-sesoo-iorse",
    name: "Sesoo Iorse",
    level: "university",
    session: SCHOLARSHIP_SESSION,
    institution: "Federal University of Applied Sciences, Kachia, Kaduna State",
    total: 320_000,
    fees: [{ label: "Session Fee", amount: 320_000 }],
  },
  {
    id: "university-akile-ngohide-gertrude",
    name: "Akile Ngohide Gertrude",
    level: "university",
    session: SCHOLARSHIP_SESSION,
    institution: "Rev. Fr. Moses Orshio Adasu University, Makurdi",
    total: 400_000,
    fees: [{ label: "Session Fee", amount: 400_000 }],
  },
];

export const scholarshipTotals = {
  students: beneficiaries.length,
  primary: beneficiaries.filter((b) => b.level === "primary").length,
  secondary: beneficiaries.filter((b) => b.level === "secondary").length,
  university: beneficiaries.filter((b) => b.level === "university").length,
  primaryAmount: 576_000,
  secondaryAmount: 375_000,
  universityAmount: 720_000,
  commitment: 1_671_000,
};

export function formatNgn(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function beneficiariesByLevel(level: EducationLevel | "all") {
  if (level === "all") return beneficiaries;
  return beneficiaries.filter((b) => b.level === level);
}
