import React from 'react';
import { PopulationCategories } from '../constants/populationcategory';
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
      {PopulationCategories.map(({ categorynumber, categoryname }) => (
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
