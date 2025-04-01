import React, { useEffect, useState } from 'react';
import PopulationGraph from './PopulationGraph';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

const PrefectureList: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  // 都道府県データをAPIから取得する
  useEffect(() => {
    fetch('https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures', {
      headers: {
        'X-API-KEY': '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ',
      },
    })
      .then(response => response.json())
      .then(data => setPrefectures(data.result));
  }, []);

  // チェックボックスの変更を管理する
  const handlePrefectureChange = (prefCode: number) => {
    setSelectedPrefectures(prevSelected =>
      prevSelected.includes(prefCode)
        ? prevSelected.filter(code => code !== prefCode)
        : [...prevSelected, prefCode]
    );
  };

  return (
    <div>
      <h2>都道府県リスト</h2>
      <ul>
        {prefectures.map(prefecture => (
          <li key={prefecture.prefCode}>
            <input
              type="checkbox"
              value={prefecture.prefCode}
              onChange={() => handlePrefectureChange(prefecture.prefCode)}
            />
            {prefecture.prefName}
          </li>
        ))}
      </ul>

      <div>
        {/* <h3>選択された都道府県：</h3> */}
        <ul>
          {selectedPrefectures.length > 0 ? (
            <PopulationGraph prefCodes={selectedPrefectures} />
          ) : (
            <li>選択されていません</li>
          )}
        </ul>
      </div>

      {/* <div>
        <h3>選択された都道府県：</h3>
        <ul>
          {selectedPrefectures.length > 0 ? (
            selectedPrefectures.map(prefCode => {
              const selectedPref = prefectures.find(p => p.prefCode === prefCode);
              return selectedPref ? (
                <li key={selectedPref.prefCode}>{selectedPref.prefName}</li>
              ) : null;
            })
          ) : (
            <li>選択されていません</li>
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default PrefectureList;
