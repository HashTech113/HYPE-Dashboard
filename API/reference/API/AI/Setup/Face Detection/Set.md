# Set

## Function

This API is used to set parameter for AI > Setup > Face Detection page.

## Request Message

See AI > Setup > Face Detection > Get >Parameter Description > Table 2 for parameter description.

Sample:

POST /API/AI/Setup/FD/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {"CH1": {
            "status": "Online",
            "switch": false,
            "face_attribute": false,
            "snap_mode": "OptimalMode",
            "snap_num": "1",
            "snap_frequency": 2,
            "apply_mode": "FrontalView",
            "roll_range": 30,
            "pitch_range": 30,
            "yaw_range": 45,
            "picture_quality": 100,
            "min_pixel": 64,
            "max_pixel": 640,
            "detection_mode": "StaticMode",
            "rule_info": {"rule_number1": {
                "detection_range": "FullScreen",
                "rule_kind": "Rect",
                "rule_line": {
                    "x1": 322,
                    "y1": 30,
                    "x2": 322,
                    "y2": 545
                },
                "rule_type": "A->B",
                "rule_rect": {
                    "x1": 30,
                    "y1": 30,
                    "x2": 30,
                    "y2": 545,
                    "x3": 675,
                    "y3": 545,
                    "x4": 675,
                    "y4": 30
                }
            }},
            "chn_index": "CH1",
            "page": "chn_fd",
            "rule": {
                "detection_range": "FullScreen",
                "rule_kind": "Rect",
                "rule_line": {
                    "x1": 322,
                    "y1": 30,
                    "x2": 322,
                    "y2": 545
                },
                "rule_type": "A->B",
                "rule_rect": {
                    "x1": 30,
                    "y1": 30,
                    "x2": 30,
                    "y2": 545,
                    "x3": 675,
                    "y3": 545,
                    "x4": 675,
                    "y4": 30
                }
            }
        }},
        "page_type": "ChannelConfig"
    }
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
