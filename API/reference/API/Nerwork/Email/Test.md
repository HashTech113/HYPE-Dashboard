# Test

## Function

This API is used to test parameter for Network > Email.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| email_enable |   | bool | Enable email functionality |

| encryption | "Disable", "SSL", "TLS", "AUTO" | string | Encryption Type |

| smtp_port | [1~65535] | int | SMTP port |

| smtp_server | Max lenth:127 byte | string | SMTP server |

| username | [1~65535] | int | Email user name |

| password | [1~65535] | int | Email password |

| password_empty | [1~65535] | int | Is the password empty |

| sender | [1~65535] | int | sender address |

| recvemail |   |   | JSON,see Table 2 for more information |

| interval_time | 1.3.5.10 | int | Sending interval time. Unit: minutes |

| test_id | 1~65535 | int | test id |

| email_test_flag | "Start"、"Stop"、"Query” | string | Email test instructions (start testing, stop testing, obtain test results) |

| base_enc_password |   | Json Object | encrypted password，see base_secondary_authentication for more information |

###### Table 2

| Parameter | Range | Type | Description |

| recvemail_1 |   |   | Email addresses of 3 receivers |

| recvemail_2 |   |   |   |

| recvemail_3 |   |   |   |

Sample：

POST /API/NetworkConfig/Email/Test HTTP/1.1

{
    "data": {
        "email_enable": false,
        "encryption": "AUTO",
        "smtp_port": 25,
        "smtp_server": "smtp163.com",
        "username": "123456@qq.com ",
        "password": "321",
        "sender": "123456@qq.com",
        "recvemail_1": "654321@qq.com ",
        "recvemail_2": "",
        "recvemail_3": "",
        "interval_time": 3,
        "test_id": 3,
        "email_test_Flag":"start"
    }
}

## Response Message

### Parameter Description

###### Table 3

| Parameter | Range | Type | Description |

| test_state | "Testing"（Testing） "Ok"（Tested） | string | Enable email testing status (if the test fails, an error will be directly returned) |

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
