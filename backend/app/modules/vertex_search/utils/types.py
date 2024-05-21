from pydantic import BaseModel
from typing import Optional, List

class _Configuration(BaseModel):
    DATA_STORE_PROJECT_ID: Optional[str] = None
    DATA_STORE_LOCATION: Optional[str] = None
    DATA_STORE_ID: Optional[str] = None

class _ChatData(BaseModel):
    query: str
    configuration: Optional[_Configuration] = None

class Snippet(BaseModel):
    snippet: Optional[str]

class Document(BaseModel):
    title: Optional[str]
    uri: Optional[str]
    extractive_answer: Optional[str]
    page_number: Optional[int]
    id: str