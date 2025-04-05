// 各年の人口データ
export interface PopulationData {
  year: number;
  value: number;
  rate?: number; // rateは一部のカテゴリにのみ存在
}

// 選択された都道府県の人口データ
export interface PrefecturePopulation {
  prefCode: number;
  prefName: string;
  data: {
    label: string; // 総人口、年少人口、生産年齢人口、老年人口
    data: PopulationData[]; // 各年の人口データ
  }[];
}

export interface PopulationCategory {
  categorynumber: number;
  categoryname: string;
}
