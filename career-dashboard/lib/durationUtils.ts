import { Project } from '@/data/projects';

/**
 * Month name to number mapping, supporting various formats
 */
const MONTHS: Record<string, number> = {
  'Jan': 0, 'January': 0,
  'Feb': 1, 'February': 1,
  'Mar': 2, 'March': 2,
  'Apr': 3, 'April': 3,
  'May': 4,
  'Jun': 5, 'June': 5,
  'Jul': 6, 'July': 6,
  'Aug': 7, 'August': 7,
  'Sep': 8, 'Sept': 8, 'September': 8,
  'Oct': 9, 'October': 9,
  'Nov': 10, 'November': 10,
  'Dec': 11, 'December': 11,
};

/**
 * Quarter to starting month mapping
 */
const QUARTER_TO_MONTH: Record<number, number> = {
  1: 0,  // Q1 -> January
  2: 3,  // Q2 -> April
  3: 6,  // Q3 -> July
  4: 9,  // Q4 -> October
};

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Parses a date string into a Date object.
 * Supports formats: "Jan 2026", "Sept 2025", "Q1 2026", "Present"
 */
function parseDateString(dateStr: string): Date {
  if (!dateStr) {
    return new Date();
  }

  // Handle "Present" -> today's date
  if (dateStr === 'Present') {
    return new Date();
  }

  // Try quarter format: "Q1 2026"
  const quarterMatch = dateStr.match(/Q([1-4])\s+(\d{4})/);
  if (quarterMatch) {
    const quarter = Number(quarterMatch[1]);
    const year = Number(quarterMatch[2]);
    return new Date(year, QUARTER_TO_MONTH[quarter], 1);
  }

  // Try month format: "Jan 2026", "Sept 2025"
  const monthMatch = dateStr.match(/([A-Za-z]+)\s+(\d{4})/);
  if (monthMatch) {
    const monthName = monthMatch[1];
    const year = Number(monthMatch[2]);
    const month = MONTHS[monthName];
    if (month !== undefined) {
      return new Date(year, month, 1);
    }
  }

  // Fallback to current date if unparseable
  return new Date();
}

/**
 * Parses an experience's date range into start and end Date objects.
 * For "Present", uses today's date.
 */
export function parseExperienceRange(experience: Project): DateRange {
  return {
    startDate: parseDateString(experience.dateStart),
    endDate: parseDateString(experience.dateEnd),
  };
}

/**
 * Computes the number of months between two dates.
 * Uses month granularity, rounded to nearest integer.
 */
export function computeDurationMonths(startDate: Date, endDate: Date): number {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();

  // Total months including partial month (add 1 to include the end month)
  const totalMonths = yearDiff * 12 + monthDiff + 1;

  return Math.max(0, totalMonths);
}

/**
 * Formats a month count as "Xy Ym" string.
 * Omits zero units smartly: "8m", "2y", "2y 3m"
 */
export function formatMonths(months: number): string {
  if (months <= 0) {
    return '0m';
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}m`;
  }

  if (remainingMonths === 0) {
    return `${years}y`;
  }

  return `${years}y ${remainingMonths}m`;
}

/**
 * Gets the duration in months for a single experience.
 */
export function getExperienceDurationMonths(experience: Project): number {
  const { startDate, endDate } = parseExperienceRange(experience);
  return computeDurationMonths(startDate, endDate);
}

/**
 * Computes total duration in months for a set of unique experience IDs.
 * This is the single source of truth for duration calculations.
 */
export function computeTotalMonthsFromExperiences(
  experienceIds: Set<string>,
  projectsMap: Map<string, Project>
): number {
  let totalMonths = 0;

  for (const id of experienceIds) {
    const project = projectsMap.get(id);
    if (project) {
      totalMonths += getExperienceDurationMonths(project);
    }
  }

  return totalMonths;
}

/**
 * Creates a Map of project ID to Project for efficient lookups.
 */
export function createProjectsMap(projects: Project[]): Map<string, Project> {
  return new Map(projects.map(p => [p.id, p]));
}
