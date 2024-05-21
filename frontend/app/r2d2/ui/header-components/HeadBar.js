import Toolbar from "@mui/material/Toolbar";
import { Box, AppBar, Grid } from "@mui/material";

export default function HeadBar({ children }) {
  return (
    <AppBar position="fixed" style={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
              <Grid container sx={{flexGrow: 1}}>
                {children}
              </Grid>
        </Toolbar>
    </AppBar>
  );
}
