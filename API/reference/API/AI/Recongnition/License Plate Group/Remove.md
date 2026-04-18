# Remove

## Function

This API is used to remove the AI > Recognition > PlateGroup license plate group.

## Request Message

### Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Group|0-16|array|RemoveFace Group JSON show as follow Table 2|

Table 2
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Id||int|Delete a face group ID. A predefined group cannot be deleted|

Sample:

POST /API/AI/PlateGroup/Remove HTTP/1.1

{
	"data": {
        "Group": [
            {
                "Id": 7
            },
            {
                "Id": 8
            }
        ]
	}
}

## Response Message

See AI > Recognition > PlateGroup > Modify> Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Result": [
            0,
            0
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
