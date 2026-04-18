# Set

## Function

This API is used to set parameter for System > NTP page.

## Request Message

See System > NTP > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/SystemConfig/NTP/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "ntp_enable": false,
        "server": "pool.ntp.org",
        "custom_server": ""
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
