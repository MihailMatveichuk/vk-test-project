import { useGetAllCardsQuery } from '@/store/cardsApi';

import { CardsItem } from '@/shared/ui/Card';

import css from './cardsList.module.css';

export function CardsList() {
  const { data, isLoading, isError } = useGetAllCardsQuery(10);

  console.log(data);

  if (isLoading) return <div className={css.loader} />;

  if (isError) return <div>Something went wrong</div>;

  const content = data?.map((item) => <CardsItem key={item.id} value={item} />);

  return <div className={css.cardsWrapper}>{content}</div>;
}
