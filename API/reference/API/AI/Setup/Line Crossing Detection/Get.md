# Get

## Function

This API is used to get parameter for AI > Setup > Line Crossing Detection page.

## Request Message

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

Sample:

POST API/AI/Setup/LCD/Get HTTP/1.1

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

| status | "Offline","Online"，“Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera: Local->1:open, null value: close |

| latch_time | "10","20","40","60" | string | Alarm output time |

| record_enable | true, false | bool | Recording channel switching |

| record_channel | “CH1”…”CH1x” “IP_CH1”… “IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch. |

| post_recording | "30","60","120","300" | string | Video delay time |

| send_email | true, false | bool | Send email switch |

| ftp_picture_upload | true, false | bool | Channel capture FTP upload switch(NVR dedicated) |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch(NVR dedicated) |

| picture_to_cloud | true, false | bool | Picture upload switch(NVR dedicated) |

| video_to_cloud | true, false | bool | Video cloud upload switch(NVR dedicated) |

| full_screen |   | bool | FullScreen switch(NVR dedicated) |

| buzzer | "0","10","20","40","60" | string | Buzzer sounding time(NVR dedicated) |

| show_message |   | bool | Show message switch(NVR dedicated) |

| switch | true, false | bool | switch,false: close true: open |

| sensitivity | 1-4 | int | Detection sensitivity |

| sensitivity_ex | 1-100 | int | Optimized detection sensitivity |

| target_validity | 1-4 | int | Confidence |

| min_pixel | 64-1080 | int | Minimum pixel value |

| max_pixel | 320-1080 | int | Maximum pixel value |

| detection_type | "Motion" "Pedestrian" "Vehicle" "Pedestrian &Vehicle" | string | Detection type, human shape and vehicle shape (normal detection type) |

| detection_type | “Pedestrian” "Motor Vehicle" "Non-motorized Vehicle" | array | Detection type, human figure, motor vehicle, non-motor vehicle (machine is not human type) (ipc intelligent second generation dedicated) |

| iva_lines | 0:no line 1:draw a line | int | Whether there will be a line in the preview and playback (ipc smart second generation only) |

| rule_info |   | JSON object | Single Channel Information JSON show as follow Tabl Table 5 |

| schedule_list | 0-8 | json array | (Consumer NVR docking IPC POE package only) Arming schedule data,show as Table Table 8 . |

| mutual_exclusion | "PVD" | json array | The collection of mutex functions that have been enabled at present. Note: If there is a mutex function that is already enabled, it will be brought when Get. If it is not enabled or there is no mutual exclusion, it is not necessary to pass this field |

| schedule_enable |   | bool | Schedule mode |

| ptz_operation_support |   | bool | (Ball machine use)Supports the ptz operation |

| scene | Indoor，Outdoor | string | scene |

| light_linkage |   | bool | White light linkage alarm |

| tracking_link |   | bool | Tracking linkage switch(Ball machine use) |

| enforcerlight_linkage |   | bool | Red and blue indicator linkage alarm |

| siren_linkage |   | bool | Alarm sound linkage alarm |

| http_listening |   | bool | http event push |

| schedule |   | Object | The schedule is displayed as followsTable 10 |

| default_timeout | 1-120000 | int | Session timeout (range usage) |

#### Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,Information JSON show as follow Table Table 6 |

| rule_number2 |   | Object | Rule number 1,Information JSON show as follow Table Table 6 |

| rule_number3 |   | Object | Rule number 1,Information JSON show as follow Table Table 6 |

| rule_number4 |   | Object | Rule number 1,Information JSON show as follow Table Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| rule_switch |   | bool | Rule switch |

| rule_type | "A->B", "B->A", "A<-->B" | string | Rule direction |

| rule_line |   | Object | Each channel has a maximum of 64 point coordinates, that is, 32 lines. If it is an accompanying line, only the first line is used. If it is a perimeter, these 8 lines are connected in sequence to form a closed figure.Information JSON show as follow Table Table 7 |

#### Table 7

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 Coordinate points |

| y1 | 0-576 | short | y1 Coordinate points |

| x2 | 0-704 | short | x2 Coordinate points |

| y2 | 0-576 | short | y2 Coordinate points |

#### Table 8

| Parameter | Range | Type | Description |

| cloud_video_is_used | 0~MAX_PARA_CHN_NUM | array | The channel number for which the cloud video upload function has been enabled |

| max_cloud_video_upload_num | MAX_CLOUD_VIDEO_RECORD_NUM | int | The maximum number of channels supported by cloud video upload |

#### Table 9

| Parameter | Range | Type | Description |

| enable | true, false | bool | Is the current schedule in effect |

| start_time | 0 – 1439(23*60+59) | int | Schedule start time (minutes relative to 00:00) |

| end_time | 0 – 1439(23*60+59) | int | Schedule end time (minutes relative to 00:00) |

| weekday | "Sunday" "Monday" "Tuesday" "Wednesday" "Thursday" "Friday" "Saturday" | array | Indicates the day of the week when the current schedule takes effect, multiple choices are allowed |

#### Table 10

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information such as Table 11 |

#### Table 11

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
        "switch": true,
        "sensitivity": 2,
        "detection_type": [],
        "rule_info": {
            "rule_number1": {
                "rule_switch": true,
                "rule_type": "A<-->B",
                "rule_line": {
                    "x1": 406,
                    "y1": 165,
                    "x2": 396,
                    "y2": 482
                }
            },
            "rule_number2": {
                "rule_switch": true,
                "rule_type": "A<-->B",
                "rule_line": {
                    "x1": 263,
                    "y1": 171,
                    "x2": 254,
                    "y2": 483
                }
            },
            "rule_number3": {
                "rule_switch": false,
                "rule_type": "A->B",
                "rule_line": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0
                }
            },
            "rule_number4": {
                "rule_switch": false,
                "rule_type": "A->B",
                "rule_line": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0
                }
            }
        }
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
