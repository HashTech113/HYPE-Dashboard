# Range

## Function

This API is used to get Thermal > Measurement Rule parameter scale

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device. | string array | IPC can only be used "CH1". |

| page_type | “ChannelConfig” “AlarmConfig” | string | Data used to distinguish between the channel configuration page and the alarm configuration page |

| DeleteId |   | int array | id to be deleted (Currently supported id numbers 1 to 8) |

Sample:

POST /API/Thermal/Setup/MeasurementRules/Range HTTP/1.1

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

| CH1 |   | Json Object | JSON see Table 4 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | description |

| status | "Offline" "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online |

| id_info |   | Json Array | Json see Table 5 |

| id_max |   | int | Maximum id number |

#### Table 5

| Parameter | Range | Type | description |

| alarm_out | “Local->1” ”Local->x” “IP_CH1->1” “IP_CH1->2” ” IP_CHx->1” ” IP_CHx->2”... The number of channels depends on the performance of the device | array | Alarm output channel |

| alarm_rules |   | Json Object | See Alarm rule Json information Table 6 |

| alarm_temp |   | double | Alarm threshold (range varies with temperature units and gain options) （high gain ： {C:-40~200 F: -40~392 K:233.15~473.15} Low gain： { C:-40~600 F: -40~1112 K:233.15~873.15}） |

| duration_time | 0~100 | int | filtration time |

| tolerance_temp | 0~ 5 | double | Tolerance temperature difference |

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

| id_switch | true, false | bool | switch |

| rule_name | 0~127 | string | Rule Name |

| rule_info |   | JSON object | Json see Table 7 |

| emissivity | 0.01~ 1 | double | emissivity |

| target_distance | 0~200 | double | object distance |

| reflective_temp | true, false | double | Reflective Temperature values (range varies with temperature units and gain options) （high gain ： {C:-40~200 F: -40~392 K:233.15~473.15} Low gain: { C:-40~600 F: -40~1112 K:233.15~873.15}） |

| Id | true, false | int | id of the current rule |

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video alarm output channel |

| ftp_picture_upload_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Capture image FTP upload alarm output channel |

| ftp_video_upload_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video FTP upload alarm output channel |

| picture_cloud_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Image upload alarm output channel |

| video_cloud_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video cloud upload alarm output channel |

| schedule |   | JSON array | Schedule see Table 8 |

#### Table 6

| Parameter | Range | Type | description |

| Point | "Above Average Temp" "Below Average Temp" | string | Select the alarm temperature type of a temperature measurement rule whose rule type is Point |

| Line | "Above Max Temp" "Below Max Temp" "Above Min Temp" "Below Min Temp" "Above Average Temp" "Below Average Temp" "Above Temp Diff" "Below Temp Diff" | string | Select the alarm temperature type of the temperature detection rule whose rule type is Line |

| Rect | [1,100] | string | Select the alarm temperature type of the temperature measurement rule whose rule type is Rect |

#### Table 7

| Parameter | Range | Type | description |

| rule_type | "Point" "Line" "Rect" "Area" | string | Rule type |

| rule_point |   | Json Object | Point Json information see Table 9 |

| rule_line |   | Json Object | See Line Json information Table 10 |

| rule_rect |   | Json Object | For rectangular Json information see Table 11 |

| rule_area |   | Json Object | Octagon Json information see Table 12(Do not display if not implemented) |

#### Table 8

| Parameter | Range | Type | description |

| schedule_type | “Record” | string | time schedule：Record，AlarmOut，SendEmail |

| week |   | JSON array | week json see Table 13 |

#### Table 9

| Parameter | Range | Type | description |

| x | -1-704 | int | x coordinates |

| y | -1-576 | int | y coordinates |

#### Table 10

| Parameter | Range | Type | description |

| x1 | 0-704 | int | x1 coordinates |

| y1 | 0-576 | int | y1 coordinates |

| x2 | 0-704 | int | x2 coordinates |

| y2 | 0-576 | int | y2 coordinates |

#### Table 11

| Parameter | Range | Type | description |

| left | 0-704 | int | x coordinates |

| top | 0-576 | int | y coordinates |

| width | 0-704 | int | width |

| height | 0-576 | int | height |

#### Table 12

| Parameter | Range | Type | description |

| x1 | 0-704 | int | x1 coordinates |

| y1 | 0-576 | int | y1 coordinates |

| x2 | 0-704 | int | x2 coordinates |

| y2 | 0-576 | int | y2 coordinates |

| x3 | 0-704 | int | x3 coordinates |

| y3 | 0-576 | int | y3 coordinates |

| x4 | 0-704 | int | x4 coordinates |

| y4 | 0-576 | int | y4 coordinates |

| x5 | 0-704 | int | x5 coordinates |

| y5 | 0-576 | int | y5 coordinates |

| x6 | 0-704 | int | x6 coordinates |

| y6 | 0-576 | int | y6 coordinates |

| x7 | 0-704 | int | x7 coordinates |

| y7 | 0-576 | int | y7 coordinates |

