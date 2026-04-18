# Range

## Function

This API is used to get the combined alarm parameter range.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channel supported by the device. | string array |   |

Sample:

POST /API/AlarmConfig/Combination/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information see Table 3. |

##### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | object | See Table 4 |

| … |   | object |   |

| IP_CH1 |   | object |   |

| … |   | object |   |

| WIFI_CH1 |   | object |   |

| … |   | object |   |

##### Table 4

| Parameter | Range | Type | Description |

| status | "Offline", "Online", "Nonsupport" | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field. |

| enable_alarm | "Disable", "Enable" | string | joint alarm enable switch. |

| combination_configure |   | object array | combination alarm configuration, see Table 5 |

| alarm_out | "Local->1"…"Local->x" "IP_CH1->1"…"IP_CHx->x" The number of channels depends on the function of the device. | string array | alarm Output channel. Array members use a string to represent an alarm output channel. Local->1: open, empty value: close. |

| latch_time | "10","20","40","60" | string | Alarm output time. |

| record_enable |   | bool | record enable. |

| record_channel | "CH1"…"CHx" "IP_CH1"…"IP_CHx" "WIFI_CH1"…"WIFI_CHx" | string array | Channel of linkage recording. |

| post_recording | "30","60","120","300" | string | Recording delay time. |

| send_email |   | bool |   |

| full_screen |   | bool | FullScreen switch (for NVR only). |

| buzzer | "0","10","20","40","60" | string | Buzzer buzzing time (for NVR only). |

| show_message |   | bool | Show Message switch (for NVR only). |

| ftp_picture_upload |   | bool | Channel snapshot FTP upload switch. |

| ftp_video_upload |   | bool | Channel video FTP upload switch (for NVR/DVR only). |

| picture_to_cloud |   | bool | Picture upload switch. |

| video_to_cloud |   | bool | Video cloud upload switch (for NVR/DVR only). |

| voice_prompts_index |   | int array | File index (0~4294967295, 0 is None, that is, no audio file is selected). Each file is named as "index_filename" (1_i will try), when displayed on the page , to hide "index_", such as "1_i will try", only display "i will try". |

| voice_prompts_select |   | int array | Play channel, counted by bit (bit0 is local, bit1 corresponds to front-end channel 1, bit2 corresponds to channel 2...). |

| voice_prompts_time |   | object array | Broadcasting time period setting, there can be no time conflict in the 12 time periods, see Table 6 for details. |

| copy_ch | "digit", "analog", "wifi" | string | Support channel copy flag (for NVR and DVR only). |

##### Table 5

| Parameter | Range | Type | Description |

| alarm_type | "AT_MOTION" "AT_PIR" "AT_IO" "AT_PID" "AT_LCD" "AT_SOD" "AT_PD&VD" "AT_FaceAttr" "AT_FD" "AT_CC" "AT_CD" "AT_QD" "AT_LPD" "AT_RSD" "AT_Sound" "AT_VT " | string | Configure the alarm combination type. |

| alarm_source | "IP Camera" "Analog Channels" "Local->1"…"Local->x" |   | string |

| support_ipc_io |   | bool | Whether the IPC channel supports front-end IO. |

##### Table 6

| Parameter | Range | Type | Description |

| start_hour | 0~23 | int | Start time h. |

| start_minute | 0~59 | int | start time m. |

| start_second | 0~59 | int | start time s. |

| end_hour | 0~23 | int | end time h. |

| end_minute | 0~59 | int | end time m. |

| end_second | 0~59 | int | end time s. |

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
                                "Online",
                                "Nonsupport"
                            ]
                        },
                        "enable_alarm": {
                            "type": "string",
                            "items": [
                                "Disable",
                                "Enable"
                            ]
                        },
                        "combination_configure": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 2,
                            "items": [
                                {
                                    "alarm_type": {
                                        "type": "string",
                                        "items": [
                                            "AT_MOTION",
                                            "AT_IO",
                                            "AT_PID",
                                            "AT_LCD",
                                            "AT_SOD",
                                            "AT_PD&VD",
                                            "AT_FR",
                                            "AT_CC",
                                            "AT_CD",
                                            "AT_QD",
                                            "AT_LPD",
                                            "AT_LPR",
                                            "AT_RSD",
                                            "AT_Sound",
                                            "AT_VT",
                                            "AT_Intrusion",
                                            "AT_RegionEntrance",
                                            "AT_RegionExiting"
                                        ]
                                    },
                                    "support_ipc_io": {
                                        "type": "bool"
                                    }
                                }
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
                            "max_size": 17,
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
