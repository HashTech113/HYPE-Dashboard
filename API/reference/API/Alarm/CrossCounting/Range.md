# Range

## Function

This API is used to get the Alarm > Cross Counting configuration parameter range.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channels supported by the device. | string array | IPC can only Use "CH1". |

| page_type | "ChannelConfig", "AlarmConfig" | string | It is used to distinguish the data of channel configuration page or alarm configuration page. |

Sample:

POST /API/AlarmConfig/Intelligent/CC/Range HTTP/1.1

{
    "version":"1.0",
    "data":{
        "page_type":"AlarmConfig"
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information see Table 3. |

| channel_max |   | int | The maximum number of channels. |

| support_copy |   | bool | Whether to support copy. |

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

| status | "Offline","Online","Nonsupport" | string | Online status of the channel, only for digital channels. Note: When the channel is online, there is no such field. |

| alarm_out | "Local->1"…"Local->x" "IP_CH1->1"…"IP_CHx->x" The number of channels depends on the function of the device. | string array | alarm Output channel. Array members use a string to represent an alarm output channel. Local->1: open, empty value: close. |

| latch_time | "10","20","40","60" | string array | Alarm output time, IPC: 5 10 20 30 |

| record_enable | true, false | bool | Channel recording switch. |

| record_channel | "CH1"…"CHx" "IP_CH1"…"IP_CHx" "WIFI_CH1"…"WIFI_CHx" | string array | Channel of linkage recording. |

| post_recording | "30","60","120","300" | string | Recording delay time, IPC: 0 5 10 20 30. |

| send_email | true, false | bool | Send Email switch. |

| ftp_picture_upload | true, false | bool | Channel snapshot FTP upload switch (for NVR only). |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch (for NVR only). |

| picture_to_cloud | true, false | bool | Picture upload switch (for NVR only). |

| video_to_cloud | true, false | bool | Video cloud upload switch (for NVR only). |

| full_screen |   | bool | FullScreen switch (for NVR only). |

| http_listening |   | bool | Push switch. |

| buzzer | "0","10","20","40","60" | string | Buzzer buzzing time (for NVR only). |

| show_message |   | bool | Show Message switch (for NVR only). |

| switch | true, false | bool |   |

| sensitivity | 1-4 | int | Detection sensitivity. |

| iva_lines | 0,1 | int | Whether there will be lines in preview and playback, 0 does not draw lines, 1 draws lines. |

| voice_prompts |   | int | Alarm sound (only for NVR). |

| rule_info |   | object | See Table 5 for details. |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, 0 means None, that is, no audio file is selected). Each file is named as "index_filename" (1_i will try), on the page When displaying, "index_" should be hidden, such as "1_i will try", and only "i will try" will be displayed. |

| voice_prompts_select | size: 0-12 | int array | Playing channel, calculated by bit (bit0 is local, bit1 corresponds to front channel 1, bit2 corresponds to channel 2...). |

| voice_prompts_time | size: 0-12 | object array | time period. |

| copy_ch | "digit", "analog", "wifi" | string | Support channel copy flag (for NVR and DVR only). |

| is_ai_param |   | bool | Distinguish between ordinary CC and intelligent CC, true: intelligent CC, false: ordinary CC. |

| detection_type | "Motion","Person","Vehicle" | string | detection type. |

| alarm_num |   | 1-255 | Number of alarms. |

| start_time | string length: 8 | string | start time. |

| end_time | string length: 8 | string | end time. |

| reset_count |   | bool | Reset warning count. |

| schedule_enable |   | bool | Scheduled start. |

| ptz_operation_support |   | bool | ptz control support. |

##### Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | object | rule number 1, see Table 6. |

##### Table 6

| Parameter | Range | Type | Description |

| rule_switch |   | bool | rule switch. |

| rule_type | "Normal","A->B","B->A" | string | rule type. |

| rule_line |   | object | Strike a line, see Table 7. |

| rule_rect |   | object | Rectangle, see Table 8. |

##### Table 7

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate point. |

| y1 | 0-576 | short | y1 coordinate point. |

| x2 | 0-704 | short | x2 coordinate point. |

| y2 | 0-576 | short | y2 coordinate point. |

##### Table 8

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate point. |

| y1 | 0-576 | short | y1 coordinate point. |

| x2 | 0-704 | short | x2 coordinate point. |

| y2 | 0-576 | short | y2 coordinate point. |

| x3 | 0-704 | short | x3 coordinate point. |

| y3 | 0-576 | short | y3 coordinate point. |

| x4 | 0-704 | short | x4 coordinate point. |

| y4 | 0-576 | short | y4 coordinate point. |

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
                                "Notsupport"
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
                                    "Local->1"
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
