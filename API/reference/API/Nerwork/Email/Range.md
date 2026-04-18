# Range

## Function

This API is used to get the parameter range of Network > Email.

## Request Message

None.

Sample:

POST /API/NetworkConfig/Email/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| email_enable |   | bool | Enable email functionality. |

| encryption | "Disable", "SSL", "TLS", "Auto" | string | Encryption type. |

| smtp_port | [1~65535] | int | SMTP port. |

| smtp_server | Max length: 127byte | string | SMTP server. |

| username | Max length: 127byte | string | Email username. |

| password | Max length: 127byte | string | Email password.(Only indicate the range in Range, deprecated in Get, Set and Test, pass empty) |

| sender | Max length: 127byte | string | Sender address. |

| recvemail |   |   | recvemail JSON，Table 2 |

| password_empty |   | bool | Is the password empty. |

| interval_time | 1,3,5,10 | int | Sending time interval, Unit：minute |

| base_enc_password |   | Json Object | See base_enc_password. |

| report_button |   | Object | See Table 3. |

###### Table 2

recvemail JSON

| Parameter | Range | Type | Description |

| recvemail_1 | Max length: 127 byte | string | Sender 1 Address |

| recvemail_2 | Max length: 127 byte | string | Sender 2 Address |

| recvemail_3 | Max length: 127 byte | string | Sender 3 Address |

###### Table 3

| Parameter | Range | Type | Description |

| report_button_1 | "send_device_report" | string | Show Send Report button |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "email_enable": {"type": "bool"},
        "encryption": {
            "type": "string",
            "items": [
                "Disable",
                "SSL",
                "TLS",
                "Auto"
            ]
        },
        "smtp_port": {
            "type": "int32",
            "mode": "r",
            "min": 1,
            "max": 65535,
            "default_value": 25
        },
        "smtp_server": {
            "description": "Each range {min_len,max_len} corresponds to one email_enable state [false,true].",
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
        "username": {
            "description": "Each range {min_len,max_len} corresponds to one email_enable state [false,true].",
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
            "type": "string",
            "min_len": 0,
            "max_len": 127
        },
        "password_empty": {"type": "bool"},
        "sender": {
            "description": "Each range {min_len,max_len} corresponds to one email_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 127
                },
                {
                    "min_len": 0,
                    "max_len": 127
                }
            ]
        },
        "recvemail": {
            "description": "When email_enable state is [true], at least one recvemail must be configured.",
            "type": "object",
            "items": {
                "recvemail_1": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 127
                },
                "recvemail_2": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 127
                },
                "recvemail_3": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 127
                }
            }
        },
        "interval_time": {
            "type": "int32",
            "unit": "minute",
            "items": [
                1,
                3,
                5,
                10
            ]
        },
        "report_button": {
            "type": "object",
            "items": {"report_button_1": {
                "type": "string",
                "min_len": 0,
                "max_len": 127
            }}
        },
        "test_version": "2.0"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
