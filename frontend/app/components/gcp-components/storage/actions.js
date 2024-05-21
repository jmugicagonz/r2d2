"use server"

import { getGCPCredentials } from "/app/api/credentials"
import { headers } from "next/headers";

const { Storage } = require('@google-cloud/storage');

const method = 'PUT';

async function configureBucketCors(bucketName) {
  const credentials= await getGCPCredentials();
  const storage = new Storage(credentials);
  const headersList = headers();
  const activePath = headersList.get("referer");
  //const bucketMetadata=await storage.bucket(bucketName).getMetadata();
  // The origin for this CORS config to allow requests from
  const origin = activePath;
  // The response header to share across origins
  const responseHeader = 'Content-Type';
  // The maximum amount of time the browser can make requests before it must
  // repeat preflighted requests
  const maxAgeSeconds = 3600;  
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds,
      method: [method],
      origin: [origin],
      responseHeader: [responseHeader],
    },
  ]);
}



export async function generateV4UploadSignedUrl(bucketName,path,  file, fileType) {
  await configureBucketCors(bucketName).catch(console.error);
  const credentials= await getGCPCredentials();
  const storage = new Storage(credentials);
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    "Content-Type": fileType,
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(path+file)
    .getSignedUrl(options);
  return url
}

export async function output(vars){
  return vars
}