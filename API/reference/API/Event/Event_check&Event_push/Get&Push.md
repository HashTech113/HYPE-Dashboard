# Get

## Function

This API is used to get parameter for Event > event check page.

## Request Message

### Event_push

POST: Request message see table 1

GET: Request message see table 20

### Event_check

#### Table 1

| Parameter | Range | Type | Description |

| reader_id |   | unsigned int | Optional, when not input, the board checks all alarm information and outputs readerID |

| sequence |   | unsigned int | Optional, when not input, the board checks all alarm information and outputs readerID |

| lap_number |   | unsigned int | Optional, when not input, the board checks all alarm information and outputs readerID |

| plus_eventchk | "eventAiPushPic" | string | Must bring, subscription required |

| ext_data |   | Json array | Subscription method needs to be taken, carry the type of client needs to subscribe, see table 1.1 |

| subscribe_id |   | unsigned int | Current reader index |

| data_pos |   | unsigned int | Index of current reader read events |

table 1.1

| Parameter | Range | Type | Description |

| subscribe_type |   | Json Array | Subscription Type For the type of subscription required by the client, see table 1.2 |

| unsubscribe_type |   | Json Array | Unsubscribed types Do not include certain types in already subscribed types, see table 1.2 |

| snap_resolution | "640x480" "1280x720" "no_snapshot" | string | Optional event carry picture resolution，no_snapshot: Without chart |

table 1.2

| Parameter | Range | Type | Description |

| event | "all" "motion" "io" "videoloss" "videohide" "int" "sound_dectet" | Json Array | Ordinary event type |

| aipushpic | "all" | Json array | Intelligent tweet type |

Sample:

POST /API/Event/Check
HTTP/1.1

