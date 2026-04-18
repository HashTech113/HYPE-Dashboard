# GetById

## Function

This API is used to match AI > Recognition > SnapedObjects snapshot objects.

## Request Message

See AI > Recognition > SnapedObjects > GetByIndex > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/SnapedObjects/GetById HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Engine": 0,
		"StartIndex": 0,
		"Count": 20,
		"SimpleInfo": 1，
		"WithObjectImage": 0,
		"WithBackgroud": 0
	}
}

## Response Message

See AI > Recognition > SnapedObjects > GetByIndex > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"TotalCount": 600,
		"Count": 20,
		"SnapedObjInfo": [
			{
				"UUId": 103,
				"Chn": 3,
				"StrChn":"CH4",
				"StartTime": 1540444116,
				"EndTime": 1540444137,
				"ObjectImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"SnapId": 2375,
				"Type": 1
			},
			{
				"UUId": 105,
				"Chn": 6,
				"StrChn":"CH7",
				"StartTime": 1540444116,
				"EndTime": 1540444139,
				"ObjectImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"SnapId": 2375,
				"Type": 2
			},
			{
				...
			},
			...
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
