# Set

## Function

This API is used to reset system default configuration.

## Request Message

See Maintenance > Load Default Parameter > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/Maintenance/Reset/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "base_secondary_authentication":
        {
            "seq":1,
            "cipher":"r8zCQd+EQpuhKY2bKSZhEK/mkpeEzTRVlgDwiepew8k="
        },
        "channel":true,
        "record":true,
        "alarm":false,
        "network":false,
        "storage":false,
        "system":false
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
