# Range

## Function

This API is used to get the Network > HTTPS parameter range.

## Request Message

None.

Sample:

POST /API/NetworkConfig/https/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| https_enable |   | bool | Https switch |

| operate | "Install" "Uninstall" "Switch" |   |   |

| file_type | "Default", "Custom" | string | Default: Default installation Custom: Custom installation Passed when switching. |

| file_exist |   | int | 0: Does not exist, 1: Exists (only used, not set, required for customization). |

| ca_file | 0-10240 | string | (Only set, not used). |

| key_file | 0-10240 | string | (Only set, not used). |

| key_password | 0-128 | string | (Only set, not used). |

| root_ca_file | 0-10240 | string | (Only set, not used). |

| subject |   | string | Issued to (required by Custom). |

| issuer |   | string | Issuer(required by Custom). |

| not_before |   | string | Starting time(required by Custom). |

| not_after |   | string | End Time(required by Custom). |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "https_enable": {"type": "bool"},
        "file_type": {
            "type": "string",
            "items": [
                "Default",
                "Custom"
            ]
        },
        "file_exist": {
            "type": "int32",
            "items": [
                0,
                1
            ]
        },
        "ca_file": {
            "type": "string",
            "min_len": 0,
            "max_len": 10240
        },
        "key_file": {
            "type": "string",
            "min_len": 0,
            "max_len": 10240
        },
        "root_ca_file": {
            "type": "string",
            "min_len": 0,
            "max_len": 10240
        },
        "operate": {
            "type": "string",
            "items": [
                "Install",
                "Uninstall",
                "Switch"
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
