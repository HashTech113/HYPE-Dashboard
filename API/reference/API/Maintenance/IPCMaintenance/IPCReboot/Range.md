# Range

## Function

This API is used to NVR get IPC parameter range.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCReboot/Range HTTP/1.1

{
    "version":"1.0",
    "data":
    {
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_max |   | int | The maximum number of accessable channels. |

| password | len:0-16 | string | IPC authentication password. |

| channel_info |   | object | Total channel information object, see Maintenance > IPCMaintenance > Load Default > Range > Parameter Description > Table 2 Get details. |

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
                        },
                        "reboot_switch": {
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
                        "reboot_switch": {
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
