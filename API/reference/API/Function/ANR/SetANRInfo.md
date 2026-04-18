# SetANRInfo

## Function

This API is used to set parameter for Function > ANR page.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| enable |   | int | ANR switch |

| device_flag |   | string | Client Mac |

Sample:

POST /API/ANRConfig/SetANRInfo HTTP/1.1

{
"data": {
        " device_flag ": "88-DF-58-18-4F-47 "
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
