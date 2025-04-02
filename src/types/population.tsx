// PopulationData型の定義=各年の人口データ
export interface PopulationData {
  year: number;
  value: number;
  rate?: number; // rateは一部のカテゴリ（年少人口など）にのみ存在
}

// PrefecturePopulation型の定義＝選択された都道府県の人口データ
export interface PrefecturePopulation {
  prefCode: number; //都道府県コード
  prefName: string; //都道府県名
  data: {
    label: string; // 総人口、年少人口、生産年齢人口、老年人口
    data: PopulationData[]; // 各年の人口データ
  }[];
}

// 人口カテゴリの定義(label部分)
export interface PopulationCategory{
  categorynumber: number;
  categoryname: string;
}