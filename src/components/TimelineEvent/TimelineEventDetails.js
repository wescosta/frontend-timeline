import React, { useState } from "react";

export const TimelineEventDetails = ({ id, name, end, onUpdate, onClose }) => {
  const [editableName, setEditableName] = useState(name);
  const [editableEnd, setEditableEnd] = useState(end);

  const handleUpdate = () => {
    onUpdate(id, { name: editableName, end: editableEnd });
    onClose();
  };

  return (
    <div className="event-details">
      <div>
        <label>
          Name:
          <input
            type="text"
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={editableEnd}
            onChange={(e) => setEditableEnd(e.target.value)}
          />
        </label>
      </div>
      <div className="event-details-actions">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};
