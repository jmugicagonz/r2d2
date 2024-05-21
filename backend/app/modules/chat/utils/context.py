import os

from llama_index.core import ServiceContext
from llama_index.llms.vertex import Vertex
from app.utils.config import project_id
from langchain_google_vertexai import VertexAIEmbeddings
import google.oauth2.credentials
from typing import Optional
from .types import Configuration

def create_base_context(access_token: Optional[str] = None, configuration: Configuration = Configuration()):
    model = os.getenv("MODEL", "gemini-pro")    
    print("configuration in create base context: ",configuration)
    credentials = google.oauth2.credentials.Credentials(token=access_token) if access_token else None
    embeddingModel = VertexAIEmbeddings(
        project=project_id,
        model_name="textembedding-gecko@001",
        credentials= credentials if credentials else None
        )

    print("Using temperature: ", configuration.temperature)
    print("Using max tokens: ", configuration.max_tokens)

    
    llm = Vertex(
            model=model,
            project=project_id,
            credentials=credentials if credentials else None,
            max_tokens = configuration.max_tokens,
            temperature = configuration.temperature,
            datastore = configuration.get_datastore() if configuration.grounding else None
        )

    return ServiceContext.from_defaults(
        llm = llm,
        embed_model=embeddingModel
    )

