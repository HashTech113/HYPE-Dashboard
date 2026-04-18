## Change

## Function

This API is used to change the group to which a face belongs AI > Recognition > Face Group

## Request Message

### Parameter Description

Table 3
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||
|Count||int|修改人脸所属组人脸组数或删除的人脸组数|
|Group||int|将要移到的人脸组Id,仅Change时有此字段|
|FaceInfo||JSON array|Add Faces JSON show as follow Table 4|

Table 4
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId	|null	|||
|Id	|-1|	int	|64-bit signed face Id|
|MD5	|"F74C70ADB0B63B00E279E71B4143704D"|	string	|When deleting face information, you only need to set the "Id" or MD5 field. The MD5 field has a higher priority. If MD5 field exists, MD5 is used first|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/FDGroup/Change HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Count": 2,
		"Group": 1,
		"FaceInfo": [{
				"id": -1,
				"MD5":"F74C70ADB0B63B00E279E71B4143704D"
		}]
	}
}

## Response Message

## Parameter Description

Table 5
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Count||int|group count|
|Result|[0, 0,…]|array|result show as follow Table x|
|Id|[2, 3,…]|array|Add the corresponding face Id after success|
|MD5|["F74C70ADB0B63B00E279E71B4143704D", "0194F781438F2DE8FBE5B0469895036D"]|array|MD5 value of the face|

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
