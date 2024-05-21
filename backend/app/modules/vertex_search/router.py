from typing import List, Optional
from fastapi import (
    APIRouter,
    Depends,
    Request,
    HTTPException,
    status
    )
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ValidationError
import io
import json
from .utils.types import _ChatData, Snippet, Document
from .utils.actions import search_in_vertex_datastore

search_router = r = APIRouter()

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

    print("request data: ", data)
    if not data.query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing query in request",
        )
    
    print("Configuration: ", data.configuration)

    response = search_in_vertex_datastore(
        project_id = data.configuration.DATA_STORE_PROJECT_ID,
        location = data.configuration.DATA_STORE_LOCATION,
        engine_id = data.configuration.DATA_STORE_ID,
        search_query = data.query
    )
    # print("response: ",response)
    documents = []
    for result in response.results:
        title = result.document.derived_struct_data.get('title')
        uri = result.document.derived_struct_data.get('link')
        snippets_data = result.document.derived_struct_data.get('snippets')
        full_extractive_answer = result.document.derived_struct_data.get('extractive_answers')[0]
        # print('full extractive answer: ', full_extractive_answer)
        page_number = full_extractive_answer.get('pageNumber')
        extractive_answer = full_extractive_answer.get('content')
        # print('pageNumber:  ', page_number)
        # print('extractive answer: ', extractive_answer)
        id = result.document.id
        # snippets = [Snippet(snippet=s.get('snippet')) for s in snippets_data] if snippets_data else []
        documents.append(Document(title=title, uri=uri, extractive_answer=extractive_answer, page_number=page_number, id=id))
    summary = response.summary.summary_text
    answer_to_return = {
        'documents': documents,
        'summary': summary
    }
    return answer_to_return
