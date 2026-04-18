# Set

## Function

This API is used to set Alarm > Cross Counting configuration parameters.

## Request Message

See Alarm > CrossCounting > Range > Parameter Description  > Table 2 for parameter description.

Sample:

POST /API/SystemConfig/Output/Set HTTP/1.1

{
    "version":"1.0",
    "data":{
        "channel_info":{
            "CH6":{
                "buzzer":"0",
                "alarm_out":[

                ],
                "latch_time":"10",
                "record_enable":true,
                "http_listening":false,
                "record_channel":[
                    "CH6"
                ],
                "post_recording":"30",
                "show_message":true,
                "send_email":true,
                "full_screen":false,
                "ftp_picture_upload":true,
                "ftp_video_upload":false,
                "picture_to_cloud":true,
                "video_to_cloud":false,
                "voice_prompts_index":[
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
                "voice_prompts_select":[
                    1,
                    0
                ],
                "voice_prompts_time":[
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    },
                    {
                        "start_hour":0,
                        "start_minute":0,
                        "start_second":0,
                        "end_hour":23,
                        "end_minute":59,
                        "end_second":59
                    }
                ],
                "copy_ch":"all",
                "chn_index":"CH6"
            }
        },
        "page_type":"AlarmConfig"
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
