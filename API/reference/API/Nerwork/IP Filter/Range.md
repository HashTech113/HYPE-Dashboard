# Range

## Function

This API is used to obtain Network > IP Filter parameters.

## Request Message

None.

Sample:

POST /API/NetworkConfig/IPFilter/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| enable |   | bool | Whether to enable IP filtering |

| choose | "Whitelist","Blacklist" | string | Enable blacklist or whitelist |

| restricted_type | "Whitelist","Blacklist" | string | Restricted method |

| whitelist |   | JSON array | Whitelist list, see Table 2 to get Parameter Description |

| blacklist |   | JSON array | Blacklist list, see Table 2 to get Parameter Description |

###### Table 2

| Parameter | Range | Type | Description |

| start_address | Max length:16byte, 64byte (for NVR/DVR use) | string | Start filtering IP address |

| end_address | Max length:16byte, 64byte (for NVR/DVR use) | string | End filtering IP address |

| ip_type | "Ipv4","Ipv6" | string | IP type (IPC only supports: "Ipv4") |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "enable": {"type": "bool"},
        "choose": {
            "type": "string",
            "items": [
                "Whitelist",
                "Blacklist"
            ]
        },
        "restricted_type": {
            "type": "string",
            "items": [
                "Whitelist",
                "Blacklist"
            ]
        },
        "whitelist": {
            "type": "array",
            "min_size": 0,
            "max_size": 64,
            "items": {
                "start_address": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 64
                },
                "end_address": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 64
                },
                "ip_type": {
                    "type": "string",
                    "items": [
                        "Ipv4",
                        "Ipv6"
                    ]
                }
            }
        },
        "blacklist": {
            "type": "array",
            "min_size": 0,
            "max_size": 64,
            "items": {
                "start_address": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 64
                },
                "end_address": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 64
                },
                "ip_type": {
                    "type": "string",
                    "items": [
                        "Ipv4",
                        "Ipv6"
                    ]
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
