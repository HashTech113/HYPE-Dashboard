# Get

## Function

This API is used to get the AI > Recognition > PlateGroup license plate group.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   | moot |

| DefaultVal |   | int | Get default alarm parameters or actual alarm parameters, 1- default parameters, 0- actual parameters |

| SimpleInfo |   | int | Get simple information or complete information. Simple information only includes Group name, Id, DetectType, Policy, Enabled, CanDel, Similarity, and complete information includes all parameters of the group. 1- Get abbreviated information, 0- complete information |

| GroupsId | [1,2,3…x] | array | Obtain the configuration information of the corresponding group. If the field is empty or absent, obtain the data of all groups |

Sample:

POST /API/AI/PlateGroup/Get HTTP/1.1

{
	"data": {
		"MsgId": "",
		"DefaultVal": 0,
		"SimpleInfo": 1,
"GroupsId": [
            1,
            2,
            3，
			…
        ]
	}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0，-1，-2，….-23, -24 | int | Request return results seeTable 3,This field is not required when Modify is used |

| channel |   | string array | List of channel names. This field is not required when Modify is used |

| Count | 0-64 | int | Number of plates |

| Group |   | JSON array | License Plate Group Information JSON show as follow Table 4 |

#### Table 3

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

| AORT_GRP_INVALID_OR_INTERNAL | -25 |

| AORT_GRP_FACE_OVER_MAX | -26 |

| AORT_NO_PERMISSION | -27 |

| AORT_GRP_PLATE_OVER_MAX | -28 |

Table 4
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Id	||	int	|License plate group ID  |
|Name	|" Allow List"
" Block List "
…...	|string	|License plate group name, the group name can be customized, cannot be the same name  |
|DetectType	|2	|int	|Fixed to 2 (DLDT_Plate)  |
|Policy|	0-2	|int	|Policy attribute: 0-Allow List, 1-Block List, 2-Unknown  |
|Enabled|	0,1	|int	|License plate alarm Enable 0: off 1: on  |
|CanDel	|0,1|	int	|A predefined group cannot be deleted and is identified by the CanDel field. 0 cannot be deleted  |
|Similarity	|0-4|	unsigned int|	Fault tolerance rate: indicates the maximum number of characters that are allowed to make errors. For example, 0 indicates zero tolerance. All characters must be matched  |
|PolicyConfigs		||JSON array	|Group alarm policy configuration, fixed to 2 elements, only the 0th element is used, the first element is discarded.  PolicyConfigs JSON show as followTable 5|
|EnableChnAlarm|	[255, 255, 255, 255]|	array	|Control the channels in which the corresponding group is allowed to alarm, according to the bit bit position indicates that the corresponding channel is allowed to alarm  |
|AlarmOut	||	Object|Alarm output association Information JSON show as follow Table 6|

Table 5
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|ChnAlarmOut	|[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
...
[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255,0,255] ]	|array	|Each element represents the alarm output associated with a channel, there are 3 main elements, the 0 th represents the local alarm output, the 1/2 represents the front-end alarm output 0/1, and each bit of the child element indicates whether the alarm output of the channel is associated  |
|ChnBuzzerOpt|	[0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 …]	|array	|Each element indicates the buzzer configuration of a channel, 0-disable, 1-10s, 2-20s, 3-40s, 4-60s  |
|LatchTimeOpt	|[0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 …]|	array	|Each element represents the alarm output duration of a channel, 0-0s, 1-1s, 2-2s, 3-3s, 4-5s, 5-10s, 6-20s, 7-40s, 8-60s  |
|SaveImg	|[255, 255, 255, 255…]	|array	|Each element represents the configuration of whether a channel saves pictures, and the use of bits in each element indicates whether to save faces and backgrounds  |
|SendEmail	|[0, 0, 0, 0]	|array	|Used in bits, each bit indicates whether a channel sends mail,0- not to send, 1- to send  |
|UploadToFtp	|[255, 255, 255, 255]|	array	|Each bit indicates whether a channel uploads FTP  |
|UploadToCloud	|[0, 0, 0, 0]|	array	|Used in bits, each bit indicates whether a channel is uploading to the Cloud, 0- not uploading, 1- uploading  |
|ShowThumbnail|	[255, 255, 255, 255]	|array	|Used in bits, each bit represents a channel that is displayed as a thumbnail  |
|Record|	[255, 255, 255, 255]	|array	|Used in bits, each bit indicates that a channel is recording  |
|Push	|[0, 0, 0, 0]|	array	|Used by bit, each bit indicates whether a channel sends push, 0- no push, 1- push  |
|AlarmSchedule|	[[255, 255, 255, 255, 255, 255],...],
[[255, 255, 255, 255, 255, 255]  ...]|array	|Alarm schedule, each bit represents half an hour, a total of 48 bits, set indicates video, and vice versa |

Table 6
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Local|"Local->1"
"Local->2"
"Local->3"
……
The number of local's depends on the capability of the device.| 	string array	|Local alarm linkage.|
|Ipc||	JSON array	|Front-end alarm linkage. IPC JSON show as follow Table 7|

Table 7
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|Channel	||				int|	Front-end alarm output associated channel  |
|AlarmOutCnt	||	int|	Indicates the number of front-end alarm outputs, front-end support 2 alarm outputs |

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "channel": [
            "CH1",
            "CH2",
            "CH3",
			...
        ],
        "Result": 0,
        "Count": 4,
        "Group": [
            {
                "Id": 1,
                "Name": "白名单",
                "Policy": 0,
                "DetectType": 2,
                "Similarity": 1,
                "CanDel": 0,
                "Enabled": 1,
                "EnableAlarm": 1
            },
            {
                "Id": 2,
                "Name": "黑名单",
                "Policy": 1,
                "DetectType": 2,
                "Similarity": 1,
                "CanDel": 0,
                "Enabled": 1,
                "EnableAlarm": 1
            },
            {
                "Id": 3,
                "Name": "未知",
                "Policy": 2,
                "DetectType": 2,
                "Similarity": 1,
                "CanDel": 0,
                "Enabled": 1,
                "EnableAlarm": 1
            },
			...
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
