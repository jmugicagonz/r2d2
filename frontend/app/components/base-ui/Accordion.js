import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Stack } from '@mui/material';
import TableNested from './TableNested';

export const AccordionPanel=({panelKey,panelTitle,panelContent, elevation} )=>{
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        <Grid item xs={12}>
          <Accordion  elevation={elevation} sx={{ width:1, border: '1px solid #E0E0E0'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{"textAlign":"left", overflow: "hidden", textOverflow: "ellipsis"}}
              >
                <Grid container item zeroMinWidth>
                  <Grid item>
                  
                  <Typography variant={"caption"} sx={{  marginRight:1 }}>
                    {panelKey}
                  </Typography>
             
                  </Grid>
                  <Grid item>
                  <Typography 
                    variant={"caption"} 
                    sx={{ color: 'text.secondary', wordBreak: "break-all"}}
                  >
                    {panelTitle}
                  </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                  {panelContent}
              </AccordionDetails>
        </Accordion>
      </Grid>
    )
}


export default function ControlledAccordions({data, keyPath}) {
  return (
    <div>
    {data && data.map((item, index)=>(
      <AccordionPanel
        key={index}
        panelKey={index}
        panelTitle={item[keyPath]}
        panelContent={<TableNested data={item}/>}
      />
      ))
    }
    </div>
  );
}
