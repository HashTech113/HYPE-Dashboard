# Table 1

base_enc_password Table information:

| Parameter | Range | Type | Description |

| cipher | 0-1024 | string | encrypted password using /API/*/TransKey/Get Derived X25519 encryption, using base64 for transmission. |

| seq | 0-1000000 | int | return /API/*/TransKey/Get The seq returned by the API . |

| peer_key | 0-1024 | string | The X25519 key encrypted by the client, using base64 for transmission. |

# Table 2

base_secondary_authentication Table information:

| Parameter | Range | Type | Description |

| cipher | len:44 | string | encrypted password (using /API/*/TransKey/Get The returned secret key is encrypted), using base64 for transmission. PBKDF2 output length is 32, base64 is 44 |

| seq | 0-1000000 | int | Use the seq returned by /API/*/TransKey/Get API . |
