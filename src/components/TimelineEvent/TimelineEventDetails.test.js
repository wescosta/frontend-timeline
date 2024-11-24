import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TimelineEventDetails } from "./TimelineEventDetails";

describe("<TimelineEventDetails />", () => {
  const mockOnUpdate = jest.fn();
  const mockOnClose = jest.fn();
  const defaultProps = {
    id: 1,
    name: "Test Event",
    end: "2023-12-31",
    onUpdate: mockOnUpdate,
    onClose: mockOnClose,
  };

  beforeEach(jest.clearAllMocks);

  it("should render correctly with initial props", () => {
    const { getByLabelText } = render(<TimelineEventDetails {...defaultProps} />);
    expect(getByLabelText(/name/i).value).toBe(defaultProps.name);
    expect(getByLabelText(/end date/i).value).toBe(defaultProps.end);
  });

  it("should call onUpdate with correct arguments when update button is clicked", () => {
    const { getByLabelText, getByText } = render(<TimelineEventDetails {...defaultProps} />);
    const newName = "Updated Event";
    const newEnd = "2024-01-01";

    fireEvent.change(getByLabelText(/name/i), { target: { value: newName } });
    fireEvent.change(getByLabelText(/end date/i), { target: { value: newEnd } });
    fireEvent.click(getByText(/update/i));

    expect(mockOnUpdate).toHaveBeenCalledWith(defaultProps.id, { name: newName, end: newEnd });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onClose when update button is clicked", () => {
    const { getByText } = render(<TimelineEventDetails {...defaultProps} />);
    fireEvent.click(getByText(/update/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});