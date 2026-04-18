# Range

## Function

This API is used to get the parameter range of the developer mode page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/Maintenance/DeveloperMode/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

## Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| telnet_switch |   | bool | Telnet switch.(Supported by 8.2.3 and earlier versions) |

| ssh_switch |   | bool | Telnet switch. (Version support after 8.2.3) |

| export_disk_switch | "Shut Off", "Output To Terminal", "Output To Disk" | string | Print the log output location. |

| enable_export |   | bool | Whether to show the export button. |

| enable_delete |   | bool | Whether to show delete button. |

| support_ipc_log_export |   | bool | Whether to show export IPC log button. NVR and IPC parameters |

| search_log_enable |   | bool | Whether to display the six elements export button, IPC parameters |

| support_ipc_log_pack |   | bool | Whether to display the Pack Now button, IPC parameters |

| log_collect_tips | "Server Address example:" "protocol://hostname[:port]/path" "ftp://192.168.1.100:23/device/log" | string | Example ftp path, IPC parameters |

| download_type | "IPC_Local" | string | Download type, IPC parameters |

| support_ipc_log_delete |   | bool | Whether to show delete IPC log button. |

| export_days | "all","1","2","3","4","5" | string | Number of days to export logs. |

| channel_info |   | object | Object members see Table 2. |

###### Table 2

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx" | object | Channel object, see Table 3 for object members. |

###### Table 3

| Parameter | Range | Type | Description |

| log_collect_enable |   | bool | Whether log collection is enabled. NVR and IPC parameters |

| support_logcollection |   | bool | Whether to support log collection. |

| log_collect_mode | "NVR" "SD_Card" "FTP" | string | Log collection mode. IPC parameter |

| remote_server |   | Json Object | Object member See also Table 4。IPC parameter |

##### Table 4

| Parameter | Range | Type | Description |

| username | maxlength 63 byte | string | FTP user name |

| password | maxlength 63 byte | string | FTP password |

| password_empty |   | bool | Whether the password is empty |

| server_address | maxlength 127 byte | string | FTP address |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ssh_switch": {
            "type": "bool",
            "mode": "rw"
        },
        "export_disk_switch": {
            "type": "string",
            "mode": "rw",
            "items": [
                "Shut Off",
                "Output To Terminal",
                "Output To Disk"
            ]
        },
        "enable_export": {"type": "bool"},
        "enable_delete": {"type": "bool"},
        "support_ipc_log_export": {"type": "bool"},
        "support_ipc_log_delete": {"type": "bool"},
        "channel_info": {
            "type": "object",
            "items": {
                "CH1": {
                    "type": "object",
                    "items": {
                        "log_collect_enable": {"type": "bool"},
                        "support_logcollection": {"type": "bool"}
                    }
                },
                ...
                "CH16": {
                    "type": "object",
                    "items": {
                        "log_collect_enable": {"type": "bool"},
                        "support_logcollection": {"type": "bool"}
                    }
                }
            }
        },
        "export_days": {
            "type": "string",
            "mode": "rw",
            "items": [
                "all",
                "1",
                "2",
                "3",
                "4",
                "5"
            ]
        },
        "default_timeout": 1200000
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
