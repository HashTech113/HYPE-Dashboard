# Subscribe to api Design

## 1.Expound

After setting the parameters of the current IPC through the WEB, the backend NVR/APP still displays unmodified parameters. In order to achieve real-time updates of backend parameters, subscription APIs are adopted. Subscription API, the backend will inform the frontend of the API used for pages that require real-time parameter updates. If the frontend sets a parameter that matches the subscription content page, it will inform the backend to obtain the parameter for that page.

## 2.Subscription Content (Scalable)

##### Table 1

| Module | API Interface | Interface Description | Remarks |

| record | StreamConfig/MainStream/Range(Get) | Main stream page parameter acquisition |   |

| record | StreamConfig/SubStream/Range(Get) | sub stream page parameter acquisition |   |

| record | StreamConfig/MobileStream/Range(Get) | Mobiles stream page parameter acquisition |   |

| record | StreamConfig/EventStream/Range(Get) | Event stream page parameter acquisition |   |

| record | DeviceConfig/Audio/Range(Get) | Audio page parameter acquisition |   |

| ... | .. |   |   |

## 3.Interaction

{width="5.768055555555556in"
height="5.174305555555556in"}

When IPC goes online to NVR, NVR calls Login/DeviceInfo/Get, and IPC responds with all subscription APIs currently supported by IPC. The NVR calls Login/SubscribeApi/Set, and its request body is accompanied by the required subscription API or all subscription strings. If the IPC responds OK, it indicates successful subscription. If IPC parameter settings occur, subscribed APIs will be pushed to the backend from/API/Event/Check, and the backend will request the API to obtain parameter data.

## 4.Protocol formulation

### 1. Login/DeviceInfo/Get

#### Response message

##### Table 2

| Parameter | Range | Type | Description |

| support_subscribe_api | "AlarmConfig/Deterrence/Range" "AlarmConfig/Deterrence/Get" "StreamConfig/MainStream/Range" "StreamConfig/MainStream/Get" "StreamConfig/SubStream/Range" "StreamConfig/SubStream/Get" "StreamConfig/MobileStream/Range" "StreamConfig/MobileStream/Get" "DeviceConfig/Audio/Range" "DeviceConfig/Audio/Get" | string array | Currently supported API for subscription |

| device_main_menu | "localSetting" "remoteSetting" "playback" "preview" | string array | Control the ability set displayed on the upper right side of the preview |

| encode_type_ability | "H.264" "H.265" "H.264+" "H.265+" | string array | Supported encoding types |

| concentrate_linkage_schedule_ability | "FloodLight" | string array | Centralized linkage scheduling capability |

| ptz_ability |   | Json Object | Parameters can be found in Table 3 |

| support_ai_pidlcd |   | Json Object | Does it support the perimeter and trip lines of AI |

| support_face_config |   | bool | Face search in the playback interface Playback - AI - Face Detection |

| support_repeat_visitor |   | bool | Does it support the function of returning customers |

| support_face_attendance |   | bool | Whether to support the face attendance function |

| support_human_vehicle_search |   | bool | Whether the pedestrian and vehicle search function is supported |

| support_PidLcd_search |   | bool | Whether the Pid Lcd search function is supported |

| support_heat_map |   | bool | Whether the heat map function is supported |

| support_license_plate |   | bool | Whether the license plate recognition function is supported |

| support_lpd_enhance |   | bool | Whether the enhanced license plate detection function is supported |

| support_Intrusion_search |   | bool | Whether the intrusion detection function is supported |

| support_RegionEntrance_search |   | bool | Whether to support the area entry search function |

| support_RegionExiting_search |   | bool | Whether the enhanced license plate detection function is supported |

| device_preview_AI_item | "FR" "Human" "Vehicle" "Non-Vehicle" "PID_Human" "PID_Vehicle" "PID_Non-Vehicle" "LCD_Human" "LCD_Vehicle" "LCD_Non-Vehicle" "LPR" "Intrusion_Human" "Intrusion_Vehicle" "Intrusion_Non-Vehicle" "RegionEntrance_Human" "RegionEntrance_Vehicle" "RegionEntrance_Non-Vehicle" "RegionExiting_Human" "RegionExiting_Vehicle" "RegionExiting_Non-Vehicle" | string array | After the new version, this field value is used for sidebar push chart, playback intelligent search, database statistics interface type display judgment |

