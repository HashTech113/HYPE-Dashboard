# Get

## Function

This API is used to get IPC parameter for Remote Setting > System > Maintenance > Load Default page.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCReset/Get HTTP/1.1

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

| file_type | Max length: 64 | string | Upgrade file extension. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH13": {
                "status": "Online",
                "ip_address": "172.16.11.91",
                "software_version": "V40.45.8.2.3_230704"
            },
            "CH14": {
                "status": "Online",
                "ip_address": "172.16.11.201",
                "software_version": "V21.45.8.2.2_220705"
            },
            "CH16": {
                "status": "Online",
                "ip_address": "172.16.11.162",
                "software_version": "V45.85.8.2.3_230620"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
