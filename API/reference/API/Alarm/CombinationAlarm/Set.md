# Set

## Function

This API is used to set combined alarm parameters.

## Request Message

See Alarm > CombinationAlarm > Range > Parameter Description  > Table 2 for parameter description.

Sample:

POST /API/AlarmConfig/Combination/Set HTTP/1.1

{
    "version": "1.0",
    "data": {"channel_info": {"CH1": {
        "enable_alarm": "Disable",
        "combination_configure": [
            {
                "alarm_type": "AT_MOTION",
                "support_ipc_io": true
            },
            {
                "alarm_type": "AT_MOTION",
                "support_ipc_io": true
            }
        ],
        "buzzer": "0",
        "alarm_out": [],
        "latch_time": "10",
        "record_enable": true,
        "record_channel": ["CH1"],
        "post_recording": "30",
        "show_message": true,
        "send_email": false,
        "full_screen": false,
        "http_listening": false,
        "ftp_picture_upload": true,
        "ftp_video_upload": false,
        "picture_to_cloud": true,
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
            1,
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
        "copy_ch": "all",
        "chn_index": "CH1"
    }}}
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
