import React, { useState } from "react";
import { TimelineEventDetails } from "./TimelineEventDetails";
import { Dialog } from "../Dialog";

export const TimelineEvent = ({ id, name, start, end, onUpdate }) => {
  const [isEventDetailsVisible, toggleEventDetails] = useState(false);

  const handleToggleEventDetails = () => toggleEventDetails(!isEventDetailsVisible);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("event", JSON.stringify({ id, name, start, end }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleToggleEventDetails}
      className="timeline-event"
    >
      <div># {id} - {name}</div>
      {isEventDetailsVisible && (
        <Dialog isOpen onClose={handleToggleEventDetails}>
          <TimelineEventDetails
            id={id}
            name={name}
            start={start}
            end={end}
            onUpdate={onUpdate}
            onClose={handleToggleEventDetails}
          />
        </Dialog>
      )}
    </div>
  );
};