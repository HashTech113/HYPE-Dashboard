# Get

## Function

This API is used to get parameter for AI > Setup > Face Detection page.

## Request Message

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

Sample:

POST API/AI/Setup/FD/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Channel Information JSON show as follow Table Table 3 |

| page_type | “ChannelConfig” “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

| channel_max |   | int | Maximum number of channels |

| agreed_to_agreement |   | bool | Whether to agree to the face protocol. |

| statement_file_name |   | string | The displayed face protocol file name. |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| status | "Offline" "Online" “Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera::Local->1:open, null value: close |

| latch_time | "5s","10s","20s","30s" | string | Alarm output time Ipc value 5 10 20 30 |

| record_enable | true, false | bool | Recording channel switching |

| record_channel | “CH1”…”CH1x” “IP_CH1”… ” IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch. |

| post_recording | "OFF","5s","10s","20s","30s" | string | Video delay time Ipc value 0 5 10 20 30 |

| send_email | true, false | bool | Send Email Switch |

| switch | true, false | bool | switch,false: close true: open |

| snap_mode | "RealTimeMode" "OptimalMode" "IntervalMode" | string | Screenshot mode, intervalMode JSON show as follow Table Table 5 |

| apply_mode | "FrontalView" "MultiAngle" "Customize" | string | Customize JSON show as follow Table Table 6 |

| min_pixel | 32-1080 | int | Minimum pixel value |

| max_pixel | 320-1080 | int | Maximum pixel value |

| face_enhance | true, false | bool | Face_enhance switch |

| face_attribute |   | bool | Face_attribute switch |

| detection_mode | "StaticMode" "MotionMode" | string | Detection mode |

| iva_lines | 0 Don't draw a line 1 draw a line | int | Whether there will be a line in the preview and playback |

| rule_info |   | Object | Information JSON show as follow Table Table 7 |

| snap_num | "1" "2" "3" "Unlimited" | string | Number of screenshots |

| snap_frequency |   | int | Screenshot interval, unit s/pic |

| roll_range | 0-180 | int | The following default value fields are only available in Range: "default_value_frontal": frontal default value for mode "default_value_multi":multi default value for mode |

| pitch_range | 0-180 | int | The following default value fields are only available in Range: "default_value_frontal": frontal default value for mode "default_value_multi":multi default value for mode |

| yaw_range | 0-180 | int | The following default value fields are only available in Range: "default_value_frontal": frontal default value for mode "default_value_multi":multi default value for mode |

| picture_quality | 0-100 | int | The following default value fields are only available in Range: "default_value_frontal": frontal default value for mode "default_value_multi":multi default value for mode |

| schedule_enable |   | bool | Schedule mode |

| ptz_operation_support |   | bool | Ball machine use supports ptz operation |

| ftp_picture_upload |   | bool | Supports uploading pictures to ftp |

| picture_to_cloud |   | bool | Supports uploading pictures to cloud storage |

| ftp_video_upload |   | bool | Supports uploading videos to ftp |

| video_to_cloud |   | bool | Supports uploading videos to cloud storage |

| light_linkage |   | bool | White light linkage alarm |

| enforcerlight_linkage |   | bool | Red and blue indicator linkage alarm |

| siren_linkage |   | bool | Alarm sound linkage alarm |

| http_listening |   | bool | http event push |

| schedule |   | Object | The following table is displayed, as shown in the following Table 5 |

| default_timeout | 1-120000 | int | Session timeout(range use) |

#### Table 5

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information is shown in the table Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| day | "Sun" "Mon" "Tue" "Wed" "Thu" "Fri" "Sat" | string | day |

| time |   | int | time |

#### Table 7

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,information JSON show as follow Table Table 8 |

#### Table 8

| Parameter | Range | Type | Description |

| rule_type | "A->B" "B->A" | string | Rule type |

| rule_kind | "Rect" "Line" | string | Rule type |

| detection_range | "FullScreen" "Customize" | string | Examination range |

| rule_rect |   | Object | Rectangle,information JSON show as follow Table table 9 |

| rule_line |   | Object | Draw a line,information JSON show as follow Table table 10 |

| point_num | [min:max] | array | The number of points drawn in the area, minimum 3 points (min), maximum 8 points (max) |

#### Table 9

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 Coordinate points |

| y1 | 0-576 | short | y1 Coordinate points |

| x2 | 0-704 | short | x2 Coordinate points |

| y2 | 0-576 | short | y2 Coordinate points |

| x3 | 0-704 | short | x3 Coordinate points |

| y3 | 0-576 | short | y3 Coordinate points |

| x4 | 0-704 | short | x4 Coordinate points |

| y4 | 0-576 | short | y4 Coordinate points |

| x5 | 0-704 | short | x5 Coordinate points |

| y5 | 0-576 | short | y5 Coordinate points |

| x6 | 0-704 | short | x6 Coordinate points |

| y6 | 0-576 | short | y6 Coordinate points |

| x7 | 0-704 | short | x7 Coordinate points |

| y7 | 0-576 | short | y7 Coordinate points |

| x8 | 0-704 | short | x8 Coordinate points |

| y8 | 0-576 | short | y8 Coordinate points |

#### Table 10

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 Coordinate points |

| y1 | 0-576 | short | y1 Coordinate points |

| x2 | 0-704 | short | x2 Coordinate points |

| y2 | 0-576 | short | y2 Coordinate points |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "switch": false,
        "face_attribute": false,
        "snap_mode": "OptimalMode",
        "snap_num": "1",
        "snap_frequency": 2,
        "apply_mode": "FrontalView",
        "roll_range": 30,
        "pitch_range": 30,
        "yaw_range": 45,
        "picture_quality": 100,
        "min_pixel": 64,
        "max_pixel": 640,
        "detection_mode": "StaticMode",
        "rule_info": {"rule_number1": {
            "detection_range": "FullScreen",
            "rule_kind": "Rect",
            "rule_line": {
                "x1": 322,
                "y1": 30,
                "x2": 322,
                "y2": 545
            },
            "rule_type": "A->B",
            "rule_rect": {
                "x1": 30,
                "y1": 30,
                "x2": 30,
                "y2": 545,
                "x3": 675,
                "y3": 545,
                "x4": 675,
                "y4": 30
            }
        }}
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
