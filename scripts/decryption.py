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



if __name__ == "__main__":
    session_token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ee6tETskUkGkuB6p.D0dk0UjuxVur4mG_RGvXlsOT3clqomY0cRtDdhuCf2WkyMxo50Cb0_NMshWdhcvG3yZ8zdW9BQAFMplIHEvgpxd3XQW1fOsuWBY1g7l1RpuVvqi98M79TPql-wiajkdqgjXFsx6IcFDKazsDVolxzpcncZQkNkgV768e_YwhrL1jHNJfBkM0k0KRK4yoZuEW93QZU6SFgjtHx-GzTVvEyYnWrzn4ijUcdKRCPff3lIBcNYdmzHNdIcJQqbk8rvHSmN-zuxPM6ZiTw6_aZjtFfchfkvS_v-GzHeG9MalL1xOjkpZcT0kkhrfGJzmu7NQl59l1tDREbCVKy7O8AktFnfoF4ggyBNBTA5GzA_l6wax3WhUfk2iUpbwwuDrcNKOijSiE34yccQOR4uQOoxDAEZay345P0_dXPigebpQramahYyT_bJ91Qoos6WJgknDLEU_B_xy5vXrjPawbURvhUjdEv19HuuWjK4fSNKpC-FNOCm42tR8wECxq8YQ2yLP7_n0akAj0ZL6inZsaVbdjTyuavZxstK4ow99_q8AFrDCwsmPmzpEVY4QJE4w4oW7KkSg8zt6ptQryjsM2HXigp7FCM2ufdrOQNUdFFk8kCEeJQROt2baHDDFJmiK5fftxmycBeW54FiqGq_FH_BxPDpm3UV186g-TmOPFXgm1fp34Zd4mpPf-wuCwKZSjUOMsbUe90UyvCXI8tPQH3PBA9UmLk_nH4Ea2wR8eYJOQhYsiAP8w5SsyUUYkN9R0OBoNffgntEG71gs7QGHbGj772Gqh4N1Rk-IMsNthj3a3W4Oln7qcG97THjMAA6684ZaQgnK8TOKpydjmwNHTIXkNie0RYlG-apc-hAh3u47t3OwBMojNszTxu1SCg3yPPQWm25lDkdW25M2Ff_IokAjqP2hqE5gMumVYE25nNvoKEx0CK_7ouwwyK_PaTqbp5dTjjWAUIO7HbT8RcPXqUhl2EfQ4IYZBqwNTDfO8_LoQfvcqy0YP6hZW7-epbwI5vGW_1ICHTH6Eiydaj8z-fYQ6Kn9EXYvSXuC6bEHKrVoWa92DqADaQTw_xyqdIrhxn8cfe-7aQ4FJWkY1cuNjNQ-kbweJHlqvKd0XIJqeUbkJngHx5Wzlf2uKaDHpRnFLvgREtdbOlAo-RpX7.Cct0cTjaa6D94MuAOaePVQ"
    cookie_name = 'authjs.session-token'
    jwt_secret = "+W7tATBuElgnZYcH2N8J96aAJ/sTNALIn4eWekKuWcc="
    payload = get_token(session_token,cookie_name)
    print("payload: ", payload)