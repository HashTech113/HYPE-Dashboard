# GetById

## Function

This API is used to get AI > Recognition > Additional Face Image face image ID.

## Request Message

See AI > Recognition > Additional Face Image > Get > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/ExtraFaces/GetById HTTP/1.1

{
	"data": {
		"MsgId": null,
		"FaceId": 1,
		"WithImage": 1,
		"WithFeature": 1
	}
}

## Response Message

See AI > Recognition > Additional Face Image > Get > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": [0, 0],
		"Count": 2,
		"ExtFaceInfo": [
			{
				"Id": -1,
				"FaceId": 1,
				"Image": "base64(imgData)",
				"Feature": "base64(feature)",
				"FtVersion": 0
			},
			{
				"Id": -1,
				"FaceId": 1,
				"Image": "base64(imgData)",
				"Feature": "base64(feature)",
				"FtVersion": 0
			}
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
