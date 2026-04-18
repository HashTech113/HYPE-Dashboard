# Set

## Function

This API is used to set parameter for AI > Setup > Cross Counting page.

## Request Message

See AI > Setup > Cross Counting > Get > Parameter Description > Table 2 for parameter description.

Sample:

POST API/AI/Setup/CrossCount/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {"CH1": {
            "status": "Online",
            "switch": false,
            "sensitivity": 2,
            "alarm_num": 1,
            "type": "Pedestrian",
            "reset_count": false,
            "start_time": "00:00:00",
            "end_time": "23:59:59",
            "rule_info": {"rule_number1": {
                "rule_type": "A->B",
                "rule_switch": false,
                "rule_line": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0
                },
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0,
                    "x3": 0,
                    "y3": 0,
                    "x4": 0,
                    "y4": 0
                },
                "rule_number": "rule_number1"
            }},
            "chn_index": "CH1",
            "page": "chn_cc",
            "isAiPage": true,
            "rule": {
                "rule_type": "A->B",
                "rule_switch": false,
                "rule_line": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0
                },
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 0,
                    "y2": 0,
                    "x3": 0,
                    "y3": 0,
                    "x4": 0,
                    "y4": 0
                },
                "rule_number": "rule_number1"
            }
        }},
        "page_type": "ChannelConfig"
    }
}

## Response Message

## Error_Code Response

Error Information JSON(show as follow Table Table 9)(cloud_video_upload_chn_limit the return information attached to the error code)

Table 9

| Parameter | Range | Type | Description |

| cloud_video_is_used | 0~MAX_PARA_CHN_NUM | array | The channel number for which the cloud video upload function has been enabled |

| max_cloud_video_upload_num | MAX_CLOUD_VIDEO_RECORD_NUM | int | The maximum number of channels supported by cloud video upload |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
