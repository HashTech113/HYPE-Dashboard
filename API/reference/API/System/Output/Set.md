# Set

## Function

This API is used to set parameter for System > Output page.

## Request Message

See System > Output > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/SystemConfig/Output/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "output": {
            "LIVE-OUT": {
                "output_resolution": "1280x1024"
            }
        }
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
