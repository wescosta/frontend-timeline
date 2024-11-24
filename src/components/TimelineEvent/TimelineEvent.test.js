import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { TimelineEvent } from "./TimelineEvent";

describe("<TimelineEvent />", () => {
  const mockEvent = {
    id: 1,
    name: "Event 1",
    start: "2023-01-01",
    end: "2023-01-02",
  };

  const mockProps = {
    ...mockEvent,
    onUpdate: jest.fn(),
  };

  it("should render the event details", () => {
    const { getByText } = render(<TimelineEvent {...mockProps} />);
    expect(getByText(`# ${mockProps.id} - ${mockProps.name}`)).toBeDefined();
  });

  it("should toggle event details visibility on click", () => {
    const { getByText, queryByText } = render(<TimelineEvent {...mockProps} />);
    const eventElement = getByText(`# ${mockProps.id} - ${mockProps.name}`);

    // initially, details should not be visible
    expect(queryByText("Event Details")).toBeNull();

    // click to show details
    fireEvent.click(eventElement);
    expect(queryByText("Event Details")).toBeDefined();

    // click again to hide details
    fireEvent.click(eventElement);
    expect(queryByText("Event Details")).toBeNull();
  });

  it("should set timeline event data on drag start", () => {
    const { getByText } = render(<TimelineEvent {...mockProps} />);
    const eventElement = getByText(`# ${mockProps.id} - ${mockProps.name}`);
    const dataTransfer = {
      setData: jest.fn(),
    };

    fireEvent.dragStart(eventElement, { dataTransfer });
    expect(dataTransfer.setData).toHaveBeenCalledWith(
      "event",
      JSON.stringify({
        id: mockProps.id,
        name: mockProps.name,
        start: mockProps.start,
        end: mockProps.end,
      })
    );
  });
});