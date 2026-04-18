# Get

## Function

This API is used to get parameter for System > Record Information page.

## Request Message

None.

Sample:

POST /API/SystemInfo/Record/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| channel_info |   | object | channel_info object,see Table 2 for more information |

Table 2

Channel info object

| Parameter | Range | Type | Description |

| channel | CH1 IP_CH1 WIFI_CH1 | object | channel Table 3 for more information |

Table 3

Channel object

| Parameter | Range | Type | Description |

| channel |   | string | Channel Number |

| record_state | On Off | string | Record State |

| record_switch |   | bool | Record Switch |

| stream_type | Mainstream Substream DualStream | string | Video stream type |

| resolution |   | string | Resolution:Format: “Main Stream Resolution / Sub Stream Resolution” |

| fps |   | string | IP Camera's mainstream frame rate.(/Fps)Format:”Main Stream FPS / Sub Stream FPS” |

| bitrate |   | string | IP Camera's mainstream bitrate rate.(/Kbps)Format:”Main Stream Bitrate / Sub Stream Bitrate” |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH5": {
                "record_state": "Off",
                "record_switch": "Enable"
            },
            "CH6": {
                "record_state": "Off",
                "record_switch": "Enable"
            },
            "CH7": {
                "record_state": "Off",
                "record_switch": "Enable"
            },
            "CH8": {
                "record_state": "On",
                "record_switch": "Enable",
                "stream_type": "DualStream",
                "resolution": "1920x1080 | 1280x720",
                "fps": "30Fps | 25Fps",
                "bitrate": "2Mbps | 1024Kbps"
            },
            "CH11": {
                "record_state": "Off",
                "record_switch": "Enable"
            },
            "CH14": {
                "record_state": "On",
                "record_switch": "Enable",
                "stream_type": "DualStream",
                "resolution": "1920x1080 | 1280x720",
                "fps": "25Fps | 25Fps",
                "bitrate": "1024Kbps | 1024Kbps"
            },
            "CH15": {
                "record_state": "Off",
                "record_switch": "Enable"
            },
            "CH16": {
                "record_state": "Off",
                "record_switch": "Enable"
            }
        },
        "channel_max": 16
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
