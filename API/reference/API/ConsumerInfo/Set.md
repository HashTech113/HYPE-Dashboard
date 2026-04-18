# Set

## Function

This API is used for setup ConsumerInfo parameter。

## Request Message

### Parameter Description

See ConsumerInfo > Response Message > Parameter Description > Table 1 Get Parameter description

Sample：

POST /API/ChannelConfig/ImageControl/Set HTTP/1.1

{
 "data":{
        "domain_name":"xxxx",
        "customer_id":"00",
        "cloud_id":"xxxx"
    }
}

## Response Message

none

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response message body 和 general error_code for more information.
