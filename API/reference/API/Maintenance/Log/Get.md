# Search

## Function

This API is used to get the system log information.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| start_date | Date format: MM/DD/YYYY | string | Search start date. |

| start_time | Time format: hh:mm:ss | string | Search start time. |

| end_date | Date format: MM/DD/YYYY | string | Search end date. |

| end_time | time format: hh:mm:ss | string | search end time. |

| main_type | "System", "Operate", "Alarm", "Account", "Record", "Storage", "Network" , "All" | string | log main type |

| channel_max | Ipc:1 | int | Maximum number of channels |

Sample:

POST /API/Maintenance/Log/Search HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "start_date":"07/05/2023",
        "end_date":"07/05/2023",
        "start_time":"00:00:00",
        "end_time":"23:59:59",
        "main_type":"All",
        "sub_type":"All"
    }
}

## Response Message

## Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| log |   | object array | Array of log structures, see Table 3 for details. |

##### Table 3

| Parameter | Range | Type | Description |

| start_date |   | string | Log start date, format: MM/DD/YYYY. |

| start_time |   | string | Log start time, format: hh:mm:ss. |

| end_time |   | string | log end time, format: hh:mm:ss. |

| main_type | "System", "Operate", "Alarm", "Account", "Record", "Storage", "Network", "All" | string |   |

| ai_main_type | "Face Detection", "Human & Vehicle", "License Plate Detection" | string | The main type of AI log. |

| sub_type | System: "SystemStartup", "Shutdown", "Reboot", "SystemMaintain", "Update", " ChangeTime", "NTP", "DelayShutDown", "PowerOn", "PowerOff", "AIStickPlugin", "AIStickRemove" , "AIStickError", "AIStickWarn", "UpsPowerFail", "CpuOverHeat", "FanAbnormal", "All" Operate: "RECParameters", "ScheduleRecord", "MainstreamSettings", "NetworkSettings", "SubstreamSettings", "EmailSetting", "EmailSchedule", "DdnsSettings", "ColorSettings", "DisplaySettings", "VideoSettings", "VideoCover", "Motion", "I/O", "HddSettings", "PtzSettings", "SerialPort" " NtpSettings", "DstSettings", "GeneralSetup", "MultiUser", "Maintenance", "AbnormalSettings", "EmailSchedual" , "RtspSettings", "IntelligentSchedual", "IpcChannel" "FtpSettings", "ImageControl", "MobileStream", "ProtocolConfigure", "CaptureSettings", "CaptureSchedual" "IntelligentSettings", "IntelligentSettings2", "IntelligentSettings3", " AlarmLinkagePTZ", "IntelligentSettings4", "IntelligentSettings5", "IntelligentSettings6", "CloudStorage", "PirAlarmSettings", "AlarmStream" , "IpcPreviewCtrl" "IPV6", "ProtocolInfo", "HttpsSettings", "DeterrenceSettings", "SdSetting", "OdSetting", "FtpSchedual" "IpFilter", "AlarmSchedule", "EmailTest", "ExportParam", " ImportParam", "LoadDefault", "IpcReboot", "IpcExport", "IpcImport", "IpcLoadDefault", "IpcUpgrade" , "SearchLog", "ChannelAdd", "ChannelDelete", "Modify", "IpcSearch", "PtzControl", "ManualAlarm", "BackupLog", "CrosscountSearch", "DefaultImgControl", "DefaultColor", "IpcChannelDelete", "DisplaySettings", "MainstreamSettings", "PlatformSettings", "ChannelModify", "AbnormalSettings", "PosAdd", " PosDelete", "PosModify", "PosSettings", "SmartHomeSettings", "VersionSettings", "SNMPSettings", "DisarmingModify" , "EventPushPlatform", "CombinationAlarm", "VoicePrompts", "RTMPModify", "Exception", "Developer", "Siren", "All" Alarm: "MotionStart", "MotionEnd", "IoAlarmStart", "IoAlarmEnd", "VideoLoss", "PidStart", "PidEnd", "LcdStart", "LcdEnd", "SodStart", "SodEnd", "PirStart", "PirEnd", "Pd&VdStart", "Pd&VdEnd", "FdStart ", "FdEnd", "CcStart", "CcEnd", "CdStart", "CdEnd", "QdStart", "QdEnd", "ShellBroken", "SdStart", "SdEnd", "OdStart", "OdEnd", "PersonStart", "PersonEnd", "LowBattery", "FAttrStart", "FAttrEnd", "CdStart", "CdEnd", "QdStart", "QdEnd", "LpdStart", "LpdEnd", "RsdStart", "RsdEnd ", "IntrusionStart", "IntrusionEnd", "RegionEntranceStart", "RegionEntranceEnd", "RegionExitingStart", "RegionExitingEnd", "TfdtStart", "TfdtEnd", "TmsStart", "TmsEnd", "All" Account: "Login", "Logout", "AddUser", "DeleteUser", "ModifyUser", "LockScreen", "Unlock", "UsernameError", "PasswordError", "All" Record: "ScheduleRecordStart", "ManualRecordStart", "RecordStop", "RecordSearch", "Playback", "RecordBackup", "PictureSearch", "PicturePlayback ", "PictureBackup", "ManulCapture", "InstantPlayback", "All" Storage: "FormatHDD" , "NoSpaceOnDisk", "DiskError", "Auto", "HddPartitionChanged", "HddSmart", "FormatRAID", br />"RAIDCreate", "RAIDDelete", "RAIDRebuildStart", "RAIDRebuildEnd", "AddHotDisk", "RemoveHotDisk", "All" AI Face Detection: "Stranger", "All" Human & Vehicle: "Human", "Vehicle", "PID[Human]", "LCD[Human]", "PID[Vehicle]", "LCD[Vehicle]", "All" Secure: "LoginLock", "PasswordInsecure", "ReadUserParamFailed", "ReadFactoryParamFailed", "SessionBusy", "UpgradeVerifyFailed", "CustomCartExpired" All: "All" | string | log Subtype 1. Only IPC supports subtype query, and NVR does not support this function; 2. In order to unify the interface, NVR reserves this interface, and also bring the All subtype when querying, which is convenient for future expansion . |

