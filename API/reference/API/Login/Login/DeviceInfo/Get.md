# Get

## Function

Get device information.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| requestor | "NVR" | string | Source of information requested: eg: NVR, etc. |

| front_chn_index |   | int | The requested channel number. Usage scenario: When DVR/NVR is connected to multi-channel devices, this field is required to obtain front-end ipc device information. When the connected device receives this field, it will request the device information of the corresponding channel ipc and forward it to the connecter. |

| is_need_ftpurl |   | bool | If there is a field, it means that there is no need to reply to the URL with a plaintext password (ftp upgrade http upgrade). |

| support_camera_day_night_param |   | bool | Whether to support turning on the day and night switching mode. To be compatible with 823NVR, 824IPC day and night mode switching capability is actively obtained by NVR. |

Sample:

POST /API/Login/DeviceInfo/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| channel_num |   | int | Total number of channels. |

| analog_channel_num |   | int | Total number of analog channels. |

| stream_profile | "Mainstream", "Substream", "Mobilestream" | string array | Support several stream switching. |

| support_ftp_upgrade |   | bool | Whether to support ftp upgrade. |

| support_http_upgrade |   | bool | Whether to support http upgrade. |

| ftp_upgrade_url |   | string | Ftp upgrade url. |

| http_upgrade_url |   | string | http upgrade url. |

| support_cloud_upgrade |   | bool | Whether to support cloud upgrade. |

| push_type | "VVPush", "Baidu", "RSPush", "TutkPush" | string | Push type |

| default_stream | "Mainstream", "Substream" | string | IE default stream type. |

| client_logout_time | "0s", "30s", "1m", "5m", "30m" | string | Client timeout. |

| pushinfo_type | "Motion", "Io", "Videoloss", "Pir" | string array | Push message type. |

| ptz_support |   | bool | Whether to support ptz |

| local_alarmin_num |   | int | Board alarm input. |

| local_alarmout_num |   | int | Board alarm output. |

| suggested_modify_pwd |   | bool | Whether it is recommended to change the password. |

| support_face_config |   | bool | Whether to support face parameter query and setting. |

| support_ie_down_snap |   | bool | Whether to support IE to download board snapshots. |

| support_human_vehicle_search |   | bool | Whether to support pedestrian and vehicle search functions. |

| support_lpd_enhance |   | bool | Whether to enhance the function of vehicle identification. |

| preview_num |   | int | Main stream preview channel number. |

| mac_addr | Max length:35byte | string | MAC address. |

| support_io_record |   | bool | Whether to support determining whether the program has IO alarms based on the total number of IO alarms at the front and rear ends. |

| support_manual_record |   | bool | Whether to support manual recording type search. |

| support_sound_record |   | bool | Sound alarm display flag: 0 hidden, 1: displayed. |

| support_playback_new_rec_detail |   | bool | Support NewRecordDetailRsp(New_GetRecFileList) search. |

| support_playback_new_rec_file_download |   | bool | Support NewRecordDetailRsp (New_GetRecFileList) video download, support video file lock query and lock setting. |

| support_more_chn_playback |   | bool | Signal of IE playback page support multi-channel playback (more than 4 channels). |

| support_video_cover_record |   | bool | Whether to display the video tampering alarm. |

| support_smart_record |   | bool | Whether to display the intelligent analysis page. |

| support_substream_playback |   | bool | Whether to support substream playback. |

| support_pir_record |   | bool | Whether to support PIR. |

| support_flood_light |   | bool | Whether to support floodlights. |

| support_speaker |   | bool | Whether to support speakers. |

| show_certificate_remain_time |   | bool | Whether to display the validity period of the certificate, true: the validity period of the custom certificate is less than 8 days. |

| certificate_remain_time | 0-10 | int | Valid days for custom certificates. |

| media_port |   |   | See Communication Matrix. |

| media_external_port |   |   | See Communication Matrix. |

| local_ip |   | string | Local ip. |

| upgrade_file_max_size | 0-100 | int | The maximum size of the board upgrade file, in MB. |

| upgrade_head_trans_size | 0-3 | int | The length of the upgrade header information on the board side, in units of k. |

