export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    name?: string;
  }


export interface ChatConfiguration {
MODEL: string;
DATA_STORE_PROJECT_ID: string;
DATA_STORE_LOCATION: string;
DATA_STORE_ID: string;
GROUND_SEARCH: boolean;
GROUND_VAI: boolean;
TEMPERATURE: number;
MAX_TOKENS: number;
}

export type ChatConfigContextType = {
  chatConfig: ChatConfiguration;
  setChatConfig: React.Dispatch<React.SetStateAction<ChatConfiguration>>;
  };