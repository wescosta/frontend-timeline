import { useState, useEffect, useCallback } from 'react';
import timelineItems from '../data/timelineItems';
import { sortTimelineEvents } from '../utils/sortTimelineEvents';

/**
 * Groups timeline events by end date.
 * 
 * @returns An object where the keys are end dates and the values are arrays of events
 */
const groupEventsByEndDate = (events = []) => {
  return events.reduce((eventGroups, event) => {
    const { end: endDate } = event;

    if (!eventGroups[endDate]) {
      eventGroups[endDate] = [];
    }

    eventGroups[endDate].push(event);

    return eventGroups;
  }, {});
};

/**
 * Custom hook to get timeline grouped and sorted events, update event by id function, and get total events count.
 * 
 * When an event is updated, the list is resorted.
 * @returns An object with the grouped and sorted events, a function to update an event, and the total events count
 * @example const {groupedEvents, updateEventById, totalEventsCount} = useTimelineEvents();
 * @example const {groupedEvents, totalEventsCount} = useTimelineEvents();
 */
export const useTimelineEvents = () => {
  const [groupedEvents, setGroupedEvents] = useState({});
  const [totalEventsCount, setTotalEventsCount] = useState(0);

  useEffect(() => {
    const sortedEvents = sortTimelineEvents(timelineItems) ?? [];
    const groupedEvents = groupEventsByEndDate(sortedEvents);

    setGroupedEvents(groupedEvents);
    setTotalEventsCount(sortedEvents.length);
  }, []);

  const updateEventById = useCallback((id, updatedData) => {
    setGroupedEvents(prevEvents => {
      const updatedEvents = Object.values(prevEvents).flat().map(event =>
        event.id === id ? { ...event, ...updatedData } : event
      );

      const sortedEvents = sortTimelineEvents(updatedEvents);
      setTotalEventsCount(sortedEvents.length);
      return groupEventsByEndDate(sortedEvents);
    });
  }, []);

  return { groupedEvents, updateEventById, totalEventsCount };
};
