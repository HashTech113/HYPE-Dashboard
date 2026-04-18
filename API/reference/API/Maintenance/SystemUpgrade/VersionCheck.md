# VersionCheck

## Function

This API is used to check for upgrade.(NVR needs to verify the version information in the ftp and http upgrade configuration files of IPC)

## Request Message

None.

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| FirewareVersion |   | string | Software version |

| FirewarePack |   | string | Package name |

| url_key |   | JSON object | The public key used to encrypt the url,(show as follow Table 2) |

Table 2

| Parameter | Range | Type | Description |

| seq | 0-1000000 | int | The seq returned using the Requst pubkey or randbyte API |

| peer_key | 0-1024 | string | The X25519 public key encrypted by the client, Use base64 transfer |

| type |   | string | Peer_key type |

Sample:

POST /API/Maintenance/SystemUpgrade/VersionCheck HTTP/1.1

{
    "data": {
        "FirewareVersion": "V30.85.8.2.4_231030",
        "FirewarePack": "CH529N_F128M_SF_ENU_V30.85.8.2.4_231030_08d1defe_W.sw",
        "url_key": {
            "type": "base_x_public",
            "peer_key": "0VSd/xFlbwJk8LnAuLk4VxTEVYy0kQrp5csFzL3BKryU=",
            "seq": 0
        }
    },
    "version": "1.0"
}

## Response Message

### Parameter Description

Table 3

| Parameter | Range | Type | Description |

| ComponentDectectFile |   | JSON object | Complete encrypted URL information of the component detection file (show as follow Table 4) |

| FirewarePack |   | JSON object | Complete encrypted URL information of the upgrade package(show as follow Table 4) |

Table 4

| Parameter | Range | Type | Description |

| cipher | 0-1024 | string | Encrypted password value (Encryption using the X25519 key derived by the Requst pubkey or randbyte API), Use base64 transfer |

| key | 0-1024 | string | The random number is hex string, which needs to be converted. The public key is plaintext. Base64 transmission is adopted. |

| seq | 0-1000000 | int | The seq returned using the Requst pubkey or randbyte API |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "FirewarePack": {
            "cipher": "0xvx5APr8wQYQeJ9ANgD3RWMpBPnixdG+9aCOtPqANUZ9r42Mr+FZJABjEUEnbjGNVbQ4hklQ+2aY43qOk3vhd7GsEI6eWoZS0a1k6W8rmw7y+I5yS6xK5T9wvZuMNKobdntDD6V/cU40PmdirqWFlM/u7g==",
            "seq": 0,
            "key": "05onKMVt56UvedIUCKVVLUlOXaE0JbI287Gu7zyqcoSA="
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
