# Get

## Function

This API is used to get parameter for Network>Onvif.

## Request Message

None

Sample：

POST /API/NetworkConfig/Onvif/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > Onvif > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "enable": true,
        "authentication": "Digest/WSSE",
        "protocol": "HTTP/HTTPS",
        "username": "admin",
        "password": "",
        "password_empty": false
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
