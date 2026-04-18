# Range

## Function

This API is used to get the parameter range of Alarm > MOtion Alarm.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1” ”CH1x” “IP_CH1” ” IP_CH1x”“WIFI_CH1” ” WIFI_CH1x” The number of channels depends on the functionality of the device. | string array | Each array bit represents a channel with a string. |

| page_type | “ChannelConfig”,“AlarmConfig” “AllConfig” | string | Data used to distinguish between channel configuration page and alarm configuration page “AllConfig”Used in nvr to obtain and set ipc parameters, with more light than ChannelConfig_ Linkage field |

Sample:

POST /API/AlarmConfig/Motion/Range HTTP/1.1

{
    "version":"1.0","data":{
        "page_type":"AlarmConfig"
    }
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Channel information see Table 3 for more information |

| page_type | “ChannelConfig”,“AarmConfig” | string | Used to distinguish between channel configuration page and alarm configuration page data, only required when set |

| channel_max |   | int | The total number of channels in the current device |

| support_copy |   | bool | Does the page support copy (dedicated to NVR and DVR) |

###### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Json see Table 4 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

###### Table 4

| Parameter | Range | Type | Description |

| status | "Offline","Online","Nonsupport" | string | Channel online status, only for digital channels. Note: This field is not available when the channel is online |

| switch |   | bool | Request switch |

| mbcol | 1 - 44(onvif) | int | Motion The area is divided into row * col blocks, which are determined by camera. Set does not require |

| mbrow | 1 - 30(onvif) | int | Motion The area is divided into row * col blocks, which are determined by camera. Set does not require |

| copy_ch | "digit""analog""wifi" | string | Flag supporting channel replication (dedicated to NVR and DVR) |

| sensitivity | 1-5、1-8 | int | motion detection sensitivity |

| intervals | 1-256 | int | Motion Alarm detection time interval (s) |

| smart_motion_detection |   | bool |   |

| buzzer | "0","10","20","40","60" | string | Buzzer beep time (NVR/DVR dedicated) |

| alarm_out | “Local->1” ”Local->x”“IP_CH1->1” “IP_CH1->2” ”IP_CHx->1” ”IP_CHx->2” The number of channels depends on the functionality of the device. | array | Alarm channels Each array bit is represented by a string representing the alarm output channel. |

| latch_time | "10","20","40","60" | string | Alarm output time |

| record_enable |   | bool | Record channel switch |

| record_channel | “CH1” ”CH1x”“IP_CH1” ” IP_CH1x”“WIFI_CH1” | array | Alarm output channel Channel alarm linkage switch |

| post_recording | "30","60","120","300" | string | Recording delay time |

| region_setting |   | array | The region is divided into 36 lines and 44 blocks/lines. A bit describes a block in a row. Bit=1: Monitor the movement of the block.. Example: Region [0]=(FF-FF-FF-FF-FF-F0-00-00-00): Monitor the motion in 44 blocks of channel 0. 44 blocks of Line 1 have not been monitored |

| show_message |   | bool | Display message switch (dedicated to NVR/DVR) |

| send_email |   | bool | Send email switch |

| full_screen |   | bool | Full screen switch (dedicated to NVR/DVR) |

| ftp_picture_upload |   | bool | Channel capture FTP upload switch |

| ftp_video_upload | true false | bool | Channel video FTP upload switch (dedicated to NVR/DVR) |

| picture_to_cloud |   | bool | Image upload switch |

| video_to_cloud | true false | bool | Video cloud upload switch (dedicated to NVR/DVR) |

| light_linkage |   | bool | White light linkage switch, when the motion is triggered, the linkage triggers white light |

| multiple_switch | "Disable" "Motion" "PIR_and_Motion" "Person" "PIR_and_Person" | string | Motion switch with multiple options |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, where 0 is None, meaning no audio file has been selected). Each file is named "index_filename" (1ui will try), and when displayed on the page, "index_" should be hidden, such as "1ui will try" and only "i will try" should be displayed |

| voice_prompts_select |   | array | Playback channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, and bit2 corresponds to channel 2) |

| voice_prompts_time |   | array | Time period, there cannot be time conflicts among 12 time periods |

| schedule_list | 0-8 | json array | (Dedicated to consumer NVR docking with IPC POE packages) deployment plan data,see Table 5 for more information |

| smart_moiton_detection |   | bool | SMD switch |

| target_type | "Motion","Pedestrian","Vehicle","Pedestrian & Vehicle" | string | Detection types with multiple options |

| enforcerlight_linkage |   | bool | Alarm light linkage switch. |

| siren_linkage |   | bool | Alarm linkage switch. |

| http_listening |   | bool | eventpushlinkage switch |

| schedule |   | Json array | Json See Table 6。 |

###### Table 5

| Parameter | Range | Type | Description |

| enable | true false | bool | Is the current schedule effective |

| start_time | 0 – 1439(23*60+59) | int | Schedule start time (minutes relative to 00:00) |

| end_time | 0 – 1439(23*60+59) | int | Schedule end time (minutes relative to 00:00) |

| weekday | "Sunday" "Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" | array | Indicates the day of the week on which the current schedule takes effect, with multiple options available |

###### Table 6

| Parameter | Range | Type | Description |

| schedule_type | "Motion" | string | motion linkage schedule. |

| week |   | Json array | WeekJson See Table 7. |

###### Table 7

| Parameter | Range | Type | Description |

| day | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string |   |

| time | 0:Disable Time range 1: The time range is enabled | array | Each array bit (int) identifies half an hour。 |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
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
                        "record_enable": {
                            "type": "bool"
                        },
                        "record_channel": {
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
                        "http_listening": {
                            "type": "bool"
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
                },
                ...
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
