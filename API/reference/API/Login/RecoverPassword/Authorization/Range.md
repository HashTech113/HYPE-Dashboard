# Range

## Function

This API is used to obtain the verification parameter range for password recovery.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/RecoverPassword/Authorization/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| mode | "Answer", "Email", "Certificate", "SuperPwd" | string | Only display the selected password recovery method. |

| questions | len:1-15 | int array | question number. |

| enc_answers | array_size:3, string_size:1-64 | string array | Question answers. |

| email_code | len:1-64 | string | Email verification code. |

| certificate | len:1-128 | string | Certificate code. |

| super_pwd | len:1-16 | string | Super password. |

| system_time | len:1-64 | string | Date time. |

| mac_address | len:0-35 | string | Mac address. |

| base_enc_password |   | object | Encrypted object. See Table 2 for details. |

##### Table 2

| Parameter | Range | Type | Description |

| peer_key | len:0-1024 | string | Key. |

| cipher | len:0-1024 | string | ciphertext. |

| seq | 0-1000000 | int | Valid duration. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "answer_flag": {"type": "bool"},
        "certificate_flag": {"type": "bool"},
        "super_pwd_flag": {"type": "bool"},
        "questions": {
            "type": "array",
            "size": 3,
            "items": [{
                "type": "int32",
                "items": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15
                ]
            }]
        },
        "enc_answers": {
            "type": "array",
            "size": 3,
            "items": [{
                "type": "string",
                "min_len": 1,
                "max_len": 64
            }]
        },
        "email": {
            "type": "string",
            "min_len": 1,
            "max_len": 64
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
