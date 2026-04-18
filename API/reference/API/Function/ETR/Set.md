# Set

## Function

This API is used to set parameter for Function > ETR page.

## Request Message

## Parameter Description

Table 1

| Parameter | Range | Type | Description |

| EventStreamState |   | bool | Event stream status |

Sample:

POST /API/StreamConfig/EventStreamState/Set HTTP/1.1

{
    "data": {
        "EventStreamState":true
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 40

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
