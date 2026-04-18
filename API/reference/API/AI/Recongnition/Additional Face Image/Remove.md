# Remove

## Function

This API is used to remove AI > Recognition > Additional Face Image face images.

## Request Message

See AI > Recognition > Additional Face Image > Get > Parameter Description > Table 2for parameter description.

Sample:

POST /API/AI/ExtraFaces/Remove HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Count": 2,
		"ExtFaceInfo": [
			{
				"Id": 1,
				"FaceId": 0,
				"Image": null,
				"Feature": null,
				"FtVersion": 0
			},
			{
				"Id": 2,
				"FaceId": 0,
				"Image": null,
				"Feature": null,
				"FtVersion": 0
			}
		]
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
