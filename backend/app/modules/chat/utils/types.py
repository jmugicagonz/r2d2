from pydantic import BaseModel
from typing import Optional

class Configuration(BaseModel):
    model: Optional[str] = "gemini-pro"
    grounding: Optional[bool] = False
    DATA_STORE_PROJECT_ID: Optional[str] = None
    DATA_STORE_LOCATION: Optional[str] = None
    DATA_STORE_ID: Optional[str] = None
    DATA_STORE_TEMPLATE: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None


    def get_datastore(self):
        if self.DATA_STORE_PROJECT_ID == None or self.DATA_STORE_LOCATION == None or self.DATA_STORE_ID == None:
            return None
        return f"projects/{self.DATA_STORE_PROJECT_ID}/locations/{self.DATA_STORE_LOCATION}/collections/default_collection/dataStores/{self.DATA_STORE_ID}"