| support_occlusion_detection |   | bool | Whether the occlusion detection function is supported |

| device_preview_ability | "face" "manual_alarm" | string array | Control the capability set displayed on the preview side |

| dev_play_backcap |   | int | 0: old playback mode, 1: fast forward fast rewind only I-frame mode, 2: fast forward fast rewind I-frame mode |

| dev_type |   | unsigned long long | Device type |

| device_type | maxlength:32byte | string | Equipment model |

| sound |   | bool | Preview whether the page displays the horn switch |

| live_sound_disable |   | Json Object | Whether to make preview sound parameters see Table 4 |

| check_ftp_upgrade |   | bool | Check whether the FTP upgrade is required |

| support_screen_shots |   | bool | Whether to support screenshots |

| channel_num |   | int | Number of channels |

| stream_profile |   | Json Object | Support for several stream switching parameters see Table 5 |

| default_stream | “Mainstream” “Substream” | string | IE Default stream type |

| support_ftp_upgrade |   | bool | Whether to support ftp upgrade |

| support_http_upgrade |   | bool | Whether to support http upgrade |

| support_get_upgradeUrlpw |   | bool | Whether to obtain the ftp upgrade URL password |

| backup_video_encryption_pwd | 6-32 | bool | Backup video encryption |

| support_backup_video_encryption |   | bool | Whether video backup is supported |

| push_type | "TutkPush" "VVPush" “RSPush”"Baidu" | string | Push type |

| pushinfo_type | “Motion”“Io” “Videoloss””Pir” | string array |   |

| local_alarmin_num |   | int | Board end alarm input |

| local_alarmout_num |   | int | Board end alarm output |

| support_ie_down_snap |   | bool | Whether to support Internet Explorer download board capture |

| preview_num |   | int | Number of previewing channels for the main stream |

| mac_addr |   | string | mac address |

| p2p_id |   | bool | P2P ID |

| manufacturer | maxlength:35byte | string | Device type |

| support_smart |   | bool | Support intelligence |

| support_smart_record |   | bool | Whether intelligent video recording is supported |

| support_substream_playback |   | bool | Whether substream playback is supported |

| support_pir_record |   | bool | Whether to support pir recording |

| support_flood_light |   | bool | Whether white light is supported |

| support_record_tag |   | bool | Whether video labels are supported |

| support_aac |   | bool | Whether AAC audio format is supported |

| support_hls_server |   | bool | Whether single-channel HLS streams are supported |

| support_voice_prompts |   | bool | Whether voice prompt is supported |

| support_speaker |   | bool | Whether to support intercom |

| talkback | “TalkHalf”,“TalkFull” | string | Intercom working mode |

| support_audio_volume |   | bool | Whether to support volume adjustment |

| support_sound_record |   | bool | sound alarm Display flag bits: 0 hidden and 1 displayed |

| support_manual_record |   | bool | Whether to support manual video search |

| support_video_cover_record |   | bool | Whether to display the video occlusion alarm video |

| support_more_chn_playback |   | bool | Whether multiple playback is supported on the Internet Explorer playback page |

| support_ai_notification_subscribe |   | bool | Whether to support ai notification subscription |

| ishide_notification_intervalnew_8.2.4 |   | bool | Whether to hide the push interval switch |

| support_playback_new_rec_detail |   | bool | Support NewRecordDetailRsp (New_GetRecFileList) search |

| support_playback_new_rec_file_download |   | bool | Support NewRecordDetailRsp (New_GetRecFileList) video download, lock query and lock settings for video files |

| support_io_record |   | bool | Whether to support the total number of IO alarms on the front and rear end to determine whether the program with IO alarms |

| support_ANR |   | bool |   |

