import { makeAutoObservable, runInAction } from 'mobx';
import { CardType } from '@/shared/models';

import { API_KEY, API_URL } from '@/constants';

class CardsStore {
  cards: CardType[] = [];
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCards(sort: string, limit: number): Promise<void> {
    this.loading = true;
    try {
      const response = await fetch(
        `${API_URL}size=med&mime_types=jpg&format=json&order=${sort}&page=1&has_breeds=1&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        }
      );

      const data: CardType[] = await response.json();

      runInAction(() => {
        this.cards = data;
        this.loading = false;
        this.error = null;
      });
    } catch (error: unknown) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = new Error(error.message);
        }
        this.loading = false;
      });
    }
  }

  editCard(
    id: string | number,
    updatedInfo: Partial<CardType>['breeds']
  ): void {
    const index = this.cards.findIndex((card) => card.id === id);

    if (index !== -1) {
      this.cards[index].breeds = {
        ...this.cards[index].breeds,
        ...updatedInfo,
      };
    }
  }

  deleteCard(id: string | number): void {
    this.cards = this.cards.filter((card) => card.id !== id);
  }
}

const cardsStore = new CardsStore();

export default cardsStore;
