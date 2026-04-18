# Add

## Function

This API is used to add AI > Recognition > Faces faces.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Count |   | int | 添加多个人脸信息的计数 |

| FaceInfo |   | JSON array | Add Faces JSON show as followTable 2 |

Table 2
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Id||int|64-bit signed face Id, unique identifier, Id field must be valid when Modify face information|
|GrpId||int|Group ID|
|Time||int|Start time|
|Similarity||unsigned int|similarity|
|Sex||int|Gender: 0-male, 1-female|
|Age||int|age|
|Chn||int|channel|
|ModifyCnt||int|The number of modifications, the upper layer is read-only, and the device updates the face information in real time each time it is modified|
|Image1|"base64(imgData)"|string|When adding must be given, is the main picture of the database face. When Modify, if "Image1" and "Feature" are given, the given "Image1" and "Feature" are used directly (note that the feature value version must also be given). If only "Image1" is given, "Feature" is recalculated, and if "Image1" is not given, only fields other than "Image1" and "Feature" are modified.|
|Image2|null|string|This parameter is only useful for real-time alarms|
|Image3|null|string|This parameter is only useful for real-time alarms|
|Feature|"base64(feature)"|string|eigenvalue|
|FtVersion||int|Version of the eigenvalue. This parameter is meaningful only when the eigenvalue of the same version is compared. If the eigenvalue is returned, this field is also returned|
|Name|"Mike"|string|name|
|Country|"China"|string|nationality|
|Nation|"Han"|string|nation|
|NativePlace|"Guangdong,Zhuhai"|string|Native place|
|IdCode|"415025199203050916"|string|Identification card|
|Job|"Software"|string|professional|
|Phone|"12345678902"|string|telephone|
|Email|"abcd@163.com"|string|mail|
|Domicile|"Guangdong,Zhuhai,Xiangzhou ..."|string|Current residence|
|Remark|"Detail of this person ..."|string|evaluate|
|EnableChnAlarm|[255, 255, 255, 255]|array|Special authority control, control the face is allowed in which channels for alarm, according to the bit bit position indicates that the corresponding channel allows alarm, the field does not exist or is empty means that special authority control is not used|

Sample:

POST /API/AI/Faces/Add HTTP/1.1

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
				"FtVersion": 0,
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

## Parameter Description

#### Table 5

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Count |   | int | group count |

| Result | [0, 0,…] | array | result show as follow Table x |

| Id | [2, 3,…] | array | Add the corresponding face Id after success |

| MD5 | ["F74C70ADB0B63B00E279E71B4143704D", "0194F781438F2DE8FBE5B0469895036D"] | array | MD5 value of the face |

Table x
| Result type | Description |
| ---- | ---- |
|AORT_SUCCESS = 0|succeed|
|AORT_NO_DB = -1|No database|
|AORT_DB_EXEC_FAILED = -2|Database execution failure|
|AORT_CALC_FEATURE_FAILED = -3|Feature extraction failure|
|AORT_CANCELED = -4|canceled|
|AORT_NO_DISK = -5|No hard disk|
|AORT_DISK_ERROR = -6|Hard disk error|
|AORT_EXIST = -7|Already exist|
|AORT_GROUP_INVALID = -8|Group invalid|
|AORT_NOT_EXIST = -9|inexistence|
|AORT_MORE_FILE_EXIST = -10|File already exists|
|AORT_SEARCH_ERROR = -11|Search error|
|AORT_OVER_MAX_COUNT = -12|upper limit exceeded|
|AORT_UPDATING_FEATURE = -13|Updating feature values|
|AORT_NO_USABLE_IPC = -14|There is no IPC vailable for eigenvalue calculation|
|AORT_INVALID_PARAM = -15|invalid parameter|
|AORT_INVALID_FORMAT = -16|malformed |
|AORT_INVALID_RES = -17|resolution error|
|AORT_INVALID_MEM = -18|File too large error|
|AORT_CREAT_FAILED = -19|create failed|
|AORT_MD5_NOT_MATCH = -20|MD5 mismatch|
|AORT_POS_ERROR = -21|wrong location|
|AORT_SIZE_ERROR = -22|size error|
|AORT_NOT_READY = -23|not ready|
|AORT_INVALID_DB = -24|invalid database|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

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
