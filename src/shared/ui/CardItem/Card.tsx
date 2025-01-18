import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import { truncateText } from '@/lib/index';
import { CardType } from '@/shared/models';

import css from './Card.module.css';

type Props = {
  card: CardType;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedInfo: Partial<CardType>['breeds']) => void;
  onOpen: (id: string) => void;
};

const DEFAULT_TRUNCATE_VALUE = 120;
const MAX_NAME_LENGTH = 15;

export const CardsItem = ({ card, onDelete, onOpen }: Props) => {
  const [truncateValue, setTruncateValue] = useState(DEFAULT_TRUNCATE_VALUE);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const cardName = card.breeds[0].name;
  const cardDescription = card.breeds[0].description;

  const handleIsLearnMoreOpen = () => {
    if (isLearnMoreOpen) {
      setIsLearnMoreOpen(false);
      setTruncateValue(DEFAULT_TRUNCATE_VALUE);
      return;
    }

    setIsLearnMoreOpen(true);
    setTruncateValue(cardDescription.length);
  };

  return (
    <Card
      sx={{ maxWidth: 345, paddingBottom: 0 }}
      className={`${css.card} ${isLearnMoreOpen ? css.open : ''}`}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={card.url}
          alt={card.breeds[0].name}
          className={css.image}
        />
        <CardContent
          sx={{
            height: 'fitContent',
            minHeight: '150px',
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {truncateText(cardName, MAX_NAME_LENGTH)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {truncateText(cardDescription, truncateValue)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{ color: 'var(--COLOR_RED)' }}
            onClick={() => onDelete(card.id)}
          >
            Delete
          </Button>
          <Button size="small" onClick={() => onOpen(card.id)}>
            Edit
          </Button>
          <Button size="small" onClick={handleIsLearnMoreOpen}>
            Learn More
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
