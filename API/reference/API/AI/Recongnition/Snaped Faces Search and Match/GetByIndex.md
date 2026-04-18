# GetByIndex

## Function

This API is used to match AI > Recognition > SnapedFaces snapshot face information.

## Request Message

### Parameter Description

Table 4
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||
|Engine|0|int|Which search engine, 0 or 1, to use with the search interface|
|MatchedFaces|1|int|Get a matched face or capture a face, 1- Get a matched face, 0- get a captured face, only GetByIndex has this field|

|StartIndex||int|The starting index of the request, for example, the first time: 0-19, the second time: 20-39, the StartIndex is 0, 20, and only GetByIndex has this field|
|Count||int|The number of face information requested. Only GetByIndex has this field|
|SimpleInfo|1|int|Get short information, or complete information. 1- Abbreviated information,0- complete information. Summary information contains only MatchedId, Similarity, UUId at most, and only UUId if no face is matched. Only GetByIndex has this field|
|UUIds||array|The unique identification of the capture information to be obtained, only GetById has this field|
|WithFaceImage|1|int|Do you need a face picture? 1- Yes, 0- No|
|WithBodyImage|0|int|Do you want a body picture? 1- Yes, 0- No|
|WithBackgroud|0|int|Do you need a background image? 1- Yes, 0- No|
|WithFeature|1|int|Whether the eigenvalue is required, 1- Yes, 0- no|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/SnapedFaces/GetByIndex HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Engine": 0,
		"MatchedFaces": 1,
		"StartIndex": 0,
		"Count": 20,
		"SimpleInfo": 1	,
		"WithFaceImage": 1,
		"WithBodyImage": 0,
		"WithBackgroud": 0,
		"WithFeature": 1
	}
}

## Response Message

SeeAI > Recognition > SnapedFaces > Search > Parameter Description > Table 3

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
