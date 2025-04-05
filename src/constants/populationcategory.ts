import { PopulationCategory } from '../types/population';

export const PopulationCategories: PopulationCategory[] = [
  { categorynumber: 0, categoryname: '総人口' },
  { categorynumber: 1, categoryname: '年少人口' },
  { categorynumber: 2, categoryname: '生産年齢人口' },
  { categorynumber: 3, categoryname: '老年人口' },
];

export const INITIAL_POPULATION_CATEGORY = {
  categorynumber: 0,
  categoryname: '総人口',
};
