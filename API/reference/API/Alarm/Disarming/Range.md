# Range

## Function

This API is used to get Alarm > Disarming parameter range.

## Request Message

### Parameter Description

None.

Sample:

POST /API/AlarmConfig/Disarming/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| disarming |   | bool | disarming switch. |

| action |   | object | See Table 2 for details. |

| disarming_channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channel supported by the device. | string array | disarming channel . |

| channel_info |   | object | See Table 3. |

##### Table 2

| Parameter | Range | Type | Description |

| buzzer |   | bool | Whether to disarm the buzzer switch. |

| alarm_out |   | bool | Whether to disarm the alarm output switch. |

| show_message |   | bool | Whether to disarm the alarm icon switch. |

| send_email |   | bool | Whether to disarm email switch. |

| full_screen |   | bool | Whether to disarm the full screen switch. |

| voice_prompts |   | bool | Whether to disarm the voice broadcast switch. |

| event_push_platform |   | bool | Whether to disarm event push switch. |

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

| disarming_schedule |   | object array | See Table 5. |

##### Table 5

| Parameter | Range | Type | Description |

| schedule_type | "Disarming" | string | Schedule type. |

| week |   | object array | See Table 6 for details. |

##### Table 6

| Parameter | Range | Type | Description |

| day | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string |   |

| time | 0: close the time period 1: open the time period | array | Each array bit represents half an hour. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "support_copy": true,
        "disarming": {"type": "bool"},
        "action": {
            "type": "object",
            "items": {
                "buzzer": {"type": "bool"},
                "alarm_out": {"type": "bool"},
                "show_message": {"type": "bool"},
                "send_email": {"type": "bool"},
                "full_screen": {"type": "bool"},
                "voice_prompts": {"type": "bool"},
                "event_push_platform": {"type": "bool"},
                "mobile_push": {"type": "bool"}
            }
        },
        "disarming_channel": {
            "type": "array",
            "min_size": 0,
            "max_size": 16,
            "items": {
                "type": "string",
                "items": [
                    "CH1",
                    "CH2",
                    "CH3",
                    "CH4",
                    "CH5",
                    "CH6",
                    "CH7",
                    "CH8",
                    "CH9",
                    "CH10",
                    "CH11",
                    "CH12",
                    "CH13",
                    "CH14",
                    "CH15",
                    "CH16"
                ]
            }
        },
        "channel_info": {
            "type": "object",
            "items": {
                "CH1": {
                    "type": "object",
                    "items": {"disarming_schedule": {
                        "type": "array",
                        "min_size": 0,
                        "max_size": 2,
                        "items": [{
                            "schedule_type": {
                                "type": "string",
                                "items": ["Disarming"]
                            },
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
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
