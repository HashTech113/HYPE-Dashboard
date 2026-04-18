# Get

## Function

It is used to get the AI > Repeat Customer:FilterSnapedFaces parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| Engine | 0 | int | Search engine, 0 or 1, should be consistent with /API/AI/SnapedFaces/Search |

| MinInterval | 5 | int | The time interval between face appearance, unit: second. If it is less than this value, it should not be included in the statistics, and the "bValid" field in the response result indicates whether it should be included in the statistics |

| Similarity | 70 | unsigned int | Similarity to use when filtering |

| Filter |   | Json Object | The target face to be screened. JSON show as follow Table 2 |

| FtIdSet |   | Json Object | The collection to be filtered. JSON show as follow Table 3 |

Table 2

| Parameter | Range | Type | Description |

| UUId | 200053 | unsigned int | The unique identifier of the captured face, corresponding to the UUId in /API/AI/SnapedFeaturesId/Get |

| FtId | 58 | unsigned int | The feature value Id of the captured face corresponds to FtId in /API/AI/SnapedFeaturesId/Get |

Table 3

| Parameter | Range | Type | Description |

| UUIds | [200053, 200054, ...] | unsigned int array | The elements in the array represent the unique identification of the captured face |

| FtIds | [58, 59, ...] | unsigned int array | The elements in the array represent the feature value Id of the captured face, which corresponds to the Id in "UUIds" one by one |

Sample:

POST /API/AI/FilterSnapedFaces/Get HTTP/1.1

{
	"version": "1.0",
	"data": {
		"MsgId": "",
		"Engine": 0,
		"MinInterval": 0,
		"Similarity": 70,
		"Filter": {
			"UUId": 20402,
			"FtId": 20402
		},
		"FtIdSet": {
			"UUIds": [20402, 20403, 20408, 20404, 20405, ...],
			"FtIds": [20402, 20403, 20408, 20404, 20405, ...]
		}
	}
}

## Response Message

### Parameter Description

Table 4

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | Returns the result of the face ID matching the filter in the target collection, 0 means success. see Table 5 for details |

| Count | 6 | int | The number of faces filtered out |

| MatchedIds | [200053, 200059, ...] | unsigned int array | The elements in the array represent the unique identification of the captured face |

| Counting | [1, 0, 0, 1, 1, ...] | int array | The elements in the array indicate whether the corresponding face can be used for counting statistics. If the interval is less than the minimum interval, the value is 0 and should not be included in the statistics. Otherwise, it is 1 and should be included in the statistics. |

Table 5

| Result Type | COMMENT |

| AORT_SUCCESS = 0 | success |

| AORT_NO_DB = -1 | no database |

| AORT_DB_EXEC_FAILED = -2 | Database execution failed |

| AORT_CALC_FEATURE_FAILED = -3 | feature extraction failed |

| AORT_CANCELED = -4 | Cancelled |

| AORT_NO_DISK = -5 | no hard drive |

| AORT_DISK_ERROR = -6 | hard disk error |

| AORT_EXIST = -7 | existed |

| AORT_GROUP_INVALID = -8 | group invalid |

| AORT_NOT_EXIST = -9 | does not exist |

| AORT_MORE_FILE_EXIST = -10 | File already exists |

| AORT_SEARCH_ERROR = -11 | search error |

| AORT_OVER_MAX_COUNT = -12 | limit exceeded |

| AORT_UPDATING_FEATURE = -13 | Updating feature values |

| AORT_NO_USABLE_IPC = -14 | No IPC available for eigenvalue calculation |

| AORT_INVALID_PARAM = -15 | invalid parameter |

| AORT_INVALID_FORMAT = -16 | wrong format |

| AORT_INVALID_RES = -17 | wrong resolution |

| AORT_INVALID_MEM = -18 | file too large error |

| AORT_CREAT_FAILED = -19 | Creation failed |

| AORT_MD5_NOT_MATCH = -20 | MD5 mismatch |

| AORT_POS_ERROR = -21 | location error |

| AORT_SIZE_ERROR = -22 | wrong size |

| AORT_NOT_READY = -23 | not ready |

| AORT_INVALID_DB = -24 | invalid database |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": "",
		"Result": 0,
		"Count": 189,
		"MatchedIds": [20402, 20404, 20406, 20410, 20412,...],
		"Counting": [1, 1, 1, 1, 1, 1, 1, 1,...]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
