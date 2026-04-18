# Add

## Function

This API is used for adding Thermal > Fire Detection parameter

## Request Message

### Parameter Description

See Thermal > Fire Detection > Request Message >Parameter Description > Table 1 Get Parameter description

Sample:

POST /API/Thermal/Setup/FireDetection/Add HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel": "CH2",
        "page_type": "ChannelConfig"
    }
}

## Response Message

none

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response message body and general error_code for more information.
