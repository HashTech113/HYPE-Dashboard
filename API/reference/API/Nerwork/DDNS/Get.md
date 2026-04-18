# Get

## Function

This API is used to get parameter for Network>DDNS.

## Request Message

None.

Sample：

POST /API/NetworkConfig/DDNS/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

See Network > DDNS > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "1.0",
    "result": "success",
    "data": {
        "ddns_enable": true,
        "server": "NO_IP",
        "domain": "172.16.11.333",
        "username": "admin",
        "password": "",
        "password_empty": false,
        "api_key_empty": true,
        "test_befault_save": false
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