| enable_encryption |   | bool | Private protocol encryption |

| media_port |   | int | Media port |

| media_external_port |   | int | Media external interface |

| upgrade_file_max_size | 0-512 | int | Maximum size of the upgrade file on the board, in MB |

| upgrade_head_trans_size | 0-3 | int | The value is the length of the update header information on the board. The unit is k |

| support_eventchk_snap |   | bool | Whether to support event capture |

| local_ip |   | string |   |

| stream_linkage | "normal""none""custom2" | string | Code parameter Indicates the rate linkage rule. If none is passed, bitrate_default is not required. custom2-- URMET Customer |

| FR_model_version | 0- 2147483647 | int |   |

| FD_model_version | 0- 2147483647 | int |   |

| support_param_import_export |   | bool | Whether parameter import is supported |

| support_sound_detection |   | bool | Whether sound detection is supported |

| support_ROI |   | bool |   |

| support_record_type_ex |   | bool | Replay the video and add |

| support_disarming_onlyset |   | bool | Whether the disarming function is supported, but it can only be set to IPC by a third party and cannot be gotten |

| support_recorder_smd |   | bool |   |

| support_logcollection |   | bool |   |

| certificate_remain_time | 0-16 | int | Certificate retention time |

| is_need_ftpurl |   | bool | Determine whether the NVR requires a url with a plaintext password |

| support_camera_day_night_param |   | bool | The NVR supports two sets of IPC day and night parameters |

| support_box485 |   | bool | 485 The nvr does not support the analog mode |

| support_shortlive_acctoken |   | bool | Whether short tokens are supported |

##### Table 3

| Parameter | Range | Type | Description |

| ptz_version | "1.0" "2.0" "3.0" | string | Ptz version |

| iris_minus_add |   | bool |   |

| quick_use | "Ptz_QuickUse_3DPosition" "Ptz_QuickUse_AutoFocus" "Ptz_QuickUse_PtzReset" "Ptz_QuickUse_LensReset" "Ptz_QuickUse_WatchMode" "Ptz_QuickUse_ManualHumanTrace" | string array |   |

##### Table 4

| Parameter | Range | Type | Description |

| Mainstream |   | bool |   |

| Substream |   | bool |   |

| Mobilestream |   | bool |   |

##### Table 5

| Parameter | Range | Type | Description |

| "items" | "Mainstream" "Substream" "Mobilestream" | string |   |

#### Request message

Sample:

POST /API/AlarmConfig/Combination/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

#### Response message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

