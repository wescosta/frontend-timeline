import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TimelineEventGroup } from './TimelineEventGroup';

describe('<TimelineEventGroup />', () => {
  const mockOnUpdate = jest.fn();
  const mockDate = '2023-10-10';
  const mockEvents = [
    { id: 1, name: 'Event 1', start: '2023-10-09', end: '2023-10-10' },
    { id: 2, name: 'Event 2', start: '2023-10-07', end: '2023-10-10' },
  ];

  beforeEach(jest.clearAllMocks);

  it('should render correctly', () => {
    const { getByText } = render(
      <TimelineEventGroup
        date={mockDate}
        events={mockEvents}
        onUpdate={mockOnUpdate}
      />
    );

    expect(getByText('Oct 10, 2023')).toBeDefined();
    expect(getByText('# 1 - Event 1')).toBeDefined();
    expect(getByText('# 2 - Event 2')).toBeDefined();
  });

  it('should call onUpdate with correct arguments when event is dropped', () => {
    const { getByText } = render(
      <TimelineEventGroup
        date={mockDate}
        events={mockEvents}
        onUpdate={mockOnUpdate}
      />
    );

    const event = { id: 1, name: 'Event 1', start: '2023-10-09', end: '2023-10-10' };
    const mockEvent = { dataTransfer: { getData: jest.fn(() => JSON.stringify(event)) } };

    fireEvent.drop(getByText('Oct 10, 2023'), mockEvent);

    expect(mockOnUpdate).toHaveBeenCalledWith(event.id, { ...event, end: mockDate });
  });
});