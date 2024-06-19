'use server'
import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import { StreamingTextResponse } from 'ai';
import { IdTokenClient } from 'google-auth-library';
import { Sparkles } from 'lucide-react';
import auth from '@/app/components/gcp-components/google-auth/google-auth';
import { Message, ChatConfiguration } from '../lib/types';
import ChatMessage  from '../ui/chat-message'

let client: IdTokenClient;

async function getClient(targetAudience: string) {
if (!client) {
  client = await auth.getIdTokenClient(targetAudience);
}
return client;
}


function CardSkeleton() {
  return (
    <div className="w-full text-sans rounded-lg animate-pulse">
      <div className="flex flex-row items-center gap-4 justify-start">
        <Sparkles />
        <h2> Your AI is generating... </h2>
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

// export async function submitUserMessage(userInput: string, configuration: Configuration) {
export async function submitUserMessage(userInput: string, configuration: ChatConfiguration) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
      id: 'message' + aiState.get().length,
    },
  ])
  
  const card = createStreamableUI(<></>);

  async function doAction() {

    // Setting CardSkeleton while documents are loading
    try {
      card.update(
        <>
          <CardSkeleton/>
        </>,
      );

      const messages = [
        ...aiState.get(),
      ]
 
      // Calling search method
      const res = await callPythonBackend(
        {
          messages: messages,
          configuration,
        }
      );
    

      const reader = res.body.getReader();
      let message: Message = {
        role: "assistant",
        content: "",
        id: 'message' + aiState.get().length,
      };

      reader.read().then(function process({ done, value }: { done: boolean, value: Uint8Array }) {
        if (done) {
          console.log("done");
          
          aiState.done([
            ...aiState.get(),
            message
          ])


          card.done(
            <>
              <ChatMessage {...message} />
            </>,
          );
          return;
        }

        const chunk = new TextDecoder("utf-8").decode(value);
        message.content += chunk;

        console.log("Message content: ", message.content)
        card.update(
          <>
            <ChatMessage {...message} />
          </>,
        );

        return reader.read().then(process);
      });

    //TODO: add AI state done
    } catch(err) {
      console.log((err as Error).message);
      card.done(<ErrorCard />);
    }
  }
 
  doAction();
 
  return {
    id: Date.now(),
    display: card.value, // Streamed UI value
  };
}


// TODO: see if this function can be taken as a separate file
// Call Vertex AI Search API
export async function callPythonBackend({messages, configuration}: {messages: Message[] , configuration: ChatConfiguration}): Promise<any> {

  const newReqJSON = {
    "configuration" : configuration,
    "messages": messages,
  };

  const backend_url = process?.env?.NEXT_PUBLIC_URL_BACKEND? process.env.NEXT_PUBLIC_URL_BACKEND as string: "http://localhost:8000";

  const targetAudience = backend_url;
  const url = backend_url+'/api/rag';

  async function request() {
    console.info(`request ${url} with target audience ${targetAudience}`);
    console.info(`request body: ${JSON.stringify(newReqJSON)}`);
  
    if (process?.env?.NEXT_PUBLIC_ENV == "dev") {
      // Running locally, bypass ID token generation
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReqJSON),
      });
  
      if (response.body === null) {
        throw new Error('Response body is null');
      }
      return new StreamingTextResponse(response.body);
    } else {
      // Running in production, use ID token
      const client = await getClient(targetAudience);
      console.log("client: ",client)
      console.log("client credentials",client.credentials)
  
      const response = await client.request({url: url, method: 'POST', data: newReqJSON, responseType: 'stream'});
      return new StreamingTextResponse(response.data as ReadableStream<any>);
    }
  }
  
  return request().catch(err => {
    console.error(err.message);
    throw new Error(`HTTP error! status: ${err.response.status}`);
  });
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  name?: string;
}[] = [];
 
// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

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