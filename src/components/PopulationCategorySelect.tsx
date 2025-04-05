import React from 'react';
import { populationCategories } from '../constants/constants';
import { PopulationCategory } from '../types/population';

interface PopulationCategorySelectProps {
  selectedCategory: PopulationCategory;
  onCategoryChange: (selectedCategory: PopulationCategory) => void;
}

const PopulationCategorySelect: React.FC<PopulationCategorySelectProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div>
      {populationCategories.map(({ categorynumber, categoryname }) => (
        <label key={categorynumber}>
          <input
            type="radio"
            name="populationcategory"
            value={categoryname}
            checked={selectedCategory.categorynumber === categorynumber}
            onChange={() => onCategoryChange({ categorynumber, categoryname })}
          />
          {categoryname}
        </label>
      ))}
    </div>
  );
};

export default PopulationCategorySelect;
