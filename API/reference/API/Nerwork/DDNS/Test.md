# Test

## Function

This API is used to test parameter for Network > DDNS.

## Request Message

### Parameter Description

See Network > DDNS > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/DDNS/Test HTTP/1.1

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
            "peer_key": "0xODk3zoBTV+3MLNIjTSdV+GYzi3f38bH2UFX59Nk1R0=",
            "cipher": "0EmzlXN55rYmHMFN54IQTc/lYQrzp/0x2JT12Dbw1nbQN2O1v"
        }
    }
}

## Response Message

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
