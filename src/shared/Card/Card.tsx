import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import { truncateText } from '@/lib/index';

import { CardType } from '../models';

export function CardsItem({ value }: { value: CardType }) {
  return (
    <Card sx={{ maxWidth: 345, paddingBottom: 0 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={value.url}
          alt={value.breeds[0].name}
          height="200px"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {value.breeds[0].name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {truncateText(value.breeds[0].description, 130)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ color: 'var(--COLOR_RED)' }}>
            Delete
          </Button>
          <Button size="small">Edit</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
