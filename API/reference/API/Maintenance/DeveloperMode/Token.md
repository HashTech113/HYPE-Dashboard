# Token

## Function

This API is used to get Token.

## Request Message

##### Table 1

| Parameter | Range | Type | Description |

| base_secondary_authentication |   | object | Encrypted information for authentication. See base_secondary_authentication information table for structure members details. |

| export_days | "all","1","2","3","4","5" | string | Number of days to export logs, which must be brought when exporting IPC logs. |

| download_type | "NVR_Ipc", "NVR_Local" | string | Download log type, default is NVR log. "NVR_Ipc": the ipc log stored on the NVR. "NVR_Local": NVR log. |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx" | string array | The channel that needs to export IPC logs. |

Sample:

POST  /API/Maintenance/DeveloperMode/Token HTTP/1.1

{
    "version": "1.0",
    "data": {
        "base_secondary_authentication": {
            "seq": 3,
            "cipher": "egLU4qef8erLd7RAfoYZ6q8pxe3EFYruonZhuceK4Pk="
        },
        "channel": [
            "CH1",
            "CH2",
            "CH3",
            "CH4",
            "CH5",
            "CH6",
            "CH7",
            "CH8",
            "CH9",
            "CH10",
            "CH11",
            "CH12",
            "CH13",
            "CH14",
            "CH15",
            "CH16"
        ],
        "export_days": "all",
        "download_type": "NVR_Ipc"
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| x-download-token |   | string | in the message header. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "1.0"
}

## Error Code

See Response Messages Body and Common error_code for more information.
