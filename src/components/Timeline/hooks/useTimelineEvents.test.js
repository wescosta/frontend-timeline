import { renderHook, act } from '@testing-library/react-hooks';

import { useTimelineEvents } from './useTimelineEvents';

jest.mock('../data/timelineItems', () => [
  { id: 2, end: '2023-01-02', name: 'Event 2' },
  { id: 1, end: '2023-01-01', name: 'Event 1' },
  { id: 3, end: '2023-01-02', name: 'Event 3' },
]);

describe('useTimelineEvents', () => {
  it('should group and sort timeline events', () => {
    const { result } = renderHook(() => useTimelineEvents());

    expect(result.current).toEqual({
      totalEventsCount: 3,
      groupedEvents: {
        '2023-01-01': [{ id: 1, end: '2023-01-01', name: 'Event 1' }],
        '2023-01-02': [
          { id: 2, end: '2023-01-02', name: 'Event 2' },
          { id: 3, end: '2023-01-02', name: 'Event 3' },
        ],
      },
      updateEventById: expect.any(Function),
    });
  });

  it('should update an event by id and resort the list', () => {
    const { result } = renderHook(() => useTimelineEvents());

    act(() => {
      result.current.updateEventById(3, { name: 'updated event #3', end: '2023-01-03' });
    });

    expect(result.current.groupedEvents).toEqual({
      '2023-01-01': [{ id: 1, end: '2023-01-01', name: 'Event 1' }],
      '2023-01-02': [{ id: 2, end: '2023-01-02', name: 'Event 2' }],
      '2023-01-03': [{ id: 3, end: '2023-01-03', name: 'updated event #3' }],
    });
  });
});