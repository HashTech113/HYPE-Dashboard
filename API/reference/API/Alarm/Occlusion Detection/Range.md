# Range

## Function

This API is used to get the parameter range of Alarm > Occlusion Detection.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channels supported by the device. | string array | only use "CH1"。 |

| page_type | "ChannelConfig", "AlarmConfig" | string | Data used to distinguish between channel configuration pages and alarm configuration pages. |

Sample:

POST /API/AlarmConfig/Intelligent/OcclusionDetection/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Channel information see Table 3 for more information |

| page_type | “ChannelConfig”,“AarmConfig” | string | Used to distinguish between channel configuration page and alarm configuration page data, only required when set |

| channel_max |   | int | Maximum number of channels |

| support_copy |   | bool | Does the page support copy (dedicated to NVR and DVR) |

###### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Json see Table 4 for more information |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

###### Table 4

| Parameter | Range | Type | Description |

| status | "Offline","Online"，“Nonsupport” | string | Channel online status, only for digital channels. Note: This field is not available when the channel is online |

| alarm_out | “Local->1” ”Local->x”“IP_CH1->1” “IP_CH1->2” ”IP_CHx->1” ”IP_CHx->2” The number of channels depends on the functionality of the device. | array | Alarm channel Each array bit is represented by a string representing the alarm output channel. Camera: Local ->1: On, null: Off |

| latch_time | "10","20","40","60" | string | Alarm output time |

| record_enable | true false | bool | Record channel switch |

| record_channel | “CH1” ”CH1x”“IP_CH1” ” IP_CH1x”“WIFI_CH1” | array | Alarm output channel Channel alarm linkage switch |

| post_recording | "30","60","120","300" | string | Recording delay time |

| send_email | true false | bool | Send email switch |

| ftp_picture_upload | true false | bool | Channel capture FTP upload switch |

| ftp_video_upload | true false | bool | Channel video FTP upload switch |

| picture_to_cloud | true false | bool | Image upload switch (dedicated to NVR) |

| video_to_cloud | true false | bool | Video cloud upload switch (dedicated to NVR/DVR) |

| full_screen |   | bool | Full screen switch (NVR specific) |

| buzzer | "0","10","20","40","60" | string | Buzzer beep time (NVR specific) |

| show_message |   | bool | Display message switch (NVR specific) |

| switch | true false | bool | switch，false: close true: open |

| sensitivity | 1-6 | int | Test sensitivity |

| copy_ch | "digit""analog""wifi" | string | Flag supporting channel replication (dedicated to NVR and DVR) |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, where 0 is None, meaning no audio file has been selected). Each file is named "index_filename" (1ui will try), and when displayed on the page, "index_" should be hidden, such as "1ui will try" and only "i will try" should be displayed |

| voice_prompts_select |   | array | Playback channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, and bit2 corresponds to channel 2) |

| voice_prompts_time |   | array | Time period, there cannot be time conflicts among 12 time periods |

| record_enable |   | bool | record switch |

| light_linkage |   | bool | White light linkage switch |

| enforcerlight_linkage |   | bool | Alarm light linkage switch |

| siren_linkage |   | bool | Alarm linkage switch |

| http_listening |   | bool | eventpush linkage switch |

| schedule |   | Json array | Json See Table 5. |

###### Table 5

| Parameter | Range | Type | Description |

| schedule_type | "Occlusion Detection" | string | Occlusion Detection Linkage schedule |

| week |   | Json array | WeekJson See Table 6 |

###### Table 6

| Parameter | Range | Type | Description |

| day | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string |   |

| time | 0:Disable Time range 1: The time range is enabled | array | Each array bit (int) identifies half an hour. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "support_copy": true,
        "default_timeout": 30000,
        "channel_max": 20,
        "channel_info": {
            "type": "object",
            "items": {
                "IP_CH1": {
                    "type": "object",
                    "items": {
                        "status": {
                            "description": "Only offline channel has this variable.",
                            "type": "string",
                            "mode": "r",
                            "items": [
                                "Offline",
                                "Online"
                            ]
                        },
                        "channel_enable": {
                            "type": "bool"
                        },
                        "name": {
                            "type": "object",
                            "items": {
                                "show": {
                                    "type": "bool",
                                    "disable": true
                                },
                                "text": {
                                    "type": "string",
                                    "min_len": 0,
                                    "max_len": 31,
                                    "disable": true
                                },
                                "pos": {
                                    "type": "object",
                                    "items": {
                                        "x": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        }
                                    }
                                }
                            }
                        },
                        "datetime": {
                            "type": "object",
                            "items": {
                                "show": {
                                    "type": "bool",
                                    "disable": true
                                },
                                "date_format": {
                                    "type": "string",
                                    "items": [
                                        "MM/DD/YYYY",
                                        "YYYY-MM-DD",
                                        "DD/MM/YYYY"
                                    ],
                                    "disable": true
                                },
                                "time_format": {
                                    "type": "int32",
                                    "unit": "hour",
                                    "items": [
                                        24,
                                        12
                                    ],
                                    "disable": true
                                },
                                "pos": {
                                    "type": "object",
                                    "items": {
                                        "x": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        }
                                    }
                                }
                            }
                        },
                        "covert": {
                            "type": "bool"
                        },
                        "refresh_rate": {
                            "type": "string",
                            "items": [
                                "50Hz",
                                "60Hz"
                            ]
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
