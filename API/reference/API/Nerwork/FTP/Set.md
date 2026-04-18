# Set

## Function

This API is used to set parameter for Network > FTP.

## Request Message

### Parameter Description

See Network > FTP > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/Ftp/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "ftp_enable":true,
        "server_ip":"aaa",
        "port":21,
        "username":"aaa",
        "password_empty":true,
        "picture_quality":"Higher",
        "video_stream_type":"Substream",
        "max_package_interval":30,
        "directory_name":"aaa",
        "base_enc_password":
        {
            "seq":0,
            "peer_key":"0fvTpiCxu35TY5Vn8vR1Ng/MB4rFf46Rj9/Tp+LFNRGU=",
            "cipher":"0cxEOj04QQA/8cMDCvYlhSCtsCPlL3fJkFyaO1ULXGA=="
        }
    }
}

## Response Message

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
