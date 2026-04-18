# KeepLive

## Function

This API is used to get parameter for Event > Http listening Push related description page.

## Request Message

| Parameter | Range | Type | Description |

| time |   | string | The current number of seconds obtained through time() |

Sample:

POST /API/HttpListening/KeepLive HTTP/1.1
Host: 172.16.8.238:123
Accept: */*
Content-Type: application/json;charset=UTF-8
Content-Length: 30

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
