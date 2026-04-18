# Get

## Function

This API is used to get parameter for System > Output page.

## Request Message

None.

Sample:

POST /API/SystemConfig/Output/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See System > Output > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "output": {
            "LIVE-OUT": {
                "output_resolution": "1280x1024"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
