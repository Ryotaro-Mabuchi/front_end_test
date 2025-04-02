import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import getPopulationAPI from '../api/GetPopulation';
import { PopulationData } from '../types/population';
import { PrefecturePopulation } from '../types/population';
import { PopulationCategory } from '../types/population';

// PopulationGraphコンポーネントのProps
interface PopulationGraphProps {
  selectedPrefectures: { prefCode: number; prefName: string }[]; //選択された都道府県のリスト
}

// 人口カテゴリの定義
const populationCategories: PopulationCategory[] = [
  { categorynumber: 0, categoryname: '総人口' },
  { categorynumber: 1, categoryname: '年少人口' },
  { categorynumber: 2, categoryname: '生産年齢人口' },
  { categorynumber: 3, categoryname: '老年人口' },
];

// グラフの色を都道府県コードによって生成
const generateColorFromPrefCode = (prefCode: number): string => {
  const r = (prefCode * 7) % 256;
  const g = (prefCode * 13) % 256;
  const b = (prefCode * 17) % 256;
  return `rgb(${r}, ${g}, ${b})`;
};

const PopulationGraph: React.FC<PopulationGraphProps> = ({ selectedPrefectures }) => {
  const [populationData, setPopulationData] = useState<PrefecturePopulation[]>([]);
  const [selectedPopulationCategory, setSelectedPopulationCategory] = useState<PopulationCategory>({
    categorynumber: 0,
    categoryname: '総人口',
  });

  useEffect(() => {
    const fetchPopulationData = async () => {
      const data = await getPopulationAPI(selectedPrefectures);
      setPopulationData(data);
    };

    if (selectedPrefectures.length > 0) {
      fetchPopulationData();
    }
  }, [selectedPrefectures]);

  if (populationData.length === 0) {
    return <div>データを読み込んでいます...</div>;
  }

  return (
    <div>
      <div>
        {/* categories配列を使用してラジオボタンを作成する */}
        {populationCategories.map(({ categorynumber, categoryname }) => (
          <label key={categorynumber}>
            <input
              type="radio"
              name="populationcategory"
              value={categoryname}
              checked={selectedPopulationCategory.categorynumber === categorynumber}
              onChange={() => setSelectedPopulationCategory({ categorynumber, categoryname })}
            />
            {categoryname}
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={populationData[0]?.data || []}
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            domain={['dataMin', 'dataMax']} // 年の範囲を自動的に調整
            type="number"
            tickCount={10} // 目盛りの数を調整
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {populationData.map(prefPopulation => {
            // 選択されたカテゴリに該当するデータを取得
            const selectedPrefData = prefPopulation.data.find(
              item => item.label === selectedPopulationCategory.categoryname
            );

            if (!selectedPrefData) {
              return null;
            }

            const chartData = selectedPrefData.data.map((item: PopulationData) => ({
              year: item.year,
              population: item.value,
            }));

            const lineColor = generateColorFromPrefCode(prefPopulation.prefCode);

            return (
              <Line
                key={prefPopulation.prefCode} // 都道府県コードをkey
                type="monotone"
                dataKey="population"
                stroke={lineColor} //都道府県コードによる色
                data={chartData}
                name={prefPopulation.prefName} // 都道府県名を表示
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationGraph;
