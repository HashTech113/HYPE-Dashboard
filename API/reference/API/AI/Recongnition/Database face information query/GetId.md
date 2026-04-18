# GetId

## Function

This API is used to get added faces id.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| GrpId | [2, 3, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21] | int array | The group that needs to get the face ID. |

Sample:

POST API/AI/AddedFaces/GetId HTTP/1.1

{
	"version": "1.0",
	"data": {
		"MsgId": "",
		"GrpId": [2, 3, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21]
	}
}

## Response Message

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | Get the results of all face Ids in a given group according to group Id, seeTable 3 |

| Count |   | int | Face Id count in group |

| FaceIds | [1,3,4,5,6,7,9,10,11,12,13,14,15,16,23,25] | int array | Each digit represents the unique identifier of a face in the group, which can be used to obtain all information about the face |

Table 3

| Result Type | COMMENT |

| AORT_SUCCESS = 0 | Success |

| AORT_NO_DB = -1 | No database |

| AORT_DB_EXEC_FAILED = -2 | Database execution failed |

| AORT_CALC_FEATURE_FAILED = -3 | Feature extraction failed |

| AORT_CANCELED = -4 | Cancelled |

| AORT_NO_DISK = -5 | No hard drive |

| AORT_DISK_ERROR = -6 | Hard disk error |

| AORT_EXIST = -7 | Existed |

| AORT_GROUP_INVALID = -8 | Group invalid |

| AORT_NOT_EXIST = -9 | Does not exist |

| AORT_MORE_FILE_EXIST = -10 | File already exists |

| AORT_SEARCH_ERROR = -11 | Search error |

| AORT_OVER_MAX_COUNT = -12 | Limit exceeded |

| AORT_UPDATING_FEATURE = -13 | Updating feature values |

| AORT_NO_USABLE_IPC = -14 | No IPC available for eigenvalue calculation |

| AORT_INVALID_PARAM = -15 | Invalid parameter |

| AORT_INVALID_FORMAT = -16 | Wrong format |

| AORT_INVALID_RES = -17 | Wrong resolution |

| AORT_INVALID_MEM = -18 | File too large error |

| AORT_CREAT_FAILED = -19 | Creation failed |

| AORT_MD5_NOT_MATCH = -20 | MD5 mismatch |

| AORT_POS_ERROR = -21 | Location error |

| AORT_SIZE_ERROR = -22 | Wrong size |

| AORT_NOT_READY = -23 | Not ready |

| AORT_INVALID_DB = -24 | Invalid database |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": "",
		"Result": 0,
		"Count": 16,
		"FaceIds": [
			1,
			3,
			4,
			5,
			6,
			7,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			23,
			25
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
