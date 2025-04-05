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
      <h3 className="population-category-select-title">表示する人口カテゴリ</h3>
      <ul className="population-category-list">
        {PopulationCategories.map(({ categorynumber, categoryname }) => (
          <li key={categorynumber} className="population-category-item">
            <input
              type="radio"
              name="populationcategory"
              value={categorynumber}
              checked={selectedCategory.categorynumber === categorynumber}
              onChange={() => onCategoryChange({ categorynumber, categoryname })}
              id={`category-${categorynumber}`}
            />
            <label htmlFor={`category-${categorynumber}`}>{categoryname}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopulationCategorySelect;
