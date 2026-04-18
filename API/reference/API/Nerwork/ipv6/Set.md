# Set

## Function

This API is used to set parameter for Network > ipv6.

## Request Message

### Parameter Description

See Network>ipv6>Range>Parameter Description>Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "prefixlen": 64,
        "local_ipv6_addr": "fe80::223:63ff:fe0a:901b",
        "global_ipv6_addr": "fe80::223:63ff:fe0a:901b"
    }
}

## Response Message

None.

Sample：

POST /API/NetworkConfig/ipv6/Set HTTP/1.1

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
