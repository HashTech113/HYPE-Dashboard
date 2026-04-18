# Set

## Function

This API is used to control manual alarms.

## Request Message

### Parameter Description

See PreviewChannel > ManualAlarm > Get > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/PreviewChannel/ManualAlarm/Set HTTP/1.1

{
    "version": "1.0",
    "data":{
        "Local->1": true,
        "Local->2": true,
        "IP_CH1->1": true
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
