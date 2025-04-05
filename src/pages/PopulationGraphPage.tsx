import React, { useState } from 'react';
import Header from '../components/Header';
import PopulationCategorySelect from '../components/PopulationCategorySelect';
import PopulationGraph from '../components/PopulationGraph';
import PrefectureSelect from '../components/PrefectureSelect';
import { INITIAL_POPULATION_CATEGORY } from '../constants/constants';
import { PopulationCategory } from '../types/population';
import { Prefecture } from '../types/prefecture';

const TopPopulationGraph: React.FC = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PopulationCategory>(
    INITIAL_POPULATION_CATEGORY
  );

  return (
    <div>
      <Header />
      <PrefectureSelect
        selectedPrefectures={selectedPrefectures}
        onPrefectureChange={setSelectedPrefectures}
      />

      {/* 都道府県が1つ以上選ばれた場合にのみ表示 */}
      {selectedPrefectures.length > 0 ? (
        <>
          <PopulationCategorySelect
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <PopulationGraph
            selectedPrefectures={selectedPrefectures}
            selectedCategory={selectedCategory}
          />
        </>
      ) : (
        <div>都道府県を選択してください</div> // 都道府県が選ばれていない場合にメッセージを表示
      )}
    </div>
  );
};

export default TopPopulationGraph;
