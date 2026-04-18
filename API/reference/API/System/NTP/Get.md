# Get

## Function

This API is used to get parameter for System > NTP page.

## Request Message

None.

Sample:

POST /API/SystemConfig/NTP/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See System > NTP > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ntp_enable": false,
        "server": "pool.ntp.org",
        "custom_server": ""
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
