# Remove

## Function

This API is used to remove AI > Recognition > FDGroup face groups.

## Request Message

### Parameter Description

Table 7
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Group|0-16|array|RemoveFace GroupJSON show as followTable 8|

Table 8
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Id||int|Delete a face group ID. A predefined group cannot be deleted|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/FDGroup/Remove HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Group": [
			{
				"Id": 4,
			}
		]
	}
}

## Response Message

See AI > Recognition > FDGroup > Modify> Parameter Description > Table 9for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