"data": {
        "device_main_menu": [
            "localSetting",
            "remoteSetting",
            "playback",
            "preview"
        ],
        "encode_type_ability": [
            "H.264",
            "H.265",
            "H.264+",
            "H.265+"
        ],
        "concentrate_linkage_schedule_ability": ["FloodLight"],
        "ptz_ability": {"btn_autofocus": true},
        "support_subscribe_api": [
            "AlarmConfig/Deterrence/Range",
            "AlarmConfig/Deterrence/Get",
            "StreamConfig/MainStream/Range",
            "StreamConfig/MainStream/Get",
            "StreamConfig/SubStream/Range",
            "StreamConfig/SubStream/Get",
            "StreamConfig/MobileStream/Range",
            "StreamConfig/MobileStream/Get",
            "DeviceConfig/Audio/Range",
            "DeviceConfig/Audio/Get"
        ],
        "support_ai_pidlcd": true,
        "support_face_config": true,
        "support_repeat_visitor": true,
        "support_face_attendance": true,
        "support_human_vehicle_search": true,
        "support_PidLcd_search": true,
        "support_heat_map": true,
        "support_license_plate": true,
        "support_lpd_enhance": true,
        "support_Intrusion_search": true,
        "support_RegionEntrance_search": true,
        "support_RegionExiting_search": true,
        "device_preview_AI_item": [
            "FR",
            "Human",
            "Vehicle",
            "Non-Vehicle",
            "PID_Human",
            "PID_Vehicle",
            "PID_Non-Vehicle",
            "LCD_Human",
            "LCD_Vehicle",
            "LCD_Non-Vehicle",
            "LPR",
            "Intrusion_Human",
            "Intrusion_Vehicle",
            "Intrusion_Non-Vehicle",
            "RegionEntrance_Human",
            "RegionEntrance_Vehicle",
            "RegionEntrance_Non-Vehicle",
            "RegionExiting_Human",
            "RegionExiting_Vehicle",
            "RegionExiting_Non-Vehicle"
        ],
        "support_occlusion_detection": true,
        "device_preview_ability": [
            "face",
            "manual_alarm"
        ],
        "dev_play_backcap": 2,
        "dev_type": 5932089557994242000,
        "device_type": "30KQ+200AI 60FPS ä½ä¼",
        "sound": true,
        "live_sound_disable": {
            "Mainstream": false,
            "Substream": false,
            "Mobilestream": false
        },
        "check_ftp_upgrade": false,
        "support_screen_shots": true,
        "channel_num": 1,
        "stream_profile": {
            "type": "string",
            "items": [
                "Mainstream",
                "Substream",
                "Mobilestream"
            ]
        },
        "default_stream": "Mainstream",
        "support_ftp_upgrade": true,
        "support_http_upgrade": true,
        "support_get_upgradeUrlpw": true,
        "backup_video_encryption_pwd": {
            "type": "string",
            "min_len": 6,
            "max_len": 32
        },
        "support_backup_video_encryption": true,
        "push_type": "RSPush",
        "pushinfo_type": {
            "type": "string",
            "items": []
        },
        "local_alarmin_num": 1,
        "local_alarmout_num": 1,
        "support_ie_down_snap": true,
        "preview_num": 0,
        "mac_addr": "A4-FC-CE-00-14-BE",
        "p2p_id": "DBC4S1NLRUXNHKWL111A",
        "manufacturer": "",
        "support_smart": true,
        "support_smart_record": true,
        "support_substream_playback": false,
        "support_pir_record": false,
        "support_flood_light": true,
        "support_record_tag": true,
        "support_aac": false,
        "support_hls_server": false,
        "support_voice_prompts": true,
        "support_speaker": true,
        "talkback": "TalkFull",
        "support_audio_volume": true,
        "support_sound_record": false,
        "support_manual_record": false,
        "support_video_cover_record": false,
        "support_more_chn_playback": false,
        "support_ai_notification_subscribe": true,
        "ishide_notification_intervalnew_8.2.4": false,
        "support_playback_new_rec_detail": true,
        "support_playback_new_rec_file_download": true,
        "support_io_record": true,
        "support_ANR": true,
        "enable_encryption": true,
        "media_port": 443,
        "media_external_port": 443,
        "upgrade_file_max_size": 128,
        "upgrade_head_trans_size": 3,
        "support_eventchk_snap": true,
        "local_ip": "192.168.1.11",
        "stream_linkage": "normal",
        "FR_model_version": 8388612,
        "FD_model_version": 8456194,
        "support_param_import_export": true,
        "support_sound_detection": true,
        "support_ROI": true,
        "support_record_type_ex": true,
        "support_disarming_onlyset": true,
        "support_recorder_smd": false,
        "support_logcollection": true
    }

### 2. Login/SubscribeApi/Set

This interface is used to subscribe to the API

#### Request message

##### Table 2

| Parameter | Range | Type | Description |

| subscribe_api |   | string array | Request an API to subscribe to or subscribe to all supported apis, such as:"StreamConfig/MainStream/Range" "StreamConfig/MainStream/Get" "StreamConfig/SubStream/Get" "All" |

Sample:

POST /API/Login/SubscribeApi/Set HTTP/1.1

{
	"version": "1.0",
	"data" : {
" subscribe_api ":[
			"StreamConfig/MainStream/Range",
			"StreamConfig/MainStream/Get",
      "StreamConfig/SubStream/Get",
      "DeviceConfig/Audio/Get",
		]
	}
}

#### Response message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

### 3. /API/Event/Check

For details seeEvent > Event_check.
