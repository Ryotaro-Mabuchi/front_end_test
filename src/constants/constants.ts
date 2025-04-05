import { PopulationCategory } from '../types/population';

export const API_BASE_URL = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1';

export const populationCategories: PopulationCategory[] = [
  { categorynumber: 0, categoryname: '総人口' },
  { categorynumber: 1, categoryname: '年少人口' },
  { categorynumber: 2, categoryname: '生産年齢人口' },
  { categorynumber: 3, categoryname: '老年人口' },
];

export const INITIAL_POPULATION_CATEGORY = {
  categorynumber: 0,
  categoryname: '総人口',
};

export const generateColorFromPrefCode = (prefCode: number): string => {
  const r = (prefCode * 100) % 256;
  const g = (prefCode * 200) % 256;
  const b = (prefCode * 300) % 256;
  return `rgb(${r}, ${g}, ${b})`;
};
