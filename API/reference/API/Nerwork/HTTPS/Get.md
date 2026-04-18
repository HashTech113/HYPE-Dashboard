# Get

## Function

This API is used to get Network > HTTPS parameters.

## Request Message

None.

Sample:

POST /API/NetworkConfig/https/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > HTTPS > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "https_enable": true,
        "file_type": "Default",
        "file_exist": 0
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
