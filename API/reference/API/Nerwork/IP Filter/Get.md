# Get

## Function

This API is used to obtain Network > IP Filter parameters.

## Request Message

None.

Sample:

POST /API/NetworkConfig/IPFilter/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > IP Filter > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "enable": true,
        "choose": "Whitelist",
        "restricted_type": "Whitelist",
        "whitelist": [{
            "start_address": "172.16.8.25",
            "end_address": "172.16.8.25",
            "ip_type": "Ipv4"
        }],
        "blacklist": []
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
