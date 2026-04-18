# Search

## Function

This API is used to search face statistics。

## Request Message

Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Which search engine to use, 0 or 1, used in conjunction with the search interface |

| StartTime |   | string | Start time like:"2020-07-12 00:00:00" |

| EndTime |   | string | End time such as:"2020-07-12 23:59:59" |

| Chn | [0, 1, 2, 3, 4, 5, 6, 7, 8] | array | The channel to search, the value represents the channel |

| Group | [1, 2, 5, 9, 13….] | array | The group to search, the value represents the group Id of the selected group, if it is empty, search all (including deleted groups) |

Sample:

POST API/AI/FaceStatistics/Search HTTP/1.1

{
	"version":"1.0",
	"data": {
		"MsgId": null,
		"Engine": 0,
		"StartTime": "2018-10-20 00:00:00",
		"EndTime": "2018-10-28 23:59:59",
		"Chn": [0, 1, 2, 3, 4, 5, 6, 7, 8],
		"Group": [1, 2, 5, 9, 13]
	}
}

## Response Message

## Parameter Description

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | Face statistical information search, see the results Table 3 |

| channel_max |   | int | Maximum number of channels |

| Count |   | int | The actual number of face statistical information |

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
        "MsgId": null,
        "Result": 0,
        "Count": 160000
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
