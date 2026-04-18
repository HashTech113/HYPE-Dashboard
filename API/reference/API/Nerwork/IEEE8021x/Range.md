# Range

## Function

This API is used to get the parameter range of Network > IEEE8021x .

## Request Message

None

Sample:

POST /API/NetworkConfig/IEEE8021x/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| ieee_enable |   | bool | false:disable true:enable |

| username | 0-127, 1-127 | string | username |

| password | 0-127, 1-127 | string | password |

| password_empty |   | bool | false:non-empty true:empty |

| authentication_type | "EAP-MD5", "EAP-MSCHAPv2", "EAP-MD5-Challenge", "EAP-PEAP/MSCHAPv2", "EAP-TTLS/EAP-MD5-Challenge", "EAP-TLS" | string | 0:EAP-MD5 1:EAP-MSCHAPv2 2:EAP-MD5-Challenge 3:EAP-PEAP/MSCHAPv2 4:EAP-TTLS/EAP-MD5-Challenge 5:EAP-TLS |

| authentication |   | object | For authentication，see Table 2 for more information |

| base_enc_password |   | Json Object | See base_enc_password (Only set). |

###### Table 2

| Parameter | Range | Type | Description |

| client_passwd_auth_only |   | object |   |

| client_passwd_auth_server_certificate |   | object | No encryption is required during transmission，see Table 3 for more information |

| client_certificate_server_certificate |   | object | The private key delivered from the board is required for transmission，see Table 4 for more information |

###### Table 3

| Parameter | Range | Type | Description |

| ca_cert | Max length:10240byte | string | CA Certificate Content |

| install_button |   | bool | Certificate installed or not |

| delete_button |   | bool | Certificate uninstall or not |

###### Table 4

| Parameter | Range | Type | Description |

| ca_cert | Max length:10240byte | string | CA Certificate Content |

| client_cert | Max length:10240byte | string | client certificate |

| private_key | Max length:10240byte | string | Client key certificate |

| private_key_password | Max length:127byte | string | private key password |

| private_key_password_empty |   | bool | false:non-empty true:empty |

| install_button |   | bool | Certificate installed or not |

| delete_button |   | bool | Certificate uninstall or not |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ieee_enable": {"type": "bool"},
        "username": {
            "description": "Each range {min_len,max_len} corresponds to one ieee_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 127
                },
                {
                    "min_len": 1,
                    "max_len": 127
                }
            ]
        },
        "password": {
            "description": "Each range {min_len,max_len} corresponds to one ieee_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 127
                },
                {
                    "min_len": 1,
                    "max_len": 127
                }
            ]
        },
        "password_empty": {"type": "bool"},
        "authentication_type": {
            "type": "string",
            "items": [
                "EAP-MD5",
                "EAP-MSCHAPv2",
                "EAP-MD5-Challenge",
                "EAP-PEAP/MSCHAPv2",
                "EAP-TTLS/EAP-MD5-Challenge",
                "EAP-TLS"
            ]
        },
        "authentication": {
            "type": "object",
            "items": {
                "client_passwd_auth_only": {
                    "type": "object",
                    "items": {}
                },
                "client_passwd_auth_server_certificate": {
                    "type": "object",
                    "items": {},
                    "ca_cert": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 10240
                    },
                    "install_button": {"type": "bool"},
                    "delete_button": {"type": "bool"}
                },
                "client_certificate_server_certificate": {
                    "type": "object",
                    "items": {},
                    "ca_cert": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 10240
                    },
                    "client_cert": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 10240
                    },
                    "private_key": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 10240
                    },
                    "private_key_password": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 127
                    },
                    "private_key_password_empty": {"type": "bool"},
                    "install_button": {"type": "bool"},
                    "delete_button": {"type": "bool"}
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
