import React from 'react';
import ReactDOM from 'react-dom';

export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div role="dialog" className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.body
  );
};
