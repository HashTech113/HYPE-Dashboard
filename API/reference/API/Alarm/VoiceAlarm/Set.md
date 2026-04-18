# Set

## Function

This API is used to set Alarm > Voice Alarm parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information see Table 2. |

##### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | object | See Table 3. |

| … |   | object |   |

| IP_CH1 |   | object |   |

| … |   | object |   |

| WIFI_CH1 |   | object |   |

| … |   | object |   |

##### Table 3

| Parameter | Range | Type | Description |

| siren_switch |   | bool | Siren function switch. |

| siren_time |   | int | Warning alarm time. |

| siren_value |   | int | The sound volume of the siren alarm. |

| siren_mode | "Fixed_Volume" "Gradual_Increasing_Volume" | string | Alarm alarm sound type |

| siren_type_content |   | Json Object | Alarm types refer to Table 4。 |

| siren_type | "Alarm1", "Alarm2", "User-defined1", "User-defined2", "User-defined3" | string | Alarm alarm station Choose Audio. |

| siren_file_name | 0-127 | string | Alarm file name |

##### Table 4

| Parameter | Range | Type | Description |

| delete_button |   | bool | Delete/import audio button |

| siren_file_name | 0-127 | string | Alarm file name |

| siren_file | 0-256k | string | Controls whether the imported audio file control is displayed |

Sample:

POST /API/AlarmConfig/VoiceAlarm/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {
            "CH1": {
                "siren_switch": true,
                "siren_time": 62,
                "siren_value": 62,
                "siren_type": "Alarm1"
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
