import { render, fireEvent } from '@testing-library/react';

import { CardType } from '@/shared/models';
import { truncateText } from '@/lib';
import { CardsItem } from './Card';

const mockCard: CardType = {
  id: '1',
  url: 'https://example.com/image.jpg',
  breeds: [
    { name: 'Test Breed', description: 'Test Description for this card' },
  ],
};

const mockDelete = jest.fn();
const mockOpen = jest.fn();
const mockEdit = jest.fn();

describe('Card component', () => {
  it('renders Card component', () => {
    const { getByText } = render(
      <CardsItem
        card={mockCard}
        onDelete={mockDelete}
        onOpen={mockOpen}
        onEdit={mockEdit}
      />
    );

    expect(getByText('Test Breed')).toBeInTheDocument();
    expect(getByText('Test Description for this card')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
    expect(getByText('Learn More')).toBeInTheDocument();
  });

  it('handles learn more button click', () => {
    const { getByText } = render(
      <CardsItem
        card={mockCard}
        onDelete={mockDelete}
        onOpen={mockOpen}
        onEdit={mockEdit}
      />
    );

    const learnMoreButton = getByText('Learn More');
    expect(learnMoreButton).toBeInTheDocument();

    fireEvent.click(learnMoreButton);

    const descriptionText = getByText('Test Description for this card')
      .textContent as string;

    const truncatedValue = truncateText(descriptionText, 40);
    mockCard.breeds[0].description = truncatedValue;
    const truncateDescription = getByText(truncatedValue);
    expect(truncateDescription).toBeInTheDocument();

    fireEvent.click(learnMoreButton);

    mockCard.breeds[0].description = descriptionText;
    const fullDescription = getByText(descriptionText);
    expect(fullDescription).toBeInTheDocument();
  });

  it('should call onDelete function when delete button is clicked', () => {
    const { getByText } = render(
      <CardsItem
        card={mockCard}
        onDelete={mockDelete}
        onOpen={mockOpen}
        onEdit={mockEdit}
      />
    );

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(mockCard.id);
  });
});
