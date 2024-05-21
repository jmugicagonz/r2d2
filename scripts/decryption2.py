import json
from typing import Any, Dict

from hkdf import Hkdf
from jose.jwe import decrypt, encrypt


def __encryption_key(secret: str):
    return Hkdf("", bytes(secret, "utf-8")).expand(b"NextAuth.js Generated Encryption Key", 32)


def encode_jwe(payload: Dict[str, Any], secret: str):
    data = bytes(json.dumps(payload), "utf-8")
    key = __encryption_key(secret)
    return bytes.decode(encrypt(data, key), "utf-8")


def decode_jwe(token: str, secret: str):
    decrypted = decrypt(token, __encryption_key(secret))

    if decrypted:
        return json.loads(bytes.decode(decrypted, "utf-8"))
    else:
        return None
    
if __name__ == "__main__":
    session_token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiRFRuV1dKRm9sbkoxeHgtd0JRbmI4T1YtNUZrZDlYNEdyajhKZ1NfR3hhbUU4MTN0cnRyWFJDcU9DVldYMHkxQlRBYlZ1NXQ5V3hBdHkyaVhtc0pIQ1EifQ..SWFEo6x5VvqlT9V2pPPOzQ.47o3_tYQ8Iz2iomR7qgE7ZtoWGkOK1QidbTwuJSCvMb9mGSLrJnS7DymTZqDZBiYWUOI3G6bYI4nWGECZg3AZlcRIgax8xymJMaP1grl9xzU-KqOQRzMGvy54kUY-HGqN7XPhuaaMgt68Q-gGotf1NdXDh5Rx_kPKGenTrBTJPS2IoCBH3T2bjKLMxTrQBMqGaLI8PEZKl2hekv7s0xpal-fBqqDhLgj7xQ4duP0qWgdxFL3G3IOUhaeLFcWSEgMU4rb0tpbF6z3T_HBw8sJqoJp6To_X9Wf3WSisfyKZL1CCg-rHaFvFPCwSk87ABOkhbHQ6wZHLzwDNsiZH1N1j4ue-xchUrZ7UuAckrvymyLFvljvGwBFEI2w85LaM3hdufUYDq-ukPC21lOUR6hL8kiG5h5mfDuMADo5DGpMWNhJw9Yr97vvIu5QZTp-g2RH20qkcwhGHs1P3XbGz4JafpYNDxop3OlKzvIsp396W77y1ymPj69LZZOXWl1PagvwsbN8erRFSg2iXX5charXO4uRva7gQxw-ngO0FG-NhHuNlNVpqQPqBw1w3xrkm2Pc50X65dXVYCWswE1zVR0xKMSGPIbbheETvmgJZTArLkvhxqlDTBAZ2TgwXCSW1axw2s3kE8aU00UPX8Sa4sjhtKn6pt7y23JMtpMqddSo34LF7GTTBrqWeD8snkL4qFXbMeMAcoUp64yQhzuqV-YeQIK0s06dDq5n982OHHmazx9Jcrdktw4ySD0NRpMIDhI-vOs8ug1Pj7nUbM437pTzhkZ0GL1AyyCSYDA4qgZ8ij9KbfYcrgL9A_2qcJxVVZJKbxYyMhCfxlvBf3Vbfhnhmzipz8Ld07r6_lUSBGMR-ZV78OiVio7L53t1XqJbHQ62wuRBFsTzPhp9sky4MeJKj9sqKujtn6XJlLWSTgsbzPaf_QW9Jilf6i5gTqstyPRQ0W8p8kw0khnvZBWqZSCakGBBLvSE0MGLjrQBiuUCaG0aG2zH3WPgMiX8kW_kZxogL7TP_DX9MKvVivH42mHBYWT88QIxYfMc6C1zsQbIv6t4-rC-1KCEIiNuo0UGFywp8bXspuSGCV6Fny_4KsP_OgZnIWrMu_wACPYw07OgoHIArqRcAiOuIBIcF65Se_fUIYaCGRyF7Vp08HdVHmWU3ozh-fLSogQEKqyP4223pJ-J5_eqzyam0FRoaYA0n0Tr.yGJnMmiyKhzgONxjzEy3Q6lQu6wewBlNp4yW5NAshOg"
    jwt = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SiZbm6SUh6HwIKwoyBbKrw.rCqfchwVu1TeHWF5kPOn8kqx8F4BytNyVcOI5Pi5Odyb3y7vDAKZtjiT8mw6fUZRjNn-_YhHQFaD8wriHxGRnuw83qR7myzrzNB6YSMyZC-caCrzKNewbrGyPdBhaYYxz5bZQ1HyHwukeRNwNnaENCROZzSRtjLyhHHYgXvcnHlaxXslj6jak1HvXutO2Nb_3vIi5gt54gz_kcNcgVhlj_JWpdMzpbQhTzh6FLncvVCedKh1HpsEO0woRfrR3qCKvuO5BogUaYv23g88sdu-MOFDMVo6c8f6LsPFNg.X6ZpD5VEy3HGecneY7ZXnQ"
    cookie_name = 'authjs.session-token'
    jwt_secret = "+W7tATBuElgnZYcH2N8J96aAJ/sTNALIn4eWekKuWcc="
    payload = decode_jwe(jwt,jwt_secret)
    print("payload: ", payload)
    decrypted_token = "ya29.a0AfB_byCFC9Kv0gUzZdoTYDoiW2wGztRlsKPm9rCsU757ywInsEaCQu1IrygsYC4aHSXMoI4G1XZXmsGs_KBmQxw0MRyK-6I7Y52o27pu2LEPEBAqxapHXohrcsVJTgM_boWdxfGSp4MZe3Qju4RO2_H-tlp6R3THJZsRaCgYKAUwSARASFQHGX2MimjsfDFNMwNnOKEXuUP5zcA0171"
    encrypted_token = encode_jwe(decrypted_token, jwt_secret)
    print("encrypted_token: ", encrypted_token)
    # encryption_key = b"\xe0\xac\xcc \xe7J\x13\x8a\xbb.\xfd\x962-\xcd\xdf2'\x8cp\xd0(\xf2\x85\x9dc\xcf\x04\xe4U\xd2\x93"
    # payload_str = jwe.decrypt(session_token, encryption_key).decode()
