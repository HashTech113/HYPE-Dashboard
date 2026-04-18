# Set

## Function

This API is used to set parameter for AI > Setup > Stationary Object Detection page.

## Request Message

See AI > Setup > Stationary Object Detection > Get > Parameter Description > Table 2 for parameter description.

Sample:

POST API/AI/Setup/SOD/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {"CH1": {
            "status": "Online",
            "switch": false,
            "sensitivity": 3,
            "rule_info": {
                "rule_number1": {
                    "rule_switch": false,
                    "rule_type": "Legacy",
                    "rule_rect": {
                        "x1": 231,
                        "y1": 176,
                        "x2": 182,
                        "y2": 501,
                        "x3": 423,
                        "y3": 460,
                        "x4": 419,
                        "y4": 207
                    },
                    "rule_number": "rule_number1"
                },
                "rule_number2": {
                    "rule_switch": false,
                    "rule_type": "Legacy",
                    "rule_rect": {
                        "x1": 0,
                        "y1": 0,
                        "x2": 0,
                        "y2": 0,
                        "x3": 0,
                        "y3": 0,
                        "x4": 0,
                        "y4": 0
                    }
                },
                "rule_number3": {
                    "rule_switch": false,
                    "rule_type": "Legacy",
                    "rule_rect": {
                        "x1": 0,
                        "y1": 0,
                        "x2": 0,
                        "y2": 0,
                        "x3": 0,
                        "y3": 0,
                        "x4": 0,
                        "y4": 0
                    }
                },
                "rule_number4": {
                    "rule_switch": false,
                    "rule_type": "Legacy",
                    "rule_rect": {
                        "x1": 0,
                        "y1": 0,
                        "x2": 0,
                        "y2": 0,
                        "x3": 0,
                        "y3": 0,
                        "x4": 0,
                        "y4": 0
                    }
                }
            },
            "chn_index": "CH1",
            "page": "chn_sod",
            "rule": {
                "rule_switch": false,
                "rule_type": "Legacy",
                "rule_rect": {
                    "x1": 231,
                    "y1": 176,
                    "x2": 182,
                    "y2": 501,
                    "x3": 423,
                    "y3": 460,
                    "x4": 419,
                    "y4": 207
                },
                "rule_number": "rule_number1"
            }
        }},
        "page_type": "ChannelConfig"
    }
}

## Response Message

## Error_Code Response

Error Information JSON(show as follow Table AI > Setup > Stationary Object Detection > Set > Error_Code Response > Table 1)(cloud_video_upload_chn_limit the return information attached to the error code)

Table 1

| Parameter | Range | Type | Description |

| cloud_video_is_used | 0~MAX_PARA_CHN_NUM | array | The channel number for which the cloud video upload function has been enabled |

| max_cloud_video_upload_num | MAX_CLOUD_VIDEO_RECORD_NUM | int | The maximum number of channels supported by cloud video upload |

| analog_channel_is_used | 0~MAX_ANALOG_CHN | array | The number of the analog channel with the smart switch turned on |

| max_intelligent_analog_channel_num | 1 | int | The maximum number of analog channels supported by the smart switch |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
