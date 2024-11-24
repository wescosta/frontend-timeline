import React from 'react';
import { TimelineEvent } from './TimelineEvent';
import { formatEventDate } from '../../utils/date/formatDate';

export const TimelineEventGroup = ({ date, events, onUpdate }) => {
  const formattedDate = formatEventDate(date);

  const handleDrop = (e) => {
    e.preventDefault();

    const event = JSON.parse(e.dataTransfer.getData("event"));

    onUpdate(event.id, { ...event, end: date });
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="timeline-group" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h3 className="timeline-group-title">{formattedDate}</h3>
      <div className="timeline-events">
        {events.map((event) => (
          <TimelineEvent key={event.id} {...event} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
};
