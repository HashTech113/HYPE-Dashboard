# Get

## Function

This API is used for get Thermal > Fire Detection parameter

## Request Message

### Parameter Description

See Thermal > Fire Detection > Request Message >Parameter Description > Table 1 Get Parameter description

Sample:

POST /API/Thermal/Setup/FireDetection/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
        "page_type":"ChannelConfig"
        }

}

## Response Message

### Parameter Description

See Thermal > Fire Detection > Response Message >Parameter Description > Table 2 Get Parameter description

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH2": {
        "status": "Online",
        "detection": {
            "switch": true,
            "sensitivity": 50
        },
        "region_shield": {"region_area_info": [{
            "id_switch": false,
            "area_id": 1,
            "area_name": "Fire Mark1",
            "point_num": [
                3,
                8
            ],
            "rule_area": {
                "x1": 0,
                "y1": 0,
                "x2": 0,
                "y2": 0,
                "x3": 0,
                "y3": 0,
                "x4": 0,
                "y4": 0,
                "x5": 0,
                "y5": 0,
                "x6": 0,
                "y6": 0,
                "x7": 0,
                "y7": 0,
                "x8": 0,
                "y8": 0
            }
        }]}
    }}}
}

## Error Code

See Response message body and general error_code for more information.
