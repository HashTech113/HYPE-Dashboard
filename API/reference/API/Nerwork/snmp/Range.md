# Range

## Function

This API is used to get the parameter range of Network > snmp.

## Request Message

None

Sample:

POST /API/NetworkConfig/Snmp/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| snmp_port |   | int |   |

| snmp_enable |   | bool | false:disable true:enable |

| trap_port |   | int |   |

| snmp_versions | "V1", "V2", "V1,V2" "V3" | string | 0:snmp v1 1:snmp v2 2:snmp v1 v2 3:snmp v3 |

| trap_ipaddr | Max length:32byte | string | Management Server Address |

| read_community | Max length:16byte | string | Set IPC Read Community Name The server uses this common name and only reads snmp information on the IPC |

| write_community | Max length:16byte | string | Set IPC Read Community Name The server uses this common name and only reads snmp information on the IPC |

| authentication |   | object json | see Table 2 for more information |

| base_enc_authentication_password |   | object json | encrypted password，see base_enc_password Table information for more information |

| base_enc_encrypted_password |   | object json | encrypted password，see base_enc_password Table information for more information |

###### Table 2

| Parameter | Range | Type | Description |

| readonly |   | object | Set Read User，see Table 3 for more information |

| readwrite_user |   | object | Set Write User，see Table 3 for more information |

###### Table 3

| Parameter | Range | Type | Description |

| authentication_type | “MD5”, “SHA” | string | MD5 authentication method,SHA authentication method |

| encrypted_type | “CBC-DES” | string | For encryption algorithm extension |

| username | Max length:16byte | string |   |

| authentication_password | Max length:16byte | string |   |

| authentication_password_empty |   | bool | password empty |

| encrypted_password | Max length:16byte | string |   |

| encrypted_password_empty |   | bool | password empty |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "snmp_enable": {"type": "bool"},
        "snmp_versions": {
            "type": "string",
            "items": [
                "V1",
                "V2",
                "V1,V2",
                "V3"
            ]
        },
        "snmp_port": {
            "type": "int32",
            "min": 1,
            "max": 65535,
            "default_value": 161
        },
        "read_community": {
            "type": "string",
            "min_len": 0,
            "max_len": 15
        },
        "write_community": {
            "type": "string",
            "min_len": 0,
            "max_len": 15
        },
        "trap_ipaddr": {
            "type": "string",
            "min_len": 7,
            "max_len": 15
        },
        "trap_port": {
            "type": "int32",
            "min": 1,
            "max": 65535,
            "default_value": 162
        },
        "authentication": {
            "type": "object",
            "items": {
                "readonly_user": {
                    "type": "object",
                    "items": {
                        "username": {
                            "description": "Each range {min_len,max_len} corresponds to one snmp_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 16
                                },
                                {
                                    "min_len": 0,
                                    "max_len": 16
                                }
                            ]
                        },
                        "authentication_type": {
                            "type": "string",
                            "items": [
                                "MD5",
                                "SHA"
                            ]
                        },
                        "authentication_password": {
                            "description": "Each range {min_len,max_len} corresponds to one snmp_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 15
                                },
                                {
                                    "min_len": 8,
                                    "max_len": 15
                                }
                            ]
                        },
                        "authentication_password_empty": {"type": "bool"},
                        "encrypted_type": {
                            "type": "string",
                            "items": ["CBC-DES"]
                        },
                        "encrypted_password": {
                            "description": "Each range {min_len,max_len} corresponds to one snmp_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 15
                                },
                                {
                                    "min_len": 8,
                                    "max_len": 15
                                }
                            ]
                        },
                        "encrypted_password_empty": {"type": "bool"}
                    }
                },
                "readwrite_user": {
                    "type": "object",
                    "items": {
                        "username": {
                            "description": "Each range {min_len,max_len} corresponds to one snmp_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 16
                                },
                                {
                                    "min_len": 0,
                                    "max_len": 16
                                }
                            ]
                        },
                        "authentication_type": {
                            "type": "string",
                            "items": [
                                "MD5",
                                "SHA"
                            ]
                        },
                        "authentication_password": {
                            "description": "Each range {min_len,max_len} corresponds to one snmp_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 15
                                },
                                {
                                    "min_len": 8,
                                    "max_len": 15
                                }
                            ]
                        },
                        "authentication_password_empty": {"type": "bool"},
                        "encrypted_type": {
                            "type": "string",
                            "items": ["CBC-DES"]
                        },
                        "encrypted_password": {
                            "description": "Each range {min_len,max_len} corresponds to one snmp_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 15
                                },
                                {
                                    "min_len": 8,
                                    "max_len": 15
                                }
                            ]
                        },
                        "encrypted_password_empty": {"type": "bool"}
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
