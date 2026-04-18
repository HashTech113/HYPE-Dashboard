# Get

## Function

This API is used to get parameter for Remote Setting > System > IP Camera Maintain > Upgrade page.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCUpgrade/Get HTTP/1.1

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

| file_type | Max length: 64 | string | Upgrade file extension. |

| reason |   | string | The reason why IPC cannot obtain information. |

Tips:

The response message of the Get request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "reason": "Not support"
            },
            "CH2": {
                "reason": "Not support"
            },
            "CH3": {
                "reason": "Not support"
            },
            "CH4": {
                "reason": "Not support"
            },
            "CH5": {
                "reason": "Not support"
            },
            "CH6": {
                "reason": "Not support"
            },
            "CH7": {
                "reason": "Not support"
            },
            "CH8": {
                "reason": "Not support"
            },
            "CH9": {
                "reason": "Not support"
            },
            "CH10": {
                "reason": "Not support"
            },
            "CH11": {
                "reason": "Not support"
            },
            "CH12": {
                "reason": "Not support"
            },
            "CH13": {
                "reason": "Not support"
            },
            "CH14": {
                "reason": "Not support"
            },
            "CH15": {
                "state": "On-line",
                "ip_address": "172.16.11.122",
                "software_version": "V26.34.8.2.4_230706",
                "file_type": "sw"
            },
            "CH16": {
                "state": "On-line",
                "ip_address": "172.16.11.162",
                "software_version": "V45.85.8.2.3_230620",
                "file_type": "sw"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
