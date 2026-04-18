# Set

## Function

This API is used to set parameter for Alarm > Line Crossing Detection .

## Request Message

### Parameter Description

See Alarm > Line Crossing Detection > Range > Parameter Description > Table 2 for parameter description

Sample：

POST /API/AlarmConfig/Intelligent/LCD/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "channel_info":
        {
            "CH4":
            {
                "buzzer":"0",
                "alarm_out":[],
                "latch_time":"10",
                "record_enable":true,
                "record_channel":["CH4"],"post_recording":"30",
                "show_message":false,
                "send_email":false,
                "full_screen":false,"ftp_picture_upload":false,"ftp_video_upload":false,"picture_to_cloud":false,"video_to_cloud":false,"http_listening":false,"voice_prompts_index":[0,0,0,0,0,0,0,0,0,0,0,0],
                "voice_prompts_select":[0,0],"voice_prompts_time":[
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
                "chn_index":"CH4"
            },
            "CH18":
            {
                "buzzer":"0",
                "alarm_out":[],
                "latch_time":"10",
                "record_enable":true,
                "record_channel":["CH18"],"post_recording":"30",
                "show_message":false,
                "send_email":false,
                "full_screen":false,"ftp_picture_upload":false,"ftp_video_upload":false,"picture_to_cloud":false,"video_to_cloud":false,"http_listening":false,"voice_prompts_index":[0,0,0,0,0,0,0,0,0,0,0,0],
                "voice_prompts_select":[0,0],"voice_prompts_time":[
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
                "copy_ch":"all"
            }
        },
        "page_type":"AlarmConfig"
    }
}

## Response Message

### Parameter Description

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
