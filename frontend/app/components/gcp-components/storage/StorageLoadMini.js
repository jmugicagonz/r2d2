"use client";
import {generateV4UploadSignedUrl} from "./actions"
import * as React from 'react';
import { useState, useEffect } from "react";
import IconButton  from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import axios, {isCancel, AxiosError} from 'axios';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { CheckCircleOutlineOutlined } from "@mui/icons-material";

const Input = styled('input')({
  display: 'none',
});

const FileItem =({file, bucketName,path, handleSuccess})=>{
  const [progression, setProgression]= useState(0)
  const [success,setSuccess]=useState(false)
  useEffect(() => {
    async function fetchData() {
      setSuccess(false)
      const url= await generateV4UploadSignedUrl(bucketName,path, file.name, file.type)
      axios.put(url, file , {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.bytes) {
            const progressionRate=Math.round((progressEvent.loaded / progressEvent.total)*100)
            progressionRate%10==0?setProgression(progressionRate):null;
          }
          if (progressEvent.loaded == progressEvent.total) {
            setProgression(0)
            setSuccess(true)
            handleSuccess(file);
          }
        },
      }); 
    }
    fetchData();
  }, [file]);
  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <ArticleOutlinedIcon />
      <Typography variant={"caption"}>{ file.name}</Typography>
      {success ? <CheckCircleOutlineOutlined size={"1rem"}/>:
        <CircularProgress size={"1rem"} variant="determinate"  value={progression}/>
      }
      </Stack>  
  )
}
const filesLoaded = {};
const FilesBox=({bucketName, path, files, output})=>{
  const handleSuccess=(file)=>{
    console.log({
      lastModified: file.lastModified,
      lastModifiedDate:file.lastModifiedDate,
      name:file.name,
      size:file.size,
      type:file.type,
      webkitRelativePath:file.webkitRelativePath
    })
    filesLoaded[file.name.toString().replaceAll(".","")]={
      lastModified: file["lastModified"].toString(),
      lastModifiedDate:file.lastModifiedDate.toString(),
      name:file.name.toString(),
      size:file.size.toString(),
      type:file.type.toString(),
      webkitRelativePath:file.webkitRelativePath.toString()
    }
    
    console.log(filesLoaded)
    output(filesLoaded)
  }
  return(
    <Stack spacing={1}>
      {files && files.map((file,index) => {return (
        <FileItem 
          key={index} 
          file={file} 
          bucketName={bucketName} 
          path={path}
          handleSuccess={handleSuccess}
        />
      )})}
    </Stack>
  )
}

export default  function  StorageLoadMini({bucketName, path, output}) {
  const [files, setFiles]= useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleFileUpload = async (e) => {
    handleClick(e)
    
    const filesArray=[...e.target.files]
    setFiles(filesArray)
  }
  return (
      <Stack direction={"row"} spacing={1} >
        <label htmlFor="icon-button-file">
          <Input accept="*" id="icon-button-file" type="file" multiple onChange={handleFileUpload}/>
          <IconButton color="primary" component="span" >
            <CloudUploadIcon  />
          </IconButton>
        </label>
        <Popover
          id={id}
          elevation={3}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          anchorReference={
            "anchorEl"
          }
          slotProps={{
            paper: {
              sx: {
                padding:"1rem",
                borderRadius:"1rem",
              },
            }
          }}
        >
          <FilesBox 
            bucketName={bucketName} 
            path={path} 
            files={files}
            output={output}
          />
        </Popover>
      </Stack>
    
  );
}