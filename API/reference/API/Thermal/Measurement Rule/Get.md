# Get

## Function

This API is used to get parameter for Thermal > Measurement Rule page.

## Request Message

### Parameter Description

See Thermal > Measurement Rule > Request Message >Parameter Description > Table 1 Get Parameter description.

Sample:

POST /API/Thermal/Setup/MeasurementRules/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
        "page_type":"ChannelConfig"
        }

}

## Response Message

### Parameter Description

see Thermal > Measurement Rule > Response Message >Parameter Description > Table 2 Get Parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH2": {
        "status": "Online",
        "id_info": [{
            "id_switch": false,
            "Id": 1,
            "rule_name": "1",
            "emissivity": 0.96,
            "target_distance": 1,
            "reflective_temp": 25,
            "alarm_temp": 40,
            "alarm_rules": "Above Max Temp",
            "duration_time": 3,
            "tolerance_temp": 3,
            "rule_info": {
                "rule_point": {
                    "x": -1,
                    "y": -1
                },
                "rule_type": "Point"
            }
        }]
    }}}
}

## Error Code

See Response message body and general error_code for more information.
