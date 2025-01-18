import { render, waitFor, screen } from '@testing-library/react';

import cardsStore from '@/store/cardsStore';
import { ErrorBoundary } from '@/app/ErrorBoundary/ErrorBoundary';
import { CardsList } from './CardList';

import css from './CardsList.module.css';

jest.mock('@/store/cardsStore');

describe('CardsList', () => {
  it('should render loading state when cards are being fetched', async () => {
    cardsStore.loading = true;
    cardsStore.cards = [];

    render(
      <ErrorBoundary>
        <CardsList />
      </ErrorBoundary>
    );

    const loader = render(<div className={css.loader} />);

    await waitFor(() => loader);
  });

  it('Should display an error message when an error occurs while fetching cards', async () => {
    render(
      <ErrorBoundary>
        <CardsList />
      </ErrorBoundary>
    );

    const errorMessage = await screen.findByText(/Something went wrong/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
