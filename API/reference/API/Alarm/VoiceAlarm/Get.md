# Get

## Function

This API is used to get Alarm > Voice Alarm parameters.

## Request Message

None.

Sample:

POST /API/AlarmConfig/VoiceAlarm/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

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

| siren_switch |   | bool | Siren function switch. |

| siren_time | 5-180 | int | Warning alarm time. |

| siren_value | 1-10 | int | The sound volume of the siren alarm. |

| siren_mode | "Fixed_Volume" - fixed volume, "Gradual_Increasing_Volume" - gradual volume | string | Siren alarm sound type. |

| siren_type_content |   | object | See Table 4 for details. |

| siren_type | "Alarm1", "Alarm2", "User-defined1", "User-defined2", "User-defined3" | string | Alarm alarm station Choose Audio. |

| siren_file_name | string length: 0-127 | string | alarm file name. |

##### Table 4

| Parameter | Range | Type | Description |

| Alarm1 |   | object |   |

| Alarm2 |   | object |   |

| User-defined1 |   | object | See Table 5 for details. |

| User-defined2 |   | object | See Table 5 for details. |

| User-defined3 |   | object | See Table 5 for details. |

##### Table 5

| Parameter | Range | Type | Description |

| delete_button |   | bool | Whether to display the delete button or import button. |

| siren_file_name | 0-127 | string |   |

| siren_file | 0-256k | string | Control whether the widget for importing audio files is displayed. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "siren_switch": false,
                "siren_time": 10,
                "siren_value": 5,
                "siren_type_content": {
                    "Alarm1": {}
                },
                "siren_type": "Alarm1",
                "siren_file_name": ""
            },
            "CH2": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH3": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH4": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH6": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH7": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH8": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH9": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH10": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH11": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH12": {
                "status": "Offline",
                "reason": "Not support"
            },
            "CH13": {
                "reason": "Not configured"
            },
            "CH14": {
                "reason": "Not configured"
            },
            "CH15": {
                "reason": "Not configured"
            },
            "CH16": {
                "reason": "Not configured"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
