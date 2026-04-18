# Get

## Function

This API is used to get parameter for AI > Setup > Stationary Object Detection page.

## Request Message

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

Sample:

POST API/AI/Setup/SOD/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Channel Information JSON show as follow Table Table 3 |

| page_type | “ChannelConfig”, “AarmConfig” | string | It is used to distinguish whether it is the data of the channel configuration page or the alarm configuration page, it is only required when setting |

| channel_max |   | int | Maximum number of channels |

| support_copy |   | bool | Whether the page supports copy(for NVR and DVR only) |

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

| status | "Offline", "Online", “Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera:Local->1: open, empty value: close |

| latch_time | "10","20","40","60" | string | Alarm output time |

| record_enable | true, false | bool | Record channel switch |

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch. |

| post_recording | "30","60","120","300" | string | Video delay time |

| send_email | true, false | bool | Send Email switch |

| ftp_picture_upload | true, false | bool | Channel capture FTP upload switch (NVR dedicated) |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch (NVR dedicated) |

| picture_to_cloud | true, false | bool | Picture upload switch (NVR dedicated) |

| video_to_cloud | true, false | bool | Video cloud upload switch (NVR dedicated) |

| full_screen |   | bool | FullScreen switch(NVR dedicated) |

| buzzer | "0","10","20","40","60" | string | Buzzer sounding time (NVR dedicated) |

| show_message |   | bool | Show Message switch(NVR dedicated) |

| switch | true, false | bool | switch,false: close，true: open |

| sensitivity | 1-4、0-100 | int | Detection sensitivity |

| snap_mode | "Default" "RealTimeMode" "IntervalMode" | string | Screenshot mode,IntervalMode JSON show as follow TableTable 5 |

| min_pixel | 64-1080 | int | Minimum pixel value |

| max_pixel | 320-1080 | int | Maximum pixel value |

| detection_type | "Pedestrian" "Vehicle" "Pedestrian &Vehicle" | string | Detection type, human shape and vehicle shape |

| detection_mode | "StaticMode" "MotionMode" | string | Detection mode |

| detection_range | "FullScreen" "Customize" | string | Examination range |

| rule_info |   | JSON array | Single Channel Information JSON show as follow Table Table 5 |

| iva_lines | 0:does not draw a line 1:draws a line | int | Whether there will be a line in the preview and playback |

| copy_ch | "digit""analog""wifi" | string | Flags to support channel duplication(for NVR and DVR only) |

| schedule_enable |   | bool | Schedule mode |

| ptz_operation_support |   | bool | (Ball machine use)Supports the ptz operation |

| scene | Indoor Outdoor | string | scene |

| light_linkage |   | bool | White light linkage alarm |

| enforcerlight_linkage |   | bool | Red and blue indicator linkage alarm |

| siren_linkage |   | bool | Alarm sound linkage alarm |

| http_listening |   | bool | http event push |

| schedule |   | Object | The schedule is displayed as followsTable 8 |

#### Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,Information JSON show as follow Table Table 6 |

| rule_number2 |   | Object | Rule number 2,Information JSON show as follow Table Table 6 |

| rule_number3 |   | Object | Rule number 3,Information JSON show as follow Table Table 6 |

| rule_number4 |   | Object | Rule number 4,Information JSON show as follow Table Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| rule_rect |   | Object | Each channel has a maximum of 64 point coordinates, that is, 32 lines. If it is an accompanying line, only the first line is used. If it is a perimeter, these 8 lines are connected in turn to form a closed figure. Information JSON show as follow Table Table 7 |

| rule_switch |   | bool | Rule switch |

| rule_type | “Legacy” “Lost” “Lost&Legacy” | string | Rule type |

#### Table 7

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate points |

| y1 | 0-576 | short | y1 coordinate points |

| x2 | 0-704 | short | x2 coordinate points |

| y2 | 0-576 | short | y2 coordinate points |

| x3 | 0-704 | short | x3 coordinate points |

| y3 | 0-576 | short | y3 coordinate points |

| x4 | 0-704 | short | x4 coordinate points |

| y4 | 0-576 | short | y4 coordinate points |

#### Table 8

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information such as Table 9 |

#### Table 9

| Parameter | Range | Type | Description |

| day | "Sun" "Mon" "Tue" "Wed" "Thu" "Fri" "Sat" | string | day |

| time |   | int | time |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "switch": false,
        "sensitivity": 3,
        "rule_info": {
            "rule_number1": {
                "rule_switch": false,
                "rule_type": "Legacy",
                "rule_rect": {
                    "x1": 231,
                    "y1": 176,
                    "x2": 182,
                    "y2": 501,
                    "x3": 423,
                    "y3": 460,
                    "x4": 419,
                    "y4": 207
                }
            },
            "rule_number2": {
                "rule_switch": false,
                "rule_type": "Legacy",
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0,
                    "x3": 0,
                    "y3": 0,
                    "x4": 0,
                    "y4": 0
                }
            },
            "rule_number3": {
                "rule_switch": false,
                "rule_type": "Legacy",
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0,
                    "x3": 0,
                    "y3": 0,
                    "x4": 0,
                    "y4": 0
                }
            },
            "rule_number4": {
                "rule_switch": false,
                "rule_type": "Legacy",
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0,
                    "x3": 0,
                    "y3": 0,
                    "x4": 0,
                    "y4": 0
                }
            }
        }
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
