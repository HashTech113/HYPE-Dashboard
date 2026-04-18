# Range

## Function

This API is used to get the parameter range of Network > Voice Assistant.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| SmartHomePage | "Amazon" "Google" | string | Voice assistant type. |

Sample:

POST /API/NetworkConfig/SMARTHOME/Range HTTP/1.1

{
    "version": "1.0",
    "data": {"SmartHomePage": "Amazon"}
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| SmartHomePage | "Amazon" "Google" | string | Voice assistant type. |

| operate | "Bind" "UnBind" "Apply" | string |   |

| BindEnable |   | bool |   |

| UserName | string length:0-128 | string | The account corresponding to the platform to be displayed. |

| ScreenStream | "Mainstream" "Substream" |   | The stream of screen projection. |

| default_timeout |   | int | Default timeout time, 60000ms. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "SmartHomePage": {
            "type": "string",
            "items": [
                "Amazon",
                "Google"
            ]
        },
        "operate": {
            "type": "string",
            "items": [
                "Bind",
                "UnBind",
                "Apply"
            ]
        },
        "BindEnable": {"type": "bool"},
        "UserName": {
            "type": "string",
            "min_len": 0,
            "max_len": 128
        },
        "ScreenStream": {
            "type": "string",
            "items": [
                "Mainstream",
                "Substream"
            ]
        },
        "default_timeout": 60000
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
