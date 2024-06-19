"use client";
import * as React from 'react';
import type { AI } from "../actions/action";
import { useUIState, useActions } from "ai/rsc";
import { SearchBar } from "../../components/base-ui/searchBar";
import { ChatConfiguration, ChatConfigContextType, Message } from "../lib/types"
import ChatMessage from './chat-message';
import ChatConfig from './chat-config';

export const chatConfigContext = React.createContext<ChatConfigContextType | undefined>(undefined);

export default function ChatSection () {

    const [inputValue, setInputValue] = React.useState<string>("");
    const [messages, setMessages] = useUIState<typeof AI>();
    const { submitUserMessage } = useActions<typeof AI>();


    const [chatConfig, setChatConfig] = React.useState<ChatConfiguration>({
        MODEL: 'gemini-1.5-flash',
        DATA_STORE_PROJECT_ID: 'ai-assistant-417415',
        DATA_STORE_LOCATION: 'global',
        DATA_STORE_ID: 'summer-camp-intro-rag_1718630466852',
        GROUND_VAI: false,
        GROUND_SEARCH: false,
        TEMPERATURE: 0.1,
        MAX_TOKENS: 8192
      })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const message: Message = {
            role: 'user',
            content: inputValue,
            id: 'message' + messages.length
        };
        setMessages((currentMessages) => [
            ...currentMessages,
            {
                id: currentMessages.length,
                display: <ChatMessage {...message} />
            },
        ]);
        setInputValue('');

        const responseMessage = await submitUserMessage(inputValue, chatConfig);
        setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage
        ]);
        
    }

    return (
        <chatConfigContext.Provider value={{chatConfig, setChatConfig}}>
            <>
                <div className="overflow-y-auto max-h-[calc(70vh)] w-3/4 lg:w-1/2">
                    {
                        //View messages in UI state
                        messages.map((message) => {
                            return (
                                <div key={message.id}>
                                    {message.display}
                                </div>
                            );
                        })
                    }
                </div>

                <div className='flex flex-row w-3/4 lg:w-1/2 fixed bottom-0 pt-6 items-center'>
                    <SearchBar
                        inputValue={inputValue} 
                        setInputValue={setInputValue} 
                        handleGenerate={handleSubmit} 
                        type = 'chat'
                        placeholder='Send a message...'
                    />
                    <ChatConfig />
                </div>
            </>
        </chatConfigContext.Provider> 
    );
}