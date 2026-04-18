# Range

## Function

This API is used to get parameter range for Remote Setting > System > IP Camera Maintain > Upgrade page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCUpgrade/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information object, see Table 2 for details. |

##### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | object | A channel information object, see Table 3 for details. |

| ... |   | object |   |

| IP_CH1 |   | object |   |

| ... |   | object |   |

| WIFI_CH1 |   | object |   |

| ... |   | object |   |

##### Table 3

| Parameter | Range | Type | Description |

| ip_address | Max length:63 | string | IP address/domain name. |

| state | "Off-line","On-line" | string | IPC status. |

| software_version | Max length: 40 | string | Firmware version. |

| ipc_upgrade |   | bool | Upgrade switch. |

| file_type | Max length: 64 | string | Upgrade file extension. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "password": {
            "type": "string",
            "min_len": 0,
            "max_len": 16
        },
        "channel_info": {
            "type": "object",
            "items": {
                "CH15": {
                    "type": "object",
                    "items": {
                        "state": {
                            "type": "string",
                            "items": [
                                "Off-line",
                                "On-line"
                            ]
                        },
                        "ip_address": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 63
                        },
                        "software_version": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 40
                        },
                        "ipc_upgrade": {
                            "type": "bool"
                        },
                        "file_type": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 64
                        }
                    }
                },
                "CH16": {
                    "type": "object",
                    "items": {
                        "state": {
                            "type": "string",
                            "items": [
                                "Off-line",
                                "On-line"
                            ]
                        },
                        "ip_address": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 63
                        },
                        "software_version": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 40
                        },
                        "ipc_upgrade": {
                            "type": "bool"
                        },
                        "file_type": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 64
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
