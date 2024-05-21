import logging
import os
import uvicorn
from app.modules.chat.router import chat_router
from app.modules.vertex_search.router import search_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.utils.config import environment #, url_origin

app = FastAPI()

# if environment == "dev":
#     logger = logging.getLogger("uvicorn")
#     logger.warning("Running in development mode - allowing CORS for all origins")
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=["*"],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

logger = logging.getLogger("uvicorn")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# else :
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=[url_origin],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

#Include routers API
app.include_router(chat_router, prefix="/api/chat")
app.include_router(search_router, prefix="/api/search")


if __name__ == "__main__":
    uvicorn.run(app="main:app", host="0.0.0.0", reload=True)
    
