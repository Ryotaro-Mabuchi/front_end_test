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

// PopulationData型の定義
interface PopulationData {
  year: number;
  value: number;
  rate?: number; // rateは一部のカテゴリ（年少人口など）にのみ存在
}

// PrefecturePopulation型の定義
interface PrefecturePopulation {
  label: string; // 都道府県名（または人口カテゴリ名）
  data: {
    label: string; // 総人口、年少人口、生産年齢人口、老年人口
    data: PopulationData[]; // 各年の人口データ
  }[];
}

// PopulationGraphコンポーネントのProps
interface PopulationGraphProps {
  selectedPrefectures: { prefCode: number; prefName: string }[]; //選択された都道府県のリスト
}

const PopulationGraph: React.FC<PopulationGraphProps> = ({ selectedPrefectures }) => {
  const [populationData, setPopulationData] = useState<PrefecturePopulation[]>([]);
  const [selectedPopulation, setSelectedPopulation] = useState<keyof typeof labelMapping>('total'); // 'total', 'youth', 'working', 'elderly'

  // APIから人口構成データを取得する
  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        selectedPrefectures.map(pref =>
          fetch(
            `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${pref.prefCode}`,
            {
              headers: {
                'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ',
              },
            }
          )
            .then(response => response.json())
            .then(data => {
              if (data.result) {
                return {
                  label: pref.prefName, // 都道府県名を表示
                  data: data.result.data,
                };
              }
              return null;
            })
        )
      );

      // nullを除外した後、型を明示的に指定
      setPopulationData(data.filter(item => item !== null) as PrefecturePopulation[]);
    };

    fetchData();
  }, [selectedPrefectures]);

  if (populationData.length === 0) {
    return <div>データを読み込んでいます...</div>;
  }

  // 選択された人口カテゴリに基づくラベルのマッピング
  const labelMapping = {
    total: '総人口',
    youth: '年少人口',
    working: '生産年齢人口',
    elderly: '老年人口',
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="populationType"
            value="total"
            checked={selectedPopulation === 'total'}
            onChange={() => setSelectedPopulation('total')}
          />
          総人口
        </label>
        <label>
          <input
            type="radio"
            name="populationType"
            value="youth"
            checked={selectedPopulation === 'youth'}
            onChange={() => setSelectedPopulation('youth')}
          />
          年少人口
        </label>
        <label>
          <input
            type="radio"
            name="populationType"
            value="working"
            checked={selectedPopulation === 'working'}
            onChange={() => setSelectedPopulation('working')}
          />
          生産年齢人口
        </label>
        <label>
          <input
            type="radio"
            name="populationType"
            value="elderly"
            checked={selectedPopulation === 'elderly'}
            onChange={() => setSelectedPopulation('elderly')}
          />
          老年人口
        </label>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={populationData[0]?.data || []}>
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
              item => item.label === labelMapping[selectedPopulation]
            );

            if (!selectedPrefData) {
              return null;
            }

            const chartData = selectedPrefData.data.map((item: PopulationData) => ({
              year: item.year,
              population: item.value,
            }));

            return (
              <Line
                key={prefPopulation.label} // 都道府県名をkey
                type="monotone"
                dataKey="population"
                stroke="#8884d8"
                data={chartData}
                name={prefPopulation.label} // 都道府県名を表示
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationGraph;
