# Test

## Function

This API is used to test whether the FTP server is connected.

## Request Message

### Parameter Description

See Network > FTP > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/Ftp/Test HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "ftp_enable":true,
        "server_ip":"aaa",
        "port":21,
        "username":"aaa",
        "password_empty":false,
        "picture_quality":"Higher",
        "video_stream_type":"Substream",
        "max_package_interval":30,
        "directory_name":"aaa"
    }
}

## Response Message

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "failed",
    "reason": "Illegal parameter!",
    "error_code": "illegal_param",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
