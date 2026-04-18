# Range

## Function

This API is used to get Alarm > Voice Alarm parameter range.

## Request Message

### Parameter Description

None.

Sample:

POST /API/AlarmConfig/VoiceAlarm/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device. | string array |   |

| channel_max |   | int | The maximum number of channels. |

| channel_info |   | object | Total channel information see Table 2. |

##### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | object | See Table 3 |

| … |   | object |   |

| IP_CH1 |   | object |   |

| … |   | object |   |

| WIFI_CH1 |   | object |   |

| … |   | object |   |

##### Table 3

| Parameter | Range | Type | Description |

| status | "Offline", "Online" | string | channel status. |

| siren_switch |   | bool | Siren function switch. |

| siren_time |   | int | Warning alarm time. |

| siren_value |   | int | The sound volume of the siren alarm. |

| siren_type | "Alarm1", "Alarm2", "User-defined1", "User-defined2", "User-defined3" | string | Alarm alarm station Choose Audio. |

| siren_file_name | string length: 0-127 | string | alarm file name. |

| siren_file | string length: 0-256k | string | Control whether the control of importing audio files is displayed. |

| siren_file_type | string length: 0-127 | string | Audio file type. |

| siren_support_format | ".wav", ".pcm" | string array | Siren support file type. |

| support_siren_schedule_hub |   | bool | Show alarm schedule button. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "channel_info": {
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
                        "siren_switch": {
                            "type": "bool"
                        },
                        "siren_time": {
                            "type": "int32",
                            "min": 5,
                            "max": 180,
                            "default_value": 10
                        },
                        "siren_value": {
                            "type": "int32",
                            "min": 1,
                            "max": 10,
                            "default_value": 5
                        },
                        "siren_file": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 524288
                        },
                        "siren_type": {
                            "type": "string",
                            "items": [
                                "Alarm1"
                            ]
                        },
                        "siren_file_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 127
                        },
                        "siren_file_type": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 127
                        },
                        "siren_support_format": {
                            "type": "string",
                            "mode": "r",
                            "items": [
                                ".wav",
                                ".pcm"
                            ],
                            "default_value": ""
                        },
                        "support_siren_schedule_hub": {
                            "type": "bool"
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
