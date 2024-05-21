"use client"
import StorageLoadMini from "./StorageLoadMini";
import StorageLoad from "./StorageLoad";
import  Stack  from "@mui/material/Stack";
import FormJSON from "../../base-ui/FormData";
import { useState } from "react";

export default function Storage() {

  const [message, setMessage]= useState<any[]>([]);
  async function onLoadFile(message:any) {
    console.log(message)
    setMessage((oldMessage:any[]) => [message] );
  }
  return (
    <Stack direction={"column"} margin={"10px"} sx={{textAlign:'left'}} >
      <StorageLoadMini bucketName={"gcs-workflows-e84e99ea5a4a7c63"} path={""} output={onLoadFile} />
      <StorageLoad bucketName={"gcs-workflows-e84e99ea5a4a7c63"} path={""} output={onLoadFile} />
      <FormJSON data={message[0]} edit={false}/>
    </Stack>
  );
}