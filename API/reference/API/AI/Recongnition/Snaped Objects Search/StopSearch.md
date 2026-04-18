# StopSearch

## Function

This API is used to stop searching for AI > Recognition > SnapedObjects snapshot objects.

## Request Message

### Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Engine||array|List of engines to free cache|
|Result|0|int|See the resultAI > Recognition > SnapedObjects > Search > Parameter Description > Table x|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/SnapedObjects/StopSearch HTTP/1.1

{
    "data": {
        "MsgId": null,
        "Engine": 0,
        "Result": -9
    }
}

## Response Message

See AI > Recognition > SnapedObjects > StopSearch > Parameter Description > Table 1for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "MsgId": null,
        "Engine": 0,
        "Result": -9
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
