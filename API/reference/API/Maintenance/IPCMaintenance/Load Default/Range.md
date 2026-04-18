# Range

## Function

This API is used to get IPC parameter range for Remote Setting > System > IP Camera Maintain > Load Default page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCReset/Range HTTP/1.1

{
    "version": "1.0",
    "data": {
    }
}

## Response Message

## Parameter Description

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

| status | "Offline","Online" | string | IPC status. |

| software_version | Max length: 40 | string | Firmware version. |

| reset_switch |   | bool | Restore default switch. |

| file_type | Max length: 64 | string | Upgrade file extension. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "type": "object",
            "items": {
                "CH13": {
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
                        },
                        "reset_switch": {
                            "type": "bool"
                        }
                    }
                },
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
                        },
                        "reset_switch": {
                            "type": "bool"
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
                        },
                        "reset_switch": {
                            "type": "bool"
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
