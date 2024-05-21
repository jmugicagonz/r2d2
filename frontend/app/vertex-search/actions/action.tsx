'use server'
import { createAI, createStreamableUI } from "ai/rsc";
import { Document, Configuration } from '../ui/lib/types'
import { IdTokenClient } from 'google-auth-library';
import { DocumentCard } from "../ui/documentCard";
import { Sparkles } from 'lucide-react';
import { SummaryCard } from "../ui/summaryCard";
import auth from '@/app/components/gcp-components/google-auth/google-auth';

let client: IdTokenClient;

async function getClient(targetAudience: string) {
if (!client) {
  client = await auth.getIdTokenClient(targetAudience);
}
return client;
}


function DocumentCardSkeleton() {
  return (
    <div className="w-full text-sans rounded-lg animate-pulse">
      <div className="flex flex-row items-center gap-4 justify-start">
        <Sparkles />
        <h2> Searching information </h2>
      </div>
    </div>
  );
}

function ErrorCard() {
  return (
    <div>
      <h2>Error</h2>
      <p>Something went wrong. Please try again.</p>
    </div>
  );
}

export async function submitUserMessage(userInput: string, configuration: Configuration) {
  const card = createStreamableUI(<></>);
 
  async function getDocuments() {

    // Setting CardSkeleton while documents are loading
    try {
      card.update(
        <>
          <DocumentCardSkeleton/>
        </>,
      );
 
      // Calling search method
      const res = await callSearch(
        {
          query: userInput,
          configuration,
        }
      );
      
      
      const documents = res.documents;
      const summary = res.summary;
      console.log("summary: ", summary)

      console.log("documents: ", documents)
 
      // Mapping documents to cards
      card.done(
        <>
        <SummaryCard summary={summary}/>
        {documents.map((document: Document, index: number) => {
          let uri = document.uri?.replace('gs://', 'https://storage.cloud.google.com/');
          if (uri) {
            let parts = uri.split('storage.cloud.google.com/');
            uri = parts[0] + 'storage.cloud.google.com/' + encodeURIComponent(parts[1]) + '#page=' + document.page_number;
          }
          return (
              <DocumentCard
                key={document.id} // Assuming each document has a unique id
                number={index+1}
                document={{
                  title: document.title,
                  uri: uri,
                  extractive_answer: document.extractive_answer,
                  page_number: document.page_number,
                  id: document.id,
                }}
              />
          );
        })}
        </>,
      );
    } catch {
      card.done(<ErrorCard />);
    }
  }
 
  getDocuments();
 
  return {
    id: Date.now(),
    display: card.value, // Streamed UI value
  };
}
 
// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
}[] = [];
 
// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: JSX.Element;
}  = {
  id: 0,
  display: <></>
};
 
// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    submitUserMessage
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState
});

// Call Vertex AI Search API
export async function callSearch({query, configuration}: {query: string , configuration: Configuration}): Promise<any> {

  const newReqJSON = {
    "configuration" : configuration,
    "query": query,
  };

  const backend_url = process?.env?.NEXT_PUBLIC_URL_BACKEND? process.env.NEXT_PUBLIC_URL_BACKEND as string: "http://localhost:8000";

  const targetAudience = backend_url;
  const url = backend_url+'/api/search';

  async function request() {
    console.info(`request ${url} with target audience ${targetAudience}`);
  
    if (process?.env?.NEXT_PUBLIC_ENV == "dev") {
      // Running locally, bypass ID token generation
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReqJSON),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.info(data);
      return data;
    } else {
      // Running in production, use ID token
      const client = await getClient(targetAudience);
      console.log("client: ",client)
      console.log("client credentials",client.credentials)
  
      const response = await client.request({url: url, method: 'POST', data: newReqJSON});
      console.info(response.data);
      return response.data
    }
  }
  
  return request().catch(err => {
    console.error(err.message);
    throw new Error(`HTTP error! status: ${err.response.status}`);
  });
}