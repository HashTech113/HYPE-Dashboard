# Range

## Function

This API is used to get the range of RecoverPassword config parameters.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/RecoverPassword/Range HTTP/1.1

{
    "version": "1.0",
    "data": {

    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| answer_flag |   | bool | Whether to support question and answer verification retrieval. |

| email_flag |   | bool | Whether to support email retrieval. |

| certificate_flag |   | bool | Whether to support certificate retrieval. |

| super_pwd_flag |   | bool | Whether to support super password. |

| email | len:1-64 | string | Email. |

| questions | len:1-15 | int array | question number. |

| enc_answers | array_size:3, string_size:1-64 | string array | Question answers. |

| mode | "Answer", "Email", "Certificate", "SuperPwd" | string | Only display the selected password recovery method. |

| email_code | len:1-64 | string | Email verification code. |

| certificate | len:1-128 | string | Certificate code. |

| super_pwd | len:1-16 | string | Super password. |

| system_time | len:1-64 | string | Date time. |

| mac_address | len:0-35 | string | Mac address. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "answer_flag": {
            "type": "bool"
        },
        "email_flag": {
            "type": "bool"
        },
        "certificate_flag": {
            "type": "bool"
        },
        "super_pwd_flag": {
            "type": "bool"
        },
        "questions": {
            "type": "array",
            "size": 3,
            "items": [
                {
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
                }
            ]
        },
        "enc_answers": {
            "type": "array",
            "size": 3,
            "items": [
                {
                    "type": "string",
                    "min_len": 1,
                    "max_len": 64
                }
            ]
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
