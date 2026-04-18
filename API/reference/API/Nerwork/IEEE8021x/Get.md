# Get

## Function Introduction

This API is used to get parameter for Network > IEEE8021x .

## Request Message

None

Sample：

POST /API/NetworkConfig/IEEE8021x/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > IEEE8021x > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ieee_enable": true,
        "authentication_type": "EAP-PEAP/MSCHAPv2",
        "username": "test",
        "password": "",
        "password_empty": false,
        "authentication": {
            "client_certificate_server_certificate": {
                "install_button": true,
                "delete_button": false,
                "private_key_password": "",
                "private_key_password_empty": true
            },
            "client_passwd_auth_server_certificate": {
                "password": "",
                "password_empty": false,
                "install_button": false,
                "delete_button": true
            },
            "client_passwd_auth_only": {}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
