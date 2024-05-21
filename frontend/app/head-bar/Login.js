"use client"

import { signIn, signOut } from "next-auth/react"
import { Avatar, Paper, Stack } from "@mui/material"
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
          slotProps={{paper:{style: {padding:15, borderRadius:20, width: '300px'}}}}
      >
          <Grid container alignItems={"flex-start"} alignContent={"center"} spacing={1} >
            <Grid  container  item xs={12} >
              <Grid item container xs={8} >
                <Stack direction={"column"}>
                  <Typography variant={"caption"}>{session?.user?.name} </Typography>
                  <Typography variant={"caption"}>{session?.user?.email} </Typography>
                </Stack>
              </Grid>
              <Grid item container xs={4} >
                    <Button size="small" onClick={signOut}>
                      Sign out
                    </Button>
              </Grid>
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
      <Grid container>
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
    <>
      <Avatar onClick={() => signIn("google",{ callbackUrl: '/' })} />
    </>
  )
}