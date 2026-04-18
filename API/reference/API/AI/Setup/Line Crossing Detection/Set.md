# Set

## Function

This API is used to set parameter for AI > Setup > Line Crossing Detection page.

## Request Message

See AI > Setup > Line Crossing Detection > Get > Parameter Description > Table 2 for parameter description.

Sample:

POST API/AI/Setup/LCD/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {"CH1": {
            "status": "Online",
            "switch": true,
            "sensitivity": 2,
            "detection_type": [],
            "rule_info": {
                "rule_number1": {
                    "rule_switch": true,
                    "rule_type": "A<-->B",
                    "rule_line": {
                        "x1": 406,
                        "y1": 165,
                        "x2": 396,
                        "y2": 482
                    }
                },
                "rule_number2": {
                    "rule_switch": true,
                    "rule_type": "A<-->B",
                    "rule_line": {
                        "x1": 263,
                        "y1": 171,
                        "x2": 254,
                        "y2": 483
                    },
                    "rule_number": "rule_number2"
                },
                "rule_number3": {
                    "rule_switch": false,
                    "rule_type": "A->B",
                    "rule_line": {
                        "x1": 0,
                        "y1": 0,
                        "x2": 0,
                        "y2": 0
                    }
                },
                "rule_number4": {
                    "rule_switch": false,
                    "rule_type": "A->B",
                    "rule_line": {
                        "x1": 0,
                        "y1": 0,
                        "x2": 0,
                        "y2": 0
                    }
                }
            },
            "chn_index": "CH1",
            "page": "chn_lcd",
            "rule": {
                "rule_switch": true,
                "rule_type": "A<-->B",
                "rule_line": {
                    "x1": 263,
                    "y1": 171,
                    "x2": 254,
                    "y2": 483
                },
                "rule_number": "rule_number2"
            }
        }},
        "page_type": "ChannelConfig"
    }
}

## Response Message

## Error_Code Response

Error Information JSON(show as follow Table AI > Setup > Line Crossing Detection > Get > Parameter Description > Table 8)(cloud_video_upload_chn_limit the return information attached to the error code)

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
