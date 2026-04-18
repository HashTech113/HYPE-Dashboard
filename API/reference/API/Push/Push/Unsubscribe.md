# Unsubscribe

## Function

This API is used to close push.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| Token |   | string |   |

| UUID |   | string |   |

Sample:

POST /API/Push/Unsubscribe HTTP/1.1

{
    "version": "1.0",
    "data": {
        "Token":"f06214c1d9348dee11a513213c9a38d0b62c9ffd32d1c1b6f6485117d1f187b9",
        "UUID": "7c42cecc-7989-43df-8baf-86065abffac0"
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
