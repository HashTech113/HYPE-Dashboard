# Set

## Function

This API is used to set parameter for Network>Onvif.

## Request Message

### Parameter Description

See Network > Onvif > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/Onvif/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "enable": true,
        "authentication": "Digest/WSSE",
        "protocol": "HTTP/HTTPS",
        "username": "admin",
        "password_empty": true,
        "base_enc_password": {
            "seq": 0,
            "peer_key": "0N4LDE7DDSoiCDMGeeQ4I+O0IXnfhyA4uene9qOPvbSs=",
            "cipher": "0ffNkxOJ7eSs6B18xbA35JJakUmjvL/oD/570IoNAYEvBDjhL"
        }
    }
}

## Reponse Message

None

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
