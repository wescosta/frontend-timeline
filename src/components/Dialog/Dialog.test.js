import { render, screen } from '@testing-library/react';
import { Dialog } from './Dialog';
import userEvent from '@testing-library/user-event';

describe('Dialog Component', () => {
  const contentMock = <p>dialog content</p>;

  it('should render dialog content when it is open', () => {
    render(
      <Dialog isOpen>
        {contentMock}
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('dialog content')).toBeDefined();
  });

  it('should not render dialog content when it is closed', () => {
    render(
      <Dialog isOpen={false}>
        {contentMock}
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('dialog content')).toBeNull();
  });

  describe('close', () => {
    it('should call onCLose when clicking on the overlay', async () => {
      const onClose = jest.fn();

      render(
        <Dialog isOpen onClose={onClose} />
      );

      await userEvent.click(screen.getByRole('dialog'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose when clicking on the close button', async () => {
      const onClose = jest.fn();

      render(
        <Dialog isOpen onClose={onClose} />
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClose).toHaveBeenCalled
    });
  });
});