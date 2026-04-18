# Set

## Function

This API is used to set parameter for Network > IEEE8021x.

## Request Message

### Parameter Description

See Network > IEEE8021x > Range > Parameter > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/IEEE8021x/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "ieee_enable": true,
        "authentication_type": "EAP-MD5",
        "username": "test",
        "password_empty": false,
        "authentication": {
            "client_certificate_server_certificate": {
                "install_button": true,
                "delete_button": false,
                "private_key_password": "",
                "private_key_password_empty": true
            },
            "client_passwd_auth_server_certificate": {
                "password": "",
                "password_empty": false,
                "install_button": true,
                "delete_button": false
            },
            "client_passwd_auth_only": {}
        },
        "base_enc_password": {
            "seq": 0,
            "peer_key": "0niVaQ47ri7+RhWeEISnYXJ1M27j7SYnxb8msT7AcMzw=",
            "cipher": "0Vtyz03DVcoD7dpfwgpEaDrPPTG2YCWOAO2pTnJOL04UbPlyMwHY="
        }
    }
}

## Response Message

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
