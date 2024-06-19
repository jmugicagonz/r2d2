from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class _Configuration(BaseModel):
    DATA_STORE_PROJECT_ID: Optional[str] = None
    DATA_STORE_LOCATION: Optional[str] = None
    DATA_STORE_ID: Optional[str] = None
    GROUND_SEARCH: Optional[bool] = False
    GROUND_VAI: Optional[bool] = False
    MODEL: str = "gemini-1.0-pro-002"
    TEMPERATURE: float = 0.1
    MAX_TOKENS: int = 4096

class MessageRole(str, Enum):
    """Message role."""
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"

class _Message(BaseModel):
    role: MessageRole
    content: str

class _ChatData(BaseModel):
    messages: List[_Message]
    configuration: Optional[_Configuration] = None