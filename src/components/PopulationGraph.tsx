import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import getPopulationAPI from '../api/GetPopulation';
import { chartSettings, generateColorFromPrefCode } from '../constants/populationgraph';
import '../styles/PopulationGraph.css';
import { PopulationCategory, PopulationData, PrefecturePopulation } from '../types/population';

interface PopulationGraphProps {
  selectedPrefectures: { prefCode: number; prefName: string }[];
  selectedCategory: PopulationCategory;
}

const PopulationGraph: React.FC<PopulationGraphProps> = ({
  selectedPrefectures,
  selectedCategory,
}) => {
  const [populationData, setPopulationData] = useState<PrefecturePopulation[]>([]);

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
    return <div className="population-graph-loading-text">データを読み込んでいます...</div>;
  }

  return (
    <section className="population-graph-container">
      <ResponsiveContainer width={chartSettings.width} height={chartSettings.height}>
        <LineChart data={populationData[0]?.data || []} margin={chartSettings.margin}>
          <CartesianGrid strokeDasharray={chartSettings.strokeDasharray} />
          <XAxis
            dataKey="year"
            domain={['dataMin', 'dataMax']}
            type="number"
            tickCount={chartSettings.Xaxistickcount}
            label={chartSettings.Xaxislabel}
          />
          <YAxis tickFormatter={value => `${value.toLocaleString()}`} />
          <Tooltip />
          <Legend />
          {populationData.map(prefPopulation => {
            // 選択されたカテゴリに該当するデータを取得
            const selectedPrefData = prefPopulation.data.find(
              item => item.label === selectedCategory.categoryname
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
                key={prefPopulation.prefCode}
                type="monotone"
                dataKey="population"
                stroke={lineColor} //都道府県コードによる色
                data={chartData}
                name={prefPopulation.prefName}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default PopulationGraph;
