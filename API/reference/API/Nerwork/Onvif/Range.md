# Range

## Function

This API is used to get the parameter range of Network > Onvif.

## Request Message

None

Sample:

POST /API/NetworkConfig/Onvif/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| enable |   | bool | enable |

| authentication | "Digest_sha256", " Digest ", " Digest/WSSE" "WSSE", "None" | string | Encryption |

| protocol | "HTTP/HTTPS", "HTTPS", "HTTP" | string | agreement |

| usename |   | string | user name |

| password |   | string | password(Only indicate the range in Range, deprecated in Get and Set, pass empty). |

| password_empty |   | bool | password empty |

| base_enc_password |   | Json Object | encrypted password，see base_enc_password for more information |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "enable": {"type": "bool"},
        "authentication": {
            "type": "string",
            "items": [
                "Digest_sha256",
                "Digest",
                "Digest/WSSE",
                "WSSE"
            ]
        },
        "protocol": {
            "type": "string",
            "items": [
                "HTTP/HTTPS",
                "HTTPS",
                "HTTP"
            ]
        },
        "username": {
            "description": "Each range {min_len,max_len} corresponds to one onvif_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 63
                },
                {
                    "min_len": 1,
                    "max_len": 63
                }
            ]
        },
        "password": {
            "description": "Each range {min_len,max_len} corresponds to one onvif_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 63
                },
                {
                    "min_len": 1,
                    "max_len": 63
                }
            ]
        },
        "password_empty": {"type": "bool"}
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
