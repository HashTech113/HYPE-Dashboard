# Get

## Function

This API is used to get parameter for AI > Setup > Human & Vehicle Detection  page.

## Request Message

See AI > Setup > Human & Vehicle Detection > Range > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/Setup/PVD/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

See AI > Setup > Human & Vehicle Detection > Range > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "switch": true,
        "sensitivity": 60,
        "snap_mode": "Default",
        "snap_num": "1",
        "snap_frequency": 2,
        "max_pixel": 640,
        "min_pixel": 64,
        "detection_mode": "MotionMode",
        "detection_type": [
            "Pedestrian",
            "Motor Vehicle",
            "Non-motorized Vehicle"
        ],
        "rule_info": {"rule_number1": {
            "detection_range": "FullScreen",
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
        }}
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
