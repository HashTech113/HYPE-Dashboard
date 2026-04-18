# Delete

## Function

This API is used to delete imported audio files.

## Request Message

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

| siren_type | "Alarm1", "Alarm2", "User-defined1", "User-defined2", "User-defined3" | string | Alarm alarm station Select Audio("Alarm1", "Alarm2" |

| It is the system's own audio and cannot be deleted). |   |   |   |

Sample:

POST /API/AlarmConfig/VoiceAlarm/Delete HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {
            "CH1": {
                "siren_type": "User-defined2"
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
