import React, { useState } from 'react';
import Header from '../components/Header';
import PopulationCategorySelect from '../components/PopulationCategorySelect';
import PopulationGraph from '../components/PopulationGraph';
import PrefectureSelect from '../components/PrefectureSelect';
import { INITIAL_POPULATION_CATEGORY } from '../constants/populationcategory';
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
      {selectedPrefectures.length > 0 && (
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
      )}
    </div>
  );
};

export default TopPopulationGraph;
