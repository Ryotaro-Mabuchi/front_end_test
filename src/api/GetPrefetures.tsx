import axios from 'axios';

const getPrefecturesApi = async () => {
  try {
    const response = await axios.get(
      `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures`,
      {
        headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching prefectures:', error);
    return [];
  }
};

export default getPrefecturesApi;
