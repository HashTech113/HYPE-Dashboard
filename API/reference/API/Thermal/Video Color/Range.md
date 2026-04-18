# Range

## Function

This API is used to get Thermal > Video Color parameter scale

## Request Message

none

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel_info |   | Json Object | Channel information see Table 2 |

#### Table 2

| Parameter | Range | Type | description |

| CH1 |   | Json Object | JSON see Table 3 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | description |

| status | "Offline" "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online |

| bright | 0-255 | int | bright |

| contrast | 0-255 | int | contrast |

| palette | "White Hot" "Black Hot" "Rainbow" "Ice Fire" "Red Hot" "Green Hot" "Fusion 1" "Fusion 2" "Hot Iron 1" "Hot Iron 2" "Puce" "Color 1" "Color 2" "Rain" "Dark Blue" | string | pseudo color |

| support_default |   | bool | Whether to restore the default value |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {
        "type": "object",
        "items": {
            "CH1": {
                "type": "object",
                "items": {
                    "status": {
                        "description": "Only offline channel has this variable.",
                        "type": "string",
                        "mode": "r",
                        "items": [
                            "Offline",
                            "Online"
                        ]
                    },
                    "support_default": {"type": "bool"},
                    "bright": {
                        "description": "Brightness",
                        "type": "int32",
                        "mode": "r",
                        "min": 0,
                        "max": 255
                    },
                    "contrast": {
                        "type": "int32",
                        "min": 0,
                        "max": 255
                    },
                    "hue": {
                        "type": "int32",
                        "min": 0,
                        "max": 255
                    },
                    "saturation": {
                        "type": "int32",
                        "min": 0,
                        "max": 255
                    },
                    "sharpness": {
                        "type": "int32",
                        "min": 0,
                        "max": 255
                    }
                },
                "channel": "CH1"
            },
            "CH2": {
                "type": "object",
                "items": {
                    "status": {
                        "description": "Only offline channel has this variable.",
                        "type": "string",
                        "mode": "r",
                        "items": [
                            "Offline",
                            "Online"
                        ]
                    },
                    "support_default": {"type": "bool"},
                    "bright": {
                        "description": "Brightness",
                        "type": "int32",
                        "mode": "r",
                        "min": 0,
                        "max": 255
                    },
                    "contrast": {
                        "type": "int32",
                        "min": 0,
                        "max": 255
                    },
                    "palette": {
                        "type": "string",
                        "items": [
                            "White Hot",
                            "Black Hot",
                            "Rainbow",
                            "Ice Fire",
                            "Red Hot",
                            "Green Hot",
                            "Fusion 1",
                            "Fusion 2",
                            "Hot Iron 1",
                            "Hot Iron 2",
                            "Puce",
                            "Color 1",
                            "Color 2",
                            "Rain",
                            "Dark Blue"
                        ]
                    }
                },
                "channel": "CH2"
            }
        }
    }}
}

## Error Code

See Response message body and general error_code for more information.
