# Get

## Function

This API is used to get parameter for Network>Voice Assistant.

## Request Message

### Parameter Description

See Network > Voice Assistant > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/SMARTHOME/Get HTTP/1.1

This API is currently not implemented.

{
    "version": "1.0",
    "data": {"SmartHomePage": "Amazon"}
}

## Response Message

### Parameter Description

See Network > Voice Assistant > Range > Parameter Description > Table 2 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "BindEnable": true,
        "UserName": "xxxx@qq.com",
        "ScreenStream": "Substream"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
