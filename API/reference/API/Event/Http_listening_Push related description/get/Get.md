# Get

## Function

This API is used to get parameter for Event > Http listening Push related description page.

## Request Param

None.

Sample:

GET /API/AlarmEvent/EventPush?EventType=VideoMotion&EventTime=2023-7-13 7:18:49&EventAction=start&ChannelName=senvi&MACAddress=00-23-63-69-23-6D HTTP/1.1
Host: 172.16.8.138:123
Accept: */*
Content-Type: application/json;charset=UTF-8

## Response Message

Sample:

### Successful Response

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

### Response Failure

HTTP/1.1 400 Bad Request
Connection:close
Content-Length:48
Content-Security-Policy:default-src 'self'; style-src 'self' 'unsafe-inline; script-src 'self' 'unsafe-eval' 'unsafe-inline'; worker-src 'self' data; blob:; media-src 'self' data: blob:; img-src 'self' data:
Content-Type:application/json

{
    "version":"1.0",
    "error_code":"http_format_err"
}

## Error Code

See Response Messages Body and Common error_code for more information.
