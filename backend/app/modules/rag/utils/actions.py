from typing import List
import vertexai

from vertexai.preview.generative_models import grounding
from vertexai.generative_models import GenerationConfig, GenerativeModel, Tool

# TODO(developer): Update and un-comment below line
# project_id = "PROJECT_ID"

vertexai.init()

def call_gemini(
    model: str,
    data_store_project_id: str,
    data_store_location: str,
    data_store_id: str,
    query: str,
    ground_vai: bool,
    ground_search: bool,
    temperature: float = 0.1,
    max_tokens: int = 4096,
):
    model = GenerativeModel(model_name="gemini-1.0-pro-002")
    # Use Vertex AI Search data store
    # Format: projects/{project_id}/locations/{location}/collections/default_collection/dataStores/{data_store_id}
    tools = []
    
    if ground_vai:
        print("Grounding VAI")
        data_store_path = f"projects/{data_store_project_id}/locations/{data_store_location}/collections/default_collection/dataStores/{data_store_id}"
        print("Data store path: ", data_store_path)
        tool = Tool.from_retrieval(
            grounding.Retrieval(grounding.VertexAISearch(datastore=data_store_path))
        )
        tools.append(tool)

    if ground_search:
        print("Grounding Search")
        tool = Tool.from_google_search_retrieval(grounding.GoogleSearchRetrieval())
        tools.append(tool)

    print("Tools: ", tools)

    response = model.generate_content(
        query,
        tools=tools,
        generation_config=GenerationConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
        ),
        stream = True
    )

    def generate():
        for chunk in response:
            # Assume chunk is an object with a 'text' attribute
            yield chunk.text.encode('utf-8')  # Convert text to bytes

    return generate()
    # return response
