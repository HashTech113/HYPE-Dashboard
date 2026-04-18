# Set

## Function

This API is used to set parameter for Network>Rtsp.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| rtsp_enable |   | bool |   |

| rtsp_check_flag |   | bool |   |

| anonymous_login |   | bool | No user name or password is required |

| ipeye_enable |   | bool |   |

| rtsp_url |   | string |   |

| metadata_platform | "None", "General", "Milestone" | string | Streaming data platform |

Sample：

POST /API/NetworkConfig/Rtsp/Set HTTP/1.1

note:(DVR/NVR Not Supported)

{
    "version": "1.0",
    "data": {
        "rtsp_enable": true,
        "rtsp_check_flag": true,
        "anonymous_login": false,
        "rtsp_url": "rtsp://IP:RtspPort/ch01/A",
        "ipeye_enable": true,
        "metadata_platform": "None"
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
