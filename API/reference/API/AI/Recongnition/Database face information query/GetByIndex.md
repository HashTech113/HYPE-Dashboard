# GetByIndex

## Function

This API is used to get AI > Recognition > Database face information query face information.

## Request Message

### Parameter Description

Table 4
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|StartIndex|0|int|If the start index of the request is 0-19 for the first time and 20-39 for the second time, the StartIndex is 0 and 20 respectively|
|Count|20|int|The number of face information requested|
|SimpleInfo|0|int|Get abbreviated information, each face information in the response message contains only Id, GrpId and Name fields, 1-abbreviated mode, 0-normal mode|
|WithImage|1|int|Do you need a picture? 1- Yes, 0- No|
|WithFeature|1|int|Whether the eigenvalue is required, 1- Yes, 0- no|
|NeedMD5|0|int|If MD5 is required, MD5 is also given in non-abbreviated mode|

Sample:

POST /API/AI/AddedFaces/GetByIndex HTTP/1.1

{
	"data":{
		"Msgid":null,
		"StartIndex":0,
		"count":16,
		"SimpleInfo":0,
		"WithImage":1,
		"WithFeature":1,
		"NeedMD5":0
	}
}

## Response Message

See  AI > Recognition > Database face information query > Search > Parameter Description > Table 1for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
			"MsgId": null,
			"FaceInfo": [
				{
					"GrpId": 1,
					"Time": 0,
					"Similarity": 0,
					"Sex": 0,
					"Age": 0,
					"Chn": 0,
					"ModifyCnt": 0,
					"Name": "",
					"Country": "",
					"Nation": "",
					"NativePlace": "",
					"IdCode": "",
					"Job": "",
					"Phone": "",
					"Email": "",
					"Domicile": "",
					"Remark": ""
				}
			]
		}
}

## Error Code

See Response Messages Body and Common error_code for more information.
