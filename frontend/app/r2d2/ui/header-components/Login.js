"use client"

import { signIn, signOut } from "next-auth/react"
import { Avatar } from "@mui/material"
import Grid from "@mui/material/Grid"
import PropTypes from 'prop-types';
import { useState } from "react";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useSession } from "next-auth/react"


function LoginDialog(props) {
  const { onClose, open, session, id, anchorEl, anchorOrigin } = props;
  return (
      <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={anchorOrigin}
          slotProps={{
            style: { width: '50%' },
          }}
      >
       <Grid container alignItems={"flex-start"} >
        <Grid  container  item xs={12} m={3}>
          <Grid item xs={2}>
            <Avatar  src={
              session?.user?.image
            }/>
          </Grid>
          <Grid item container xs={10} alignItems={"center"}>
            <Grid item xs={12}>
              <Typography variant={"caption"}>Name: {session?.user?.name} </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"caption"}>Email: {session?.user?.email} </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={12} m={2}>
          <Grid item><Button onClick={onClose}>close</Button></Grid>
          <Grid item><Button onClick={signOut}>Sign out</Button> </Grid>
        </Grid>
      </Grid>
    </Popover>
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default  function  LoginGoogle() {
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

 
  if (session) { 
    return (
      <Grid container justifyContent={"flex-end"}>
        <Avatar alt="Remy Sharp" src={
          session?.user?.image
          } onClick={handleClickOpen}/>
        <LoginDialog
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          session={session}
          id={id}
        />
      </Grid>
    )
  }
  return (
    <Grid container justifyContent={"flex-end"}>
      <>
      <Avatar onClick={() => signIn("google",{ callbackUrl: '/' })} />
      </>
    </Grid>
    
  )
}