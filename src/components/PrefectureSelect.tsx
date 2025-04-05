import React, { useEffect, useState } from 'react';
import getPrefecturesApi from '../api/GetPrefetures';
import '../styles/PrefectureSelect.css';
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
    <section className="prefecture-select-container">
      <h2 className="prefecture-select-title">表示する都道府県を選択してください(複数選択可)</h2>
      <ul className="prefecture-list">
        {prefectures.map(prefecture => (
          <li key={prefecture.prefCode} className="prefecture-item">
            <input
              type="checkbox"
              value={prefecture.prefCode}
              onChange={() => handlePrefectureChange(prefecture.prefCode)}
            />
            <label className="prefecture-label">{prefecture.prefName}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PrefectureSelect;
