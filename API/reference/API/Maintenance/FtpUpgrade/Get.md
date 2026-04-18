# Get

## Function

This API is used to obtain online upgrade parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| url_key |   | object | The public key used to encrypt the url, see Table 2 for more information. (NVR docking IPC online upgrade to obtain a complete encrypted url) |

##### Table 2

| Parameter | Range | Type | Description |

| seq | 0-1000000 | int | The seq returned using the Request pubkey or randbyte API. |

| peer_key | len:0-1024 | string | The X25519 public key encrypted by the client, Use base64 transfer. |

| type |   | string | Peer key type. |

Sample 1. Obtain NVR online upgrade parameters:

POST /API/Maintenance/FtpUpgrade/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

Sample 2. Obtain IPC online upgrade URL :

POST /API/Maintenance/FtpUpgrade/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
        "url_key": {
            "type": "base_x_public",
            "peer_key": "0uegOWQD2zcee4hnx4hFDN1bmul9ETG2uzX9ndpfo5nk=",
            "seq": 0
        }
    }
}

## Response Message

See Maintenance > FtpUpgrade > Range > Parameter Description > Table 1 for parameter description.

Sample 1. Obtain NVR online upgrade parameters:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ftp_addr": "ftp://192.168.1.100:23/device/upgradePackage",
        "ftp_port": 21,
        "username": "admin",
        "user_pwd_empty": false,
        "ftp_path": "ftp://192.168.1.100:23/device/upgradePackage",
        "check_for_updates": true,
        "online_upgrade": true,
        "Upgrade_button": false
    }
}

Sample 2. Obtain IPC Online Upgrade URL:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
    "username": "",
    "user_pwd_empty": true,
    "user_pwd": "",
    "ftp_path": "",
    "check_for_updates": false,
    "online_upgrade": true,
    "info_file_url": {
        "cipher": "02Lq9t9GQcIrf3wl8bB1Z45Hn9kSOe33yVKyVvunOa0xbiAxnkMW5DLhgJA1LVWUf",
        "seq": 0,
        "key": "0vZ71jO5s8+QKEAkhFByWDFh0YWrvPx2t8RDq9TbGolk="
    }
}
}

## Error Code

See Response Messages Body and Common error_code for more information.
