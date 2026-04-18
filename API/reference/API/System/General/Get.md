# Get

## Function

This API is used to get parameter for System > General page.

## Request Message

None.

Sample:

POST /API/SystemConfig/General/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See System > General > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "device_name": "N5208EN",
        "menu_timeouts": 30,
        "session_timeout": 5,
        "preview_session_timeout": true
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
