# Get

## Function

This API is used to obtain configuration parameters for retrieving passwords.

## Request Message

None.

Sample:

POST /API/RecoverPassword/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
    }
}

## Response Message

### Parameter Description

See Login > RecoverPassword > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "questions":
        [
            5,
            4,
            3
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
