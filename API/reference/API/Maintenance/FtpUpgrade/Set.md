# Set

## Function

This API is used to set upgrade configuration.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| ftp_addr | min_len:0;max_len":64 | string | Ftp address. |

| ftp_port | min:1;max:65535 |   | int |

| username | min_len:0;max_len:64 | string | Username. |

| user_pwd | min_len:0;max_len:32 | string | password. |

| user_pwd_empty |   | bool | Whether the password is empty. |

| ftp_path | min_len:0;max_len:128 | string | Ftp upgrade file path. |

| check_for_updates |   | bool | Whether to check for updates. |

| base_enc_password |   | object | encrypted authentication information, see base_secondary_authentication information table for detailed information . |

Sample:

POST /API/Maintenance/FtpUpgrade/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "ftp_addr":"",
        "ftp_port":21,
        "username":"admin",
        "user_pwd_empty":true,
        "ftp_path":"ftp://192.168.1.100:23/device/upgradePackage",
        "check_for_updates":true,
        "online_upgrade":true,
        "Upgrade_button":false,
        "base_enc_password":
        {
            "seq":0,
            "peer_key":"0rD95mGwiZznl34bejOzwEOK+PZZZnOeLoKzw794TmSM=","cipher":"05XviOTKBMiUlzS5IL8P9CWATcxELsON78EdFHbpQ9qSA1umq"
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
