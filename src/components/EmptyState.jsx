// ============================================
// src/components/EmptyState.jsx
// EMPTY STATE COMPONENT
// Displays a friendly message when there's
// no data to show. Better UX than an empty
// white space!
// ============================================

import './EmptyState.css';

const EmptyState = ({ 
  icon = '📭',        // Emoji or icon
  title = 'Nothing here yet',  // Main message
  description = '',   // Optional sub-message
  actionLabel = '',   // Optional button text
  onAction = null,    // Optional button click handler
}) => {
  return (
    <div className="empty-state">
      {/* Large icon/emoji */}
      <div className="empty-state-icon">{icon}</div>
      
      {/* Title */}
      <h3 className="empty-state-title">{title}</h3>
      
      {/* Optional description */}
      {description && (
        <p className="empty-state-description">{description}</p>
      )}
      
      {/* Optional action button */}
      {actionLabel && onAction && (
        <button 
          className="btn btn-primary btn-sm"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;