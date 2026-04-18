# Range

## Function

This API is used to get parameter range for AI > Setup > Queue Lenght Detection  page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capability of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need. IPC only uses CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | Data used to distinguish between the channel configuration page and the alarm configuration page |

Sample:

POST /API/AI/Setup/QD/Range HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Single Channel Information JSON show as follow Table x |

| page_type | “ChannelConfig”, “AarmConfig” | string | The data used to distinguish between the channel configuration page and the alarm configuration page is only needed when setting |

| channel_max |   | int | Maximum number of channels |

#### Table x

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as followTable 3 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | Description |

| status | "Offline","Online"， “Nonsupport” | string | Channel online status, only for digital channels. Note:This field does not exist when the channel is online |

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capability of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera: Local->1:open，NULL:close |

| latch_time | "10","20","40", "60" | string | Alarm output time |

| record_enable | ture,false | bool | Recording channel switch |

| post_recording | "30","60","120", "300" | string | Video delay time |

| send_email | true, false | bool | Outgoing mail switch |

| ftp_picture_upload | true, false | bool | Send mail switch Channel Capture FTP Upload switch (dedicated to NVR) |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch (NVR special) |

| picture_to_cloud | true, false | bool | Image upload switch (NVR only) |

| light_linkage | true, false | bool | Alarm linkage switch |

| switch | true, false | bool | switch，false: close true: open |

| sensitivity | 1-4 | int | Detection sensitivity |

| min_pixel | 64-1080 | int | Minimum pixel value |

| max_pixel | 320-1080 | int | Maximum pixel value |

| max_detection_num | 1-100 | int | Number of detecters alarm threshold |

| max_pro_time | 1-3600 | int | Single processing time alarm threshold |

| detection_range | "FullScreen" "Customize" | string | detection range /0: full-screen mode, 1: custom mode/ |

| iva_lines | 0 not draw lines 1 draw lines | int | Preview and play back whether lines will appear |

| rule_info |   | Object | Information JSON show as followTable 4 |

| schedule_enable |   | bool | schedule mode |

| ptz_operation_support |   | bool | (Ball machine use)Supports the ptz operation |

| video_to_cloud |   | bool | Upload video to cloud storage |

| enforcerlight_linkage |   | bool | Red and blue indicator linkage alarm |

| siren_linkage |   | bool | Alarm sound linkage alarm |

| http_listening |   | bool | http event push |

| schedule |   | Object | The schedule is displayed as followsTable 7 |

| default_timeout | 1-120000 | int | Session timeout (range usage) |

#### Table 4

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,Information JSON show as followTable 5 |

| rule_number2 |   | Object | Rule number 2,Information JSON show as followTable 5 |

| rule_number3 |   | Object | Rule number 3,Information JSON show as followTable 5 |

| rule_number4 |   | Object | Rule number 4,Information JSON show as followTable 5 |

#### Table 5

| Parameter | Range | Type | Description |

| rule_switch | true, false | bool | /* One byte per channel represents up to 4 rules, 0- off, 1- Use */ (IPC Smart Generation only) |

| rule_rect |   | Object | octagon,Information JSON show as followTable 6 |

#### Table 6

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate point |

| y1 | 0-576 | short | y1 coordinate point |

| x2 | 0-704 | short | x2 coordinate point |

| y2 | 0-576 | short | y2 coordinate point |

| x3 | 0-704 | short | x3 coordinate point |

| y3 | 0-576 | short | y3 coordinate point |

| x4 | 0-704 | short | x4 coordinate point |

| y4 | 0-576 | short | y4 coordinate point |

| x5 | 0-704 | short | x5 coordinate point |

| y5 | 0-576 | short | y5 coordinate point |

| x6 | 0-704 | short | x6 coordinate point |

| y6 | 0-576 | short | y6 coordinate point |

| x7 | 0-704 | short | x7 coordinate point |

| y7 | 0-576 | short | y7 coordinate point |

| x8 | 0-704 | short | x8 coordinate point |

| y8 | 0-576 | short | y8 coordinate point |

#### Table 7

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information such as Table 8 |

#### Table 8

| Parameter | Range | Type | Description |

| day | "Sun" "Mon" "Tue" "Wed" "Thu" "Fri" "Sat" | string | day |

| time |   | int | time |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "channel_info": {
            "type": "object",
            "items": {"CH1": {
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
                    "switch": {"type": "bool"},
                    "sensitivity": {
                        "type": "int32",
                        "items": [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    "min_pixel": {
                        "type": "int32",
                        "mode": "r",
                        "min": 32,
                        "max": 1080,
                        "default_value": 32
                    },
                    "max_pixel": {
                        "type": "int32",
                        "mode": "r",
                        "min": 320,
                        "max": 1080,
                        "default_value": 640
                    },
                    "max_detection_num": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 100,
                        "default_value": 10
                    },
                    "max_pro_time": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 3600,
                        "default_value": 60
                    },
                    "detection_range": {
                        "type": "string",
                        "items": [
                            "FullScreen",
                            "Customize"
                        ]
                    },
                    "rule_info": {
                        "type": "object",
                        "items": {"rule_number1": {
                            "type": "object",
                            "items": {
                                "rule_switch": {"type": "bool"},
                                "rule_rect": {
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
                            }
                        }}
                    }
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
