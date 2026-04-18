# Range

## Function

This API is used to get the range of system log information parameters.

## Request Message

None.

Sample:

POST /API/Maintenance/Log/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

## Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| start_date | Date format: MM/DD/YYYY | string | Search start date. |

| start_time | Time format: hh:mm:ss | string | Search start time. |

| end_date | Date format: MM/DD/YYYY | string | Search end date. |

| end_time | Time format: hh:mm:ss | string | Search end time. |

| main_type | "System", "Operate","Alarm", "Account", "Record", "Storage", "Network" , "All" | string | log main type |

| channel_max |   | int | The maximum number of channels, IPC is 1. |

| channel |   | string | The channel to which the log is associated. Note: Depending on the log type, this field is optional. |

| record |   | bool | Whether there is a recording. Note: Depending on the log type, this field is optional. |

| ai_main_type | "Face Detection" "Human & Vehicle" "License Plate Detection" | string | The main type of AI log |

| sub_type | System: "SystemStartup", "Shutdown", "Reboot", "SystemMaintain", "Update", " ChangeTime", "NTP", "DelayShutDown", "PowerOn", "PowerOff", "AIStickPlugin", "AIStickRemove" , "AIStickError", "AIStickWarn", "UpsPowerFail", "CpuOverHeat", "FanAbnormal", "All" Operate: "RECParameters", "ScheduleRecord", "MainstreamSettings", "NetworkSettings", "SubstreamSettings", "EmailSetting", "EmailSchedule", "DdnsSettings", "ColorSettings", "DisplaySettings", "VideoSettings", "VideoCover", "Motion", "I/O", "HddSettings", "PtzSettings", "SerialPort" " NtpSettings", "DstSettings", "GeneralSetup", "MultiUser", "Maintenance", "AbnormalSettings", "EmailSchedual" , "RtspSettings", "IntelligentSchedual", "IpcChannel" "FtpSettings", "ImageControl", "MobileStream", "ProtocolConfigure", "CaptureSettings", "CaptureSchedual" "IntelligentSettings", "IntelligentSettings2", "IntelligentSettings3", " AlarmLinkagePTZ", "IntelligentSettings4", "IntelligentSettings5", "IntelligentSettings6", "CloudStorage", "PirAlarmSettings", "AlarmStream" , "IpcPreviewCtrl" "IPV6", "ProtocolInfo", "HttpsSettings", "DeterrenceSettings", "SdSetting", "OdSetting", "FtpSchedual" "IpFilter", "AlarmSchedule", "EmailTest", "ExportParam", " ImportParam", "LoadDefault", "IpcReboot", "IpcExport", "IpcImport", "IpcLoadDefault", "IpcUpgrade" , "SearchLog", "ChannelAdd", "ChannelDelete", "Modify", "IpcSearch", "PtzControl", br />"ManualAlarm", "BackupLog", "CrosscountSearch", "DefaultImgControl", "DefaultColor", "IpcChannelDelete", >"DisplaySettings", "MainstreamSettings", "PlatformSettings", "ChannelModify", "AbnormalSettings", "PosAdd", " PosDelete", "PosModify", "PosSettings", "SmartHomeSettings", "VersionSettings", "SNMPSettings", "DisarmingModify" , "EventPushPlatform", "CombinationAlarm", "VoicePrompts", "RTMPModify", "Exception", "Developer", br />"Siren", "All" Alarm: "MotionStart", "MotionEnd", "IoAlarmStart", "IoAlarmEnd", "VideoLoss", "PidStart", "PidEnd", "LcdStart", "LcdEnd", "SodStart", "SodEnd", "PirStart", "PirEnd", "Pd&VdStart", "Pd&VdEnd", "FdStart ", "FdEnd", "CcStart", "CcEnd", "CdStart", "CdEnd", "QdStart", "QdEnd", "ShellBroken", "SdStart", "SdEnd", "OdStart", "OdEnd", "PersonStart", "PersonEnd", "LowBattery", "FAttrStart", "FAttrEnd", "CdStart", "CdEnd", "QdStart", "QdEnd", "LpdStart", "LpdEnd", "RsdStart", "RsdEnd ", "IntrusionStart", "IntrusionEnd", "RegionEntranceStart", "RegionEntranceEnd", "RegionExitingStart", "RegionExitingEnd", "TfdtStart", "TfdtEnd", "TmsStart", "TmsEnd", "All" Account: < br />"Login", "Logout", "AddUser", "DeleteUser", "ModifyUser", "LockScreen", >"Unlock", "UsernameError", "PasswordError", "All" Record: "ScheduleRecordStart", "ManualRecordStart", "RecordStop", "RecordSearch", "Playback", "RecordBackup", "PictureSearch", "PicturePlayback ", "PictureBackup", "ManulCapture", "InstantPlayback", "All" Storage: "FormatHDD" , "NoSpaceOnDisk", "DiskError", "Auto", "HddPartitionChanged", "HddSmart", "FormatRAID", br />"RAIDCreate", "RAIDDelete", "RAIDRebuildStart", "RAIDRebuildEnd", "AddHotDisk", "RemoveHotDisk", >"All" AI Face Detection: "Stranger", "All" Human & Vehicle: >"Human", "Vehicle", "PID[Human]", "LCD[Human]", "PID[Vehicle]", "LCD[Vehicle]", "All" Secure: "LoginLock", "PasswordInsecure", "ReadUserParamFailed", "ReadFactoryParamFailed", "SessionBusy", "UpgradeVerifyFailed", "CustomCartExpired" All: "All" | string | log Subtype 1. Only IPC supports subtype query, and NVR does not support this function; 2.In order to unify the interface, NVR reserves this interface, and the All subtype is also included in the query to facilitate future expansion. |

