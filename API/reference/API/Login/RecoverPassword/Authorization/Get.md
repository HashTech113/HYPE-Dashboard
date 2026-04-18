# Get

## Function

This API is used to get parameter for Login > RecoverPassword > Authorization page.

## Request Message

None.

Sample:

POST /API/RecoverPassword/Authorization/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

See Login > RecoverPassword > Authorization > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "mode": "Answer",
        "questions": [
            5,
            4,
            3
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
