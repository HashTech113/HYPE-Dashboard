# Get

## Function

This API is used to get ConsumerInfo parameter。

## Request Message

none

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | description |

| product_code |   | string | Consumer product code |

| domain_name |   | string | Indicates the domain name of the consumer server |

| customer_id |   | string | The customer number added by the consumer ID |

| cloud_id |   | string | customer cloud id |

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
"result":"success",
    "data":{
        "product_code":"W1P"
    }
}

## Error Code

See Response message body 和 general error_code for more information.
