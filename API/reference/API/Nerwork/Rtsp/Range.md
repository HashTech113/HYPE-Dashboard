# Range

## Function

This API is used to get the parameter range of Network > Rtsp.

## Request Message

None

Sample

POST /API/NetworkConfig/Rtsp/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| resp_enable |   | bool |   |

| rtsp_check_flag |   | bool | Check symbol |

| anonymous_login |   | bool | No username or password required |

| rtsp_url |   | string |   |

| notSupportMobile |   | bool | Mobile not supported (range use) |

| ipeye_enable |   | bool | ipeye enable |

| ipeye_link |   | string | ipeye link |

| metadata_platform | "None", "General", "Milestone" | string | Streaming data platform |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "rtsp_enable": {"type": "bool"},
        "rtsp_check_flag": {"type": "bool"},
        "anonymous_login": {"type": "bool"},
        "rtsp_url": {
            "type": "string",
            "min_len": 0,
            "max_len": 64
        },
         "metadata_platform": {
            "type": "string",
            "items": [
                "None",
                "General",
                "Milestone"
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
