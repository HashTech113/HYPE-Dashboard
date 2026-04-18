# Set

## Function

This API is used to set fan switch.

## Request Message

See System > DefoggingFan > Range > Parameter Description > Table 1 for Parameter Description.

Sample:

POST /API/Maintenance/DefoggingFan/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "defogging_fan": true
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
