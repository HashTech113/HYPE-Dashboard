# Set

## Function

This API is used to set parameter for Network > Email.

## Request Message

### Parameter Description

See Network > Email > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/NetworkConfig/Email/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "email_enable":true,
        "encryption":"Auto",
        "smtp_port":25,
        "smtp_server":"aaa",
        "username":"aaa",
        "password_empty":false,
        "sender":"aaaaa",
        "recvemail":
        {
            "recvemail_1":"aaaaa@qq.com",
            "recvemail_2":"aaaaa@qq.com",
            "recvemail_3":"aaaaa@qq.com"},
            "interval_time":3,
            "report_button":
            {
                "report_button_1":"send_device_report"
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
