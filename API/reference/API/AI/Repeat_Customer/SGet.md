# Get

## Function

It is used to get the AI > Repeat Customer:SnapedFeaturesId parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Search engine, 0 or 1, should be consistent with /API/AI/SnapedFaces/Search |

| StartIndex | 0 | int | The starting index of the request, for example, the first time: 0-9999, the second time: 10000-19999, then the StartIndex is 0, 10000 respectively |

| Count | 1000 | int | The number of requested items, if the number of data items is not much, you can request at one time |

Sample:

POST /API/AI/SnapedFeaturesId/Get HTTP/1.1

{
	"version": "1.0",
	"data": {
		"MsgId": "",
		"StartIndex": 0,
		"Engine": 1,
		"Count": 1011
	}
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | Get the results of all eligible Ids and feature Ids, 0 means success. see Table 3 for details |

| UUIds | [200053, 200054, ...] | unsigned int array | The elements in the array represent the unique identification of the captured face |

| FtIds | [58, 59, ...] | unsigned int array | The elements in the array represent the feature value Id of the captured face, which corresponds to the Id in "UUIds" one by one |

Table 3

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
		"MsgId": null,
		"Result": 0,
		"UUIds": [200053, 200054, ...],
		"FtIds": [58, 59, ...]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
