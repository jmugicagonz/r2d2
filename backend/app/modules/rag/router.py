from typing import List, Optional
from fastapi import (
    APIRouter,
    Depends,
    Request,
    HTTPException,
    status
    )
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, ValidationError
import io
import json
from .utils.types import _ChatData, MessageRole
from .utils.actions import call_gemini

rag_router = r = APIRouter()

def convert_to_dict_list(results):
    return [convert_search_result_to_dict(result) for result in results]

def convert_search_result_to_dict(search_result):
    return {
        'document': search_result.document,
        # Add more fields as needed
    }

@r.post("")
async def search(
    request: Request,
    data: _ChatData,
):

    # check preconditions and get last message
    if len(data.messages) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No messages provided",
        )
    
    print("Configuration: ", data.configuration)

    lastMessage = data.messages.pop()
    if lastMessage.role != MessageRole.USER:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Last message must be from user",
        )

    response_generator = call_gemini(
        model = data.configuration.MODEL,
        data_store_project_id = data.configuration.DATA_STORE_PROJECT_ID,
        data_store_location = data.configuration.DATA_STORE_LOCATION,
        data_store_id = data.configuration.DATA_STORE_ID,
        query = lastMessage.content,
        ground_vai = data.configuration.GROUND_VAI,
        ground_search = data.configuration.GROUND_SEARCH,
        temperature=data.configuration.TEMPERATURE,
        max_tokens=data.configuration.MAX_TOKENS,
    )

    return StreamingResponse(response_generator, media_type="application/json")
