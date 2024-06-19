"use client";

import * as React from 'react';
import type { AI } from "./actions/action";
import { useUIState, useActions } from "ai/rsc";
import { SearchBar } from "../components/base-ui/searchBar";
import VertexSearchConfig  from "./ui/vertex-search-config";
import { VertexSearchConfiguration, VertexSearchConfigContextType } from "./ui/lib/types";

export const vertexSearchConfigContext = React.createContext<VertexSearchConfigContextType | undefined>(undefined);

export default function VertexSearchSection() {

  const [inputValue, setInputValue] = React.useState<string>("");
  // const formRef = React.useRef<HTMLFormElement>(null);
  const [message, setMessage] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  const [vertexSearchConfig, setVertexSearchConfig] = React.useState<VertexSearchConfiguration>({
    DATA_STORE_PROJECT_ID: 'ai-assistant-417415',
    DATA_STORE_LOCATION: 'global',
    DATA_STORE_ID: 'summer-camp-rag_1718630532130',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    const responseMessage = await submitUserMessage(inputValue, vertexSearchConfig);
    setMessage(responseMessage);
    setInputValue("");
  }

  return (
    <vertexSearchConfigContext.Provider value={{vertexSearchConfig, setVertexSearchConfig}}>
      <div className="w-1/2">
        <div>
          <div className="w-full flex flex-row items-center">
              <SearchBar 
                inputValue={inputValue} 
                setInputValue={setInputValue} 
                handleGenerate={handleSubmit} 
                type = 'search'
                placeholder='Ask a question...'
              />
            <VertexSearchConfig/>
          </div>
                {
                  //View messages in UI state
                    <div key={message.id}>
                      {message.display}
                    </div>
                }
        </div>
      </div>
    </vertexSearchConfigContext.Provider>
  );
}