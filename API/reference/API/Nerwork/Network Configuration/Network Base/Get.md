# Get

## Function

This API is used to get parameter for Network > Network Configuration > Network Base.

## Request Message

None

Sample：

POST /API/NetworkConfig/NetBase/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > Network Configuration > Network Base > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
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
        "lan": {
            "poedhcp": true,
            "ip_address": "010.010.025.100",
            "subnet_mask": "255.255.000.000"
        },
        "pppoe": {
            "enable": false,
            "username": "",
            "pppoenewstruct": true,
            "password_empty": true,
            "dns2": "008.008.008.008"
        },
        "wifi": {
            "enable": true,
            "ssid": "btiPhone",
            "password_empty": false,
            "ip_address": "000.000.000.000"
        },
        "port": [
            {
                "service": "Web",
                "protocol": "TCP",
                "internal_port": 80,
                "external_port": 80,
                "upnp_status": "Inactive",
                "maping_strategy": "Auto",
                "upnp": false
            },
            {
                "service": "Client",
                "protocol": "TCP",
                "internal_port": 9000,
                "external_port": 9000,
                "upnp_status": "Inactive",
                "maping_strategy": "Auto",
                "upnp": false
            }
        ],
        "p2p_switch": true,
        "extern_ip": "",
        "device_instruction": "nvr",
        "web_compatibility_mode": false,
        "video_encrypt_transfer": [],
        "forward_port": true,
        "rtsp_url": "rtsp://ip:port/rtsp/streaming?channel=A&subtype=B"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
