# Get

## Function

This API is used to get parameter for Network>Rtsp .

## Request Message

None

Sample：

POST /API/NetworkConfig/Rtsp/Get HTTP/1.1

note:(DVR/NVR not supported)

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > Rtsp > Range > Parameter Description > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "rtsp_enable": true,
        "rtsp_check_flag": true,
        "anonymous_login": false,
        "rtsp_url": "rtsp://IP:RtspPort/rtsp/streaming?channel=01&subtype=A",
        "ipeye_enable": true,
        "metadata_platform": "None"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
