import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Timeline } from './Timeline';
import { useTimelineEvents } from './hooks/useTimelineEvents';

jest.mock('./hooks/useTimelineEvents')

describe('<Timeline />', () => {
  beforeEach(() => {
    useTimelineEvents.mockReturnValue({
      groupedEvents: {
        '2023-01-01': [{ id: 1, name: 'Event 1' }],
        '2023-01-02': [
          { id: 2, name: 'Event 2' },
          { id: 3, name: 'Event 3' },
        ],
      },
      totalEventsCount: 3,
      updateEventById: jest.fn(),
    });

    render(<Timeline />);
  });

  it('should render the correct number of events and groups', () => {
    expect(screen.getByText('3 timeline events in 2 groups')).toBeDefined();
  });

  it('should render the timeline events for each date group', () => {
    const group1 = screen.getByText('Jan 01, 2023');
    const group2 = screen.getByText('Jan 02, 2023');

    expect(group1).toBeDefined();
    expect(group2).toBeDefined();

    const group1Events = within(screen.getByText('Jan 01, 2023').closest('div'));
    const group2Events = within(screen.getByText('Jan 02, 2023').closest('div'));

    expect(group1Events.getByText('# 1 - Event 1')).toBeDefined();
    expect(group2Events.getByText('# 2 - Event 2')).toBeDefined();
    expect(group2Events.getByText('# 3 - Event 3')).toBeDefined();
  });

  it('should call updateEventById when an event is updated', () => {
    const { updateEventById } = useTimelineEvents.mock.results[0].value;
    const updatedEvent = { name: 'Updated Event 1', end: '2023-01-01' };

    updateEventById(1, updatedEvent);

    expect(updateEventById).toHaveBeenCalledWith(1, { ...updatedEvent });
  });
});