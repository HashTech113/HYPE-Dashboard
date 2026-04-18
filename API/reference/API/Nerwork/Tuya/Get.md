# Get

## Function

This API is used to get parameter for Network>Tuya.

## Request Message

None

Sample：

POST /API/NetworkConfig/Tuya/Get HTTP/1.1

{
    "version":"1.0"
}

## Response Message

### Parameter Description

See Network > Tuya > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":
    {
        "enable":"false"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
