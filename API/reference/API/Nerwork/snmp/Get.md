# Get

## Function

This API is used to get parameter for Network>snmp.

## Request Message

None

Sample：

POST /API/NetworkConfig/Snmp/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > snmp > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "snmp_enable": true,
        "snmp_versions": "V3",
        "snmp_port": 161,
        "read_community": "public",
        "write_community": "private",
        "trap_ipaddr": "127.0.0.1",
        "trap_port": 162,
        "authentication": {
            "readonly_user": {
                "username": "authOnlyUser",
                "authentication_type": "MD5",
                "authentication_password": "",
                "authentication_password_empty": false,
                "encrypted_type": "CBC-DES",
                "encrypted_password": "",
                "encrypted_password_empty": false
            },
            "readwrite_user": {
                "username": "authPrivUser",
                "authentication_type": "SHA",
                "authentication_password": "",
                "authentication_password_empty": false,
                "encrypted_type": "CBC-DES",
                "encrypted_password": "",
                "encrypted_password_empty": false
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
