// ============================================
// src/components/SearchBar.jsx
// SEARCH BAR COMPONENT
// A search input with icon and clear button.
// This is a "controlled component" - the parent
// controls the value through props, and we
// notify the parent about changes via onChange.
//
// KEY CONCEPT: Controlled Components
// In React, form inputs should be "controlled"
// by state. The input's value is set by a prop,
// and changes are handled by a callback. This
// gives the parent complete control over the
// input's behavior.
// ============================================

import './SearchBar.css';

const SearchBar = ({ 
  value,            // Current search text (controlled by parent)
  onChange,         // Function to call when text changes
  placeholder = 'Search expenses...',  // Default placeholder
  onClear,          // Optional: custom clear handler
}) => {
  // ==========================================
  // Handle input change
  // ==========================================
  const handleChange = (e) => {
    // Pass the new value up to the parent
    onChange(e);
  };

  // ==========================================
  // Handle clear button click
  // ==========================================
  const handleClear = () => {
    if (onClear) {
      // If parent provided a custom clear function, use it
      onClear();
    } else {
      // Otherwise, simulate clearing by passing an empty event
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className="search-bar">
      {/* Search icon */}
      <span className="search-icon">🔍</span>
      
      {/* Input field */}
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search expenses"
      />
      
      {/* Clear button - only visible when there's text */}
      {value && (
        <button 
          className="search-clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// ============================================
// WHAT YOU LEARNED:
// 1. Controlled components pattern
// 2. Props for value and onChange
// 3. Conditional rendering (clear button)
// 4. Default prop values
// 5. Accessibility with aria-labels
// ============================================

export default SearchBar;