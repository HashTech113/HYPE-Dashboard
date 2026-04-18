# Set

## Function

This API is used to set IPC ftp update parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| ftp_auto_upgrade |   | bool | Ftp auto upgrade IPC switch. |

| check_for_updates |   | bool | Ftp automatic upgrade IPC prompt switch. |

| online_upgrade |   | bool | A new interface for judging whether to use FTP or HTTP to upgrade IPC online. |

| channel_info |   | object | Total channel information object, see Table 2 for detailed information. |

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

| upgrade_result | len:0-32 | string | upgrade result. |

| reason |   | string | The reason why IPC cannot obtain information. |

Tips:

The response message of the Set request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

POST /API/IPCMaintaint/FtpIpcUpgrade/Set HTTP/1.1

{
    "version":"1.0",
    "data":{
        "online_upgrade":true,
        "ftp_auto_upgrade":false,
        "check_for_updates":false,
        "channel_info":{
            "CH3":{
                "reason":"Not support"
            },
            "CH7":{
                "reason":"Not support"
            },
            "CH8":{
                "sup_ftp_auto_upgrade":true,
                "upgrade_result":"cannot_upgrade",
                "ftp_ipc_new_ver":false
            },
            "CH10":{
                "reason":"Not support"
            },
            "CH11":{
                "sup_ftp_auto_upgrade":false
            },
            "CH14":{
                "reason":"Not support"
            },
            "CH15":{
                "sup_ftp_auto_upgrade":true,
                "upgrade_result":"cannot_upgrade",
                "ftp_ipc_new_ver":false
            },
            "CH16":{
                "sup_ftp_auto_upgrade":true,
                "upgrade_result":"",
                "ftp_ipc_new_ver":false
            }
        }
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