| support_audio_volume |   | bool | Whether to support volume adjustment. |

| talkback | "TalkHalf", "TalkFull" | string |   |

| sound |   | bool | The sound switch is displayed. |

| enable_encryption |   | bool | Private protocol encryption. |

| device_preview_ability | "manual_alarm", "face" | string array | Controls the set of capabilities displayed on the side of the preview. |

| device_preview_AI_item | "FR", "Human", "Vehicle", "PID_Human", "PID_Vehicle", "LCD_Human", "LCD_Vehicle", "Non-Vehicle", "PID_Non-Vehicle", "LCD_Non-Vehicle", "Intrusion_Human", "Intrusion_Vehicle", "Intrusion_Non-Vehicle", "RegionEntrance_Human", "RegionEntrance_Vehicle", "RegionEntrance_Non-Vehicle", "RegionExiting_Human", "RegionExiting_Vehicle", "RegionExitng_Non-Vehicle" | string array | Control the set of options displayed on the side of the AI preview (after the update, this field is also used to judge the type in the playback intelligent image search, and the intelligent type judgment in the intelligent data statistics interface). |

| device_main_menu | "localSetting", "remoteSetting", "playback", "preview" | string array | Controls the set of capabilities displayed on the upper right side of the preview. |

| support_ai_pic_report |   | bool | Whether support the reporting of AI face, human and vehicle pictures. |

| support_repeat_visitor |   | bool | Whether to support repeat customer function (for NVR only). |

| support_face_attendance |   | bool | Whether to support the face attendance function (only for NVR). |

| support_heat_map |   | bool | Whether to support the heat map function (only for NVR). |

| support_fisheye |   | bool | Whether to support fisheye function (only for NVR). |

| support_binoculars |   | bool | Whether to support binocular function (only for NVR). |

| support_cc_scenario |   | bool | Whether to support over-the-line scene application. |

| support_attendance_scenario |   | bool | Whether to support face-based real-time attendance scene application. |

| support_face_attribute |   | bool | Whether to support face attributes. |

| support_ai_pidlcd |   | bool | Whether to support AI perimeters and tripwires. |

| support_ai_cc |   | bool | Whether to support AI crossing count. |

| support_disarming |   | bool | Whether it supports one-key disarm function. |

| dev_type |   | unsigned long long | Dev type. |

| device_type | Max length:24byte | string | Device type |

| dev_play_backcap |   | unsigned char | Dev playback mode: 0-old playback mode, 1-fast forward and fast rewind only take one frame mode, 2-fast forward and fast rewind jump I frame mode. |

| support_PidLcd_search |   | bool | Whether to support Pid Lcd search function. |

| support_aac |   | bool | Whether to support AAC audio format. |

| p2p_id |   | string | P2P ID. |

| support_hls_server |   | bool | Support single-channel HLS stream. |

| videoloss_status |   | bool | Whether to display the missing logo. |

| nocamera_display |   | bool | Whether to display nocamera text. |

| FR_model_version |   | int | IPC face recognition model version. |

| FD_model_version |   | int | IPC face detection model version. |

| support_voice_prompts |   | bool | Whether to support voice broadcast. |

| support_ANR |   | bool | Whether to support offline supplementary recording. |

| support_siren_audio |   | bool | Whether to support white light alarm sound type selection. |

| support_floodlight_color_image_ctrl |   | bool | Whether to support floodlight color function. |

| support_param_import_export |   | bool | Whether to support parameter import and export. |

| support_occlusion_detection |   | bool | Whether to support occlusion alarm. |

| support_sound_detection |   | bool | Whether to support sound detection. |

| support_osd_transparency |   | bool | Whether to support osd transparency switch. |

| support_record_type_ex |   | bool | Whether to support extended recording types. |

| encode_type_ability | "H.264", "H.265", "MJPEG", "H.264+", "H.265+" | string array | Supported encoding types. |

| ptz_ability |   | object | Supported ptz capabilities,see Table 3 for more information. |

| localset |   | object | Default format for local settings,see Table 4 for more information. |

| localsetRange |   | object | Format range for local settings,see Table 5 for more information. |

| support_get_fr_group |   | bool | Whether to support face group acquisition, that is, support the GetId method. |

