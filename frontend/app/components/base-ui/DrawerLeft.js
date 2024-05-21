import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import IconButton from "@mui/material/IconButton";

export default function TemporaryDrawer({button, content}) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

 

  const list = () => (
    <Box
      sx={{ width:250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
     {content}
    </Box>
  );

  return (
    <div>
        <React.Fragment >
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, heigth:"100%" , width:"100%" }}
            onClick={toggleDrawer(true)}
          >
            {button}
          </IconButton>
          <Drawer
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>

    </div>
  );
}