| channel |   | string | The channel to which the log is associated. Note: Depending on the log type, this field is optional. |

| record |   | bool | Whether there is a recording. Note: Depending on the log type, this field is optional. |

| result_code | "operate_success", "no_permission", "lack_of_resource", "network_error", "exception_error", "operate_failed", "file_error", "memory_not_enough", "parameter_error", "para_check_error", "write_flash_error", "no_hdd", " auth_failed", "no_support", "unknown_error", "no_udisk", "no_upgrade_package", "soft_is_new", "software_packet_error" , "language_version_error", "file_name_too_long", "update_failed", "event_coverd", "backup_search_dir_too_long", "backup_no_support_mjpeg", "connect_close", "file_invalid", "sapce_shortage", "data_error", "user_not_exist", "first_login", "weak_password" , "time_abnormal", "passwd_expired", "version_incompatible", "in_userinterface", "in_upgrading", "user_locked", "part_success" | string |   |

| user |   | string | The username of the operating user. |

| ip |   | string | Operating user's ip address. |

| time_src |   | string | When modifying the time, the old time. |

| time_dst |   | string | When modifying the time, the new time. |

| user_id | 0->administrator,1->user1 2->user2...6->user6 | int | user ID of the operating user. |

| ipc_ip |   | string | The ip address of the operated ipc. |

| dst_user |   | string | The username of the user being operated. |

| dest_userid | 0->administrator,1->user1 2->user2...6->user6 | int | user ID of the user being operated. |

| hddid |   | int | HDD serial number. |

| model |   | string | hard disk related. |

| serial_no |   | string | hard disk related. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "max_num": 1000,
        "log": [
            {
                "sub_type": "Login",
                "result_code": "operate_success",
                "user": "admin",
                "user_id": 0,
                "ip": "172.16.8.120",
                "main_type": "Account",
                "start_date": "01/10/2024",
                "start_time": "11:10:34"
            },
            {
                "sub_type": "MotionEnd",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "10:58:54"
            },
            {
                "sub_type": "MotionStart",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "10:58:39"
            },
            {
                "sub_type": "MotionEnd",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "10:41:20"
            },
            {
                "sub_type": "MotionStart",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "10:41:09"
            },
            {
                "sub_type": "Login",
                "result_code": "operate_success",
                "user": "admin",
                "user_id": 0,
                "ip": "172.16.8.120",
                "main_type": "Account",
                "start_date": "01/10/2024",
                "start_time": "10:22:50"
            },
            {
                "sub_type": "Login",
                "result_code": "operate_success",
                "user": "admin",
                "user_id": 0,
                "ip": "172.16.8.120",
                "main_type": "Account",
                "start_date": "01/10/2024",
                "start_time": "10:12:30"
            },
            {
                "sub_type": "MotionEnd",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "10:11:29"
            },
            {
                "sub_type": "MotionStart",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "10:11:19"
            },
            {
                "sub_type": "MotionEnd",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "09:52:35"
            },
            {
                "sub_type": "MotionStart",
                "record": true,
                "main_type": "Alarm",
                "start_date": "01/10/2024",
                "start_time": "09:52:24"
            },
            {
                "sub_type": "Login",
                "result_code": "operate_success",
                "user": "admin",
                "user_id": 0,
                "ip": "172.16.8.120",
                "main_type": "Account",
                "start_date": "01/10/2024",
                "start_time": "09:19:06"
            },
            {
                "sub_type": "ChangeTime",
                "main_type": "System",
                "start_date": "01/10/2024",
                "start_time": "09:18:44"
            },
            {
                "sub_type": "Ntp",
                "main_type": "System",
                "start_date": "01/10/2024",
                "start_time": "09:18:44"
            },
            {
                "sub_type": "SystemStartup",
                "main_type": "System",
                "start_date": "01/10/2024",
                "start_time": "09:18:24"
            },
            {
                "sub_type": "NetworkConnect",
                "main_type": "Network",
                "start_date": "01/10/2024",
                "start_time": "09:18:21"
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