| support_get_lpr_group |   | bool | Whether to support license plate group acquisition, that is, support the GetId method. |

| Manufacturer | Max length:32byte | String | Manufacturer name. |

| wireless_dev |   | bool | Determine whether it is a wireless device, wireless device true, wired false. |

| support_top_online |   | bool | Support online channel auto-completion function. |

| support_digitchannel_autofill |   | bool | Support digital channel auto-completion function. |

| magic_channel |   | string array | An analog channel that has been converted to a digital channel. |

| accepted_compress_encodi | "gzip" | string array | API body compression, support gzip compression. |

| support_partial_request |   | object | API that supports paged data transfer,see Table 6 for more information. |

| support_record_type_ex |   | bool | Whether to support record type expansion. |

| support_get_upgradeUrlpw |   | bool | Whether to support calling FtpUpgrade/Get API to get encrypted client server password. |

##### Table 3

| Parameter | Range | Type | Description |

| ptz_version | "1.0", "2.0" | string | Ptz version. |

| btn_autofocus |   | bool | Auto focus. |

| quick_use | "Ptz_QuickUse_3DPosition", "Ptz_QuickUse_AutoFocus", "Ptz_QuickUse_PtzReset", "Ptz_QuickUse_WatchMode", "Ptz_QuickUse_ManualHumanTrace", "Ptz_QuickUse_LensReset" | string array | Shortcut function buttons. |

| iris_minus_add |   | bool | Aperture increases and decreases. |

##### Table 4

| Parameter | Range | Type | Description |

| RecFileType |   | string | Video download default format, neutral default is MP4. |

| CapFileType |   | string | The default format of snapshots is neutral, and the default is JPG. |

| SwitchTime |   | string | The default interval is neutral, and the default interval is 10. |

##### Table 5

| Parameter | Range | Type | Description |

| RecFileType | "RF", "MP4", "AVI" | string | Video download format options. |

| CapFileType | "JPG", "BMP", "PNG" | string | Snapshot format options. |

| SwitchTime | 1~60 | int | Interval time range. |

##### Table 6

| Parameter | Range | Type | Description |

| /API/IPCMaintaint/IPCDisk/Get |   | object | API that supports page-by-page access to IPC SDK information, object member see Table 7 for more information. |

| /API/IPCMaintaint/IPCDisk/Format |   | object | API that supports pagination formatting IPC SDK, object member see Table 7 for more information. |

##### Table 7

| Parameter | Range | Type | Description |

| type | "channel_list" | string | type of data. |

| quota | 0-32 | int | The size of each page of data after paging. |

| total |   | int | The total size of the data. |

