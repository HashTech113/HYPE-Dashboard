# Range

## Function

This API is used to get the parameter range of Alarm > PIR.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1” ”CH1x”“IP_CH1” ” IP_CH1x”“WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the functionality of the device. | string array | Each array bit represents a channel with a string. DVR/NVR requirements; IPC only uses CH1 |

| page_type | “ChannelConfig”,“AlarmConfig” “AllConfig” | string | Data used to distinguish between channel configuration page and alarm configuration page “AllConfig”Used in nvr to obtain and set ipc parameters, with more light than ChannelConfig_ Linkage field |

Sample:

POST /API/AlarmConfig/Intelligent/PIR/Range HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "page_type":"AlarmConfig"
    }
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Descripton |

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

| ftp_picture_upload | true false | bool | Channel image FTP upload switch |

| ftp_video_upload | true false | bool | Channel video FTP upload switch |

| picture_to_cloud | true false | bool | Image upload switch (dedicated to NVR) |

| video_to_cloud | true false | bool | Video cloud upload switch (dedicated to NVR/DVR) |

| full_screen |   | bool | Full screen switch (NVR specific) |

| buzzer | "0","10","20","40" | string | Buzzer beep time (NVR specific) |

| show_message |   | bool | Display message switch (NVR specific) |

| switch | true false | bool | switch，false: close true: open |

| sensitivity | 1-8 | int | Test sensitivity |

| copy_ch | "digit""analog""wifi" | string | Flag supporting channel replication (dedicated to NVR and DVR) |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, where 0 is None, meaning no audio file has been selected). Each file is named "index_filename" (1ui will try), and when displayed on the page, "index_" should be hidden, such as "1ui will try" and only "i will try" should be displayed |

| voice_prompts_select |   | array | Playback channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, and bit2 corresponds to channel 2) |

| voice_prompts_time |   | array | Time period, there cannot be time conflicts among 12 time periods |

| mbcol | 1-44 | int | The Pir area is divided into row * col blocks, which are determined by camera. Set does not need to be consistent with motion |

| mbrow | 1-30 | int | The Pir area is divided into row * col blocks, which are determined by camera. Set does not need to be consistent with motion |

| region_setting | 200*8 | int array | The Pir area is divided into row * col blocks, with each bit describing the value of a block (8 bits per byte). Bit=1: motion in this block is monitored< For example: region_ Setting [0]=(FF-FF-FF-FF-FF-F0-00-00-00):: motion in channel 0 line 0's 44 blocks are monitored Line 1's 44 blocks not monitored |

| detect_area | 8 | json array | see Table 5 for more information |

| light_linkage |   | bool | White light linkage switch, when PIR is triggered, the linkage triggers white light |

| enforcerlight_linkage |   | bool | Alarm light linkage switch |

| siren_linkage |   | bool | Alarm linkage switch |

| http_listening |   | bool | eventpush linkage switch |

| schedule |   | Json array | Json See Table 6. |

###### Table 5

detect_area JSON

| Parameter | Range | Type | Description |

| x | 0-704 | short | Abscissa point |

| y | 0-576 | short | Ordinate point |

###### Table 6

| Parameter | Range | Type | Description |

| schedule_type | "PIR" | string | PIR Linkage schedule |

| week |   | Json array | WeekJson See Table 7 |

###### Table 7

| Parameter | Range | Type | Description |

| day | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string |   |

| time | 0:Disable Time range 1: The time range is enabled | array | Each array bit (int) identifies half an hour. |

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
                "CH1": {
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
                            "max_size": 25,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH9->1"
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
                        "record_enable": {
                            "type": "bool"
                        },
                        "record_channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 20,
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
                                    "IP_CH1",
                                    "IP_CH2",
                                    "IP_CH3",
                                    "IP_CH4",
                                    "IP_CH5",
                                    "IP_CH6",
                                    "IP_CH7",
                                    "IP_CH8",
                                    "IP_CH9",
                                    "IP_CH10",
                                    "IP_CH11",
                                    "IP_CH12"
                                ]
                            }
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {
                            "type": "bool"
                        },
                        "send_email": {
                            "type": "bool"
                        },
                        "full_screen": {
                            "type": "bool"
                        },
                        "http_listening": {
                            "type": "bool"
                        },
                        "ftp_picture_upload": {
                            "type": "bool"
                        },
                        "ftp_video_upload": {
                            "type": "bool"
                        },
                        "picture_to_cloud": {
                            "type": "bool"
                        },
                        "video_to_cloud": {
                            "type": "bool"
                        },
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
                        },
                        "copy_ch": {
                            "type": "string",
                            "items": [
                                "digit",
                                "analog",
                                "wifi",
                                "local",
                                "all"
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
