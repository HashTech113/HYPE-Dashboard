# ComponentToken

## Function

This API is used to get component update token.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| file_size |   | int | Upgrade file size. |

Sample:

POST /API/Maintenance/SystemUpgrade/ComponentToken HTTP/1.1

{
    "version": "1.0",
    "data": {
        "file_size":74328284
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| upgrade_token |   | string | Upgrade token. |

| upgrade_timeout | 0-3600 | int | Upgrade timeout. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "upgrade_token": "f06f890cc1aed4a04528516c2d331df4",
        "upgrade_timeout": 1800
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
