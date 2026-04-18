# Search

## Function

This API is used to search AI > Recognition > Database face information query face information.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result |   | int | See the resultTable x，GetByIndex, GetById This field is valid |

| channel_max |   | int | Maximum number of channels |

| Count |   | int | The total number of faces queried, GetByIndex, GetById This field is valid |

| FaceInfo |   | JSON array | Add Faces JSON show as follow Table 2 |

Table 2
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Id||int|Face Id, unique Id,GetByIndex, GetById The ID field must be valid for face information. This field is unavailable for Search|
|GrpId||int|Group ID|
|StartTime||unsigned long long|Unix timestamp, such as 1540444116|
|EndTime||unsigned long long|Unix timestamp, such as 1540444116|
|Similarity||unsigned int|similarity|
|Sex||int|Gender: 0-male, 1-female|
|Age||int|age|
|Chn||int|passage|
|StrChn|“CH1”…”CH1x”
“IP_CH1”…” IP_CH1x”
“WIFI_CH1”…” WIFI_CH1x”
The number of channels depends on the capability of the device.|string|String channel number|
|ModifyCnt||int|The number of modifications, the upper layer is read-only, and the device updates the face information in real time each time it is modified|
|Image1|"base64(imgData)"|string|Database face main picture. GetByIndex and GetById The Image1 field is valid for face information, but does not exist in Search|
|Image2|null|string|This field is valid only for real-time alarm, not for Search|
|Image3|null|string|This field is valid only for real-time alarm, not for Search|
|Feature|"base64(feature)"|string|Feature value: GetByIndex and GetById Face information Feature field is valid, but does not have this field in Search	|
|FtVersion||int|Version of the eigenvalue. This parameter is meaningful only when the eigenvalue of the same version is compared. If the eigenvalue is returned, this field is also returned. GetByIndex and GetById Face information FtVersion is valid. This field is unavailable in Search|
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
|EnableChnAlarm| |array|Special permission control. Control the face allowed in which channels for alarm, according to the bit bit is used, the bit bit is set to indicate that the corresponding channel allows alarm. This field is absent or empty to indicate that the group's alarm channel Settings are used instead of using special permission controls.|

Sample:

POST /API/AI/AddedFaces/Search HTTP/1.1

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

## Response Message

## Parameter Description

Table 3
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Result|[0, 0,…]|array|Result reference Table x|
|channel_max||int|Maximum number of channels|
|Count||int|Search for the total number of faces added|

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

Table 4
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|StartIndex|0|int|If the start index of the request is 0-19 for the first time and 20-39 for the second time, the StartIndex is 0 and 20 respectively|
|Count|20|int|The number of face information requested|
|SimpleInfo|0|int|Get abbreviated information, each face information in the response message contains only Id, GrpId and Name fields, 1-abbreviated mode, 0-normal mode|
|WithImage|1|int|Do you need a picture? 1- Yes, 0- No|
|WithFeature|1|int|Whether the eigenvalue is required, 1- Yes, 0- no|
|NeedMD5|0|int|If MD5 is required, MD5 is also given in non-abbreviated mode|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

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