| unfinished |   | bool |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "start_date": {
            "description": "The date format is MM/DD/YYYY",
            "type": "string",
            "min_len": 0,
            "max_len": 10,
            "minYear": 2000,
            "maxYear": 2036,
            "format": "MM/DD/YYYY"
        },
        "start_time": {
            "description": "The time format is hh:mm:ss",
            "type": "string",
            "min_len": 0,
            "max_len": 8,
            "format": "hh:mm:ss"
        },
        "end_date": {
            "description": "The date format is MM/DD/YYYY",
            "type": "string",
            "min_len": 0,
            "max_len": 10,
            "minYear": 2000,
            "maxYear": 2036,
            "format": "MM/DD/YYYY"
        },
        "end_time": {
            "description": "The time format is hh:mm:ss",
            "type": "string",
            "min_len": 0,
            "max_len": 8,
            "format": "hh:mm:ss"
        },
        "main_type": {
            "type": "string",
            "items": [
                "System",
                "Operate",
                "Alarm",
                "Account",
                "Record",
                "Storage",
                "Network",
                "All"
            ]
        },
        "sub_type": {
            "description": "Each range corresponds to one main_type.",
            "type": "string",
            "mode": "r",
            "ranges": [
                [
                    "SystemStartup",
                    "Reboot",
                    "SystemMaintain",
                    "Update",
                    "ChangeTime",
                    "Ntp",
                    "All"
                ],
                [
                    "IpcPreviewCtrl",
                    "VideoCover",
                    "RECParameters",
                    "ScheduleRecord",
                    "MainstreamSettings",
                    "NetworkSettings",
                    "SubstreamSettings",
                    "EmailSetting",
                    "ColorSettings",
                    "Motion",
                    "HddSettings",
                    "MultiUser",
                    "NtpSettings",
                    "ImageControl",
                    "MobileStream",
                    "RtspSettings",
                    "IpFilter",
                    "LoadDefault",
                    "SdSetting",
                    "ExportParam",
                    "ImportParam",
                    "EventPush",
                    "Capture",
                    "Deterrence",
                    "Intelligent",
                    "FTP",
                    "DDNS",
                    "HTTPS",
                    "Audio",
                    "Siren",
                    "MaintenanceSettings",
                    "OdSetting",
                    "I/O",
                    "All"
                ],
                [
                    "MotionStart",
                    "MotionEnd",
                    "IoAlarmStart",
                    "IoAlarmEnd",
                    "OdStart",
                    "OdEnd",
                    "PidStart",
                    "PidEnd",
                    "LcdStart",
                    "LcdEnd",
                    "SodStart",
                    "SodEnd",
                    "Pd&VdStart",
                    "Pd&VdEnd",
                    "FdStart",
                    "FdEnd",
                    "CcStart",
                    "CcEnd",
                    "CdStart",
                    "CdEnd",
                    "QdStart",
                    "QdEnd",
                    "LpdStart",
                    "LpdEnd",
                    "RsdStart",
                    "RsdEnd",
                    "SdStart",
                    "SdEnd",
                    "IntrusionStart",
                    "IntrusionEnd",
                    "RegionEntranceStart",
                    "RegionEntranceEnd",
                    "RegionExitingStart",
                    "RegionExitingEnd",
                    "All"
                ],
                [
                    "Login",
                    "Logout",
                    "Lock",
                    "ModifyUser",
                    "All"
                ],
                [
                    "RecordSearch",
                    "Playback",
                    "RecordBackup",
                    "All"
                ],
                [
                    "FormatHDD",
                    "NoSpaceOnDisk",
                    "DiskError",
                    "All"
                ],
                [
                    "NetworkDown",
                    "NetworkConnect",
                    "NetworkError",
                    "NetworkChangeMode",
                    "All"
                ],
                ["All"]
            ]
        },
        "record": {"type": "bool"},
        "unfinished": {
            "type": "bool",
            "mode": "r"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
