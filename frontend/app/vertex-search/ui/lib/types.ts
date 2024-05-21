export type Document = {
    title?: string;
    uri?: string;
    extractive_answer: string;
    page_number: string;
    id: string;
}

export type Configuration = {
    DATA_STORE_PROJECT_ID: string,
    DATA_STORE_LOCATION: string,
    DATA_STORE_ID: string,
}

type Snippet = {
    snippet: string;
  }

export interface VertexSearchConfiguration {
DATA_STORE_PROJECT_ID: string;
DATA_STORE_LOCATION: string;
DATA_STORE_ID: string;
}

export type VertexSearchConfigContextType = {
vertexSearchConfig: VertexSearchConfiguration;
setVertexSearchConfig: React.Dispatch<React.SetStateAction<VertexSearchConfiguration>>;
};