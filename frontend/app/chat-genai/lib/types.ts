export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    name?: string;
  }


export interface ChatConfiguration {
model: string;
DATA_STORE_PROJECT_ID: string;
DATA_STORE_LOCATION: string;
DATA_STORE_ID: string;
grounding: boolean;
temperature: number;
max_tokens: number;
}

export type ChatConfigContextType = {
  chatConfig: ChatConfiguration;
  setChatConfig: React.Dispatch<React.SetStateAction<ChatConfiguration>>;
  };