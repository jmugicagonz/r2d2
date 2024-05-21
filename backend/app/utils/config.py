import os
from dotenv import load_dotenv
load_dotenv(override=False)  # take environment variables from .env.

environment = os.getenv("ENVIRONMENT", "dev")  # Default to 'development' if not set
# url_origin = os.getenv("URL_ORIGIN", "http://localhost:3000")  # Default to 'development' if not set
project_id = os.getenv("PROJECT_ID")