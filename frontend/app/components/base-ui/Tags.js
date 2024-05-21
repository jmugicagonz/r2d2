"use client";
import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button, Chip, Box } from '@mui/material';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({initValues, options}) {
  const [defaultValue,setDefaultValue]=useState(initValues)
  const handleValues=(e,v)=>{
    console.log(v)
  }
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      style={{ width: 500 }}
      onChange={handleValues}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.title}
      getOptionKey={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        return(
            <Box component="li" {...props}  key={props.id} >
              <Checkbox
                key={props.id}
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </Box>
        )
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
              <Chip {...getTagProps({ index })} label={option.title} key={option.title+index} />
          ))
      }}
      renderInput={(params) => (
        <TextField  {...params} label={"Checkboxes"} placeholder="Favorites" />
      )}
    />
  );
}


