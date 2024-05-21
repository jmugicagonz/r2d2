"use client";

import { useChat } from "ai/react";
import { ChatInput, ChatMessages } from "./chat";
import { ChatConfiguration } from "./chat/chat.interface";
import * as React from 'react';


type ChatConfigContextType = {
  chatConfig: ChatConfiguration;
  setChatConfig: React.Dispatch<React.SetStateAction<ChatConfiguration>>;
};

export const chatConfigContext = React.createContext<ChatConfigContextType | undefined>(undefined);

export default function ChatSection() {
  const [chatConfig, setChatConfig] = React.useState<ChatConfiguration>({
    model: 'gemini-1.0-pro-001',
    DATA_STORE_PROJECT_ID: 'jllaurent-demo-345714',
    DATA_STORE_LOCATION: 'global',
    DATA_STORE_ID: 'documents-emg-search_1709127543828',
    grounding: false,
    temperature: 0.1,
    max_tokens: 8192,
    VERTEX_SEARCH_CONFIG_ID:"b63b61bc-433c-43ac-a8f2-435615628f70"
  })


  const api_chat = process?.env?.NEXT_PUBLIC_URL_BACKEND? process.env.NEXT_PUBLIC_URL_BACKEND as string: "http://localhost:8000";
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({
    // api: process.env.URL_PYTHON_BACKEND as string,
    // api: api_chat+"/api/chat",
    api: "r2d2/api/chat",
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    // credentials: "include",
    body: {configuration: chatConfig},
  });

  // React.useEffect(() => {
  //   console.log("chatConfig", chatConfig);
  // }, [chatConfig]);

  return (
    <chatConfigContext.Provider value={{chatConfig, setChatConfig}}>
      <div className="space-y-4 max-w-5xl w-full">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          reload={reload}
          stop={stop}
        />
        <ChatInput
          input={input}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
          multiModal={process.env.NEXT_PUBLIC_MODEL === "gemini-pro-vision"}
        />
      </div>
    </chatConfigContext.Provider>

  );
}
