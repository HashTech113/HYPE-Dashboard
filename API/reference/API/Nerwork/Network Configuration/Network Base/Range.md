# Range

## Function

This API is used to get the parameter range of Network > Network Configuration > Network Base.

## Request Message

### Parameter Description

##### Table 11

| Parameter | Range | Type | Description |

| page_type | "net_general" | string | string length:0-16 |

Sample

POST /API/NetworkConfig/NetBase/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "net_general"}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| wan |   | JSON object | Single JSON，see Table 2 for more information |

| lan |   | JSON object | Single JSON，see Table 3 for more information(NVR exclusive) |

| pppoe |   | JSON object | Single JSON，see Table 4 for more information |

| 3g |   | JSON object | Single JSON，see Table 5 for more information |

| wifi |   | JSON object | Single JSON，see Table 6 for more information |

| port |   | JSON object | Single JSON，see Table 7 for more information |

| extern_ip |   | string | External network IP, valid when external network is enabled |

| p2p_switch |   | bool | P2P function switch |

| ipeye_switch |   | bool | IPEYE switch(DVR、NVR exclusive) |

| device_instruction | “nvr”“xvr” “dvr” “ipc” | string | Device type description flag |

| web_compatibility |   | bool | Web Compatibility mode switch |

| toe |   | bool | Switch mode(NVR exclusive) |

| video_encrypt_transfer | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the functionality of the device | array | Video encryption transmission channel Each array bit represents a channel with a string. |

| lan1 |   | JSON Object | Single JSON，see Table 8 for more information(Using in new network card mode) |

| lan2 |   | JSON Object | Single JSON，see Table 9 for more information(Using in new network card mode) |

| poe |   | JSON Object | Single JSON，see Table 10 for more information(Using in new network card mode) |

| net_card_mode | "Single Address Mode" , "Double Address Mode" | sring array | Network card mode |

| default_route | "WAN" " LAN1", "LAN2" | string array | Default route(Using in new network card mode) |

| net_car_select | "WAN" " LAN1", "LAN2" | string array | Network card selection(Using in new network card mode) |

| pppoe_net_card | "LAN1", "LAN2" | string array | PPPOE Network card selection(Using in new network card mode) |

| dns1 |   | string | Preferred DNS Server, sample:8.8.8.8（Using in new network card mode） |

| dns2 |   | string | Alternate DNS server, sample:8.8.8.8（Using in new network card mode） |

| operation_type | "LanModify" "PoeModify" | string | Example Change the type of a network parameter. |

| manual_ip_conflict |   | bool | Manual IP conflict |

###### Table 2

| Parameter | Range | Type | Description |

| dhcp |   | bool | DHCP function switch |

| ip_address |   | string | IP address，sample:192.168.1.24 |

| subnet_mask |   | string | subnet mask，sample:255.255.255.0 |

| gateway |   | string | gateway，sample:192.168.1.1 |

| ipv6_address |   | string | IPv6 address |

| ipv6_prefixlen |   | int |   |

| ipv6_gateway |   | string | IPv6 gateway |

| dns1 |   | string | Preferred DNS Server，sample:8.8.8.8 |

| dns2 |   | string | Alternate DNS server，sample:8.8.8.8 |

| ipv6_dns1 |   | string | ipv6 Preferred DNS Server, sample:8.8.8.8 |

| ipv6_dns2 |   | string | ipv6 Alternate DNS server, sample:8.8.8.8 |

| main_multicast_enable |   | bool | Main stream multicast switch(IPC exclusive) |

| main_multicast_address | （224.0.0.0-239.255.255.255） | string | Main stream multicast address(IPC exclusive) |

| main_multicast_port | 1024-65535 | int | Main stream multicast port(IPC exclusive) |

| sub_multicast_enable |   | bool | Subcode Stream Multicast switch(IPC exclusive) |

| sub_multicast_address | （224.0.0.0-239.255.255.255） | string | Subcode Stream Multicast Address(IPC only) |

| dhcp_enable |   | bool | The Dhcp enable switch does not enable the DHCP switch after enabling PPPOE(NVR exclusive) |

| rtsp_url |   | string | The URL format when using the rtsp server(NVR、DVR exclusive) |

| encryption |   | bool | video encryption |

| connection_protocol | "svnp" "onvif" | string | Connection protocol |

###### Table 3

| Parameter | Range | Type | Description |

| ip_address |   | string | Switch IP address |

| subnet_mask |   | string | Switch subnet mask |

| modify_field | "ip_address" "subnet_mask" | string | The specific parameter to be modified. This field is required only with operation_type. |

