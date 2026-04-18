# Get

## Function

This API is used to get parameter for Network > Email.

## Request Message

None.

Sample:

POST /API/NetworkConfig/Email/Get HTTP/1.1

{
    "version": "1.0",
}

## Response Message

### Parameter Description

See Network > Email > Range > Parameter description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "1.0",
    "result":"success",
    "data":{
        "email_enable": "false",
        "encryption": "AUTO",
        "smtp_port": 25,
        "smtp_server": "",
        "username": "",
        "password": "",
        "sender": "",
        "recvemail_1": "",
        "recvemail_2": "",
        "recvemail_3": "",
        "interval_time": 3
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
