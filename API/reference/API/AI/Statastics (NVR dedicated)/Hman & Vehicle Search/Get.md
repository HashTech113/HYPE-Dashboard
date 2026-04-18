# Get

## Function

This API is used to get object statistics.

## Request Message

Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Which search engine to use, 0 or 1, used in conjunction with the search interface |

| TimePoints | ["2020-07-06 00:00:00", "2020-07-07 00:00:00", "2020-07-08 00:00:00", "2020-07-09 00:00:00", "2020-07-10 00:00:00", "2020-07-11 00:00:00", "2020-07-12 00:00:00", "2020-07-13 00:00:00"] | array | The time interval to search, for example,the example given is to search for the time point of the week of 2020.7.6,When searching, use the previous time point as the start time and the following time point as the end time (excluding the end time point) as the search interval to search,the number of time points is not limited and is determined by the search criteria. For example, the number of time points searched by day is 25. |

| Chn | [0, 1, 2, 3, 4, 5, 6, 7, 8….] The number of channels depends on the capabilities of the device. | array | To search for a channel, the numeric value represents the channel |

| Type | [0, 1, 2, 3, 4, 5, 6] | array | The type to be searched, each array bit uses an integer number to represent the image type.Such as 0-face, 1-figure, 2-vehicle, 3-PID figure, 4-PID vehicle, 5-LCD figure, 6-LCD vehicle |

Sample:

POST API/AI/ObjectStatistics/Get HTTP/1.1

{"version":"1.0",
	"data": {
		"MsgId": null,
		"Engine": 0,
		"TimePoints":[
			"2020-07-0600:00:00",
			"2020-07-0700:00:00",
			"2020-07-0800:00:00",
			"2020-07-0900:00:00",
			"2020-07-1000:00:00",
			"2020-07-1100:00:00",
			"2020-07-1200:00:00",
			"2020-07-1300:00:00"
		],
		"Chn": [0, 1, 2, 3, 4, 5, 6, 7, 8],
		"Type": [1, 2]
	}
}

## Response Message

## Parameter Description

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | Obtain the return result of people and vehicles statistics,see the results Table 3 |

| ObjectCount |   | int array | Obtain the statistics of people and vehicles, each bit represents the number searched in the corresponding time interval |

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
		"ObjectCount": [3650, 1230, 1980, 1002, 5000, 8900, 8897]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
