# Set

## Function

This API is used to set parameter for Network > DDNS.

## Request Message

### Parameter Description

See Network > DDNS > Range > Parameter > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/DDNS/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "ddns_enable": true,
        "server": "NO_IP",
        "domain": "172.16.11.333",
        "username": "admin",
        "password_empty": false,
        "api_key_empty": true,
        "test_befault_save": false,
        "base_enc_password": {
            "seq": 0,
            "peer_key": "0mxizZ01CLypE9BhtfCNXAAwrpLR8W3wN95GKLSqpLEg=",
            "cipher": "0bCgObu9WoTP6k5pSpSGL98RBG2WK6T5Osmctk6BGxbE5e/KG"
        }
    }
}

## Response Message

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
