# Range

## Function

This API is used to get parameter range for System > Privacy Statement page.

## Request Message

None.

Sample:

POST /API/SystemConfig/Statement/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| statement_file_name |   | string | Files that need to be displayed remotely. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "statement_file_name": {
            "type": "string",
            "min_len": 1,
            "max_len": 48
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