{
    version": "1.0",
    "data": {
        "plus_eventchk": "eventAiPushPic",
        "ext_data": {
                        "subscribe_type": [{"event": ["all"]}]
                        },
        "reader_id": 1,
        "sequence": 9595,
        "lap_number": null
    }
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| reader_id |   | int | Optional, when the request has no readerID, create a readerID and return it. |

| sequence |   | int | Current latest sequence position |

| lap_number |   | unsigned int | The number of laps the current sequence position belongs to |

| subscribe_record_sign |   | bool | Optional, the default is to subscribe to the recording flag .If the field passes true or does not pass this field, it means to subscribe to the recording flag, and if the field passes false, it means not to subscribe to the recording flag |

| subscribe_intelligence |   | bool | Optional, subscribe to smart alarm events by default.If the field passes true or does not pass this field, it means subscription, and if the field passes false, it means not to subscribe to the smart alarm event |

| alarm_list |   | Json array | Single alarm show as table |

| log_collect |   | Json Object | Optional. When the log collection NVR mode is enabled, you can push log messages table 23 |

| heat_alarm | "HeatAlarm" | string | Optional, when there is no alarm_list, output heartbeat alarm message |

| videoloss_status |   | bool | Dynamically display the video loss logo |

| alarm_snap_data |   | Json array | For the image data carried by the event (event push is not supported by udp), see table 15 |

| ai_snap_picture |   | Json object | Intelligent map data, see table 16 |

| ccCount |   | Json array | Cc count statistics, see table 17 |

| hmlist |   | json array | Heat map statistics, see table 18 |

| device_name |   | string | devicename |

| dev_net_info |   | Json array | Device information, see table 19 |

| system_alarm |   | Json array | Device alarm see table 3(optional) |

| channel_alarm |   | Json array | Single channel alarm see table 21(optional) |

| time |   | string | "MM/DD/YYYYhh:mm:ss" |

#### Table 3

| Parameter | Range | Type | Description |

| device_name | Max_length:31 | string | Equipment name (optional) |

| hdd |   | json | See Table 4 (optional) |

#### Table 4

| Parameter | Range | Type | Description |

| hdd_alarm_type | "Ok","Error" | string | Hard disk alarm type |

| hdd_alarm_info | "Full" "Bad" "Unformat" "Readonly" "Warning" "NoDisk" | string | Hard disk error warning information |

#### Table 5

| Parameter | Range | Type | Description |

| channel |   | string |   |

| motion_alarm |   | bool | (optional) |

| record_flag |   | json | Video logo (optional) See Table 6 |

| camera_connect_status |   | json | (optional)Table 7 |

| io_alarm |   | bool | (optional) |

| pir_alarm |   | bool | (optional) |

| channel_name |   | string | (optional) |

| Floodlight_AudioAlarm |   | json | (optional)Table 8 |

| ptz_alarm |   | json | (optional) Table 9 |

| videoloss |   | bool | (optional) |

| int_alarm |   | Json Object | (optional)Table 10 |

| alarm_state |   | Json array | (optional)Table 10 |

| motion_smart_alarm |   | Json Object | Table 13 |

| alarm_out_state |   | Json Array | (NVR/DVR) See Table 14 |

| wireless_ipc_type |   | int | (wireless dedicated)Wireless IPC power supply type, battery 1, long-term power supply 2 |

| remote_pair_state | Max_length:20 | string | (wireless dedicated)Report the result of remote matching Pair success:paired successfully Pair fail:Pairing failed Timeout:time out Pair is not supported:pairing not supported |

| take_alarm_snap |   | unsigned int | Carry the id corresponding to the picture |

| chn_alias |   | string | For channel |

#### Table 6

| Parameter | Range | Type | Description |

| m | "R""G" | string | Motion Alarm "R":Alarm recording status "G":Alarm without recording state |

| i | "R""G" | string | IO Alarm "R":Alarm recording status "G":Alarm without recording state |

| p | "R""G" | string | PIR Alarm "R":Alarm recording status "G":Alarm without recording state |

| s | "R""G" | string | Intelligent Alarm "R":Alarm recording status "G":Alarm without recording state |

| r | "SR""MR" | string | Recording "SR":Alarm recording status,"MR":On-board manual recording status |

| h | "R" | string | SDcardAlarm "R":Hard disk alarm |

| c | "R""G" | string | VideoTampering "R":Alarm recording status "G":Alarm without recording state |

#### Table 7

| Parameter | Range | Type | Description |

| connect_status | "NotConfigured" "Online" "Offline" "Sleep" "NotPaired" | string | Channel connection status |

| ability | "Fisheye" "Binoculars" "Ptz" "NewPtz"（NVR/DVR Need not） "HkPtz" "Iris" "Mainstream" "Substream" "Mobilestream" "FloodLight" "AudioAlarm" "AlarmOutNum" "TalkHalf" "TalkFull" "Color" "RedBlueLight" "NotAutoReconnect" "Pir" "Cover" | string array |   |

| protocol | Max length: 15byte | string | IPC access protocol |

| input_num |   |   | Alarm input |

| output_num |   |   | Alarm Output |

| intelligent_ability | "CrossCount" "HeatMap" "SOD" "LCD" "PVD" "FD" "PID" "CrowdDensity" "LPD" "RSD" "QD" "AttributeDetect" "Intrusion" "RegionEntrance" "RegionExiting" "FireDetection" "TempMeas" |   |   |

#### Table 8

| Parameter | Range | Type | Description |

| floodlight_switch | true false | bool | White light real-time switch,false: close true: open |

| flood_light_value | 1 - 100 | int | Brightness of white light |

| floodlight_value_range | 1 - 100 | Object | White light brightness range |

| audioAlarm_switch | true false | bool | Horn real-time switch false: close true: open |

| audioAlarm_value | 1 - 10 | int | Speaker volume |

| audioAlarm_value_range | 1 - 10 | Object | Speaker volume range |

#### Table 9

| Parameter | Range | Type | Description |

| cur_zoom_value |   | int | Current position of zoom (temporarily unused) |

| zoom_step | 0 - 2 | int | 0:1 step 1:5 Step 2:20 Step (temporarily unused) |

| cur_focus_value |   | int | Focus Current location (temporarily unused) |

| focus_step | 0 - 2 | int | 0:1 Step 1:5 Step 2:20 Step (temporarily unused) |

| auto_focus_state |   | int | 0:Focus ends,1:Focusing (temporarily unused) |

| shift_range |   | int | (temporarily unused) |

| ptz_cruise_state |   | bool | Preset point cruise state |

| ptz_line_scan_state |   | bool | Line scan cruise state |

#### Table 10

| Parameter | Range | Type | Description |

| alarm_val | true|false | bool |   |

| int_subtype | video_tampersod lcd pid pd fd sound avd pd_vd cc cd qd lpd rsd ad intrusion region_entrance region_exiting fireDetect measure | string | "video_tamper":Video tampering alarm "sod":SOD object lost legacy "lcd":LCD cable alarm "pid":PID perimeter alarm "pd":PD human body "fd":FD face "sound":Sound alarm "avd":avd alarm "pd_vd":pd_vd alarm "cc":cc alarm "cd":Crowd Density Detection "qd":Queue length detection "lpd":license plate detection "rsd":Abnormal sound detection "ad":Face attribute "fireDetect"：flame detection "measure"：temperature measurement |

#### Table 11

| Error Code | Description |

| readerID_invalid |   |

| position_invalid |   |

#### Table 12

| Parameter | Range | Type | Description |

| channel | 1 - 127 | int | Intercom channel number |

| talkback_close | true|false | bool | Whether to close the intercom |

| error_code | "localuser_operating_cannot_talkback" "localuser_close_talkback" | string | Intercom off reason localuser_operating_cannot_talkback:The user is in the setting interface localuser_close_talkback:User turns off intercom |

#### Table 13

| Parameter | Range | Type | Description |

| MDtime |   | string | "MM/DD/YYYYhh:mm:ss" |

| MDState |   | string array |   |

#### Table 14

| Parameter | Range | Type | Description |

| Local->1 |   | bool | Local->1 channel alarm switch |

| …… |   |   | …… |

| Local->x |   | bool | Local->x channel alarm switch |

| IP_CH1->1 |   | bool | IP_CH1->1 channel alarm switch |

| …… |   |   | …… |

| IP_CHx->x |   | bool | IP_CHx->x channel alarm switch |

#### Table 15

| Parameter | Range | Type | Description |

| chnnel |   | string | devicename |

| chn_alias |   | string | eventpush carry |

| img_id |   | int | The id that the picture carries |

| img_encode |   | string | Picture coding format |

| img_format |   | string | picture format |

| img_data |   | string | Picture data |

#### Table 16

| Parameter | Range | Type | Description |

| Chn |   | int | devicename |

| strChn |   | string | devicename |

| Chn_alias |   | string | carry |

| StartTime |   | unsigned int | Picture coding format |

| EndTime |   | unsigned int | Picture end time |

| SnapId |   | int | Picture id |

| Type |   | int | Image type |

| ImageAllInfo |   | base64 | 智能推图除图片外的全部信息 |

| ObjectImage |   | base64 | Alarm graph |

| backGround |   | base64 | background-image |

#### Table 17

| Parameter | Range | Type | Description |

| channel |   | string | devicename |

| chn_alais |   | string | eventpush carry |

| cc_type |   | int | type |

| cc_objNum |   | int | cc alarm count |

| cc_version |   | int | version |

| ccin_num |   | int | cc entry quantity |

| ccout_num |   | int | cc outgoing quantity |

| cc_in_sum_num |   | int | cc enters total number |

| cc_out_sun_num |   | int | cc out total quantity |

#### Table 18

| Parameter | Range | Type | Description |

| channel |   | string | devicename |

| chn_alais |   | string | eventpush carry |

| hm_type |   | int | type |

| map_num |   | int | number of alarm |

| hm_version |   | int | version number |

| hm_width |   | int | Thermogram width |

| hm_height |   | int | Heat map height |

| map_lens |   | int | length |

| hm_datatype |   | int | type of data |

| hm_objNum |   | int | Thermogram quantity |

| hm_img |   | string | Heat map image data |

#### Table 19

| Parameter | Range | Type | Description |

| phy |   | string | the Ethernet card |

| ip |   | string | IP address |

| mac |   | string | mac address |

| ChnnelName |   | string | The name of the page setting |

## eventpush is pushed by GET

### URL

GET {user defined in  Event > Http_listening}?EventType=xx&EventTime=xx&EventAction=xx&MACAddress=xx
 见 table 20

#### Table 20

| Parameter | Range | Type | Description |

| EventType | "VideoMotion" "VideoBlind" "SoundDetect" "SOD" "LCD " "PID " "PD_VD" "FD" "CC" "AD" "CD" "QD" "LPD" "RSD" | string | IPC alarm type |

| EventTime |   | string | Alarm trigger time |

| EventAction | "start" "stop" | string | Alarm status of IPC |

| MACAddress |   | string | MAC address of IPC ，like D094662C1A8D |

#### Table 21

| Parameter | Range | Type | Description |

| channel |   | string | devicename |

| motion_report |   | json object | For the motion alarm parameters, see table 22 |

#### Table 22

| Parameter | Range | Type | Description |

| alarm_state |   | bool | Report the motion alarm status to the remote. (Optional) true: start false: end |

| alarm_type | smd | string | Alarm type |

#### Table 23

| Parameter | Range | Type | Description |

| dir_name |   | string | Name of the log storage directory |

| file_name |   | string | Log file name |

Sample1:

user defined url: /API/AlarmEvent/EventPush

GET /API/AlarmEvent/EventPush?EventType=VideoMotion&EventTime=2022-5-26 11:5:0&EventAction=start&MACAddress=5C-F2-07-49-0F-24 HTTP/1.1
Host: 172.16.8.63:123
Accept: */*
Content-Type: application/json;charset=UTF-8

Sample2:

POST /API/Event/Check?2020-10-17%2014:21:33 HTTP/1.1
Content-Type: application/json; charset=UTF-8
Accept: application/json, text/javascript, */*; q=0.01
X-csrftoken: 14559384d58d55d9d80bf4baf048684f366c77905d665d99ba1bde2cdcf81b08
Content-Length: 2438
Cookie: session=cc3ec99c6f1295489c86f8842e1dd719c194c637af5b965a23932c41188a3acc
{
version": "1.0",
    "data": {
        "plus_eventchk": "eventAiPushPic",
        "ext_data": {"subscribe_type": [{"event": ["all"]}]},
        "reader_id": 1,
        "sequence": 9595,
        "lap_number": null
    }
}

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 2976
{
    "result": "success",
    "data": {
        "alarm_list": [{
            "time": "2023-08-25T08:38:58Z+08:00",
            "system_alarm": [{
                "device_name": "RS-CH281M8ND-DF-WA2812PW",
                "hdd": {
                    "hdd_alarm_type": "Error",
                    "hdd_alarm_info": "NoDisk"
                }
            }],
            "channel_alarm": [{
                "channel": "CH1",
                "record_flag": {"h": "R"}
            }]
        }],
        "log_collect": {
             "dir_name":"2023_07_04",
             "file_name": "20230704_211532_ch1.log.tar.gz"
         },
        "reader_id": 1,
        "sequence": 9596
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
