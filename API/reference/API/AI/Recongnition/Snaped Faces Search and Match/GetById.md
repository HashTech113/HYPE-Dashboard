# GetById

## Function

This API is used to match AI > Recognition > SnapedFaces snapshot face information ID.

## Request Message

### Parameter Description

Table 5
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Result|0|int|See the resultAI > Recognition > SnapedFaces > Search > Parameter Description > Table x|
|TotalCount||int|The total number of faces searched or matched. Only GetByIndex has this field|
|Count||int|The total number of captured faces in this response|
|SnapedFaceInfo||array|SnapedFaces JSON show as followTable 6|

Table 6
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|UUId||string|The unique Id of the captured face information can be directly used to obtain the detailed information of the face|
|MatchedFaceId||int|Matching face Id. If there is no match, there is no field. Only GetByIndex has this field|
|MatchedMD5||string|Matching face MD5. If there is no match, this field is not available. Only GetByIndex has this field|
|Chn||int|passage|
|StrChn|“CH1”…”CH1x”
“IP_CH1”…” IP_CH1x”
“WIFI_CH1”…” WIFI_CH1x”
The number of channels depends on the capability of the device|string|passage|
|Similarity||float|Similarity to the face on the match, if there is no match, there is no field, only GetByIndex has this field|
|StartTime||unsigned long long|Unix timestamp, such as 1540444116|
|EndTime||unsigned long long|Unix timestamp, such as 1540444116|
|FaceImage|"base64(imgData)"|string|The front IPC sent over the captured face picture|
|BodyImage|"base64(imgData)"|string|A snapshot of the body sent by the front-end IPC|
|Background|"base64(imgData)"|string|Captured background image from the front-end IPC|
|Feature|"base64(feature)"|string|eigenvalue|
|FtVersion||int|Version of the eigenvalue. This parameter is meaningful only when the eigenvalue of the same version is compared. If the eigenvalue is returned, this field is also returned|
|SnapId||unsigned int|Front-end IPC snap picture Id, 32-bit unsigned integer|
|Type|0|int|Capture face type markers|

|Score||int|Picture score (confidence)|
|Gender	||int|Gender, 0: male, 1: female|
|fAttrAge||int|age|
|Beauty||int|Appearance level|
|GlassesType||int|Type of glasses, 0: no glasses, 1: wear glasses (currently no distinction between sunglasses, ordinary glasses, default to all glasses)|
|Expression	||int|Expression type: 0: blank expression, 1: smile, 2: laugh|
|MouthMask||int|Whether to wear a mask, 0: no mask, 1: wear a mask|
|Race||int|Race: 0: Yellow, 1: White, 2: Black, 3: Arab|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/SnapedFaces/GetById HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"TotalCount": 600,
		"Count": 20,
		"SnapedFaceInfo": [
			{
				"UUId": 103,
				"MatchedFaceId": 5,
				"MatchedMD5": "294C703DB05F3B00E279E71B41437E46",
				"Chn": 3,
				"StrChn":"4",
				"Similarity": 89.39759,
				"StartTime": 1540444116,
				"EndTime": 1540444136,
				"FaceImage": "base64(imgData)",
				"BodyImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"Feature": "base64(feature)",
				"FtVersion": 0
				"SnapId": 2375,
				"Type": 0,
				"Score": 60,
				"Gender": 0,
				"fAttrAge": 25,
				"Beauty": 51，
				"GlassesType": 1,
				"Expression": 0,
				"MouthMask": 1,
				"Race": 1
			},
			{
				"UUId": 126,
				"MatchedFaceId": 2,
				"MatchedMD5": "F74C70ADB0B63B00E279E71B4143704D",
				"Chn": 3,
				"StrChn":"4",
				"Similarity": 96.87693,
				"StartTime": 1540444116,
				"EndTime": 1540444136,
				"FaceImage": "base64(imgData)",
				"BodyImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"Feature": "base64(feature)",
				"FtVersion": 0
				"SnapId": 2376,
				"Type": 0,
				"Score": 60,
				"Gender": 0,
				"fAttrAge": 25,
				"Beauty": 51，
				"GlassesType": 1,
				"Expression": 0,
				"MouthMask": 1,
				"Race": 1
			},
			{
				...
			},
			...
		]
	}
}

## Response Message

See AI > Recognition > SnapedFaces > Search > Parameter Description > Table 3for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"Count": 153
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
