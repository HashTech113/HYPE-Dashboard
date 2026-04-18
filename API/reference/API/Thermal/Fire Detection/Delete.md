# Delete

## Function

This API is used for deletion Thermal > Fire Detection parameter

## Request Message

### Parameter Description

See Thermal > Fire Detection  > Request Message >Parameter Description > Table 1 Get Parameter description

Sample:

POST /API/Thermal/Setup/FireDetection/Delete HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel": "CH2",
        "page_type": "ChannelConfig",
        "DeleteId": [2]
    }
}

## Response Message

none.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response message body and general error_code for more information.
