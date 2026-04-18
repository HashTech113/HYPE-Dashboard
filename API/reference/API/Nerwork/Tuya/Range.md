# Range

## Function

This API is used to get the parameter range of Network > Tuya.

## Request Message

None.

Sample:

POST /API/NetworkConfig/Tuya/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| enable |   | bool | enable |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"enable": {"type": "bool"}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
