from typing import List, Optional
from fastapi.responses import StreamingResponse
from llama_index.core.chat_engine.types import BaseChatEngine

from app.modules.chat.utils.index import get_chat_engine
from app.utils.jwe import get_token
from fastapi import APIRouter, Depends, HTTPException, Request, status
from llama_index.core.llms import ChatMessage, MessageRole
from pydantic import BaseModel
import io
import json
from .utils.types import Configuration

chat_router = r = APIRouter()


class _Message(BaseModel):
    role: MessageRole
    content: str

class _ChatData(BaseModel):
    messages: List[_Message]
    configuration: Configuration


def get_chat_engine_from_data(data: _ChatData):
    chat_engine = get_chat_engine(configuration=data.configuration)
    return chat_engine

@r.post("")
async def chat(
    request: Request,
    data: _ChatData,
    chat_engine: BaseChatEngine = Depends(get_chat_engine_from_data),
):
    # check preconditions and get last message
    if len(data.messages) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No messages provided",
        )
    lastMessage = data.messages.pop()
    if lastMessage.role != MessageRole.USER:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Last message must be from user",
        )
    # convert messages coming from the request to type ChatMessage
    messages = [
        ChatMessage(
            role=m.role,
            content=m.content,
        )
        for m in data.messages
    ]

    print("Configuration: ", data.configuration)

    # response = chat_engine.astream_chat(lastMessage.content, messages)
    
    if (data.configuration.grounding): #This is necessary as stream_chat does not support grounding, it is an internal bug
        print("Chat with grounding called")
        response = chat_engine.chat(lastMessage.content, messages)
        return StreamingResponse(io.StringIO(str(response)), media_type="text/plain")
    
    print("Stream chat no grounded called")
    response = chat_engine.stream_chat(lastMessage.content, messages)
    
    return StreamingResponse(response.response_gen, media_type="text/plain")
