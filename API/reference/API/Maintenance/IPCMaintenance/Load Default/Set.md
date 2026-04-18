# Set

## Function

This API is used to reset IPC default parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| password | Max length: 16 | string | Verify the admin user password for secondary authentication. |

| channel_info |   | object | Total channel information object, see Table 2 for details. |

| base_secondary_authentication |   | object | encrypted authentication object, see base_secondary_authentication information table for details information. |

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

| reset_switch |   | bool | Reset default switch. (This field is only used when IPC resets to default) |

| Sample: |   |   |   |

POST /API/IPCMaintaint/IPCReset/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "password": "1111qqqq",
        "channel_info":
        {
            "CH1":
            {
                "reset_switch": true
            }
        },
        "base_secondary_authentication":
        {
            "seq":1,
            "cipher":"r8zCQd+EQpuhKY2bKSZhEK/mkpeEzTRVlgDwiepew8k="
        }
    }
}

## Response Message

### Parameter Description

##### Table 4

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information object, see Table 5 for details. |

##### Table 5

| Parameter | Range | Type | Description |

| CH1 |   | object | A channel information object, see Table 6 for details. |

| ... |   | object |   |

| IP_CH1 |   | object |   |

| ... |   | object |   |

| WIFI_CH1 |   | object |   |

| ... |   | object |   |

##### Table 6

| Parameter | Range | Type | Description |

| state | "Success","Failed" | string | The status of the IPC operation. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info":
        {
            "CH1":
            {
                "state": "Success"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
