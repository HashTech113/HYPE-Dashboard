# Modify

## Function

This API is used to modify the AI > Recognition > Faces parameter.

## Request Message

See AI > Recognition > Faces > Add > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/Faces/Modify HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Count": 2,
		"FaceInfo": [
			{
				"Id": -1,
				"GrpId": 1,
				"Time": 0,
				"Similarity": 0,
				"Sex": 0,
				"Age": 26,
				"Chn": 0,
				"ModifyCnt": 0,
				"Image1": "base64(imgData)",
				"Image2": null,
				"Image3": null,
				"Feature": "base64(feature)",
				"FtVersion": 0
				"Name": "Mike",
				"Country": "China",
				"Nation": "Han",
				"NativePlace": "Guangdong,Zhuhai",
				"IdCode": "415025199203050916",
				"Job": "Software",
				"Phone": "12345678902",
				"Email": "abcd@163.com",
				"Domicile": "Guangdong,Zhuhai,Xiangzhou ...",
				"Remark": "Detail of this person ...",
				"EnableChnAlarm": [255, 255, 255, 255]
			}
		]
	}
}

## Response Message

See  AI > Recognition > Faces > Add > Parameter Description > Table 5for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Count": 2,
		"Result": [0, 0],
		"Id": [2, 3],
		"MD5": ["F74C70ADB0B63B00E279E71B4143704D", "0194F781438F2DE8FBE5B0469895036D"]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
