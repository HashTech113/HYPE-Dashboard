# Range

## Function

This API is used to get parameter range for AI > Setup > AI Func Schedule page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/AI/Setup/AISchedule/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON | Channel Information JSON show as follow Table 2 |

#### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 3 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | Description |

| category |   | JSON array | CategoryJSON show as follow Table 4 |

| AI_Schedule |   | bool | AI function schedule switch |

#### Table 4

| Parameter | Range | Type | Description |

| schedule_type | "fd", "pvd", "pid", "lcd", "sod", "cc", "cd", "qd", "lpd", "hm", “rsd” “intrusion” “region_entrance” “region_exiting” | string | Configurable Schedule Types Note: Depending on device capabilities, the actual schedule types may be less than the allowable configurable types |

| mutex_type | "fd", "pvd", "pid", "lcd", "sod", "cc", "cd", "qd", "lpd", "hm", “rsd” “intrusion” “region_entrance” “region_exiting” | string | The smart type that is mutually exclusive with schedule_type Note: According to the device capability, the actual mutual exclusion type is different |

| week |   | JSON array | WeekJSON show as follow Table 5 |

| mutex_type_between_channel |   | JSON array | (Thermal imaging use)Intelligent type of the mutual exclusion between the schedule_type of other channels and the current channel Note: The actual mutual exclusion type varies according to the device capabilityTable 6 |

#### Table 5

| Parameter | Range | Type | Description |

| day | Sun,Mon,Tue,Wed, Thu,Fri,Sat | string | identify the day of the week |

| time | 0: close the time zone 1: open the time zone | array | Each array bit (int) identifies a half-hour. |

#### Table 6

| Parameter | Range | Type | Description |

| channel | “CH1” “CH2” ... | string | Exclusive channel |

| mutex_type | "fd" "pvd" "pid" "lcd" "sod" "cc" "cd" "qd" "lpd" "hm" “rsd” “intrusion” “region_entrance” “region_exiting” |   |   |

| Json array | Intelligent type that is mutually exclusive with schedule_type Note: The actual type varies according to the device capability |   |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {
        "type": "object",
        "items": {"CH1": {
            "type": "object",
            "items": {
                "category": {
                    "type": "array",
                    "min_size": 0,
                    "max_size": 5,
                    "items": [{
                        "schedule_type": {
                            "type": "string",
                            "items": [
                                "fd",
                                "pvd",
                                "pid",
                                "lcd",
                                "sod",
                                "cc",
                                "cd",
                                "qd",
                                "lpd",
                                "hm",
                                "rsd"
                            ]
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
                },
                "AI_Schedule": {"type": "bool"}
            }
        }}
    }}
}

## Error Code

See Response Messages Body and Common error_code for more information.
