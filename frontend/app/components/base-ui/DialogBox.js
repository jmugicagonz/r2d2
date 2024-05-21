import * as React from 'react';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CloseFullscreen} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';


export default function DialogBox({open , setOpen, dialogContent, dialogActions}){
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = () => {
      setOpen(false);
  };
  return(
      <Dialog
          fullScreen={fullScreen}
          open={open}
      >
          <DialogContent>
              {dialogContent}
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose} autoFocus>
                          CLOSE <CloseFullscreen/>
              </Button>
              {dialogActions}
          </DialogActions>
      </Dialog>
  )
};
