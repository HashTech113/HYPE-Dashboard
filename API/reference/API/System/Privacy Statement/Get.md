# Get

## Function

This API is used to get parameter for System > Privacy Statement page.

## Request Message

None.

Sample:

POST /API/SystemConfig/Statement/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See System > Privacy Statement > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "statement_file_name": "privacy_statement"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
