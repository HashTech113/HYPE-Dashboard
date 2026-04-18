# Get

## Function

This API is used to get parameter for Network > FTP .

## Request Message

None.

Sample：

POST /API/NetworkConfig/Ftp/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Network > FTP > Range > Parameter > Table 1 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "1.0",
    "result":"success",
    "data":{
        "ftp_enable": false,
        "server_ip": "192.168.1.100",
        "port": 21,
        "username": "",
        "password_empty": "",
        "picture_resolution": "1280x720",
        "picture_quality": "Higher",
        "video_stream_type": "SubStream",
        "max_package_interval": 30,
        "directory_name": "",
        "upload_normal_video": {
            "enable": true,
            "channel": [
            "IP_CH2",
            "IP_CH3",
            "IP_CH4"
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
