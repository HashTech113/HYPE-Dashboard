# Get

## Function

This API is used to get parameter for AI > Setup > Crowd Density Detection  page.

## Request Message

See AI > Setup > Crowd Density Detection > Range > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/Setup/CD/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

See AI > Setup > Crowd Density Detection > Range > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "switch": true,
        "sensitivity": 2,
        "max_pixel": 640,
        "min_pixel": 32,
        "max_detection_num": 50,
        "detection_range": "Customize",
        "rule_info": {"rule_number1": {
            "rule_switch": true,
            "rule_rect": {
                "x1": 30,
                "y1": 175,
                "x2": 240,
                "y2": 30,
                "x3": 465,
                "y3": 30,
                "x4": 675,
                "y4": 175,
                "x5": 675,
                "y5": 400,
                "x6": 465,
                "y6": 545,
                "x7": 240,
                "y7": 545,
                "x8": 30,
                "y8": 400
            }
        }}
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
