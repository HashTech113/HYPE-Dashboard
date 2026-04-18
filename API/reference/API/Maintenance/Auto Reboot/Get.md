# Get

## Function

This API is used to get auto restart page parameters.

## Request Message

None.

Sample:

POST /API/Maintenance/AutoReboot/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Maintenance > Auto Reboot > Range > parameter description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "auto_reboot": true,
        "period_mode": "EveryWeek",
        "week": "Sun",
        "time": "00:00"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
