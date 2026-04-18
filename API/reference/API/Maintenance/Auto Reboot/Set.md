# Set

## Function

This API is used to set auto restart page parameters.

## Request Message

See Maintenance > Auto Reboot > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/Maintenance/AutoReboot/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "auto_reboot":false,
        "period_mode":"EveryWeek",
        "time":"00:00",
        "week":"Sun"
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
