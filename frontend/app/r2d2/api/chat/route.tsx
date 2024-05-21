import { StreamingTextResponse } from 'ai';
import { IdTokenClient } from 'google-auth-library';
import auth from '@/app/components/gcp-components/google-auth/google-auth';
 
let client: IdTokenClient;

async function getClient(targetAudience: string) {
if (!client) {
  client = await auth.getIdTokenClient(targetAudience);
}
return client;
}

export async function POST(req: Request) {
const reqJSON = await req.json();

async function request() {
  const backend_url = process?.env?.NEXT_PUBLIC_URL_BACKEND? process.env.NEXT_PUBLIC_URL_BACKEND as string: "http://localhost:8000";
  const targetAudience = backend_url;
  const url = backend_url+'/api/chat';

  console.info(`request ${url} with target audience ${targetAudience}`);

  if (process?.env?.NEXT_PUBLIC_ENV == "dev") {
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqJSON),
    });

    if (response.body === null) {
      throw new Error('Response body is null');
    }

    return new StreamingTextResponse(response.body);

  } else {
    const client = await getClient(targetAudience);
    console.log("client: ",client)
    console.log("client credentials",client.credentials)

    const response = await client.request({url: url, method: 'POST', data: reqJSON, responseType: 'stream'});
    console.log("response", response)
    return new StreamingTextResponse(response.data as ReadableStream<any>);
  }
}

return request().catch(err => {
  console.error(err.message);
  throw new Error(`HTTP error! status: ${err.response.status}`);
});
}



