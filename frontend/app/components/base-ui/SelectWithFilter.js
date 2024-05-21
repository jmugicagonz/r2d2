import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { ListSubheader } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"
import { Search } from '@mui/icons-material';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  autoFocus: false
};


export default function  SelectWithFilter  ({itemsValues, itemsSelected, handleItemsList, title, actionName, multiple=false}) {
  const [items, setItems] = React.useState(itemsValues);
  const [itemsSelectedAlready, setItemsSelected] = React.useState(itemsSelected||[]);
  const [filterItems, setFilterItems] = React.useState([]); 

  const handleChange = (event) => {
    console.log(event.target.value)
    const {
      target: { value },
    } = event;
    
    setItemsSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    handleItemsList(value.map((item) =>items[item]))
  };

  const listValues = () =>{
    console.log(itemsSelectedAlready)
    console.log(itemsSelected)
    return itemsSelectedAlready.join(', ')
  }

  const resetFilters = () =>{
    setFilterItems("")
  }

  const resetItemsSelection = () =>{
    handleItemsList([])
    setItemsSelected([])
  }

  return (
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={multiple}
          value={itemsSelectedAlready}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={listValues}
          MenuProps={MenuProps}
          onOpen={resetFilters}
        >
          <ListSubheader>
            <TextField fullWidth size="small"
              onChange={(e) => setFilterItems(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            <Button onClick={resetItemsSelection}> {actionName}</Button>
          </ListSubheader>
          {items && 
            Object.keys(items)
                  .filter((e)=>e.indexOf(filterItems)>-1)
                  .slice(0, 100).map((name, index) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={itemsSelected.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                  ))
          }
        </Select>
       
      </FormControl>
  );
  
}