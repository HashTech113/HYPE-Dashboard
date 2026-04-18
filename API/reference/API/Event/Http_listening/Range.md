# Range

## Function

This API is used to get parameter range for Event > Http listening page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/AlarmConfig/EventPush/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| method | "GET","POST" | string | method of HTTP |

| params |   | object | Single Channel Information JSON show as followTable 2 |

| limit_character | "?","&"," " | string | limit character |

#### Table 2

| Parameter | Range | Type | Description |

| name | 0,127 | string | channel number |

| table |   | object | Single Channel Information JSON show as followTable 3 |

#### Table 3

| Parameter | Range | Type | Description |

| push_way | HTTP，UDP | string | Push way |

| username | 0,63 | string | username |

| password | 0,63 | string | password. |

| password_empty | 0/1 | bool | password empty |

| addr | 0,31 | string | server address |

| addr_demo | "192.168.1.168 or example.com | string | server address demo |

| port | 0,65535 | int32 | server port |

| url | 0,63 | string | Server api interface |

| enable | 0/1 | bool | Alarm push function switch |

| alarm_precise | 0/1 | bool | alarm precise |

| method | "GET","POST" | string | Mode of pushing alarms |

| keep_alive_interval | 0,1,5,10 | string | Keepalive interval |

| udp_method | "Unicast","Multicast","Broadcast" | string | UDP Push type |

| udp_addr | 0,32 | string | UDP Server Address |

| udp_port | 1,65535 | int32 | UDP Server port |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "method": {
            "type": "string",
            "mode": "r",
            "items": [
                "GET",
                "POST"
            ]
        },
        "params": {
            "type": "object",
            "items": {
                "name": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 127
                },
                "table": {
                    "type": "object",
                    "items": {
                        "push_way": {
                            "type": "string",
                            "items": [
                                "HTTP",
                                "UDP"
                            ]
                        },
                        "username": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 63
                        },
                        "password": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 63
                        },
                        "password_empty": {"type": "bool"},
                        "addr": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 31
                        },
                        "addr_demo": {
                            "type": "string",
                            "items": ["192.168.1.168 or example.com"]
                        },
                        "port": {
                            "type": "int32",
                            "min": 1,
                            "max": 65535
                        },
                        "url": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 63
                        },
                        "enable": {"type": "bool"},
                        "method": {
                            "type": "string",
                            "items": [
                                "GET",
                                "POST"
                            ]
                        },
                        "keep_alive_interval": {
                            "type": "string",
                            "items": [
                                "0",
                                "1",
                                "5",
                                "10"
                            ]
                        },
                        "udp_method": {
                            "type": "string",
                            "items": [
                                "Unicast",
                                "Multicast",
                                "Broadcast"
                            ]
                        },
                        "udp_addr": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 32
                        },
                        "udp_port": {
                            "type": "int32",
                            "min": 1,
                            "max": 65535
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
