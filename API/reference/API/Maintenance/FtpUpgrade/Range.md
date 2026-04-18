# Range

## Function

This API is used to obtain the online upgrade parameter range.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/Maintenance/FtpUpgrade/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

## Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| ftp_addr | min_len:0, max_len":64 | string | Server address. |

| ftp_port | min:1, max:65535 | int | Server port. |

| username | min_len:0, max_len:64 | string | Username. |

| user_pwd | min_len:0, max_len:32 | string | Login password. |

| user_pwd_empty |   | bool | Whether the password is empty. |

| online_upgrade_tips |   | string | Request server URL sample. |

| ftp_path | min_len:0, max_len:128 | string | ftp upgrade file path. |

| ftp_buttons | "Save","Refresh","Check","Upgrade" | string array | Names of the buttons in the button group. |

| online_upgrade |   | bool | It is used for the compatibility of old and new APIs, and judges whether to use the function interface of FTP and HTTP online upgrade. |

| check_for_updates |   | bool | Whether to check for updates. |

| cur_version | len:0-64 | string | Current version number. |

| new_version | len:0-64 | string | New version number. |

| info_file_url |   | object | Special for IPC, returns encrypted upgrade URL, please refer to Table 2. |

##### Table 2

| parameter | range | type | description |

| cipher |   | string | encrypted URL (use /API/Maintenance/FtpUpgrade/Get to send the secret key encryption), using base64 for transmission. |

| seq | 0-1000000 | int | return /API/Maintenance/FtpUpgrade/Get seq sent by API . |

| key |   | string | The X25519 key encrypted by IPC, using base64 for transmission. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ftp_addr": {
            "type": "string",
            "min_len": 0,
            "max_len": 64
        },
        "ftp_port": {
            "type": "int32",
            "mode": "r",
            "min": 1,
            "max": 65535,
            "default_value": 21
        },
        "username": {
            "type": "string",
            "min_len": 0,
            "max_len": 24
        },
        "user_pwd": {
            "type": "string",
            "min_len": 0,
            "max_len": 24
        },
        "user_pwd_empty": {
            "type": "bool"
        },
        "online_upgrade_tips": {
            "type": "string",
            "items": [
                "Server Address example:",
                "protocol://hostname[:port]/path",
                "ftp://192.168.1.100:23/device/upgradePackage",
                "http(s)://192.168.1.100:80/device/upgradePackage"
            ]
        },
        "support_onlineupgrade_edit": true,
        "ftp_path": {
            "type": "string",
            "min_len": 0,
            "max_len": 62
        },
        "online_upgrade": {
            "type": "bool"
        },
        "check_for_updates": {
            "type": "bool"
        },
        "cur_version": {
            "type": "string",
            "min_len": 0,
            "max_len": 64
        },
        "new_version": {
            "type": "string",
            "min_len": 0,
            "max_len": 64
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
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
