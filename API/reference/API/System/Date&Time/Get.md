# Get

## Function

This API is used to get parameter for System > Date&Time page.

## Request Message

None.

Sample:

POST /API/SystemConfig/DateTime/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See System > Date&Time > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "date": "06/15/2023",
        "time": "20:08:47",
        "date_format": "MM/DD/YYYY",
        "time_format": 12,
        "time_zone": "GMT+8:00"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