| show_tips |   | bool | Whether a prompt is required. The response needs to include this field only if the request has operation_type on it. |

###### Table 4

| Parameter | Range | Type | Description |

| enable |   | bool | PPoE function switch |

| username | Max length: 35byte | string | PPPoE user name |

| password | Max length: 35byte | string | PPPoE password |

| password_empty |   | bool | Is the password empty |

| ip_address |   | string | IP address，sample:192.168.1.24 |

| subnet_mask |   | string | subnet mask，sample:8.8.8.8 |

| gateway |   | string | default gateway，sample:192.168.1.1 |

| dns1 |   | string | Preferred DNS Server，sample:8.8.8.8 |

| dns2 |   | string | Alternate DNS server，sample:8.8.8.8 |

| pppoenewstruct |   | bool | Whether to use two sets of range control |

| base_enc_password |   | Json Object | encrypted password,see base_secondary_authentication for more information |

###### Table 5

| Parameter | Range | Type | Description |

| enable |   | bool | 3G network function switch |

| apn | Max length: 35byte | string | 3G apn |

| dial_code | Max length: 35byte | string | 3G DialCode |

| usename | Max length: 35byte | string | 3G user name |

| password | Max length: 335byte | string | 3G password |

| ip_address |   | string | IP address，sample:192.168.1.24 |

| subnet_mask |   | string | subnet mask，sample:8.8.8.8 |

| gateway |   | string | default gateway，sample:192.168.1.1 |

| dns1 |   | string | Preferred DNS Server，sample:8.8.8.8 |

| dns2 |   | string | Alternate DNS server，sample:8.8.8.8 |

| base_enc_password |   | Json Object | encrypted password,base_secondary_authentication |

###### Table 6

| Parameter | Range | Type | Description |

| enable |   | bool | WIFI function switch |

| ssid | Max length: 35byte | string | WIFISSID |

| password | Max length: 35byte | string | WIFI password |

| ip_address |   | string | IP address obtained by connecting to WIFI(Get only) |

| status | "Unconnected" "Connected" | string | WIFI connection status(Get only) |

| wifi_type | "MT7601" "WN650BT" | string | WIFI connection type |

| network_mode_type | "Dhcp" "Static" | string | WIFI mode |

| base_enc_password |   | Json Object | encrypted password,see base_secondary_authentication for more information |

###### Table 7

| Parameter | Range | Type | Description |

| service | “Web”, “Client”, “Rtsp”, “Https”, | string | port type |

| protocol | "TCP" | string | protocol type(Get only) |

| internal | [1~65535] | int | Internal port number |

| external_port | [1~65535] | int | external port number |

| upnp_status | "Inactive" "Active" | string | Port UPnP function status(Get only) |

| upnp |   | bool | Enable UPnP function on the port |

| maping_strategy | "Manual""Auto" | string | Mapping method |

###### Table 8

| Parameter | Range | Type | Description |

| dhcp |   | bool | Ipv4 DHCP function switch |

| ip_address |   | string | IP address，sample:192.168.1.24 |

| subnet_mask |   | string | subnet mask，sample:255.255.255.0 |

| gateway |   | string | default gateway，sample:192.168.1.1 |

| dhcpv6 |   | bool | IPv6 DHCP function switch |

| ipv6_address |   | string | IPv6 address |

| ipv6_prefixlen |   | int |   |

| ipv6_gateway |   | string | IPv6 gateway |

| dhcp_enable |   | bool | Dhcp enable switch，DHCP switch not enabled after enabling PPPOE(NVR exclusive) |

| mac_address |   | string | physical address，sample:88-60-50-4E-87-29 |

###### Table 9

| Parameter | Range | Type | Description |

| dhcp |   | bool | Ipv4 DHCP function switch |

| ip_address |   | string | IP address，sample:192.168.1.24 |

| subnet_mask |   | string | subnet mask，sample:255.255.255.0 |

| gateway |   | string | defalt gateway，sample:192.168.1.1 |

| dhcpv6 |   | bool | IPv6 DHCP function switch |

| ipv6_address |   | string | IPv6 address |

| ipv6_prefixlen |   | int |   |

| ipv6_gateway |   | string | IPv6 gateway |

| mac_address |   | string | physical address，sample:88-60-50-4E-87-29 |

###### Table 10

| Parameter | Range | Type | description |

| poedhcp |   | bool | Poe DHCP function |

| poe_ip_address |   | string | POE Ip address，sample:192.168.1.24 |

