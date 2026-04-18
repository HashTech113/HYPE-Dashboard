# Set

## Function

This API is used to control two-way intercom.

## Request Message

### Parameter Description

See PreviewChannel > DualTalk > Get > Parameter Description > Table 1  for parameter description.

Sample:

POST /API/PreviewChannel/DualTalk/Set HTTP/1.1

{
    "version": "1.0",
    "data":{
        "channel": "CH1",
        "action": 1
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
