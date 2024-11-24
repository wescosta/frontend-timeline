import React from 'react';
import { useTimelineEvents } from './hooks/useTimelineEvents';
import { TimelineEventGroup } from '../TimelineEvent';

export const Timeline = () => {
  const {
    groupedEvents,
    updateEventById,
    totalEventsCount,
  } = useTimelineEvents();

  const groups = Object.keys(groupedEvents);

  return (
    <>
      <h3>{totalEventsCount} timeline events in {groups.length} groups</h3>
      <div className="timeline">
        {groups.map((group) => (
          <TimelineEventGroup
            key={group}
            date={group}
            events={groupedEvents[group]}
            onUpdate={updateEventById}
          />
        ))}
      </div>
    </>
  );
};
