# Set

## Function

This API is used to set parameter for Network>snmp.

## Request Message

### Parameter Description

See Network > snmp > Range > Parameter > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/Snmp/Set HTTP/1.1

{
    "version": "1.0",
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
                "authentication_password_empty": false,
                "encrypted_type": "CBC-DES",
                "encrypted_password_empty": false,
                "base_enc_authentication_password": {
                    "seq": 0,
                    "peer_key": "0D+VG/UsfUQuIknWk1L8Wg4G9HW9VjkKGStyaOdK68W4=",
                    "cipher": "0lA3HPPzyuk8h8+PSTXcgxAaGwf5K9k1w3U11CWtrOPwHaBy1"
                },
                "base_enc_encrypted_password": {
                    "seq": 0,
                    "peer_key": "0ZiA2CYOlj+8sZQTDIzO9G4myWMdg0h+Nozx3O/MBr0I=",
                    "cipher": "0oK0YB8zf6Wu3ryDoRuSW0lQt/69DCH+XagPWVUfMUfQwKeqoPXEoPN8="
                }
            },
            "readwrite_user": {
                "username": "authPrivUser",
                "authentication_type": "MD5",
                "authentication_password_empty": false,
                "encrypted_type": "CBC-DES",
                "encrypted_password_empty": false
            }
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
