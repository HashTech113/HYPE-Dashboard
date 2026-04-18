# Import

## Function

This API is used to import alert audio files.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device. | string array |   |

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

| siren_type | "Alarm1", "Alarm2", "User-defined1", "User-defined2", "User-defined3" | string | Alarm alarm station Choose Audio. |

| siren_file_name | string length: 0-127 | string | alarm file name. |

| siren_file_type | string length: 0-127 | string | Audio file type. |

| file_data | string length: 0-512k | string | file data. |

| file_name | string length: 0-127 | string | file name. |

Sample:

POST /API/AlarmConfig/VoiceAlarm/Import HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {
            "CH1": {
                "siren_type": "Alarm1",
                "siren_file_name": "FILE.wav",
                "siren_file_type": ".wav",
                "file_data": "ADSD+ASD.ADASD"
            }
        }
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
