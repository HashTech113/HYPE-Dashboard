# GetId

## Function

This API is used to get the AI > Recognition > PlateGroup license plate group id.

## Request Message

### Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null||moot  |
|TypeFlags|1|int|Fixed to 1  |
|DefaultVal||int|Get default alarm parameters or actual alarm parameters, 1- default parameters, 0- actual parameters  |
|WithInternal|0,1|int|Used to control whether to return the Id of the internal group. There is an internal group that is not open to the user. If you want to get the Id of this group, WithInternal gives 1.  General give 0  |
|SimpleInfo||int|Get simple information or complete information. Simple information only includes Group name, Id, DetectType, Policy, Enabled, CanDel, Similarity, and complete information includes all parameters of the group.  1- Get abbreviated information, 0- complete information |

Sample:

POST /API/AI/PlateGroup/GetId HTTP/1.1

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

Table 2
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|Nul||moot|
|Result|0，-1，-2，….-23, -24|int|Request return results seeAI > Recognition > PlateGroup > Get > Parameter Description > Table 3,This field is not required for Modify|
|GroupsId|[1,2,3…x]|array|The ID of the obtained group|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	{"data": {
    "MsgId": "",
    "Result": 0,
    "GroupsId": [
        1,
        2,
        3,
        4,
        5,
        6,
       ]
}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
