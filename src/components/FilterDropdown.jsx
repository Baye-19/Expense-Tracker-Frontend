// ============================================
// src/components/FilterDropdown.jsx
// FILTER DROPDOWN COMPONENT
// A styled select dropdown for filtering lists.
// Also a controlled component - value and onChange
// come from the parent.
// ============================================

import './FilterDropdown.css';

const FilterDropdown = ({ 
  value,         // Currently selected value
  onChange,      // Function to call when selection changes
  options = [],  // Array of { value, label } objects
  label = '',    // Optional label shown before the dropdown
  name = '',     // Optional name attribute for the select
}) => {
  return (
    <div className="filter-dropdown">
      {/* Optional label */}
      {label && <label className="filter-label">{label}</label>}
      
      {/* Select element */}
      <select
        className="filter-select"
        value={value}
        onChange={onChange}
        name={name}
        aria-label={label || 'Filter'}
      >
        {/* Map through options to create <option> elements */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Dropdown arrow indicator */}
      <span className="filter-arrow">▼</span>
    </div>
  );
};

// ============================================
// WHAT YOU LEARNED:
// 1. Another controlled component example
// 2. Mapping arrays to JSX elements
// 3. The "key" prop importance in lists
// 4. Default prop values
// ============================================

export default FilterDropdown;