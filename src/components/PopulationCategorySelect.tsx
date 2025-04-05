import React from 'react';
import { PopulationCategories } from '../constants/populationcategory';
import '../styles/PopulationCategorySelect.css';
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
    <section className="populaton-category-select-container">
      <h3 className="population-category-select-title">表示する人口カテゴリ：</h3>
      <div className="population-category-options">
        {PopulationCategories.map(({ categorynumber, categoryname }) => (
          <div key={categorynumber} className="population-category-item">
            <input
              type="radio"
              name="populationcategory"
              value={categorynumber}
              checked={selectedCategory.categorynumber === categorynumber}
              onChange={() => onCategoryChange({ categorynumber, categoryname })}
              className="population-category-radio"
            />
            <label className="population-category-label">{categoryname}</label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopulationCategorySelect;
