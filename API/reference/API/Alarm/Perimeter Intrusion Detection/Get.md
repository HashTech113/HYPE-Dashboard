# Get

## Function

This API is used to get parameter for Alarm > Perimeter Intrusion Detection.

## Request Message

### Parameter Description

See Alarm > Perimeter Intrusion Detection > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/AlarmConfig/Intelligent/PID/Get HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "page_type":"AlarmConfig"
    }
}

## Response Message

### Parameter Description

See Alarm > Perimeter Intrusion Detection > Range > Parameter Description > Table 2 for parameter description.

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
                "http_listening": false,
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
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
