# Set

## Functions

This API is used to set the RecoverPassword parameters.

## Request Message

See Login > RecoverPassword > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/RecoverPassword/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "answer_flag": true,
        "email_flag": true,
        "certificate_flag": true,
        "super_pwd_flag": true,
        "questions": [5, 4, 3],
        "answers": ["111", "222", "333"],
        "email": "123456@qq.com"
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
