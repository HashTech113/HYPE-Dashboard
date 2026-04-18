# Range

## Function

This API is used to get parameter range for AI > Setup > Rare Sound Detection  page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capability of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need. IPC only uses CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | Data used to distinguish between the channel configuration page and the alarm configuration page |

Sample:

POST /API/AI/Setup/RSD/Range HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Single Channel Information JSON show as follow Table x |

| page_type | “ChannelConfig”, “AarmConfig” | string | The data used to distinguish between the channel configuration page and the alarm configuration page is only needed when setting |

| channel_max |   | int | Maximum number of channels |

#### Table x

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as followTable 3 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | Description |

| status | "Offline","Online"， “Nonsupport” | string | Channel online status, only for digital channels. Note:This field does not exist when the channel is online |

| alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capability of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera: Local->1:open，NULL:close |

| latch_time | "10","20","40", "60" | string | Alarm output time |

| record_enable | ture,false | bool | Recording channel switch |

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” | array | Alarm output channel Channel alarm linkage switch |

| post_recording | "0","5","10", "20","30" | string | Video delay time |

| send_email | true, false | bool | Outgoing mail switch |

| ftp_picture_upload | true, false | bool | Send mail switch Channel Capture FTP Upload switch (dedicated to NVR) |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch (NVR special) |

| picture_to_cloud | true, false | bool | Image upload switch (NVR only) |

| video_to_cloud | true, false | bool | Video Cloud Upload Switch (NVR special) |

| full_screen |   | bool | FullScreen Switch (NVR only) |

| buzzer | "0","10","20","40", "60" | string | Buzzer time (NVR only) |

| show_message | true, false | bool | Display information switch |

| switch | true, false | bool | switch，false: close true: open |

| sensitivity | 1-100 | int | Detection sensitivity |

| detection_type | “Baby Crying Sound” "Dog Barking" "Gunshot" | array | Detection type: baby crying, dog barking, gunshots |

| schedule_enable |   | bool | Schedule mode |

| light_linkage |   | bool | The white light is associated with an alarm |

| enforcerlight_linkage |   | bool | Red and blue indicator linkage alarm |

| siren_linkage |   | bool | Alarm sound linkage alarm |

| http_listening |   | bool | http event push |

| schedule |   | Object | The schedule is shown in the Table 4 |

#### Table 4

| Parameter | Range | Type | Description |

| schedule_type | "SendEmail" "FtpPicUpload" "CloudPicUpload" "Record" "AlarmOut" "FtpVdUpload" "CloudVdUpload" "FloodLight" "Siren" "EnforcerLight" | string | Schedule type |

| week |   | Obejct | Weekly information such as Table 5 |

#### Table 5

| Parameter | Range | Type | Description |

| day | "Sun" "Mon" "Tue" "Wed" "Thu" "Fri" "Sat" | string | day |

| time |   | int | time |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "channel_info": {
            "type": "object",
            "items": {"CH1": {
                "type": "object",
                "items": {
                    "status": {
                        "description": "Only offline channel has this variable.",
                        "type": "string",
                        "mode": "r",
                        "items": [
                            "Offline",
                            "Online",
                            "Nonsupport"
                        ]
                    },
                    "switch": {"type": "bool"},
                    "sensitivity": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 100,
                        "default_value": 60
                    },
                    "detection_type": {
                        "type": "array",
                        "min_size": 1,
                        "max_size": 3,
                        "items": {
                            "type": "string",
                            "items": [
                                "Baby Crying Sound",
                                "Dog Barking",
                                "Gunshot"
                            ]
                        }
                    }
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
