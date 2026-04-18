# Set

## Function

This API is used to set AI > Recognition > Model Configuratuon  page parameters.

## Request Message

See AI > Recognition > Model Configuratuon > Get > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/Model/Set HTTP/1.1

{
   {
    "result": "success",
    "data": {
        "rows": [
			{
                "channel": "local",
                "face_recognition": "------",
                "face_detection": "------",
                "enable_face_recognition": false
            },
            {
                "channel": "CH1",
                "face_recognition": "V0.2.0.0.1-release",
                "face_detection": "V0.2.1.2.1-release",
                "enable_face_recognition": true
            }
        ]
    }
}
}

## Response Message

none.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
