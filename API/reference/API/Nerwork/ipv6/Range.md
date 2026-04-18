# Range

## Function

This API is used to get the parameter range of Network > ipv6.

## Request Message

None.

Sample：

POST /API/NetworkConfig/ipv6/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| prefixlen | 1-128 | int | prefix length |

| local_ipv6_addr | Max length: 40byte | string | local ipv6 ipaddr |

| global_ipv6_addr | Max length: 40byte | string | global ipv6 ipaddr |

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "prefixlen": {
            "type": "int32",
            "min": 1,
            "max": 127
        },
        "local_ipv6_addr": {
            "type": "string",
            "min_len": 14,
            "max_len": 39
        },
        "global_ipv6_addr": {
            "type": "string",
            "min_len": 7,
            "max_len": 39
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
