# Set

## Function

This API contains parameters for setting light and sound sirens.

## Request Message

### Parameter Description

See PreviewChannel > Floodlight2AudioAlarm > Get > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/PreviewChannel/Floodlight2AudioAlarm/Set HTTP/1.1

{
    "version": "1.0",
    "data":{
        "channel":"CH8",
        "redBlueLight_switch":true,
        "audioAlarm_switch":false,
        "audioAlarm_value":5,
        "audioAlarm_value_range":
        {
            "type":"int32",
            "min":1,
            "max":10
        },
        "audioAlarm_value_adjustable":true,
        "operation_type":"RedBlueLight"
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
