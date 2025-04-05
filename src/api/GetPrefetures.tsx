import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';
import { Prefecture } from '../types/prefecture';

const getPrefecturesApi = async (): Promise<Prefecture[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prefectures`, {
      headers: {
        'X-API-KEY': process.env.REACT_APP_API_KEY,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    return [];
  }
};

export default getPrefecturesApi;
