# GetId

## Function

This API is used to get the AI > Recognition > FDGroup id.

## Request Message

### Parameter Description

Table 12
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null||moot|
|TypeFlags||int|The combination of detection types of the group to be obtained, such as: 1- face, 2- car, 3- person car (0x1 < < DLDT_Face | 0x1 < < DLDT_Car), currently only faces are supported|
|DefaultVal||int|Get default alarm parameters or actual alarm parameters, 1- default parameters, 0- actual parameters|
|WithInternal||int|Internal group is not open for users to use, only for storing common faces, the client wants to obtain a list of common faces to use the internal group Id|
|SimpleInfo||int|Get simple information or complete information. Simple information only includes Group name, Id, DetectType, Policy, Enabled, CanDel, Similarity, and complete information includes all parameters of the group. 1- Get abbreviated information, 0- complete information|

Sample:

POST /API/AI/FDGroup/GetId HTTP/1.1

{
    "version": "1.0",
    "data": {
        "MsgId": "",
        "DefaultVal": 0,
        "SimpleInfo": 0,
        "TypeFlags": 1,
        "WithInternal": 0
    }
}

## Response Message

## Parameter Description

Table 13
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|Nul||moot|
|Result|0，-1，-2，….-23, -24|int|The return result of the request is shown at Table-17.x.x. This field is not required when Modify is used|
|GroupsId|[1,2,3…x]|array|The ID of the obtained group|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
    "MsgId": "",
    "Result": 0,
    "GroupsId": [
        2,
        3,
        4
    ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
