# Range

## Function

This API is used for get Thermal > Fire Detection parameter scale

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device | string array | IPC can only use "CH1". |

| page_type | “ChannelConfig” “AlarmConfig” | string | Data used to distinguish between the channel configuration page and the alarm configuration page |

| DeleteId |   | int array | id to be deleted (Currently supported id numbers 1 to 8) |

Sample:

POST /API/Thermal/Setup/FireDetection/Range HTTP/1.1

{
    "version": "1.0",
    "data":{
        "page_type":"ChannelConfig"
        }

}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | description |

| channel_info |   | Json Object | Channel information see Table 3 |

| page_type | "ChannelConfig", "AlarmConfig" | string | The data used to distinguish between the channel configuration page and the alarm configuration page is only needed when setting. |

| channel_max |   | int | Total number of channels on the device |

#### Table 3

| Parameter | Range | Type | description |

| CH1 |   | Json Object | JSON See Table 4 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | description |

| status | "Offline" "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online |

| detection |   | Json Object | Json For information see Table 5 |

| region_shield |   | Json Object | Json For information see Table 6 |

| alarm_out | “Local->1” ”Local->x” “IP_CH1->1” “IP_CH1->2” ” IP_CHx->1” ” IP_CHx->2”... The number of channels depends on the performance of the device | array | Alarm output channel |

| latch_time | "5s","10s","20s","30s" | string | Alarm output time Ipc value 5 10 20 30 |

| record_enable |   | bool | Supports channel video switch |

| post_recording | "OFF","5s","10s","20s","30s" | string | Video delay time Ipc value 0 5 10 20 30 |

| send_email | true, false | bool | Send Email switch |

| ftp_picture_upload | true, false | bool | FTP upload switch of channel capture |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch |

| picture_to_cloud | true, false | bool | Picture upload switch |

| video_to_cloud | true, false | bool | Video cloud upload switch |

| light_linkage | true, false | bool | Linkage switch of the white light. When motion is triggered, the linkage triggers the white light |

| enforcerlight_linkage | true, false | bool | Red and blue light alarm switch |

| siren_linkage | true, false | bool | siren alarm switch |

| http_listening | true, false | bool | Push switch |

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video alarm output channel |

| ftp_picture_upload_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Capture image FTP upload alarm output channel |

| ftp_video_upload_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video FTP upload alarm output channel |

| picture_cloud_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Image upload alarm output channel |

| video_cloud_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video cloud upload alarm output channel |

| schedule |   | JSON array | Schedule see Table 7 |

#### Table 5

| Parameter | Range | Type | description |

| switch | true false | bool | function switch |

| sensitivity | [1,100] | int | sensitivity |

#### Table 6

| Parameter | Range | Type | description |

| region_area_info |   | Json array | Json see Table 8 |

#### Table 7

| Parameter | Range | Type | description |

| schedule_type | “Record” | string | time schedule：Record，AlarmOut，SendEmail |

| week |   | JSON array | week json see Table 9 |

#### Table 8

| Parameter | Range | Type | description |

| id_switch | true false | bool | Zone function switch |

| area_id | [0,8] | int | id of the current area |

| area_name |   | string | Editable box, default name is Fire Mark with serial number |

| point_num | [min,max] | array | The number of points drawn in the area is a minimum of 3 points and a maximum of 8 points |

| rule_area |   | Json Object | Json see Table 10 |

#### Table 9

| Parameter | Range | Type | description |

| day | Sun,Mon,Tue,Wed Thu,Fri,Sat | string | Mark the day of the week |

| time | 0: disables the time range 1: enables the time range | array | Each array bit identifies half an hour |

#### Table 10

| Parameter | Range | Type | description |

| x1 | [0,704] | int | x1 coordinate point |

| y1 | [0,576] | int | y1 coordinate point |

| x2 | [0,704] | int | x2 coordinate point |

| y2 | [0,576] | int | y2 coordinate point |

| x3 | [0,704] | int | x3 coordinate point |

| y3 | [0,576] | int | y3 coordinate point |

| x4 | [0,704] | int | x4 coordinate point |

| y4 | [0,576] | int | y4 coordinate point |

| x5 | [0,704] | int | x5 coordinate point |

| y5 | [0,576] | int | y5 coordinate point |

| x6 | [0,704] | int | x6 coordinate point |

| y6 | [0,576] | int | y6 coordinate point |

| x7 | [0,704] | int | x7 coordinate point |

| y7 | [0,576] | int | y7 coordinate point |

| x8 | [0,704] | int | x8 coordinate point |

| y8 | [0,576] | int | y8 coordinate point |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "channel_info": {
            "type": "object",
            "items": {"CH2": {
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
                    "detection": {
                        "type": "object",
                        "items": {
                            "switch": {"type": "bool"},
                            "sensitivity": {
                                "type": "int32",
                                "min": 1,
                                "max": 100
                            }
                        }
                    },
                    "region_shield": {
                        "type": "object",
                        "items": {"region_area_info": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 8,
                            "items": [{
                                "id_switch": {
                                    "type": "bool",
                                    "mode": "r"
                                },
                                "area_id": {
                                    "type": "int32",
                                    "mode": "r",
                                    "min": 0,
                                    "max": 8,
                                    "default_value": 0
                                },
                                "area_name": {
                                    "type": "string",
                                    "mode": "r",
                                    "min_len": 1,
                                    "max_len": 127,
                                    "default_value": "Fire Mark1"
                                },
                                "point_num": {
                                    "type": "array",
                                    "size": 2,
                                    "items": []
                                },
                                "rule_area": {
                                    "type": "object",
                                    "items": {
                                        "x1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x3": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x4": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x5": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x6": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x7": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x8": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y3": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y4": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y5": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y6": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y7": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y8": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        }
                                    }
                                }
                            }]
                        }}
                    }
                }
            }}
        }
    }
}

## Error Code

See Response message body and general error_code for more information.
