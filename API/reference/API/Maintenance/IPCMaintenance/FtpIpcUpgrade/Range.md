# Range

## Function

This API is used to get range of IPC ftp update parameters.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/FtpIpcUpgrade/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

## Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_max |   | int | The maximum number of accessable channels. |

| online_upgrade |   | bool | A new interface to judge whether to use FTP or HTTP to upgrade IPC online. |

| ftp_auto_upgrade |   | bool | Ftp auto upgrade IPC switch. |

| check_for_updates |   | bool | Ftp automatic upgrade IPC check prompt. |

| upgrade_result | len:0-32 | string | Update result. |

| ftp_buttons | "Save","Refresh","Check","Upgrade" | string array | Ftp button group button name. |

| check_chns | size:0-16 | int array | Check the updated IPC index. |

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

| sup_ftp_auto_upgrade |   | bool | Whether the IPC supports automatic upgrade. |

| ftp_ipc_new_ver |   | bool | Whether there is a new version of IPC. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "online_upgrade": {
            "type": "bool"
        },
        "ftp_auto_upgrade": {
            "type": "bool"
        },
        "check_for_updates": {
            "type": "bool"
        },
        "upgrade_result": {
            "type": "string",
            "min_len": 0,
            "max_len": 32
        },
        "ftp_buttons": {
            "description": "Used to control whether the button is displayed!",
            "type": "string",
            "items": [
                "Save",
                "Refresh",
                "Check",
                "Upgrade"
            ]
        },
        "check_chns": {
            "type": "array",
            "min_size": 0,
            "max_size": 16,
            "items": []
        },
        "channel_info": {
            "type": "object",
            "items": {
                "CH8": {
                    "type": "object",
                    "items": {
                        "sup_ftp_auto_upgrade": {
                            "type": "bool"
                        },
                        "ftp_ipc_new_ver": {
                            "type": "bool"
                        }
                    }
                },
                "CH11": {
                    "type": "object",
                    "items": {
                        "sup_ftp_auto_upgrade": {
                            "type": "bool"
                        },
                        "ftp_ipc_new_ver": {
                            "type": "bool"
                        }
                    }
                },
                "CH15": {
                    "type": "object",
                    "items": {
                        "sup_ftp_auto_upgrade": {
                            "type": "bool"
                        },
                        "ftp_ipc_new_ver": {
                            "type": "bool"
                        }
                    }
                },
                "CH16": {
                    "type": "object",
                    "items": {
                        "sup_ftp_auto_upgrade": {
                            "type": "bool"
                        },
                        "ftp_ipc_new_ver": {
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
