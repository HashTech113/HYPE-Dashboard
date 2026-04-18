# Range

## Function

This API is used to get Alarm > Linkage Schedule parameter range.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device. | string array |   |

| page_type | "FloodLight" "Siren" "EnforcerLight" | string |   |

Sample:

POST /API/AlarmConfig/Schedule/Range HTTP/1.1

{
    "version": "1.0",
    "data":{
        "page_type":" FloodLight",
        "channel":["CH1"]
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information see Table 3. |

| page_type | "FloodLight", "Siren" | string | The schedule used to distinguish the alarm linkage type. |

##### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | object | See Table 4. |

| … |   | object |   |

| IP_CH1 |   | object |   |

| … |   | object |   |

| WIFI_CH1 |   | object |   |

| … |   | object |   |

##### Table 4

| Parameter | Range | Type | Description |

| schedule |   | object array | See Table 5. |

##### Table 5

| Parameter | Range | Type | Description |

| schedule_type | "Motion", "IO", "PIR", "FD", "PVD", "PID", "LCD", "SOD", "CC", "CD", "QD", "LPD", "RSD", "VT", "Intrusion", "RegionEntrance", "RegionExiting" "FireDetect", "TempMeas" | string | alarm schedule type. |

| week |   | object array | See Table 6 for details. |

| switch |   | bool | Current alarm type alarm linkage switch (new in 8.2.3). |

##### Table 6

| Parameter | Range | Type | Description |

| day | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string |   |

| time | 0: close the time period 1: open the time period | int | each array bit marks half an hour. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "page_type": "FloodLight",
        "channel_info": {
            "type": "object",
            "items": {"CH1": {
                "type": "object",
                "items": {"time_schedule": {
                    "type": "array",
                    "min_size": 0,
                    "max_size": 13,
                    "items": [{
                        "schedule_type": {
                            "type": "string",
                            "items": [
                                "Motion",
                                "IO",
                                "FD",
                                "PVD",
                                "PID",
                                "LCD",
                                "SOD",
                                "CC",
                                "CD",
                                "QD",
                                "LPD",
                                "RSD",
                                "VT",
                                "Intrusion",
                                "RegionEntrance",
                                "RegionExiting"
                            ]
                        },
                        "switch": {"type": "bool"},
                        "week": {
                            "type": "array",
                            "size": 7,
                            "items": [{
                                "day": {
                                    "type": "string",
                                    "items": [
                                        "Sun",
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat"
                                    ]
                                },
                                "time": {
                                    "type": "array",
                                    "size": 48,
                                    "items": [{
                                        "type": "int32",
                                        "items": [
                                            0,
                                            1
                                        ]
                                    }]
                                }
                            }]
                        }
                    }]
                }}
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
