# SearchPlate

## Function

This API is used to search and match license plates.

## Request Message

## Parameter Description

Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| StartTime | "2020-07-12 00:00:00" | string | Search start time |

| EndTime | "2020-07-1223:59:59" | string | Search end time |

| Chn | 0~MAX_PARA_CHN_NUM | array | The channel to search, the value represents the channel |

| AlarmGroup | [1, 2] | integer array | The license plate group to which the comparison result belongs during real-time capture |

| PlatesId |   | string array | List of license plate numbers |

| MaxErrorCharCnt | 0-5 | int | Error tolerance rate, the maximum number of different strings allowed when searching for a matching string |

| SortType |   |   | Sort by enum AIResultSortType { ARST_Ascending = 0, // Ascending order ARST_Descending = 1, //Descending order ARST_None = 2, ARST_Max }; |

| Engine | 0,1 | int | Search Engines (0 and 1) |

Sample:

POST API/AI/SnapedObjects/SearchPlate HTTP/1.1

{
    "version":"1.0",
    "data": {
        "StartTime": "2021-08-15 00:00:00",
        "EndTime": "2021-08-17 23:59:59",
        "Chn": [2, 3],
        "AlarmGroup": [2, 3, 4],
        "PlatesId": ["3918K"],
        "MaxErrorCharCnt": 3,
        "SortType": 0,
        "Engine": 0
    }
}

## Response Message

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result |   | int | license plate search results,SeeTable 3 |

| Count | 0 | int | The actual number of captured objects |

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
        "Result": 0,
        "Count": 129
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
