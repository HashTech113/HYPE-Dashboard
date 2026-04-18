# Set

## Function

This API is used to set parameter for AI > Setup > Heat Map page.

## Request Message

See AI > Setup > Heat Map > Get > Parameter Description > Table 2 for parameter description.

Sample:

POST API/AI/Setup/HeatMap/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {"CH1": {
            "status": "Online",
            "switch": false,
            "rule_info": {"rule_number1": {
                "rule_switch": true,
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 704,
                    "y2": 0,
                    "x3": 704,
                    "y3": 576,
                    "x4": 0,
                    "y4": 576
                },
                "rule_number": "rule_number1"
            }},
            "chn_index": "CH1",
            "page": "chn_pd",
            "curPage": "chn_heat_map",
            "rule": {
                "rule_switch": true,
                "rule_rect": {
                    "x1": 0,
                    "y1": 0,
                    "x2": 704,
                    "y2": 0,
                    "x3": 704,
                    "y3": 576,
                    "x4": 0,
                    "y4": 576
                },
                "rule_number": "rule_number1"
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
