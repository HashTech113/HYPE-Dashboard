# GetById

## Function

This API is used to get AI > Recognition > Database face information query face information.

## Request Message

### Parameter Description

Table 5
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||
|FacesId|[1, 5, 6, 20, 53, 25…]|array|List of face ids that need to be requested, with one integer for each array bit.|
|FacesMD5|["F75C70ADB0B63B00E279E71B4143704D","B74C70ADB0B63B00E279B71B4193704F","A29B70ADB0B63B00E2793C1B4123504D","B34C70A3B0B53B00E279571B4143704F","AC3C70ADB3B63B40E279EE1B41F3C04D","B74A70ADB0B63400E279E71B4143804F"…]|array|Face MD5 value|
|SimpleInfo|0|int|Get abbreviated information, each face information in the response message contains only Id, GrpId and Name fields, 1-abbreviated mode, 0-normal mode|
|WithImage|1|int|Do you need a picture? 1- Yes, 0- No|
|WithFeature|1|int|Whether the eigenvalue is required, 1- Yes, 0- no|
|NeedMD5|0|int|Whether MD5 is required, 1- Yes, 0- no, MD5 is also given in non-abbreviated mode|

Sample:

POST /API/AI/AddedFaces/GetById HTTP/1.1

{
	"data": {
		"MsgId": null,
		"FacesId": [1, 5, 6, 20, 53, 25],
		"FacesMD5": ["F75C70ADB0B63B00E279E71B4143704D",
					 "B74C70ADB0B63B00E279B71B4193704F",
					 "A29B70ADB0B63B00E2793C1B4123504D",
					 "B34C70A3B0B53B00E279571B4143704F",
					 "AC3C70ADB3B63B40E279EE1B41F3C04D",
					 "B74A70ADB0B63400E279E71B4143804F"],

		"SimpleInfo": 0
		"WithImage": 1,
		"WithFeature": 1,
		"NeedMD5": 0
	}
}

## Response Message

See AI > Recognition > Database face information query > Search > Parameter Description > Table 1for parameter description.

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
