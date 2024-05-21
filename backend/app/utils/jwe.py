import json
from typing import Any
from Crypto.Protocol.KDF import HKDF # pip install pycryptodome
from Crypto.Hash import SHA256 
from jose import jwe # pip install python-jose
from jose.exceptions import JWEError
import os


# from lib.getEnvironmentVariable import getEnvironmentVariable

def getDerivedEncryptionKey(secret: str, cookie_name: str) -> Any:
    # Think about including the context in your environment variables.
    print("cookie_name: ",cookie_name)
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
        jwt_secret = os.getenv("AUTH_SECRET")
        print("jwt_secret: ", jwt_secret)
        encryption_key = getDerivedEncryptionKey(jwt_secret, cookie_name)
        print("encryption_key: ", encryption_key)
        print("Lenght of the encryption_key in bits: ", len(encryption_key)*8)
        payload_str = jwe.decrypt(token, encryption_key).decode()
        payload: dict[str, Any] = json.loads(payload_str)
        return payload
    except JWEError as e:
        raise RuntimeError(f"Error decrypting token: {e}")
    

        