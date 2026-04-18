# Range

## Function

This API is used to get IPC parameters range for [System > IPC Camera Maintain > Param Management* page.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCParamManagement/Range HTTP/1.1

{
    "version":"1.0",
    "data":
    {
    }
}

## Response Message

##### Table 1

| Parameter | Range | Type | Description |

| channel_max |   | int | The maximum number of accessable channels. |

| password | len:0-16 | string | IPC authentication password. |

| channel_info |   | object |   |

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

| status | "Offline","Online" | string | IPC status. |

| software_version | Max length: 40 | string | Firmware version. |

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
                "CH14": {
                    "type": "object",
                    "items": {
                        "status": {
                            "type": "string",
                            "items": [
                                "Offline",
                                "Online"
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
                        }
                    }
                },
                "CH16": {
                    "type": "object",
                    "items": {
                        "status": {
                            "type": "string",
                            "items": [
                                "Offline",
                                "Online"
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
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
