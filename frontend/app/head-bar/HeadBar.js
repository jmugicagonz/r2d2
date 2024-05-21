import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuBar from "./MenuBar";
import { Grid} from "@mui/material";

export default function HeadBar({ hideMenu, children }) {
  return (
      <Toolbar>
          <Grid container  alignItems={"center"}>
            <Grid item container xs={2} m={"auto"} >
              {!hideMenu && <MenuBar />}
            </Grid>
            <Grid item xs={8} container justifyContent={"center"}>
              <Grid item>
                <Typography variant="h6" color="" noWrap />
              </Grid>
            </Grid>
            <Grid container item xs={2} justifyContent={"flex-end"}>
              <Grid>{children} </Grid>
            </Grid>
          </Grid>
      </Toolbar>
  );
}
