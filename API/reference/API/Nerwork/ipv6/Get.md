# Get

## Function

This API is used to get parameter for Network > ipv6.

## Request Message

None.

Sample：

POST /API/NetworkConfig/ipv6/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > ipv6 > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "prefixlen": 64,
        "local_ipv6_addr": "fe80::223:63ff:fe0a:901b",
        "global_ipv6_addr": "fe80::223:63ff:fe0a:901b"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
