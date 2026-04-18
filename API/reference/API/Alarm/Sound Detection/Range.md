# Range

## Function

This API is used to get the parameter range of Alarm > Sound Detection .

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channels supported by the device. | string array | IPC only use "CH1"。 |

| page_type | "ChannelConfig", "AlarmConfig" | string | Data used to distinguish between channel configuration pages and alarm configuration pages. |

Sample:

POST /API/AlarmConfig/Intelligent/SoundDetection/Range HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "page_type":"ChannelConfig"
    }
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Channel information refer to Table 3 |

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

| full_screen |   | bool | Full screen switch (NVR only)） |

| buzzer | "0","10","20","40","60" | string | Buzzer beep time (NVR specific) |

| show_message |   | bool | Display message switch (NVR specific) |

| switch | true false | bool | switch，false: close true: open |

| rise_sensitivity | 1-100 | int | Sound detection threshold sensitivity (only for sound amplification detection) |

| sound_intensity | 1-100 | int | Sound increases detection sensitivity |

| decline_switch | true false | bool | Sound reduction detection switch |

| rise_switch | true false | bool | Sound rise detection switch |

| decline_sensitivity | 1-100 | int | Sound reduces sensitivity |

| copy_ch | "digit""analog""wifi" | string | Flag supporting channel replication (dedicated to NVR and DVR) |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, where 0 is None, meaning no audio file has been selected). Each file is named "index_filename" (1ui will try), and when displayed on the page, "index_" should be hidden, such as "1ui will try" and only "i will try" should be displayed |

| voice_prompts_select |   | array | Playback channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, and bit2 corresponds to channel 2) |

| voice_prompts_time |   | array | Time period, there cannot be time conflicts among 12 time periods |

| http_listening |   | bool | eventpush linkage switch |

| time_schedule |   | Json array | see Table 5 for more information |

###### Table 5

Time_schedule JSON

| Parameter | Range | Type | Description |

| schedule_type | "SD" | string | Sound alarm time schedule |

| week |   | json array | see Table 6 for more information |

###### Table 6

detect_area JSON

| Parameter | Range | Type | Description |

| day | Sun,Mon,Tue,Wed,Thu,Fri,Sa | string | Identify the day of the week |

| time | 0: Close time period 1: Opening time period | array | Each array bit (int) is identified for half an hour. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 20,
        "support_copy": true,
        "channel_info": {
            "type": "object",
            "items": {
                "IP_CH9": {
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
                        "switch": {
                            "type": "bool"
                        },
                        "rise_switch": {
                            "type": "bool"
                        },
                        "rise_sensitivity": {
                            "type": "int32",
                            "min": 1,
                            "max": 100
                        },
                        "decline_switch": {
                            "type": "bool"
                        },
                        "decline_sensitivity": {
                            "type": "int32",
                            "min": 1,
                            "max": 100
                        },
                        "sound_intensity": {
                            "type": "int32",
                            "min": 1,
                            "max": 100
                        },
                        "time_schedule": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 2,
                            "items": [
                                {
                                    "schedule_type": {
                                        "type": "string",
                                        "items": [
                                            "SD"
                                        ]
                                    },
                                    "week": {
                                        "type": "array",
                                        "size": 7,
                                        "items": [
                                            {
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
                                                    "items": [
                                                        {
                                                            "type": "int32",
                                                            "items": [
                                                                0,
                                                                1
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
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
