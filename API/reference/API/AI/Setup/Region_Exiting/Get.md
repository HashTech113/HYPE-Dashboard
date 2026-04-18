# Get

## Function

This API is used to get AI > Setup > Region Exiting configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | String array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

Sample:

POST /API/AI/Setup/RegionExiting/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel": [
            "CH1"
        ],
        "page_type": "ChannelConfig"
    }
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Channel Information JSON show as follow Table 3 |

| page_type | “ChannelConfig”, “AarmConfig” | string | It is used to distinguish whether it is the data of the channel configuration page or the alarm configuration page, it is only required when Set |

| channel_max |   | int | Maximum number of channels |

Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

Table 4

| Parameter | Range | Type | Description |

| status | "Offline","Online"， “Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera: Local->1: open, null value: close |

| latch_time | "10","20","40","60" | string | Alarm output time |

| record_enable | true, false | bool | Recording channel switching |

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch. |

| post_recording | "30","60","120","300" | string | Video delay time |

| send_email | true, false | bool | Send Email switch |

| ftp_picture_upload | true, false | bool | Channel capture FTP upload switch (for NVR only) |

| ftp_video_upload | true, false | bool | Channel recording FTP upload switch (for NVR only) |

| picture_to_cloud | true, false | bool | Picture upload switch (for NVR only) |

| video_to_cloud | true, false | bool | Video cloud upload switch (for NVR only) |

| full_screen |   | bool | FullScreen switch (for NVR only) |

| buzzer | "0","10","20","40","60" | string | Buzzer sounding time (for NVR only) |

| show_message |   | bool | Show Message switch (for NVR only) |

| switch | true, false | bool | PID enable switch, false: close true: open |

| detection_type | "Motion" "Pedestrian" "Vehicle" "Pedestrian &Vehicle" | string | Detection type, human shape and vehicle shape (normal detection type) |

| detection_type | “Pedestrian” "Motor Vehicle" "Non-motorized Vehicle" | array | Detection type, human figure, motor vehicle, non-motor vehicle (machine is not human type) |

| sensitivity | 1-100 | int | Detection sensitivity |

| target_validity | 1-4 | int | Target validity |

| min_pixel | 64-1080 | int | Minimum pixel value |

| max_pixel | 320-1080 | int | Maximum pixel value |

| rule_info |   | JSON object | Single-channel information JSON is as follows Table 5 |

| point_num | [min:max] | array | The number of points drawn in the area, minimum 3 points (min), maximum 8 points (max) |

Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1, the information JSON is displayed as follows Table 6 |

| rule_number2 |   | Object | Rule number 2, the information JSON is displayed as follows Table 6 |

| rule_number3 |   | Object | Rule number 3, the information JSON is displayed as follows Table 6 |

| rule_number4 |   | Object | Rule number 4, the information JSON is displayed as follows Table 6 |

Table 6

| Parameter | Range | Type | Description |

| rule_switch |   | bool | rule switch |

| rule_rect |   | Object | Rectangle, the information JSON is as follows Table 7 |

| point_num | [min:max] | array | The number of points drawn in the area, minimum 3 points (min), maximum 8 points (max) |

Table 7

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

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "status": "Online",
                "switch": false,
                "sensitivity": 50,
                "iva_lines": true,
                "detection_type": [],
                "target_validity": 3,
                "max_pixel": 640,
                "min_pixel": 64,
                "rule_info": {
                    "rule_number1": {
                        "rule_switch": false,
                        "point_num": [
                            3,
                            8
                        ],
                        "rule_rect": {
                            "x1": 0,
                            "y1": 0,
                            "x2": 0,
                            "y2": 0,
                            "x3": 0,
                            "y3": 0,
                            "x4": 0,
                            "y4": 0,
                            "x5": 0,
                            "y5": 0,
                            "x6": 0,
                            "y6": 0,
                            "x7": 0,
                            "y7": 0,
                            "x8": 0,
                            "y8": 0
                        }
                    },
                    "rule_number2": {
                        "rule_switch": false,
                        "point_num": [
                            3,
                            8
                        ],
                        "rule_rect": {
                            "x1": 0,
                            "y1": 0,
                            "x2": 0,
                            "y2": 0,
                            "x3": 0,
                            "y3": 0,
                            "x4": 0,
                            "y4": 0,
                            "x5": 0,
                            "y5": 0,
                            "x6": 0,
                            "y6": 0,
                            "x7": 0,
                            "y7": 0,
                            "x8": 0,
                            "y8": 0
                        }
                    },
                    "rule_number3": {
                        "rule_switch": false,
                        "point_num": [
                            3,
                            8
                        ],
                        "rule_rect": {
                            "x1": 0,
                            "y1": 0,
                            "x2": 0,
                            "y2": 0,
                            "x3": 0,
                            "y3": 0,
                            "x4": 0,
                            "y4": 0,
                            "x5": 0,
                            "y5": 0,
                            "x6": 0,
                            "y6": 0,
                            "x7": 0,
                            "y7": 0,
                            "x8": 0,
                            "y8": 0
                        }
                    },
                    "rule_number4": {
                        "rule_switch": false,
                        "point_num": [
                            3,
                            8
                        ],
                        "rule_rect": {
                            "x1": 0,
                            "y1": 0,
                            "x2": 0,
                            "y2": 0,
                            "x3": 0,
                            "y3": 0,
                            "x4": 0,
                            "y4": 0,
                            "x5": 0,
                            "y5": 0,
                            "x6": 0,
                            "y6": 0,
                            "x7": 0,
                            "y7": 0,
                            "x8": 0,
                            "y8": 0
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
