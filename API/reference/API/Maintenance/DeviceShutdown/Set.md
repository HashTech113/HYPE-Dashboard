# Set

## Function

This API is used to device shutdown.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| base_secondary_authentication |   | object | Encrypted information for authentication. See base_secondary_authentication information table for structure members details. |

Sample:

POST /API/Maintenance/DeveloperMode/Clear HTTP/1.1

{
    "version": "1.0",
    "data": {
        "base_secondary_authentication":{
            "seq":2,
            "cipher":"FWRsfpB05p/NfdTleipoBR1d06/dZA2xO8cDJiF4CYM="
        }
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
