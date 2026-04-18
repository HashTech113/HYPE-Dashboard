# Get

## Function

It is used to get the AI > Repeat Customer:MatchAddedFaces parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Search engine, 0 or 1, should be consistent with /API/AI/SnapedFaces/Search |

| Similarity | 70 | int | Similarity to use when matching |

| GrpIds | [1, 2, 3, 5] | int array | Which groups of faces in the bottom library are used to identify the identity, if not given or empty, it means that all groups (but not including Internal) are used, generally not given |

| UUIds | [200053, 200059, 210010, ...] | unsigned int array | The elements in the array represent the unique identification of the captured face |

Sample:

POST /API/AI/MatchAddedFaces/Get HTTP/1.1

{
	"version": "1.0",
	"data": {
		"MsgId": "",
		"Similarity": 70,
		"GrpIds": [],
		"Engine": 1,
		"UUIds": [21411, 21409, 21408, 21407, 21405, ...]
	}
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | Get the result of returning customer status, 0 means success. see table Table 3 details |

| FaceIds | [3, -1, -1, 2, ...] | long long array | The matched faces in the bottom library, the elements in this array correspond to the "UUIds" array in the request one by one, -1 means that there is no face matching it in the bottom library |

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
		"MsgId": "",
		"Result": 0,
		"FaceIds": [25, 25, 25, -1, 25, ...]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
