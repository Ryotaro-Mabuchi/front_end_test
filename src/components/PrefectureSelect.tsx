import React, { useEffect, useState } from 'react';
import PopulationGraph from './PopulationGraph';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

const PrefectureList: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);

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

  // チェックボックスの状態から選択された都道府県のリストを管理する
  const handlePrefectureChange = (prefCode: number) => {
    setSelectedPrefectures(prevSelected => {
      const selectedPref = prefectures.find(pref => pref.prefCode === prefCode);
      if (!selectedPref) return prevSelected; //見つからなかった場合

      // すでに選択済みであれば除外し、されていない場合は追加する
      const isAlereadySelected = prevSelected.some(pref => pref.prefCode === prefCode);
      if (isAlereadySelected) {
        return prevSelected.filter(pref => pref.prefCode !== prefCode);
      } else {
        return [...prevSelected, selectedPref]; // selectedPrefはPrefecture型
      }
    });
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
            <PopulationGraph selectedPrefectures={selectedPrefectures} />
          ) : (
            <li>選択されていません</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PrefectureList;
