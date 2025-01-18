import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditModal } from './EditModal';
import { CardType } from '@/shared/models';

const mockCard: CardType = {
  id: '1',
  url: 'https://example.com/image.jpg',
  breeds: [{ name: 'Test Breed', description: 'Test Description' }],
};

const mockOnEdit = jest.fn();
const mockOnClose = jest.fn();

describe('EditModal', () => {
  it('Should not render the modal when isOpen prop is true', () => {
    render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        card={mockCard}
      />
    );

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeNull();
  });

  it('Should not render the modal when isOpen prop is false', () => {
    render(
      <EditModal
        isOpen={false}
        onClose={jest.fn()}
        onEdit={jest.fn()}
        card={undefined}
      />
    );

    const modal = screen.queryByRole('dialog');
    expect(modal).toBeNull();
  });

  it('renders the modal with correct input values', () => {
    render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        card={mockCard}
      />
    );

    expect(screen.getByLabelText(/Name of type of category/i)).toHaveValue(
      'Test Breed'
    );
    expect(
      screen.getByLabelText(/Description of type of category/i)
    ).toHaveValue('Test Description');
  });

  it('should call onClose function when Cancel button is clicked', () => {
    const { getByText } = render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        onEdit={jest.fn()}
        card={undefined}
      />
    );

    fireEvent.click(getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('Should call onEdit function with correct parameters when Save button is clicked', async () => {
    const mockOnEdit = jest.fn();
    render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        card={mockCard}
      />
    );

    const nameInput = screen.getByLabelText(/Name of type of category/i);
    const descriptionInput = screen.getByLabelText(
      /Description of type of category/i
    );

    const saveButton = screen.getByText(/Save/i);

    await userEvent.clear(nameInput);
    await userEvent.clear(descriptionInput);

    await userEvent.type(nameInput, 'Updated Name');
    await userEvent.type(descriptionInput, 'Updated Description');

    await act(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(nameInput).toHaveValue('Updated Name');
      expect(descriptionInput).toHaveValue('Updated Description');
    });
  });
});
