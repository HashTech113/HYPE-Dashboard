# Range

## Function

This API is used to get the parameter range of Network > DDNS.

## Request Message

None

Sample:

POST /API/NetworkConfig/DDNS/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| ddns_enable |   | bool | Ddns funtion switch. |

| server | "DDNS_3322", "DYNDNS", "NO_IP", "CHANGEIP", "DNSEXIT" | string | DDNS server IP address or name |

| domain | Max length: 35 byte | string | Host name of this device |

| domain_suffix |   | string | Domain suffix |

| username | string length:0-32 | string | DDNS user name. |

| password | string length:0-32 | string | DDNS user password.(Only indicate the range in Range, deprecated in Get, Set and Test, pass empty) |

| password_empty |   | bool | Is the password empty |

| service_id |   | string | B03 dedicated |

| test_befault_save |   | bool | Do you need to test before saving? The default is FALSE. |

| base_enc_password |   | Json Object | Encrypted Password,see base_enc_password for more information. |

| api_key | string length:0-32 | string | dnsexit api-key. |

| api_key_empty |   | bool | Whether the api-key can be empty |

| base_enc_api_key |   | Json Object | Encrypted api-key, same as base_enc_password, see base_enc_password for more information. |

| api_key_url | "https://dnsexit.com" | string | Official website of dnsexit service provider. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ddns_enable": {
            "type": "bool"
        },
        "server": {
            "type": "string",
            "items": [
                "DYNDNS",
                "NO_IP",
                "CHANGEIP",
                "DNSEXIT"
            ]
        },
        "domain": {
            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 35
                },
                {
                    "min_len": 1,
                    "max_len": 35
                }
            ]
        },
        "username": {
            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 32
                },
                {
                    "min_len": 1,
                    "max_len": 32
                }
            ]
        },
        "password": {
            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 32
                },
                {
                    "min_len": 1,
                    "max_len": 32
                }
            ]
        },
        "api_key": {
            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 32
                },
                {
                    "min_len": 1,
                    "max_len": 32
                }
            ]
        },
        "password_empty": {
            "type": "bool"
        },
        "api_key_empty": {
            "type": "bool"
        },
        "domain_suffix": {
            "type": "string",
            "items": [
                "",
                "",
                "",
                ""
            ]
        },
        "test_befault_save": {
            "type": "bool"
        },
        "api_key_url": "https://dnsexit.com",
        "server_content": {
            "type": "object",
            "items": {
                "DYNDNS": {
                    "type": "string",
                    "items": [
                        "domain",
                        "username",
                        "password",
                        "ddnstest"
                    ]
                },
                "NO_IP": {
                    "type": "string",
                    "items": [
                        "domain",
                        "username",
                        "password",
                        "ddnstest"
                    ]
                },
                "CHANGEIP": {
                    "type": "string",
                    "items": [
                        "domain",
                        "username",
                        "password",
                        "ddnstest"
                    ]
                },
                "DNSEXIT": {
                    "type": "string",
                    "items": [
                        "domain",
                        "api_key",
                        "ddnstest"
                    ]
                }
            }
        },
        "ddns_v1": {
            "type": "object",
            "items": {
                "DYNDNS": {
                    "type": "object",
                    "items": {
                        "domain": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 35
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 35
                                }
                            ]
                        },
                        "username": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        },
                        "password": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        }
                    }
                },
                "NO_IP": {
                    "type": "object",
                    "items": {
                        "domain": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 35
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 35
                                }
                            ]
                        },
                        "username": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        },
                        "password": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        }
                    }
                },
                "CHANGEIP": {
                    "type": "object",
                    "items": {
                        "domain": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 35
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 35
                                }
                            ]
                        },
                        "username": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        },
                        "password": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        }
                    }
                },
                "DNSEXIT": {
                    "type": "object",
                    "items": {
                        "domain": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 35
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 35
                                }
                            ]
                        },
                        "api_key": {
                            "description": "Each range {min_len,max_len} corresponds to one ddns_enable state [false,true].",
                            "type": "string",
                            "mode": "rw",
                            "ranges": [
                                {
                                    "min_len": 0,
                                    "max_len": 32
                                },
                                {
                                    "min_len": 1,
                                    "max_len": 32
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
