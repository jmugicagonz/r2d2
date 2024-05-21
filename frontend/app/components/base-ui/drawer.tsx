import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface TemporaryDrawerProps {
    openConfig: boolean;
    setOpenConfig: React.Dispatch<React.SetStateAction<boolean>>;
    content: React.ReactNode;
  }

export default function TemporaryDrawer ({openConfig, setOpenConfig, content}: TemporaryDrawerProps) {
  

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenConfig(open);
  };

 

  const list = () => (
    <Box
      sx={{ width:250 }}
      role="presentation"
    >
      {content}
    </Box>
  );

  return (
    <div>
        <Drawer
            open={openConfig}
            onClose={toggleDrawer(false)}
            anchor="right"
        >
          {list()}
        </Drawer>
    </div>
  );
}