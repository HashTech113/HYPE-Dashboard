# Get

## Function

This API is used to get fan switch information.

## Request Message

None.

Sample:

POST /API/Maintenance/DefoggingFan/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

See System > DefoggingFan > Range > Parameter Description > Table 1 for Parameter Description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "defogging_fan": true
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
