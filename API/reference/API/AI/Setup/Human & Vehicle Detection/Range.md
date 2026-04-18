# Range

## Function

This API is used to get parameter range for AI > Setup > Human & Vehicle Detection  page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capability of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need. IPC only uses CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | Data used to distinguish between the channel configuration page and the alarm configuration page |

Sample:

POST /API/AI/Setup/PVD/Range HTTP/1.1

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

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch |

| post_recording | "30","60","120", "300" | string | Video delay time |

| send_email | true, false | bool | Outgoing mail switch |

| ftp_picture_upload | true, false | bool | Send mail switch Channel Capture FTP Upload switch (dedicated to NVR) |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch (NVR special) |

| picture_to_cloud | true, false | bool | Image upload switch (NVR only) |

| video_to_cloud | true, false | bool | Video Cloud Upload Switch (NVR special) |

| full_screen |   | bool | FullScreen Switch (NVR only) |

| buzzer | "0","10","20","40", "60" | string | Buzzer time (NVR only) |

| show_message | true, false | bool | Display information switch |

| switch | true, false | bool | switch，false: close true: open |

| sensitivity | 0-100 | int | Detection sensitivity (IPC Smart 2) |

| sensitivity | "Low","Medium","High" | string | Detection sensitivity (IPC Smart Generation) |

| snap_mode | "Default" "RealTimeMode" "IntervalMode" | string | Screenshot mode， IntervalMode JSON show as followTable 4 |

| min_pixel | 64-1080 | int | Minimum pixel value |

| max_pixel | 320-1080 | int | Maximum pixel value |

| detection_type | "Off" "Pedestrian" "Vehicle" "Pedestrian &Vehicle" | string | Detection type, Humanoid and car shape (normal detection type) |

| detection_type | “Pedestrian” "Motor Vehicle" "Non-motorized Vehicle" | array | Detection type, humanoid, motor vehicle, non-motor vehicle (machine non-human) |

| iva_lines | 0 not draw lines 1 draw lines | int | Preview and play back whether lines will appear |

| rule_info |   | Object | Information JSON show as followTable 5 |

| schedule_list | 0-8 | json array | (Consumer NVR interconnection IPC POE package) defense planning table data,show as followTable 9 |

| mutual_exclusion | "Intrusion" "Region Entrance" "Region Exiting" "LCD" | json array | The set of mutually exclusive functions currently enabled,Note: If there is a mutual exclusion function that is already enabled, it is included in the Get. If it is not enabled or there is no mutual exclusion, it is not necessary to pass this field |

| schedule_enable |   | bool | 计划表模式 |

| ptz_operation_support |   | bool | (球机使用)支持ptz操作 |

| detection_mode | StaticMode，MotionMode | string | 检测模式 |

| scene | Indoor，Outdoor | string | 场景 |

| light_linkage |   | bool | 白光联动告警 |

| tracking_link |   | bool | 追踪联动开关(球机使用) |

| enforcerlight_linkage |   | bool | 红蓝灯联动告警 |

| siren_linkage |   | bool | 警戒声联动告警 |

| http_listening |   | bool | http事件推送 |

| schedule |   | Object | 计划表显示如表Table 10 |

| default_timeout | 1-120000 | int | 会话超时(range使用) |

#### Table 4

| Parameter | Range | Type | Description |

| snap_num | "1" "2" "3" "Unlimited" | string | Screenshot count |

| snap_frequency |   | int | Screenshot interval, unit s/pic |

#### Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,Information JSON show as followTable 6 |

#### Table 6

| Parameter | Range | Type | Description |

| detection_range | "FullScreen" "Customize" | string | detection range |

| rule_switch | true, false | bool | /* One byte per channel represents up to 4 rules, 0- off, 1- Use */ (IPC Smart Generation only) |

| rule_type | "Normal" | string | /* One byte per channel for up to 4 rules, 0- off, 1- Use / (IPC Smart Generation Only) / One byte per channel for up to 4 - Rule type, 0- Regular mode, 1- Guest Mode/Other mode */ (IPC Smart Generation only) |

| rule_rect |   | Object | rectangle,Information JSON show as followTable 7 |

| point_num | [min:max] | array | Number of points drawn in the area, minimum 3 points (min), maximum 8 points (max) |

#### Table 7

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

#### Table 8

| Parameter | Range | Type | Description |

| cloud_video_is_used | 0~MAX_PARA_CHN_NUM | array | Id of the channel where the cloud video upload function is enabled |

| max_cloud_video_upload_num | MAX_CLOUD_VIDEO_RECORD_NUM | int | The maximum number of channels supported for cloud video uploading |

#### Table 9

| Parameter | Range | Type | Description |

| enable | true, false | bool | Whether the current schedule takes effect |

| start_time | 0 – 1439(23*60+59) | int | Schedule start time (minutes relative to 00:00) |

| end_time | 0 – 1439(23*60+59) | int | Schedule end time (minutes relative to 00:00) |

| weekday | "Sunday" "Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" | array | Indicates the day of a week when the current schedule takes effect. You can select multiple days |

#### Table 10

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information is shown in the Table 11 |

#### Table 11

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
                        "mode": "r",
                        "min": 1,
                        "max": 100,
                        "default_value": 60
                    },
                    "snap_mode": {
                        "type": "string",
                        "items": [
                            "Default",
                            "RealTimeMode",
                            "IntervalMode"
                        ]
                    },
                    "snap_num": {
                        "type": "string",
                        "items": [
                            "1",
                            "2",
                            "3",
                            "Unlimited"
                        ]
                    },
                    "snap_frequency": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 255,
                        "default_value": 2
                    },
                    "max_pixel": {
                        "type": "int32",
                        "mode": "r",
                        "min": 320,
                        "max": 1080,
                        "default_value": 320
                    },
                    "min_pixel": {
                        "type": "int32",
                        "mode": "r",
                        "min": 64,
                        "max": 1080,
                        "default_value": 64
                    },
                    "detection_mode": {
                        "type": "string",
                        "items": [
                            "StaticMode",
                            "MotionMode"
                        ]
                    },
                    "detection_type": {
                        "type": "array",
                        "min_size": 0,
                        "max_size": 3,
                        "items": {
                            "type": "string",
                            "items": [
                                "Pedestrian",
                                "Motor Vehicle",
                                "Non-motorized Vehicle"
                            ]
                        }
                    },
                    "rule_info": {
                        "type": "object",
                        "items": {"rule_number1": {
                            "type": "object",
                            "items": {
                                "detection_range": {
                                    "description": "Only rule_rect has this variable.",
                                    "type": "string",
                                    "mode": "r",
                                    "items": [
                                        "FullScreen",
                                        "Customize"
                                    ]
                                },
                                "rule_rect": {
                                    "type": "object",
                                    "items": {
                                        "x1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "x2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "x3": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y3": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "x4": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y4": {
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
