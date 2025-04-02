import axios from 'axios';

// PopulationData型の定義=各年の人口データ
interface PopulationData {
  year: number;
  value: number;
  rate?: number; // rateは一部のカテゴリ（年少人口など）にのみ存在
}

// PrefecturePopulation型の定義＝選択された都道府県の人口データ
interface PrefecturePopulation {
  prefCode: number; //都道府県コード
  prefName: string; //都道府県名
  data: {
    label: string; // 総人口、年少人口、生産年齢人口、老年人口
    data: PopulationData[]; // 各年の人口データ
  }[];
}

const getPopulationAPI = async (
  selectedPrefectures: { prefCode: number; prefName: string }[]
): Promise<PrefecturePopulation[]> => {
  const result: PrefecturePopulation[] = [];

  try {
    for (const pref of selectedPrefectures) {
      const response = await axios.get(
        `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${pref.prefCode}`,
        {
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (response.data.result) {
        result.push({
          prefCode: pref.prefCode,
          prefName: pref.prefName,
          data: response.data.result.data,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching population data:', error);
    return [];
  }
  return result;
};

export default getPopulationAPI;
