# Get

## Function

This API is used to get parameter for AI > Setup > Cross Counting page.

## Request Message

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

Sample:

POST API/AI/Setup/CrossCount/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Single Channel Information JSON show as follow Table Table 3 |

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

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents alarm output channel with a string. Camera: Local->1:open,empty value: close |

| latch_time | "10","20","40","60" | string | Alarm output time Ipc value 5 10 20 30 |

| record_enable | true, false | bool | Record channel switch |

| record_channel | “CH1”…”CH1x” “IP_CH1”… “IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch. |

| post_recording | "30","60","120","300" | string | Video delay time, Ipc value 0 5 10 20 30 |

| send_email | true, false | bool | Send Email switch |

| ftp_picture_upload | true, false | bool | Channel capture FTP upload switch (NVR dedicated) |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch (NVR dedicated) |

| picture_to_cloud | true, false | bool | Picture upload switch (NVR dedicated) |

| video_to_cloud | true, false | bool | Video cloud upload switch (NVR dedicated) |

| full_screen |   | bool | FullScreen switch (NVR dedicated) |

| buzzer | "0","10","20","40","60" | string | Buzzer sounding time (NVR dedicated) |

| show_message |   | bool | Show Message switch (NVR dedicated) |

| switch | true, false | bool | Switch, false: close true: open |

| type | "Motion" "Person" "Vehicle" | string | Rule type:0-motion 1- Person 2 veichle (Normal detection type) |

| "Motion" “Pedestrian” "Motor Vehicle" "Non-motorized Vehicle" | string | Detection type, human figure, motor vehicle, non-motor vehicle (machine is not human type) |

| detection_type | “Pedestrian” "Motor Vehicle" "Non-motorized Vehicle" | array | Detection type, human figure, motor vehicle, non-motor vehicle (machine is not human type) |

| alarm_num | 1 - 255 | int | The number of alarms, if the number exceeds the number, an alarm will be issued |

| start_time |   | string | Effective start time |

| end_time |   | string | Effective end time |

| reset_count | true, false | bool | true:clear the analysis data of passing line statistics |

| sensitivity | 1-4 | int | Detection sensitivity |

| rule_info |   | Object | Information JSON show as follow TableTable 5 |

| ptz_operation_support |   | bool | Ball machine use supports ptz operation |

| schedule_enable |   | bool | Schedule mode |

| iva_lines | 0unlined1cross | int | Preview and play back whether lines will appear |

| light_linkage |   | bool | White light linkage alarm |

| enforcerlight_linkage |   | bool | Red and blue indicator linkage alarm |

| siren_linkage |   | bool | Alarm sound linkage alarm |

| http_listening |   | bool | http event push |

| default_timeout |   | bool | Session timeout(range use) |

| schedule |   | Object | The following table is displayed, as shown in the following Table 10 |

| scene | Indoor、Outdoor | string | scene |

#### Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,information JSON show as follow Table Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| rule_switch |   | bool | Rule switch |

| rule_type | "A->B", "B->A" | string | Rule direction |

| rule_line |   | Object | Rectangle,information JSON show as follow Table Table 7 |

| rule_rect |   | Object | Rectangle,information JSON show as follow Table Table 8 |

#### Table 7

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate points |

| y1 | 0-576 | short | y1 coordinate points |

| x2 | 0-704 | short | x2 coordinate points |

| y2 | 0-576 | short | y2 coordinate points |

#### Table 8

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate points(x-coordinate of the left vertex) |

| y1 | 0-576 | short | y1 coordinate points(y-coordinate of the left vertex) |

| x2 | 0-704 | short | x2 coordinate points(x-coordinate of the right vertex) |

| y2 | 0-576 | short | y2 coordinate points(y-coordinate of the right vertex) |

| X3 | 0-704 | short | X3 coordinate points(x-axis coordinate of the left bottom point) |

| Y3 | 0-576 | short | Y3 coordinate points(x-axis coordinate of the left bottom point) |

| X4 | 0-704 | short | X4 coordinate points(x-axis coordinate of the right bottom point) |

| Y4 | 0-576 | short | Y4 coordinate points(x-axis coordinate of the right bottom point) |

#### Table 9

| Parameter | Range | Type | Description |

| cloud_video_is_used | 0~MAX_PARA_CHN_NUM | array | The channel number for which the cloud video upload function has been enabled |

| max_cloud_video_upload_num | MAX_CLOUD_VIDEO_RECORD_NUM | int | The maximum number of channels supported by cloud video upload |

#### Table 10

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information is shown in the table Table 11 |

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
        "switch": false,
        "sensitivity": 2,
        "alarm_num": 1,
        "type": "Pedestrian",
        "reset_count": false,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "rule_info": {"rule_number1": {
            "rule_type": "A->B",
            "rule_switch": false,
            "rule_line": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0
            },
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
        }}
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
