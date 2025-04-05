import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import { PrefecturePopulation } from '../types/population';

const getPopulationAPI = async (
  selectedPrefectures: { prefCode: number; prefName: string }[]
): Promise<PrefecturePopulation[]> => {
  const result: PrefecturePopulation[] = [];

  try {
    for (const pref of selectedPrefectures) {
      const response = await axios.get(
        `${API_BASE_URL}/population/composition/perYear?prefCode=${pref.prefCode}`,
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
