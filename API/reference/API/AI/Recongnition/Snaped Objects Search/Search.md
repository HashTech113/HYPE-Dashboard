# Search

## Function

This API is used to search for AI > Recognition > SnapedObjects snapshot objects.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| StartTime | "2020-07-12 00:00:00" | string | Search start time |

| EndTime | "2020-07-1223:59:59" | string | Search end time |

| Chn | 0~MAX_PARA_CHN_NUM | array | The channel to search for, the value represents the channel |

| Type | [1, 2] | array | Type to search for, for example: 1-Humanoid, 2-model, 3-PID humanoid, 4-PID model, 5-LCD humanoid, 6-LCD model |

| Engine | 0 | int | Search engines (0 and 1) |

Sample:

POST /API/AI/SnapedObjects/Search HTTP/1.1

{
	"data": {
		"MsgId": null,
		"StartTime": "2018-10-20 00:00:00",
		"EndTime": "2018-10-28 23:59:59",
		"Chn": [0, 1, 2, 3, 4, 5, 6, 7, 8],
		"Type": [1, 2],
		"Engine": 0,
	}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result |   | int | Search results for captured subjects (including people, cars, etc.),See the resultTable x |

| Count | 0 | int | The actual number of objects captured |

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

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"Count": 600
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
