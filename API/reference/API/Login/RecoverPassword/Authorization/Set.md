# Set

## Function

This API is used to set the verification question for recovering the password.

## Request Message

See Login > RecoverPassword > Range > Parameter Description > Table 1 for more information.

Sample:

POST /API/RecoverPassword/Authorization/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "answer_flag": true,
        "questions": [
            1,
            2,
            3
        ],
        "email_flag": false,
        "certificate_flag": true,
        "super_pwd_flag": true,
        "enc_answers": {
            "seq": 0,
            "peer_key": "0ehkbgxtTrULIODyzNMAEISzRq86LqwzGdLMKWB5g+T8=",
            "cipher": [
                "0R6rrZLwivuja3Lg3yMl6TWY4wppC0eM/ECgV3sw=",
                "0RKrrZLwivuja3Lg3yEE5XXywwIoMzMM27Q3IAkw=",
                "0RarrZLwivuja3Lg3yDkHrXU3PoXJOCMxue6DScw="
            ]
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
