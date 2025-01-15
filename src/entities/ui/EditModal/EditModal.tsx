import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardType } from '@/shared/models';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: string, updatedInfo: Partial<CardType>['breeds']) => void;
  card: CardType | undefined;
};

export function EditModal({ isOpen, onClose, onEdit, card }: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const name = formData.get('name') || '';
            const description = formData.get('description') || '';

            const updatedInfo = [
              {
                name: String(name),
                description: String(description),
              },
            ];

            if (card?.id) {
              onEdit(card.id, updatedInfo);
            }

            onClose();
          },
        }}
      >
        <DialogTitle>Edit form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can edit the content of this card
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name of type of category"
            type="text"
            defaultValue={card?.breeds[0].name}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description of type of category"
            type="text"
            defaultValue={card?.breeds[0].description}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" sx={{ color: 'var(--COLOR_RED)' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
