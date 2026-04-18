# Get

## Function

This API is used to get AI > Recognition > Additional Face Image face image parameters.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| FaceId |   | int | Need to request the face Id of the additional face, pay attention to the face Id of the additional face, this field is valid when Get, |

| Id |   | int | The Id of the additional face that needs to be requested, note that it is not the face Id that it belongs to. This field is valid for GetById |

| WithImage | 1 | int | Do you need a picture? 1- Yes, 0- No |

| WithFeature | 1 | int | Whether the eigenvalue is required, 1- Yes, 0- no |

Sample:

POST /API/AI/ExtraFaces/Get HTTP/1.1

{
	"data": {
		"MsgId": null,
		"FaceId": 1,
		"WithImage": 1,
		"WithFeature": 1
	}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result |   | int | See the resultTable x，This field is valid for Get or GetById, but not for Add or Remove |

| Count |   | int | The total number of faces queried |

| ExtFaceInfo |   | JSON array | ExtraFaces JSON show as follow Table 3 |

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

Table 3
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Id||int|Attach the Id of the face, not the face Id to which it belongs|
|FaceId||int|Attach the Id of the face, attach the face Id to which the face belongs|
|Image|"base64(imgData)"|string|Attach face image,Remove attach face, just give the "Id" field, this field uses the default value|
|Feature|"base64(feature)"|string|Attach face feature value,Remove attach face, just give the "Id" field, this field uses the default value|
|FtVersion|0|int|Version of the eigenvalue. This parameter is meaningful only when the eigenvalue of the same version is compared. If the eigenvalue is returned, this field is also returned|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

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
