# GetClientMac

## Function

This API is used to set parameter for Function > ANR page.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| mac_address |   | string | Client Mac |

Sample:

POST /API/ANRConfig/GetClientMac HTTP/1.1

{
    "version": "1.0",
    "data": {
        "mac_address":"88-DF-58-18-4F-47 "
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
