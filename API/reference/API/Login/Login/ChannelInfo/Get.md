# Get

## Function

This API is used to get channel information

## Request Message

None.

Sample:

POST /API/Login/ChannelInfo/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_param |   | object array | Channel parameter object array, single channel object parameter see Table 2 for more information. |

##### Table 2

| Parameter | Range | Type | Description |

| channel |   | string | Channel number. |

| channel_name |   | string | Channel name. |

| channel_alias |   | string | Channel alias. |

| videoloss |   | bool | Signal of video loss. |

| connect_status | "NotConfigured", "Online", "Offline" "Sleep", "NotPaired" | string | Status of channel connection. |

| ability | "Fisheye", "Binoculars", "Ptz", "NewPtz"(NVR/DVR not required), "HkPtz" "Iris", "Mainstream", "Substream", "Mobilestream", "FloodLight", "AudioAlarm", "AlarmOutNum", "TalkHalf", "TalkFull", "Color", "RedBlueLight", "NotAutoReconnect", "Pir", "Cover", "Eventstream" | string array | Channel funtion. |

| alarm_in_num |   | int | Alarm input supported by IPC channel. |

| alarm_out_num |   | int | Alarm output supported by IPC channel. |

| show_ptz_setting |   | bool | Controls the display of the PTZ setting button on the preview interface. |

| intelligent_ability | "CrossCount", "HeatMap", "SOD", "LCD", "PVD", "FD", >"PID", "CrowdDensity", "LPD", "RSD", "QD", "AttributeDetect", "FireDetection", "TempMeas" | string array | Smart function. |

| talk_audio_ability | "G711_A", "G726_16KBPS_ASF", "G726_24KBPS_ASF", "G726_32KBPS_ASF", "G726_40KBPS_ASF", "AAC" | string array | The intercom audio format supported by Ipc.(if this field is not passed, the default is g711a, and if multiple fields are passed, the first one is used by default. Currently, only wireless models are used, and subsequent dvr and nvr can be reused if necessary) |

| wireless_ipc_type |   | int | Wireless IPC power supply type, battery 1, long-term power supply 2. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_param": {
            "type": "array",
            "min_size": 0,
            "max_size": 16,
            "items": [
                {
                    "channel": "CH1",
                    "connect_status": "FailConnectNetwork",
                    "channel_name": "Camera1",
                    "channel_alias": "CH1",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH2",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH3",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH4",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH5",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH6",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH7",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH8",
                    "connect_status": "Online",
                    "channel_name": "Ccadq",
                    "channel_alias": "CH8",
                    "ability": [
                        "Mainstream",
                        "Substream",
                        "Mobilestream",
                        "Ptz",
                        "AudioAlarm",
                        "RedBlueLight",
                        "TalkFull",
                        "Color",
                        "Cover"
                    ],
                    "intelligent_ability": [
                        "CrossCount",
                        "HeatMap",
                        "SOD",
                        "LCD",
                        "PVD",
                        "FD",
                        "PID",
                        "CrowdDensity",
                        "LPD",
                        "RSD",
                        "QD",
                        "AttributeDetect"
                    ],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": false
                },
                {
                    "channel": "CH9",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH10",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH11",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH12",
                    "connect_status": "Online",
                    "channel_name": "Camera",
                    "channel_alias": "CH12",
                    "ability": [
                        "Mainstream",
                        "Substream",
                        "Mobilestream",
                        "AlarmOutNum",
                        "TalkHalf",
                        "TalkFull",
                        "Color",
                        "Cover"
                    ],
                    "intelligent_ability": [
                        "CrossCount",
                        "HeatMap",
                        "SOD",
                        "LCD",
                        "PVD",
                        "FD",
                        "PID"
                    ],
                    "alarm_in_num": 1,
                    "alarm_out_num": 1,
                    "videoloss": false
                },
                {
                    "channel": "CH13",
                    "connect_status": "FailConnectNetwork",
                    "channel_name": "Camera",
                    "channel_alias": "CH13",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH14",
                    "connect_status": "FailConnectNetwork",
                    "channel_name": "Camera",
                    "channel_alias": "CH14",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH15",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                },
                {
                    "channel": "CH16",
                    "connect_status": "NotConfigured",
                    "channel_name": "",
                    "channel_alias": "",
                    "ability": [],
                    "intelligent_ability": [],
                    "alarm_in_num": 0,
                    "alarm_out_num": 0,
                    "videoloss": true
                }
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
