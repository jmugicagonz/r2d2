"use client";
import { Button, TextField, IconButton } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import {Grid, Stack, Tooltip} from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState, useEffect, useMemo } from 'react'; 
import {AccordionPanel} from "./Accordion"




export default function FormData({ id, data, edit, elevation=0, output, actionName="action" }: { id?:string, data: any, edit:boolean, elevation?:number, output?: any, actionName?: any}) {
  const [showEmpty, setShowEmpty]=useState(false)
  //Declare Form
  const { register, reset, handleSubmit, formState: { errors }, getValues } = useForm<any>({
    defaultValues: useMemo(() => {
      return data;
  }, [data])
  });
  useEffect(() => {
    reset(data);
  }, [data]);


  const onSubmit=(data:any)=>{
      output(data)
  }
  //data
  const dataType = (data:any) => {
    if (typeof data != 'object') {
      return "value"
    }
    else if (typeof data == 'object' && !Array.isArray(data)) {
      return "object"
    }
    else if (typeof data == 'object' && Array.isArray(data)) {
      if (dataType(data[0]) == "value") {
        return "arrayOfValues"
      } else if (dataType(data[0]) == "object") {
        return "arrayOfObject"
      } else {
        return "arrayOfArray"
      }
    }
  }

  //Form Components
  const ArrayOfValues = ({ data, keyName, keyPath, edit }:{ data: any, keyName: any , keyPath: any, edit:boolean}) => {
    const [list, setList] = useState(data)
    const addItem = () => {
      setList([...list, "new"])
    }
    return (
      <Grid key={keyPath+keyName} container item alignItems={"center"} spacing={2}>
        {
          list.map((key:any, index:any) => (
            (
              <TextValue edit={edit} key={keyPath+keyName+key} data={key} keyName={""} keyPath={keyPath+"."+index} />
            )
          ))
        }
        
        {
          edit &&
          <Grid item >
            <AddCircleOutlineOutlinedIcon onClick={addItem} />
          </Grid>
        }
      </Grid>
    );
  }
  
  const TextValue = ({data, keyName, keyPath, edit}:{ data: any, keyName: any, keyPath:any, edit:boolean}) => {
    if(!keyPath.includes("'") && !keyPath.includes("|")){
      return (
        <Grid item xs={12} sm={12} xl={12} >
            <TextField 
              label={keyName} 
              size={"small"} 
              disabled={!edit}
              multiline={data.length>30}
              inputProps={{ style: { fontSize: 12 } }} 
              {...register(keyPath)}
              fullWidth
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
            />
        </Grid>
      )
    }
  }
  
  const FormContent=({ data, keyPath, edit}: { data: any, keyPath:any, edit:boolean })=>{
    let dataKeysSorted:Array<string>=[];
    dataKeysSorted= data
    ? Object.keys(data).map(k=>{
      return {key:k, dt:dataType(data[k])=="value"?0:1}
    }).sort((a:any, b:any) => (a.dt - b.dt || a.key.localeCompare(b.key))).map(d=>d.key)
    :[];
    //delete data['attributes'];
    
    return(
          <Grid key={keyPath} xs={11} container item justifyItems={"center"} spacing={2} >
          { data && dataKeysSorted.map((key, index) => {
              const dt:string = dataType(data[key]) as string;
              const newKeyPath = keyPath?keyPath+"."+key:key
              let panelTitle:any= "empty"
              let panelContent:any
              if(["value"].includes(dt)){
                return (
                    <TextValue
                      edit={edit}
                      key={newKeyPath}
                      keyName={key}
                      keyPath={newKeyPath}
                      data={data[key]}
                    />
                )
              } else {
                if(!showEmpty && (!data[key] || data[key]?.length==0)){
                  return;
                } else {               
                  panelContent=<Grid container spacing={1}> <FormContent edit={edit} key={key+index} data={data[key]}  keyPath={newKeyPath}/></Grid>
                  if(["arrayOfValues"].includes(dt)){
                    panelTitle= data[key].length==1
                      ? data[key][0]
                      : "("+data[key].length+ ")"
                    panelContent=<ArrayOfValues data={data[key]} keyName={key} keyPath={newKeyPath} edit={edit} />
                    
                  }
                  if(["object"].includes(dt)){
                    panelTitle= !!data[key]
                      ? "("+Object.keys(data[key]).join(", ").substring(0,50) +"...)"
                      : "(0)"
                  }
                  if(["arrayOfObject"].includes(dt)){
                    panelTitle= !!data[key]
                      ? "("+Object.keys(data[key][0]).join(" ,")+")"
                      : data[key].length+ " element(s)"
                  }
                  if(["arrayOfArray"].includes(dt)){
                    panelTitle=data[key].length
                  }
                  return (
                    <Grid container item xs={12} key={newKeyPath}>
                      <AccordionPanel
                        key={newKeyPath}
                        panelKey={key}
                        panelTitle={panelTitle}
                        panelContent={panelContent}
                        elevation={elevation}
                      />
                    </Grid>
                  )
                }
              }
          })}
          </Grid>
    )
  }
  
  return (
      <form id={id} onSubmit={handleSubmit(onSubmit)} noValidate>
        {data && !!data &&
          <Stack margin={3} direction="column" >
            <Tooltip title={!showEmpty?"Show empty values":"Hide empty values"}>
            <IconButton
              sx={{marginLeft:"auto"}} 
              size="small"
              onClick={()=>{setShowEmpty(!showEmpty)}}
              //variant="outlined"
            >
              {!showEmpty?<VisibilityOffOutlinedIcon/>:<VisibilityOutlinedIcon/>}
            </IconButton>

          </Tooltip>
            <FormContent edit={edit} data={data} keyPath={""} key={"start"}/>
            {edit && 
              <Button type="submit">
                {actionName}
              </Button>
            }
            
          </Stack>
        }
       </form>
  );
}