Simple :

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "device_main_menu": [
            "localSetting",
            "remoteSetting",
            "playback",
            "preview"
        ],
        "intelligent_chn_arr": [
            "CH1",
            "CH2",
            "CH3",
            "CH4",
            "CH5",
            "CH6",
            "CH7",
            "CH8",
            "CH9",
            "CH10",
            "CH11",
            "CH12",
            "CH13",
            "CH14",
            "CH15",
            "CH16"
        ],
        "channel_num": 16,
        "analog_channel_num": 0,
        "sys_channel_num": 16,
        "stream_profile": {
            "type": "string",
            "items": [
                "Mainstream",
                "Substream",
                "Mobilestream"
            ]
        },
        "support_ftp_upgrade": true,
        "support_ftp_ipc_upgrade": true,
        "support_cloud_upgrade": false,
        "push_type": "RSPush",
        "default_stream": "SubStream",
        "pushinfo_type": {
            "type": "string",
            "items": [
                "Motion",
                "Io",
                "Videoloss",
                "Pir"
            ]
        },
        "local_alarmin_num": 8,
        "local_alarmout_num": 1,
        "suggested_modify_pwd": false,
        "support_ie_down_snap": true,
        "support_face_config": true,
        "support_face_attribute": true,
        "support_get_fr_group": true,
        "support_human_vehicle_search": true,
        "support_PidLcd_search": true,
        "support_Intrusion_search": true,
        "support_RegionEntrance_search": true,
        "support_RegionExiting_search": true,
        "support_eventchk_snap": true,
        "support_get_lpr_group": true,
        "support_license_plate": true,
        "support_lpd_enhance": true,
        "preview_num": 0,
        "mac_addr": "5C-F2-07-49-31-41",
        "support_smart_record": true,
        "support_substream_playback": true,
        "support_pir_record": true,
        "support_flood_light": true,
        "support_record_tag": true,
        "support_persian_calendar": false,
        "support_backward_play": true,
        "support_hls_server": true,
        "support_speaker": true,
        "talkback": "TalkFull",
        "support_sound_record": true,
        "support_manual_record": true,
        "support_video_cover_record": true,
        "support_more_chn_playback": false,
        "support_aac": false,
        "videoloss_status": true,
        "nocamera_display": true,
        "support_playback_new_rec_detail": true,
        "support_playback_new_rec_file_download": true,
        "support_io_record": true,
        "activation_password_weak": false,
        "upgrade_file_max_size": 100,
        "upgrade_head_trans_size": 3,
        "media_port": 9000,
        "media_external_port": 9000,
        "local_ip": "172.16.10.169",
        "enable_encryption": true,
        "support_ai_pic_report": true,
        "device_preview_ability": [
            "manual_alarm",
            "face"
        ],
        "device_preview_AI_item": [
            "FR",
            "Human",
            "Vehicle",
            "Non-Vehicle",
            "PID_Human",
            "PID_Vehicle",
            "LCD_Human",
            "LCD_Vehicle",
            "PID_Non-Vehicle",
            "LCD_Non-Vehicle",
            "Intrusion_Human",
            "Intrusion_Vehicle",
            "RegionEntrance_Human",
            "RegionEntrance_Vehicle",
            "RegionExiting_Human",
            "RegionExiting_Vehicle",
            "Intrusion_Non-Vehicle",
            "RegionEntrance_Non-Vehicle",
            "RegionExiting_Non-Vehicle",
            "LPR"
        ],
        "support_repeat_visitor": true,
        "support_face_attendance": true,
        "support_heat_map": true,
        "sound": true,
        "support_audio_volume": true,
        "support_fisheye": true,
        "support_cc_scenario": true,
        "support_attendance_scenario": true,
        "support_ai_pidlcd": true,
        "support_ai_cc": true,
        "support_disarming": true,
        "support_ai_notification_subscribe": true,
        "ishide_notification_interval": true,
        "ishide_notification_intervalnew_8.2.4": false,
        "support_measurement_area": true,
        "localset": {
            "RecFileType": "MP4",
            "CapFileType": "JPG",
            "SwitchTime": 10
        },
        "backup_video_encryption_pwd": {
            "type": "string",
            "min_len": 6,
            "max_len": 32
        },
        "support_backup_video_encryption": true,
        "localsetRange": {
            "type": "object",
            "items": {
                "RecFileType": {
                    "type": "string",
                    "items": [
                        "RF",
                        "MP4",
                        "AVI"
                    ]
                },
                "CapFileType": {
                    "type": "string",
                    "items": [
                        "JPG",
                        "BMP",
                        "PNG"
                    ]
                },
                "SwitchTime": {
                    "type": "int32",
                    "min": 1,
                    "max": 60
                }
            }
        },
        "dev_play_backcap": 2,
        "dev_type": 5932088454189811000,
        "device_type": "N7816",
        "wireless_dev": false,
        "p2p_id": "",
        "support_shortlive_acctoken": true,
        "cast_screen_google_url": "http://ip/hls/live/CHX/X/livetop.mp4",
        "cast_screen_aws_url": "http://ip/hls/live/CHX/X/livetop.mp4",
        "support_ai": true,
        "support_record_type_ex": true,
        "snapshot_size": "640x480",
        "date_format": "MM/DD/YYYY h:m:s"
    }
}

Partial request

{
    "result": "success",
    "data": {
                .
                .
                .
        "support_partial_request":
        {
            "/API/IPCMaintaint/IPCDisk/Get":
            {
                "type": "channel_list",
                "quota" : 16,
                "total" : 256
            },
            "/API/IPCMaintaint/IPCDisk/Format":
            {
                "type": "channel_list",
                "quota" : 16,
                "total" : 256
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
