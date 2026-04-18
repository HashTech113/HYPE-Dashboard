# Get

## Function

This API is used to get AI > Recognition > FDGroup page parameters.

## Request Message

## Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|    |moot|
|TypeFlags|     |int|The detection type combination of the group to be obtained, such as: 1-face, 2-car, 3-person-car (0x1 << DLDT_Face | 0x1 << DLDT_Car), currently only faces are supported |
|DefaultVal|    |int|Get default alarm parameters or actual alarm parameters, 1- default parameters, 0- actual parameters |
|WithInternal|  |int|Internal group is not open for users to use, only for storing common faces, the client wants to obtain a list of common faces to use the internal group Id |
|SimpleInfo|    |int|Get simple information or complete information. Simple information only includes Group name, Id, DetectType, Policy, Enabled, CanDel, Similarity, and complete information includes all parameters of the group.  1- Get abbreviated information, 0- complete information |
|GroupsId|[1,2,3….x]|array|Obtain the configuration information of the corresponding group. If the field is empty or does not exist, obtain all the information |

Sample:

POST /API/AI/FDGroup/Get HTTP/1.1

{
	"data": {
		"MsgId": null,
		"TypeFlags": 1,
		"DefaultVal": 0,
		"WithInternal": 1，
		"SimpleInfo": 0
"GroupsId": [
2,
        ]
	}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0，-1，-2，….-23, -24 | int | See Table x for the return result of the request. This field is not required for Modify. |

| channel_max |   | int | Maximum number of channels |

| Count | 1-16 | int | Number of groups, used when get |

| Group |   | int | Face group,Face Group Information JSON See TableTable 5. |

#### Table x

| Result type | Description |

| AORT_SUCCESS = 0 | succeed |

| AORT_NO_DB = -1 | No database |

| AORT_DB_EXEC_FAILED = -2 | Database execution failure |

| AORT_CALC_FEATURE_FAILED = -3 | Feature extraction failure |

| AORT_CANCELED = -4 | canceled |

| AORT_NO_DISK = -5 | No hard disk |

| AORT_DISK_ERROR = -6 | Hard disk error |

| AORT_EXIST = -7 | Already exist |

| AORT_GROUP_INVALID = -8 | Group invalid |

| AORT_NOT_EXIST = -9 | inexistence |

| AORT_MORE_FILE_EXIST = -10 | File already exists |

| AORT_SEARCH_ERROR = -11 | Search error |

| AORT_OVER_MAX_COUNT = -12 | upper limit exceeded |

| AORT_UPDATING_FEATURE = -13 | Updating feature values |

| AORT_NO_USABLE_IPC = -14 | There is no IPC vailable for eigenvalue calculation |

| AORT_INVALID_PARAM = -15 | invalid parameter |

| AORT_INVALID_FORMAT = -16 | malformed |

| AORT_INVALID_RES = -17 | resolution error |

| AORT_INVALID_MEM = -18 | File too large error |

| AORT_CREAT_FAILED = -19 | create failed |

| AORT_MD5_NOT_MATCH = -20 | MD5 mismatch |

| AORT_POS_ERROR = -21 | wrong location |

| AORT_SIZE_ERROR = -22 | size error |

| AORT_NOT_READY = -23 | not ready |

| AORT_INVALID_DB = -24 | invalid database |

Table 5
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Id||int|Face group ID|
|name|"Allow List"
"Block List"
……|string|Face group name, group name can be customized|
|DetectType|0,1|int|Detection type 0: face 1: car|
|Policy|0-4|int|Policy attributes, 0-Allow List, 1-Block List, 2-Stranger,3-Internal (Internal group is only used to store the most recent face for comparison, not for alarm and other functions), 4-Advance|
|Enabled|0,1|int|Face alarm enable 0: off 1: on|
|CanDel||int|A predefined group cannot be deleted and is identified by the CanDel field. 0 cannot be deleted|
|Similarity|0-100|unsigned int|similarity|
|PolicyConfigs||JSON array|Group alarm policy configuration, fixed to two elements, the common group uses the 0 element, advanced group 0 corresponds to Allow, the first corresponds to Deny. PolicyConfigs JSON, as shown in the table Table 6|
|EnableChnAlarm|[255, 255, 255, 255]|array|Control the channels in which the corresponding group is allowed to alarm, according to the bit bit position indicates that the corresponding channel is allowed to alarm|
|AlarmOut||Object|Alarm output association, Information JSON is shown in table Table 10|

Table 6
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|ChnAlarmOut|[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
	...
[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255,0,255] ]|array|Each element represents the alarm output associated with a channel, there are 3 main elements, the 0 th represents the local alarm output, the 1/2 represents the front-end alarm output 0/1, and each bit of the child element indicates whether the alarm output of the channel is associated|
|ChnBuzzerOpt|[0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 …]|array|Each element indicates the buzzer configuration of a channel, 0-disable, 1-10s, 2-20s, 3-40s, 4-60s|
|LatchTimeOpt|[0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 …]|array|Each element represents the alarm output duration of a channel, 0-0s, 1-1s, 2-2s, 3-3s, 4-5s, 5-10s, 6-20s, 7-40s, 8-60s|
|SaveImg|[255, 255, 255, 255…]|array|Each element represents the configuration of whether a channel saves pictures, and the use of bits in each element indicates whether to save faces and backgrounds|
|SendEmail|[0, 0, 0, 0]|array|Used in bits, each bit indicates whether a channel sends mail,0- not to send, 1- to send|
|UploadToFtp|[255, 255, 255, 255]|array|Each bit indicates whether a channel uploads FTP|
|UploadToCloud|[0, 0, 0, 0]|array|Used in bits, each bit indicates whether a channel is uploading to the Cloud, 0- not uploading, 1- uploading|
|ShowThumbnail|[255, 255, 255, 255]|array|Used in bits, each bit represents a channel that is displayed as a thumbnail|
|Record|[255, 255, 255, 255]|array|Used in bits, each bit indicates that a channel is recording|
|Push|[0, 0, 0, 0]|array|Used by bit, each bit indicates whether a channel sends push, 0- no push, 1- push|
|AlarmSchedule|[[255, 255, 255, 255, 255, 255],  ...],
[[255, 255, 255, 255, 255, 255]  ...]|array|Alarm schedule, each bit represents half an hour, a total of 48 bits, set indicates video, and vice versa|
|event_push_platform|[0, 0, 0, 0]|array|Used in bits, each bit indicates whether a channel has event push enabled|

Table 10
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Local|"Local->1" "Local->2"
"Local->3"
……
The number of local's depends on the capability of the device.|string array|Local alarm linkage.|
|Ipc| |JSON array|Front-end alarm linkage. IPC JSON is shown in table Table 11|

Table 11
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Channel|   |int|Front-end alarm output associated channel|
|AlarmOutCnt|   |int|Indicates the number of front-end alarm outputs, front-end support 2 alarm outputs|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"Count": 5,
		"Group": [
			{
				"Id": 2,
				"Name": "Block List",
				"DetectType": 0,
				"Policy": 0,
				"Enabled": 1,
				"CanDel": 0,
				"Similarity": 70,
				"PolicyConfigs": [
					{
						"ChnAlarmOut": [
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							...
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ]
						  ],
						  "ChnBuzzerOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "LatchTimeOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "SaveImg": [255, 255, 255, 255],
						  "SendEmail": [0, 0, 0, 0],
						  "UploadToFtp": [255, 255, 255, 255],
						  "UploadToCloud": [0, 0, 0, 0],
						  "ShowThumbnail": [255, 255, 255, 255],
						  "Record": [255, 255, 255, 255],
						  "Push": [0, 0, 0, 0],
						  "AlarmSchedule": [
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							...
						]
					},
					{
						"ChnAlarmOut": [
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							...
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ]
						  ],
						  "ChnBuzzerOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "LatchTimeOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "SaveImg": [255, 255, 255, 255],
						  "SendEmail": [0, 0, 0, 0],
						  "UploadToFtp": [255, 255, 255, 255],
						  "UploadToCloud": [0, 0, 0, 0],
						  "ShowThumbnail": [255, 255, 255, 255],
						  "Record": [255, 255, 255, 255],
						  "Push": [0, 0, 0, 0],
						  "AlarmSchedule": [
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							...
						]
					}
				],
				"EnableChnAlarm": [255, 255, 255, 255]，
				"AlarmOut": {
					"Local": ["Local->1"],
					"Ipc": [{
						"Channel": 1,
						"AlarmOutCnt": 1
					}, {
						"Channel": 4,
						"AlarmOutCnt": 1
					}, {
						"Channel": 5,
						"AlarmOutCnt": 1
					}]
				}
			},
			...

		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
