"use client";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography"
import {bq} from "./actions"
import { useState } from "react"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import DataTable from "../../base-ui/DataTable"
export default  function  BQComponent() {
  const [bqResponse, setBQResponse]= useState({rows:[],columns:[]})
  const [bqQuery, setBQQuery]= useState("SELECT * \nFROM `bigquery-public-data.utility_us.country_code_iso` \nLIMIT 10")
  const [loading, setLoading]= useState(false)
  const handleOnclick = async () =>{
    setLoading(true);
    const response =  await bq(bqQuery)
    //console.log(response)
    const columns = response?response.jobResponse.schema.fields.map(field =>(
      { field: field.name, headerName: field.name, width: field.name.length*10 }
    )):[];
    const rows=response?response.rows.map((element,index)=>({...element,id:index})):[];
    setBQResponse({rows:rows,columns:columns})
    setLoading(false);
  }
  const handleOnChange =  (e) =>{
    setBQQuery(e.target.value)
  }    
    return (
      <>
      <Grid container justifyContent={"center"} sx={{my:5,px:5}}>
        <Grid item  xs={12} m={2}>
          <Typography variant="h6" >
            BigQuery
          </Typography>
        </Grid>
        <Grid item xs={12}  >
          <TextField
            id="outlined-multiline-flexible"
            fullWidth
            inputProps={{style: {fontSize: 13}}} 
            value={bqQuery}
            onChange={handleOnChange}
            multiline
          />
        </Grid>
        <Grid item container justifyContent={"center"}>
          <Grid item m={1}>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              variant="outlined"
              sx={{ width: 150, borderRadius:"20px"}} onClick={handleOnclick}>
                Query
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DataTable rows={bqResponse.rows} columns={bqResponse.columns}/>
        </Grid>
      </Grid>
      </>
    )
  
}