import React, { useEffect, useState } from 'react';
import getPrefecturesApi from '../api/GetPrefetures';
import { Prefecture } from '../types/prefecture';

interface PrefectureSelectProps {
  selectedPrefectures: Prefecture[];
  onPrefectureChange: (selectedPrefectures: Prefecture[]) => void;
}

const PrefectureSelect: React.FC<PrefectureSelectProps> = ({
  selectedPrefectures,
  onPrefectureChange,
}) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  // 都道府県データをAPIから取得する
  useEffect(() => {
    const fetchPrefectures = async () => {
      const data = await getPrefecturesApi();
      setPrefectures(data);
    };

    fetchPrefectures();
  }, []);

  // チェックボックスの状態から選択された都道府県のリストを管理する
  const handlePrefectureChange = (prefCode: number) => {
    const selectedPref = prefectures.find(pref => pref.prefCode === prefCode);
    if (!selectedPref) return; // `undefined`の場合は処理を中断(何も選択されていない状態)

    const updatedPrefectures = selectedPrefectures.some(pref => pref.prefCode === prefCode)
      ? selectedPrefectures.filter(pref => pref.prefCode !== prefCode) // すでにリストにある場合は除外
      : [...selectedPrefectures, selectedPref]; // 新規選択であれば追加

    onPrefectureChange(updatedPrefectures);
  };

  return (
    <div>
      <h2>都道府県リスト</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap', //折り返しを許可する
          gap: '10px', //アイテム間の間隔
        }}
      >
        {prefectures.map(prefecture => (
          <div key={prefecture.prefCode} style={{ flex: '1 0 7%', marginBottom: '10px' }}>
            <input
              type="checkbox"
              value={prefecture.prefCode}
              onChange={() => handlePrefectureChange(prefecture.prefCode)}
            />
            <label>{prefecture.prefName}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrefectureSelect;
