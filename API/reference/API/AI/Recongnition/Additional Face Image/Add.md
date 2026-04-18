# Add

## Function

This API is used to add AI > Recognition > Additional Face Image face images.

## Request Message

See AI > Recognition > Additional Face Image > Get > Parameter Description > Table 2for parameter description.

Sample:

POST /API/AI/ExtraFaces/Add HTTP/1.1

{
	{
	"data": {
		"MsgId": null,
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

}

## Response Message

See AI > Recognition > Additional Face Image > Get > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Count": 2,
		"Result": [0, 0],
		"Id": [1, 2]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
