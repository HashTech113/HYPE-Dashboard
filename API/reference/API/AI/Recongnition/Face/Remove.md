# Remove

## Function

This API is used to remove the AI > Recognition > Faces parameter.

## Request Message

### Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||
|Count||int|Modify the number of face groups to which a face belongs or delete the number of face groups|
|FaceInfo||JSON array|Add Faces JSON see Table 2|

Table 2
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId	|null	|||
|Id	|-1|	int	|64-bit signed face Id|
|MD5	|"F74C70ADB0B63B00E279E71B4143704D"|	string	|When deleting face information, you only need to set the "Id" or MD5 field. The MD5 field has a higher priority. If MD5 field exists, MD5 is used first|

Sample:

POST /API/AI/Faces/Remove HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Count": 2,
		"FaceInfo": [
			{
				"Id": 2,
				"MD5": "F74C70ADB0B63B00E279E71B4143704D"
			},
			{
				"Id": 3,
				"MD5": "0194F781438F2DE8FBE5B0469895036D"
			}
		]
	}
}

## Response Message

## Parameter Description

See AI > Recognition > Faces > Add > Parameter Description > Table 5for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "MsgId": null,
        "Count": 2,
        "Result": [0,0],
        "Id": [ 2,3],
        "MD5": [
            "F74C70ADB0B63B00E279E71B4143704D",
            "0194F781438F2DE8FBE5B0469895036D"
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
