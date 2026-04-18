# Range

# Range

## Function

This API is used to get fan switch information range.

## Request Message

None.

Sample:

POST /API/Maintenance/DefoggingFan/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| defogging_fan |   | bool | Defogging Fan switch. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "defogging_fan":{
            "type": "bool"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
