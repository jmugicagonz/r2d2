import os

from llama_index import ServiceContext
from llama_index.llms.vertex import Vertex
from langchain_google_vertexai import VertexAIEmbeddings
import google.oauth2.credentials
from typing import Optional
import json
from typing import Any
from Crypto.Protocol.KDF import HKDF # pip install pycryptodome
from Crypto.Hash import SHA256 
from jose import jwe # pip install python-jose
from jose.exceptions import JWEError
import os

GOOGLE_PROJECT_ID = "turing-nature-406016"

def getDerivedEncryptionKey(secret: str, cookie_name: str) -> Any:
    # Think about including the context in your environment variables.
    context = str.encode(f"Auth.js Generated Encryption Key ({cookie_name})")
    return HKDF(
        master=secret.encode(),
        key_len=32,
        salt=cookie_name.encode(),
        hashmod=SHA256,
        num_keys=1,
        context=context,
    )


def get_token(token: str, cookie_name: str) -> dict[str, Any]:
    '''
    Get the JWE payload from a NextAuth.js JWT/JWE token in Python

    Steps:
    1. Get the encryption key using HKDF defined in RFC5869
    2. Decrypt the JWE token using the encryption key
    3. Create a JSON object from the decrypted JWE token
    '''
    # Retrieve the same JWT_SECRET which was used to encrypt the JWE token on the NextAuth Server
    # jwt_secret = getEnvironmentVariable("JWT_SECRET") # Replace this with your environment variable logic - default: os.environ.get("JWT_SECRET")
    try:
        print("jwt_secret: ", jwt_secret)
        encryption_key = getDerivedEncryptionKey(jwt_secret, cookie_name)
        print("encryption_key: ", encryption_key)
        payload_str = jwe.decrypt(token, encryption_key).decode()
        payload: dict[str, Any] = json.loads(payload_str)
        return payload
    except JWEError as e:
        raise RuntimeError(f"Error decrypting token: {e}")

def create_base_context(access_token: Optional[str] = None):
    model = os.getenv("MODEL", "gemini-pro")
    # credentials = google.oauth2.credentials.Credentials(token=access_token)
    embeddingModel = VertexAIEmbeddings(
        project=GOOGLE_PROJECT_ID,
        model_name="textembedding-gecko@001",
        )

    return ServiceContext.from_defaults(
        llm = Vertex(
            model=model,
            project=GOOGLE_PROJECT_ID,
            # credentials=credentials,
            max_tokens = 8192,
        ),
        embed_model=embeddingModel
    )



if __name__ == "__main__":
    session_token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..8sbmtnZ1qmhq8VdW.9xJKH1bhI9N_kREq4Om2xbZ8HEBTx54cHpIt2hgzVPg7G8_De_vTB-I5un4RnNxj3pyW8xv5yBC485r36LfzGDIejHnaqsRt387SPK4V_B9CE9PUWZ6txKh3-L_i5gMaMHYn_Q06FKr3LzHkpzGWs262G5Uoi8bNGzbjo_teu_WJEU9x-NrmXq8AxXLMP2xiinEe4UlS2dcAk1G5kQU_Oc-8G_L4W6jeJ3VFqiwLpQDtPCGdhLXxVlzaLbJ2bBbvZfQEu6eMSYNUxQSQ_91aMHHahgoFtmUjIgbyQ3HN6gQ30mv0CK5V0D4kUluYXZI4Rc80Fpxy_OqR_eO417Ok8zPaI1IRcfG-ceIJG32e2SUHOLWU2Iz4RprQfD2PSyvsFgdjP9xnpgrg8jjZiU8Rtbj8Ag8hF93ietDmZY3azXJtadeC-GzYgCmIJYzTxqUbiYav2OAbyYpIKIwgqfVOaMLh63ARQ9A5N2w4KNiOMNc5YQkslN6LS1DNn8aMlabTsGovDWqYxTxap0Kom0b9dRmIxRHdBHxOw20S97bl3MZ3TjsBkFrwYMhD1PsgIjOnB1wZ-4OzWWeLw1D89RtLqtJ5RHdpXpYhkI2wuB77NqepRGiW0L_1N-8YA55PN7iAeZvzbgBeOcdeQv6JvK5XyJpbDl-Ko8p6AXJnjGLifdgpDbf3bKvX0SOMC5VhwhJFEWgOuXT3sdamlm-3-TrccCIx17WyDla90JJZq85CNYAIf38lX-kNPs73TsKFI1qdzITzG1zqlr4tHW-3wBWV2gFVpC_VFcH8-0uT2SBtE6lTf6dK2lGBNEh8chd3YbDN4XCk3faqpJATFCxPuSTB5nYzJ4KxhNurCnwKiGymakTRDJZm_wgJq-oSr4TJ3Ya-2GobNo1DZ-2y5n0rNQIFe_6zHrmwu871C6pwTJkqE08uNjS-wKZag0cMaIzUe40wQ0JEfcm0OTMe-4dh5-wZHGdeLrqgF7THpv-Gq70emaSn4Xs-t8Dzn923Z68XMuoaTrdhKEsVDJYL_SXr0yJ2q2g9-GBEQpN_WQpxcxN02xhaWU5AhNyfxOhTnO2dg5W2hYOlIEmHsD5B9zEw_GTz2OLgwU61G68zp7EUzRT1OBtNy-9O6YTqD79-aCm68qP_PHG7uw0EsgH-.LODNovI9-Sxt9y3-0LJvgA"
    cookie_name = 'authjs.session-token'
    jwt_secret = "+W7tATBuElgnZYcH2N8J96aAJ/sTNALIn4eWekKuWcc="
    access_token = get_token(session_token,cookie_name)['accessToken']
    print("access_token: ", access_token)
    service_context = create_base_context(access_token)
    print(service_context)