| x8 | 0-704 | int | x8 coordinates |

| y8 | 0-576 | int | y8 coordinates |

#### Table 13

| Parameter | Range | Type | description |

| day | Sun,Mon,Tue,Wed Thu,Fri,Sat | string | Mark the day of the week |

| time | 0: disables the time range 1: enables the time range | array | Each array bit identifies half an hour |

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
                    "id_info": {
                        "type": "array",
                        "min_size": 0,
                        "max_size": 20,
                        "items": [{
                            "id_switch": {
                                "type": "bool",
                                "mode": "r"
                            },
                            "Id": {
                                "type": "int32",
                                "mode": "r",
                                "min": 0,
                                "max": 20,
                                "default_value": 0
                            },
                            "rule_name": {
                                "type": "string",
                                "mode": "r",
                                "min_len": 0,
                                "max_len": 127,
                                "default_value": "1"
                            },
                            "emissivity": {
                                "type": "double",
                                "mode": "r",
                                "min": 0.01,
                                "max": 1,
                                "default_value": 0.96
                            },
                            "target_distance": {
                                "type": "double",
                                "mode": "r",
                                "min": 0,
                                "max": 200,
                                "default_value": 1
                            },
                            "reflective_temp": {
                                "type": "double",
                                "mode": "r",
                                "min": -40,
                                "max": 200,
                                "default_value": 25
                            },
                            "alarm_temp": {
                                "type": "object",
                                "items": {
                                    "Above Max Temp": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": -20,
                                        "max": 150,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Below Max Temp": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": -20,
                                        "max": 150,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Above Min Temp": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": -20,
                                        "max": 150,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Below Min Temp": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": -20,
                                        "max": 150,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Above Average Temp": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": -20,
                                        "max": 150,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Below Average Temp": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": -20,
                                        "max": 150,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Above Temp Diff": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": 1,
                                        "max": 170,
                                        "default_value": 1.0496921113399777e+192
                                    },
                                    "Below Temp Diff": {
                                        "type": "double",
                                        "mode": "r",
                                        "min": 1,
                                        "max": 170,
                                        "default_value": 1.0496921113399777e+192
                                    }
                                }
                            },
                            "alarm_rules": {
                                "type": "object",
                                "items": {
                                    "Point": {
                                        "type": "string",
                                        "items": [
                                            "Above Average Temp",
                                            "Below Average Temp"
                                        ]
                                    },
                                    "Line": {
                                        "type": "string",
                                        "items": [
                                            "Above Max Temp",
                                            "Below Max Temp",
                                            "Above Min Temp",
                                            "Below Min Temp",
                                            "Above Average Temp",
                                            "Below Average Temp",
                                            "Above Temp Diff",
                                            "Below Temp Diff"
                                        ]
                                    },
                                    "Rect": {
                                        "type": "string",
                                        "items": [
                                            "Above Max Temp",
                                            "Below Max Temp",
                                            "Above Min Temp",
                                            "Below Min Temp",
                                            "Above Average Temp",
                                            "Below Average Temp",
                                            "Above Temp Diff",
                                            "Below Temp Diff"
                                        ]
                                    }
                                }
                            },
                            "duration_time": {
                                "type": "int32",
                                "mode": "r",
                                "min": 0,
                                "max": 200,
                                "default_value": 3
                            },
                            "tolerance_temp": {
                                "type": "double",
                                "mode": "r",
                                "min": 0,
                                "max": 5,
                                "default_value": 3
                            },
                            "rule_info": {
                                "type": "object",
                                "items": {
                                    "rule_type": {
                                        "type": "string",
                                        "mode": "r",
                                        "items": [
                                            "Point",
                                            "Line",
                                            "Rect"
                                        ],
                                        "default_value": "Point"
                                    },
                                    "rule_point": {
                                        "type": "object",
                                        "items": {
                                            "x": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": -1,
                                                "max": 704,
                                                "default_value": -1
                                            },
                                            "y": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": -1,
                                                "max": 576,
                                                "default_value": -1
                                            }
                                        }
                                    },
                                    "rule_line": {
                                        "type": "object",
                                        "items": {
                                            "x1": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 704,
                                                "default_value": 0
                                            },
                                            "y1": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 576,
                                                "default_value": 0
                                            },
                                            "x2": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 704,
                                                "default_value": 0
                                            },
                                            "y2": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 576,
                                                "default_value": 0
                                            }
                                        }
                                    },
                                    "rule_rect": {
                                        "type": "object",
                                        "items": {
                                            "left": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 704,
                                                "default_value": 0
                                            },
                                            "top": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 576,
                                                "default_value": 0
                                            },
                                            "width": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 704,
                                                "default_value": 0
                                            },
                                            "height": {
                                                "type": "int32",
                                                "mode": "r",
                                                "min": 0,
                                                "max": 576,
                                                "default_value": 0
                                            }
                                        }
                                    }
                                }
                            }
                        }]
                    }
                }
            }}
        }
    }
}

## Error Code

See Response message body and general error_code for more information.
