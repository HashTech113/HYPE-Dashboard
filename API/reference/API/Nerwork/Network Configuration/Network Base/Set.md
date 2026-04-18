# Set

## Function

This API is used to set parameter for Network > Network Configuration > Network Base.

## Request Message

See Network > Network Configuration > Network Base > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/NetBase/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "page_type": "net_general",
        "wan": {
            "dhcp": false,
            "ip_address": "172.016.010.169",
            "subnet_mask": "255.255.000.000",
            "gateway": "172.016.008.001",
            "ipv6_address": "fe80::5ef2:7ff:fe49:3141",
            "ipv6_prefixlen": 64,
            "ipv6_gateway": "fe80::/64",
            "dns1": "172.018.001.222",
            "dns2": "008.008.008.008",
            "dhcp_enable": true
        },
        "web_compatibility_mode": false,
        "lan": {
            "poedhcp": true,
            "ip_address": "010.010.025.100",
            "subnet_mask": "255.255.000.000"
        },
        "video_encrypt_transfer": []
    }
}

## Response Message

None

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
