# Get

## Function

This API is used to get parameter for Alarm > Stationary Object Detection.

## Request Message

### Parameter Description

See Alarm > Stationary Object Detection > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/AlarmConfig/Intelligent/SOD/Get HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "page_type":"AlarmConfig"
    }
}

## Response Message

### Parameter Description

See Alarm > Stationary Object Detection > Range > Parameter Description > Table 2 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "reason": "Not configured"
            },
            "CH2": {
                "reason": "Not configured"
            },
            "CH3": {
                "reason": "Not configured"
            },
            "CH4": {
                "buzzer": "0",
                "alarm_out": [],
                "latch_time": "10",
                "record_enable": true,
                "http_listening": false,
                "record_channel": [
                    "CH4"
                ],
                "post_recording": "30",
                "show_message": false,
                "send_email": false,
                "full_screen": false,
                "ftp_picture_upload": false,
                "ftp_video_upload": false,
                "picture_to_cloud": false,
                "video_to_cloud": false,
                "voice_prompts_index": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "voice_prompts_select": [
                    0,
                    0
                ],
                "voice_prompts_time": [
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    }
                ],
                "copy_ch": "all"
            },
            "CH5": {
                "reason": "Not configured"
            },
            "CH6": {
                "reason": "Not configured"
            },
            "CH7": {
                "reason": "Not configured"
            },
            "CH8": {
                "reason": "Not configured"
            },
            "CH9": {
                "reason": "Not configured"
            },
            "CH10": {
                "reason": "Not configured"
            },
            "CH11": {
                "reason": "Not configured"
            },
            "CH12": {
                "reason": "Not configured"
            },
            "CH13": {
                "reason": "Not configured"
            },
            "CH14": {
                "reason": "Not configured"
            },
            "CH15": {
                "reason": "Not configured"
            },
            "CH16": {
                "reason": "Not configured"
            },
            "CH17": {
                "reason": "Not configured"
            },
            "CH18": {
                "buzzer": "0",
                "alarm_out": [],
                "latch_time": "10",
                "record_enable": true,
                "http_listening": false,
                "record_channel": [
                    "CH18"
                ],
                "post_recording": "30",
                "show_message": false,
                "send_email": false,
                "full_screen": false,
                "ftp_picture_upload": false,
                "ftp_video_upload": false,
                "picture_to_cloud": false,
                "video_to_cloud": false,
                "voice_prompts_index": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "voice_prompts_select": [
                    0,
                    0
                ],
                "voice_prompts_time": [
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    },
                    {
                        "start_hour": 0,
                        "start_minute": 0,
                        "start_second": 0,
                        "end_hour": 23,
                        "end_minute": 59,
                        "end_second": 59
                    }
                ],
                "copy_ch": "all"
            },
            "CH19": {
                "reason": "Not configured"
            },
            "CH20": {
                "reason": "Not configured"
            },
            "CH21": {
                "reason": "Not configured"
            },
            "CH22": {
                "reason": "Not configured"
            },
            "CH23": {
                "reason": "Not configured"
            },
            "CH24": {
                "reason": "Not configured"
            },
            "CH25": {
                "reason": "Not configured"
            },
            "CH26": {
                "reason": "Not configured"
            },
            "CH27": {
                "reason": "Not configured"
            },
            "CH28": {
                "reason": "Not configured"
            },
            "CH29": {
                "reason": "Not configured"
            },
            "CH30": {
                "reason": "Not configured"
            },
            "CH31": {
                "reason": "Not configured"
            },
            "CH32": {
                "reason": "Not configured"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
