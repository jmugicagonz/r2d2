import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

let level=0;

export default function TableNested({ data }) {
  const notEmpty = (data)=>{
    return data==[0] || data!=[] && data!=""  && !!data ? true : false;
  }

  const dataType = (data)=>{
    if(typeof data!='object'){
      return "value"
    }
    else if (typeof data=='object' && !Array.isArray(data)){
      return "object"
    } 
    else if(typeof data=='object' && Array.isArray(data)){
      if(dataType(data[0])=="value"){
        return "arrayOfValues"
      } else if (dataType(data[0])=="object"){
        return "arrayOfObject"
      } else {
        return "arrayOfArray"
      }
    }
  }
  
  const ArrayOfValues = ({data}) => {
      let padding=0;
      if(data.length>1){padding=1}
      return ( 
        <Grid container sx={{maxHeight:"200px", overflow:"auto"}}>
        {
          data.filter((key) => notEmpty(key) ).map((key) => (
          
            (<Grid  key={key} item xs={12} sx={{paddingBottom:padding}} >
                <TextValue  data={key} breakW='break-word'/>
            </Grid>) 
          ))
        }
      </Grid>
      )
    ;
  }
  const TextValue = ({data,breakW}) =>{
    return( 
          <Grid container item xs={12}  >
            <Tooltip title={data.toString()}>
              <Typography  sx={{"text-align":"left", wordBreak:breakW}} variant="caption">
              {data.toString()}
              </Typography>
            </Tooltip>
          </Grid>
    )
  }
  

  return  (
    data && Object.keys(data)
      .filter((key) => notEmpty(data[key]) )
      .map((key) => (
          <TableRow  key={key}>
          {!Array.isArray(data) && (["text", "numbers"].indexOf(key)==-1) && 
            <TableCell style={{ verticalAlign: 'top' }} component="th" scope="row">
              <TextValue data={key}/>
            </TableCell>
          }
          <TableRow align="left">
            {dataType(data[key])=="value" && <TableCell ><TextValue breakW='break-word' data={data[key] }/></TableCell>}
            {dataType(data[key])=="object" && <TableNested data={data[key]}/>}
            {dataType(data[key])=="arrayOfValues" &&<TableCell><ArrayOfValues data={data[key]}/></TableCell> } 
            {dataType(data[key])=="arrayOfObject" && <TableNested data={data[key]}/>} 
            {dataType(data[key])=="arrayOfArray" && <TableNested data={data[key]}/>}   
          </TableRow>
        </TableRow>
      ))
    );
};