| poe_sunnet_mask |   | string | POE subnet mask，sample:255.255.255.0 |

| modify_field | "poe_ip_address" "poe_subnet_mask" | string | The specific parameter to be modified. This field is required only with operation_type |

| show_tips |   | bool | Whether a prompt is required. The response needs to include this field only if the request has operation_type on it |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "wan": {
            "type": "object",
            "items": {
                "dhcp": {"type": "bool"},
                "ip_address": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "subnet_mask": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "gateway": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "ipv6_address": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 46
                },
                "ipv6_prefixlen": {
                    "type": "int32",
                    "min": 1,
                    "max": 128,
                    "default_value": 64
                },
                "ipv6_gateway": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 46
                },
                "dns1": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "dns2": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 15
                },
                "dhcp_enable": {"type": "bool"}
            }
        },
        "lan": {
            "type": "object",
            "items": {
                "poedhcp": {"type": "bool"},
                "ip_address": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "subnet_mask": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                }
            }
        },
        "pppoe": {
            "type": "object",
            "items": {
                "enable": {"type": "bool"},
                "username": {
                    "description": "Each range {min_len,max_len} corresponds to one enable state [false,true].",
                    "type": "string",
                    "mode": "rw",
                    "ranges": [
                        {
                            "min_len": 0,
                            "max_len": 35
                        },
                        {
                            "min_len": 1,
                            "max_len": 35
                        }
                    ]
                },
                "password": {
                    "description": "Each range {min_len,max_len} corresponds to one enable state [false,true].",
                    "type": "string",
                    "mode": "rw",
                    "ranges": [
                        {
                            "min_len": 0,
                            "max_len": 35
                        },
                        {
                            "min_len": 1,
                            "max_len": 35
                        }
                    ]
                },
                "pppoenewstruct": {"type": "bool"},
                "password_empty": {"type": "bool"},
                "ip_address": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "subnet_mask": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "gateway": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "dns1": {
                    "type": "string",
                    "min_len": 7,
                    "max_len": 15
                },
                "dns2": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 15
                }
            }
        },
        "port": {
            "type": "array",
            "min_size": 0,
            "max_size": 2,
            "items": [
                {
                    "service": "Web",
                    "protocol": {
                        "type": "string",
                        "mode": "r",
                        "items": ["TCP"]
                    },
                    "internal_port": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 65535,
                        "default_value": 80
                    },
                    "external_port": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 65535,
                        "default_value": 80
                    },
                    "upnp_status": {
                        "type": "string",
                        "mode": "r",
                        "items": [
                            "Inactive",
                            "Active"
                        ]
                    },
                    "maping_strategy": {
                        "type": "string",
                        "items": [
                            "Manual",
                            "Auto"
                        ]
                    },
                    "upnp": {"type": "bool"}
                },
                {
                    "service": "Client",
                    "protocol": {
                        "type": "string",
                        "mode": "r",
                        "items": ["TCP"]
                    },
                    "internal_port": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 65535,
                        "default_value": 9000
                    },
                    "external_port": {
                        "type": "int32",
                        "mode": "r",
                        "min": 1,
                        "max": 65535,
                        "default_value": 9000
                    },
                    "upnp_status": {
                        "type": "string",
                        "mode": "r",
                        "items": [
                            "Inactive",
                            "Active"
                        ]
                    },
                    "maping_strategy": {
                        "type": "string",
                        "items": [
                            "Manual",
                            "Auto"
                        ]
                    },
                    "upnp": {"type": "bool"}
                }
            ]
        },
        "extern_ip": {
            "type": "string",
            "mode": "r",
            "min_len": 0,
            "max_len": 15
        },
        "p2p_switch": {"type": "bool"},
        "device_instruction": {
            "type": "string",
            "items": [
                "nvr",
                "xvr",
                "dvr"
            ]
        },
        "web_compatibility_mode": {"type": "bool"},
        "video_encrypt_transfer": {
            "type": "array",
            "min_size": 0,
            "max_size": 16,
            "items": {
                "type": "string",
                "items": [
                    "CH1",
                    "CH2",
                    "CH3",
                    "CH4",
                    "CH5",
                    "CH6",
                    "CH7",
                    "CH8",
                    "CH9",
                    "CH10",
                    "CH11",
                    "CH12",
                    "CH13",
                    "CH14",
                    "CH15",
                    "CH16"
                ]
            }
        },
        "forward_port": {"type": "bool"},
        "rtsp_url": {
            "type": "string",
            "min_len": 0,
            "max_len": 64
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
