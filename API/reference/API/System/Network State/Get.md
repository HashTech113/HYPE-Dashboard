# Get

## Function

This API is used to get parameter for System > Network State page.

## Request Message

None.

Sample:

POST /API/SystemInfo/Network/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| wan |   | object | Wan object,see System > Network State > Get > Parameter Description > Table 2 for more information |

| lan |   | object | Lan object,see System > Network State > Get > Parameter Description > Table 3 for more information |

| port |   | object | Port object,see System > Network State > Get > Parameter Description > Table 4 for more information |

| bandwidth |   | object | Bandwidth object,see System > Network State > Get > Parameter Description > Table 5 for more information |

| lan1 |   | object | Lan1 object,see System > Network State > Get > Parameter Description > Table 6 for more information.(used in new network card mode) |

| lan2 |   | object | Lan2 object,see System > Network State > Get > Parameter Description > Table 7 for more information.(used in new network card mode) |

| poe |   | object | Poe object,see System > Network State > Get > Parameter Description > Table 8 for more information.(used in new network card mode) |

| pppoe | Enable Disable | string | PPPoE function switch |

| 3g | Enable Disable | string | 3G network function switch |

| wifi | Enable Disable | string | WIFI function switch |

| toe | Enable Disable | string | TOE Acceleration sign |

#### Table 2

Wan object

| Parameter | Range | Type | Description |

| dhcp | Enable Disable | string | DHCP function switch |

| ip_address |   | string | IP address, for example: 192.168.1.24 |

| subnet_mask |   | string | Subnet mask, for example: 255.255.255.0 |

| gateway |   | string | Default gateway, for example: 192.168.1.1 |

| mac_address |   | string | Physical address, such as 88-60-50-4E-87-29 |

| ipv6_address | Max length: 46 byte | string | Ipv6 address |

| ipv6_gateway | Max length: 46 byte | string | IPv6 gateway |

#### Table 3

Lan object

| Parameter | Range | Type | Description |

| ip_address |   | string | Switch IP address |

| subnet_mask |   | string | Switch Subnet Mask |

#### Table 4

Port object

| Parameter | Range | Type | Description |

| web client rtsp https | Port,Export,ExportState,Upnp | string string string string | Format: "Internal Port Number, External Port Number, Port UPnP Function Status, Port Enable UPnP Function" {ExportState:” Active”,” Inactive”} {Upnp:” Enable”,” Disable”} |

#### Table 5

Bandwidth object

| Parameter | Range | Type | Description |

| Total_Bandwidth |   | string | Total bandwidth |

| Used_Bandwidth |   | string | Used bandwidth |

#### Table 6

Lan1 Object

| Parameter | Range | Type | Description |

| Dhcp | Enable Disable | string | IPv4 DHCP function switch |

| IP_Address |   | string | IP address, for example: 192.168.1.24 |

| Subnet_Mask |   | string | Subnet mask, for example: 255.255.255.0 |

| Gateway |   | string | Default gateway, for example: 192.168.1.1 |

| Dhcpv6 | Enable Disable | string | IPv6 DHCP function switch |

| Ipv6_Address |   | string | IPv6 address |

| Ipv6_Prefixlen |   | int |   |

| Ipv6_Gateway |   | string | IPv6 gateway |

| Mac_Address |   | string | Physical address, for example: 88-60-50-4E-87-29 |

#### Table 7

Lan2 Object

| Parameter | Range | Type | Description |

| Dhcp | Enable Disable | string | IPv4 DHCP function switch |

| IP_Address |   | string | IP address, for example: 192.168.1.24 |

| Subnet_Mask |   | string | Subnet mask, for example: 255.255.255.0 |

| Gateway |   | string | Default gateway, for example: 192.168.1.1 |

| Dhcpv6 | Enable Disable | string | IPv6 DHCP function switch |

| Ipv6_Address |   | string | IPv6 address |

| Ipv6_Prefixlen |   | int |   |

| Ipv6_Gateway |   | string | IPv6 gateway |

| Mac_Address |   | string | Physical address, for example: 88-60-50-4E-87-29 |

#### Table 8

Poe object

| Parameter | Range | Type | Description |

| poe_dhcp | Enable Disable | string | Poe DHCP function switch |

| poe_ip_address |   | string | POE IP address, for example: 192.168.1.24 |

| poe_subnet_mask |   | string | POE subnet mask, for example: 255.255.255.0 |

Please note that future products will integrate the web and client ports, and the client port will not be opened and this item will be removed from the page in the future. If customers are doing development docking, please do not consider this port again.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "wan": {
            "dhcp": "Disable",
            "ip_address": "172.16.10.49",
            "subnet_mask": "255.255.252.0",
            "gateway": "172.16.8.1",
            "mac_address": "88-26-1D-AA-8E-E0",
            "ipv6_address": "fe80::8a26:1dff:feaa:8ee0 / 64",
            "ipv6_gateway": "fe80::/64"
        },
        "dns1": "172.18.1.222",
        "dns2": "8.8.8.8",
        "pppoe": "Enable",
        "State": "Connectting",
        "port": {
            "web": "80,80,Inactive,Enable",
            "client": "9000,9000,Inactive,Disable"
        },
        "bandwidth": {
            "total_bandwidth": "114688Kbps",
            "used_bandwidth": "6144Kbps"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
