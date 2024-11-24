/**
 * Sorts an array of events by their end dates in reverse order
 * so the most recent events come first
 * @returns The sorted array of events
 */
export const sortTimelineEvents = (events = []) => {
  return [...events].sort((a, b) => {
    const endA = new Date(a.end);
    const endB = new Date(b.end);

    if (endA > endB) return -1;
    if (endA < endB) return 1;

    return 0;
  });
};
