# Control

## Function

This API is used to control Network>Voice Assistant.

## Request Message

### Parameter Description

See Network > Voice Assistant > Range > Parameter Description > Table 2 for parameter description.

Sample：

POST /API/NetworkConfig/SMARTHOME/Control HTTP/1.1

This API is currently not implemented.

{
    "version": "1.0",
    "data": {
        "BindEnable": true,
        "UserName": "xxxxx@qq.com",
        "ScreenStream": "Mainstream",
        "SmartHomePage": "Amazon",
        "operate": "Apply"
    }
}

## Response Message

### Parameter Description

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

###### Table 1

| error_code | commet |

| user_error | Invalid account. |

| bind_fail | Binding failed. |

| unbind_fail | Unbind failed. |

| error_try_again | The request failed. |

| Network_or_DNS_error | Network or DNS error. |

See Table 1,Response Messages Body and Common error_code for more information.
