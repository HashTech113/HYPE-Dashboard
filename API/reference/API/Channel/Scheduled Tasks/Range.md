# Range

## Function

This API is used to get Channel > Scheduled Tasks parameter scale。

## Request Message

### Sample:

POST /API/Schedules/PtzTasks/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| schedule_tasks_enable |   | bool | Enable or disable cruise task schedule |

| tasks_recovery_times | [5,720] | int | Recovery time after the current cruise mission is interrupted |

| belt_times_use | [1,100] | int | Percentage of belt life |

| schedule |   | JSON array | Schedule information such as Table 2 |

#### Table 2

| Parameter | Range | Type | description |

| schedule_type | "Close" "Line Scan" "Tour" "Pattern Scan" "Preset" | string | Cruise schedule type |

| schedule_type_num | [0] [0] [1,2,3,4] [1,2,3,4] [1,2,3,4,5,6,7,8] | int array | Schedule subtask numbers for different cruises |

| week | [1,100] | JSON array | week Parameter information is as follows Table 3 |

#### Table 3

| Parameter | Range | Type | description |

| day | “Sun” “Mon” “Tue” “Wed” “Thu” “Fri” “Sat” | string | Mark the day of the week |

| time | 0: disables the time range 1: enables the time range | array | Each array bit identifies half an hour |

Sample：

POST /API/ NetworkConfig/T28181/Range HTTP/1.1

{
    "result": "success",
    "data": {"channel_info": {
        "type": "object",
        "items": {"CH1": {
            "type": "object",
            "items": {
                "schedule_tasks_enable": {"type": "bool"},
                "belt_times_use": {
                    "type": "int32",
                    "min": 0,
                    "max": 100
                },
                "schedule": {
                    "type": "array",
                    "min_size": 0,
                    "max_size": 5,
                    "items": [{
                        "schedule_type": {
                            "type": "string",
                            "items": [
                                "Close",
                                "Line Scan",
                                "Tour",
                                "Pattern Scan",
                                "Preset"
                            ]
                        },
                        "schedule_type_num": {
                            "type": "int32",
                            "min": 0,
                            "max": 8,
                            "ranges": [
                                [0],
                                [0],
                                [
                                    1,
                                    2,
                                    3,
                                    4
                                ],
                                [
                                    1,
                                    2,
                                    3,
                                    4
                                ],
                                [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8
                                ]
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
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6,
                                            7,
                                            8,
                                            9
                                        ]
                                    }]
                                }
                            }]
                        }
                    }]
                },
                "tasks_recovery_times": {
                    "type": "int32",
                    "mode": "r",
                    "min": 5,
                    "max": 720,
                    "default_value": 5
                }
            }
        }}
    }}
}

## Error Code

See Response Messages Body and Common error_code for more information.
