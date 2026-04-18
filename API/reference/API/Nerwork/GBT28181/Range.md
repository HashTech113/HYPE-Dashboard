# Range

## Function

This API is used to get the parameter range of Network > GBT28181.

## Request Message

None.

Sample:

POST /API/NetworkConfig/T28181/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### table 1

| Parameter | Range | Type | Description |

| server_port | [1~65535] | int | Gb28181 platform port |

| local_port | 5060 5061 5062 5063 5064 | int | Device port |

| stream_port | 55550 55551 55552 55553 55554 | int | Stream port |

| heart_beat_time | [5~255] | int | Heartbeat time |

| expires | [30~10000] | int | Registration validity period |

| enable_flag |   | bool | GB28181 function switch |

| max_timeouts | [3~255] | int | Number of timeouts |

| stream_type | "Mainstream" "Substream" | string | Stream type |

| server_ip | Max length: 32 byte | string | GB28181 server ip |

| server_id | Max length: 20 byte | string | GB28181 server id |

| device_id | Max length: 20 byte | string | Device id |

| password | Max length: 31 byte | string | Gb28181 platform password |

| password_empty |   | bool | Whether the password is empty |

| device_name | Max length: 31 byte | string | Device name |

| server_domain | Max length: 11 byte | string | GB28181 Server domain |

| link_status | "Not_Connect" "Register_success" "Network_error" "Password_deviceId_error" "GB28181_close" "GB28181_open" | string | Device name |

| channel_nvr_id |   | JSON array | Single Channel Information JSON show as table2 |

#### table 2

| Parameter | Range | Type | Description |

| channel_id | 0-20 | string | channel id |

Sample:

POST /API/ NetworkConfig/T28181/Range HTTP/1.1

{
    "result": "success",
    "data": {
        "server_port": {
            "type": "int32",
            "min": 1,
            "max": 65535
        },
        "local_port": {
            "type": "int32",
            "items": [
                5060,
                5061,
                5062,
                5063,
                5064
            ]
        },
        "stream_port": {
            "type": "int32",
            "items": [
                55550,
                55551,
                55552,
                55553,
                55554
            ]
        },
        "heart_beat_time": {
            "type": "int32",
            "min": 5,
            "max": 255
        },
        "expires": {
            "type": "int32",
            "min": 30,
            "max": 100000
        },
        "enable_flag": {"type": "bool"},
        "max_timeouts": {
            "type": "int32",
            "min": 3,
            "max": 255
        },
        "stream_type": {
            "type": "string",
            "items": [
                "Mainstream",
                "Substream"
            ]
        },
        "server_ip": {
            "description": "Each range {min_len,max_len} corresponds to one enableflag state [false,true].",
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
        "server_id": {
            "description": "Each range {min_len,max_len} corresponds to one enableflag state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 20
                },
                {
                    "min_len": 1,
                    "max_len": 20
                }
            ]
        },
        "device_id": {
            "description": "Each range {min_len,max_len} corresponds to one enableflag state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 20
                },
                {
                    "min_len": 1,
                    "max_len": 20
                }
            ]
        },
        "password": {
            "description": "Each range {min_len,max_len} corresponds to one enableflag state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 31
                },
                {
                    "min_len": 1,
                    "max_len": 31
                }
            ]
        },
        "password_empty": {"type": "bool"},
        "device_name": {
            "description": "Each range {min_len,max_len} corresponds to one enableflag state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 31
                },
                {
                    "min_len": 1,
                    "max_len": 31
                }
            ]
        },
        "server_domain": {
            "description": "Each range {min_len,max_len} corresponds to one enableflag state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 11
                },
                {
                    "min_len": 1,
                    "max_len": 11
                }
            ]
        },
        "link_status": {
            "type": "string",
            "items": [
                "Not_Connect",
                "Register_success",
                "Network_error",
                "Password_deviceId_error",
                "GB28181_close",
                "GB28181_open"
            ]
        },
        "channel_nvr_id": {
            "type": "array",
            "min_size": 0,
            "max_size": 1,
            "items": {"channel_id": {
                "type": "string",
                "min_len": 0,
                "max_len": 20
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
