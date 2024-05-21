from llama_index.core.chat_engine import SimpleChatEngine
from typing import Optional

from .types import Configuration
from .context import create_base_context


def get_chat_engine(access_token: Optional[str] = None, configuration: Configuration = Configuration()):
    service_context=create_base_context(access_token, configuration)
    return SimpleChatEngine.from_defaults(service_context=service_context)
