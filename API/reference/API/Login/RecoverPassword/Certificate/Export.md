# Export

## Function

This API is used to export certificate API.

## Request Message

None.

Sample:

POST /API/RecoverPassword/Certificate/Export HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| certificate | len:1-128 | string | Certificate code. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "version": "1.0",
    "data": {"certificate": "805902B2173498280FA1AEC4305D43"}
}

## Error Code

See Response Messages Body and Common error_code for more information.
