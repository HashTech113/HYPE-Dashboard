# Range

## Function

This API is used to get the parameter range of Alarm > Exception.

## Request Message

None

Sample:

POST /API/AlarmConfig/Exception/Range HTTP/1.1

{
    "version":"1.0",
    "data": {}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| exception_info |   | Json Object | Json object see Table 2 for more information |

###### Table 2

| Parameter | Range | Type | Description |

| video_loss |   | Json Object | Json see Table 3 |

| disk_error |   | Json Object | Json see Table 3 |

| no_space_on_disk |   | Json Object | Json see Table 3 |

| fan_abnormal |   | Json Object | Json see Table 3 |

###### Table 3

| Parameter | Range | Type | Description |

| switch |   | bool | Enable switch |

| Buzzer | "0","10", "20","40","60" | string | Buzzer beeping time |

| alarm_out | “Local->1” ”Local->x” “IP_CH1->1” ”IP_CH1->x” “IP_CHx->1” ”IP_CHx->1” | array | Alarm output channel switch Each array bit is represented by a string representing the alarm output channel |

| latch_time | "10","20","40","60" | string | Alarm output time |

| show_message |   | bool | Display message switch |

| send_email |   | bool | Send email switch |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, where 0 is None, meaning no audio file has been selected). Each file is named "index_filename" (1ui will try), and when displayed on the page, "index_" should be hidden, such as "1ui will try" and only "i will try" should be displayed |

| voice_prompts_select |   | array | Playback channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, and bit2 corresponds to channel 2) |

| voice_prompts_tiome |   | array | Time period, there cannot be time conflicts among 12 time periods |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "exception_info": {
            "type": "object",
            "items": {
                "video_loss": {
                    "type": "object",
                    "items": {
                        "switch": {"type": "bool"},
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        }
                    }
                },
                "disk_error": {
                    "type": "object",
                    "items": {
                        "switch": {"type": "bool"},
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        }
                    }
                },
                "no_space_on_disk": {
                    "type": "object",
                    "items": {
                        "switch": {"type": "bool"},
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
