# Set

## Function

This API is used to set parameter for Network>Tuya.

## Request Message

### Parameter Description

See Network > Tuya > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/Tuya/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "enable":"true"
    }
}

## Response Message

None

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
