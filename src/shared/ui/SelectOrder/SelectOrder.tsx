import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setOrder: Dispatch<SetStateAction<string>>;
};
export function SelectOrder({ value, setOrder }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Order</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Order"
        onChange={handleChange}
      >
        <MenuItem value="asc">ASC</MenuItem>
        <MenuItem value="desc">DESC</MenuItem>
      </Select>
    </FormControl>
  );
}
