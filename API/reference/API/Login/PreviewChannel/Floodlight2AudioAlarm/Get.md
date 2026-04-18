# Get

## Function

This API is used to get light siren information.

## Request Message

### Parameter Description

See PreviewChannel > PTZ > Get > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/PreviewChannel/Floodlight2AudioAlarm/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
        "channel":"IP_CH4",
        "command_flag":false,
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel |   | string | Channel name. |

| floodlight_switch | true,false | bool | Flood light real-time switch,false: close;true: open. |

| floodlight_mode | 0-1 | int | Flood light mode, 0: always on, 1: flashing. |

| floodlight_value | 1-100 | int | Brightness of flood light. |

| floodlight_strobe_frequency | 0-2 | array | Enabled in blinking mode, 0:low; 1:middle; 2:high. |

| floodlight_value_range | 1-100 | int | Flood light brightness range. |

| audioAlarm _switch | true,false | bool | Horn real-time switch,false: close true: open. |

| audioAlarm _value | 1-10 | int | Audio volume. |

| audioAlarm_value_range | 1-10 | int | Audio volume range. |

| operation_type | "Floodlight", "AudioAlarm", "RedBlueLight", "All" | string | Operation type. |

| redBlueLight_switch |   | bool | Red and blue light switch. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
        "channel": "CH8",
        "redBlueLight_switch": false,
        "audioAlarm_switch": false,
        "audioAlarm_value": 5,
        "audioAlarm_value_range": {
            "type": "int32",
            "min": 1,
            "max": 10
        },
        "audioAlarm_value_adjustable": true
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
