import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import cardsStore from '@/store/cardsStore';
import { CardType } from '@/shared/models';
import { EditModal } from '@/entities/ui';
import { CardsItem, SelectOrder } from '@/shared/ui';

import css from './cardsList.module.css';

export const CardsList = observer(() => {
  const [orderValue, setOrderValue] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCardId, setEditCardId] = useState<string>();

  useEffect(() => {
    cardsStore.fetchCards(orderValue, 10);
  }, [orderValue]);

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

  if (cardsStore.loading) return <div className={css.loader} />;

  if (cardsStore.error) return <div>Something went wrong</div>;

  const content = cardsStore.cards?.map((item) => (
    <div className={css.cardWrapper} key={item.id}>
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
      <div className={css.orderSelect}>
        <SelectOrder value={orderValue} setOrder={setOrderValue} />
      </div>

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
