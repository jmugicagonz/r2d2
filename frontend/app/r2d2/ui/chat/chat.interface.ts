export interface Message {
  id: string;
  content: string;
  role: string;
}

export interface ChatHandler {
  messages: Message[];
  input: string;
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    ops?: {
      data?: any;
    },
  ) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reload?: () => void;
  stop?: () => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
}

export interface ChatConfiguration {
  model: string;
  DATA_STORE_PROJECT_ID: string;
  DATA_STORE_LOCATION: string;
  DATA_STORE_ID: string;
  grounding: boolean;
  temperature: number;
  max_tokens: number;
  VERTEX_SEARCH_CONFIG_ID: string;
}