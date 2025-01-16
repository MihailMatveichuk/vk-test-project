import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import cardsStore from '@/store/cardsStore';
import { CardType } from '@/shared/models';
import { EditModal } from '@/entities/ui';
import { CardsItem } from '@/shared/ui';
import { ITEMS_ON_PAGE } from '@/constants';

import css from './cardsList.module.css';

const FIRST_PAGE_NUMBER = 1;

export const CardsList = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCardId, setEditCardId] = useState<string>();
  const [pageValue, setPageValue] = useState(FIRST_PAGE_NUMBER);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching) {
      cardsStore
        .fetchCards(ITEMS_ON_PAGE, pageValue)
        .then(() => {
          setPageValue((prevPageValue) => prevPageValue + 1);
        })
        .finally(() => setIsFetching(false));
    }
  }, [isFetching]);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 50 &&
      Number(cardsStore.count) > pageValue
    ) {
      setIsFetching(true);
    }
  }, [pageValue]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleDelete = (id: string) => {
    cardsStore.deleteCard(id);
  };

  const handleEdit = (id: string, updatedInfo: Partial<CardType>['breeds']) => {
    cardsStore.editCard(id, updatedInfo);
  };

  const handleClickOpen = (id: string) => {
    setIsModalOpen(true);
    setEditCardId(id);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (cardsStore.loading && !cardsStore.cards.length)
    return <div className={css.loader} />;

  if (cardsStore.error) return <div>Something went wrong</div>;

  const content = cardsStore.cards.map((item) => (
    <div className={css.cardWrapper} key={item.id + uuidv4()}>
      <CardsItem
        card={item}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onOpen={handleClickOpen}
      />
    </div>
  ));

  return (
    <div className={css.wrapper}>
      <div className={css.cardsWrapper}>{content}</div>

      <EditModal
        isOpen={isModalOpen}
        card={cardsStore.cards.find((card) => card.id === editCardId)}
        onClose={handleClose}
        onEdit={handleEdit}
      />
    </div>
  );
});
