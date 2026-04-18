# Get

## Function

This API is used to get IPC parameters for System > IPC Camera Maintain > Param Management page.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCParamManagement/Get HTTP/1.1

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
                "reason": "Not configured"
            },
            "CH2": {
                "reason": "Not configured"
            },
            "CH3": {
                "reason": "Not configured"
            },
            "CH4": {
                "reason": "Not configured"
            },
            "CH5": {
                "reason": "Not configured"
            },
            "CH6": {
                "reason": "Not configured"
            },
            "CH7": {
                "reason": "Not configured"
            },
            "CH8": {
                "reason": "Not configured"
            },
            "CH9": {
                "reason": "Not configured"
            },
            "CH10": {
                "reason": "Not configured"
            },
            "CH11": {
                "reason": "Not configured"
            },
            "CH12": {
                "reason": "Not configured"
            },
            "CH13": {
                "reason": "Not configured"
            },
            "CH14": {
                "status": "Online",
                "ip_address": "172.16.11.201",
                "software_version": "V21.45.8.2.2_220705"
            },
            "CH15": {
                "reason": "Not configured"
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
