# Search

## Function

This API is used to search AI > Recognition > SnapedFaces snapshot face information.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| StartTime |   | string | Search the start time, for example, 2020-07-12 00:00:00. |

| EndTime |   | string | Search end time, such as "2020-07-12 23:59:59" |

| Chn | 0~MAX_PARA_CHN_NUM |   | array |

| AlarmGroup |   | array | The value represents the group Id of the selected group. If it is empty, all (including deleted groups) are displayed. If the given group is selected, the results will be filtered according to the given group Id. |

| Similarity | 0-100 | int | If the similarity is lower than the similarity, the face will be filtered [0, 100], which is the normal value range. If the face is not matched, the parameter can be -1 |

| Engine | 0 | int | Considering that the search process and operation logic are superimposed (for example, after the search results of the matching page, you can open the face selection dialog box to add a new face, at this time the matched cache information will be overwritten by the results of a new search and become invalid), the device provides two search engines with equivalent functions (0 and 1), and the data and cache of the two engines are completely independent. Do not interfere with each other, how the division of labor is distributed by the client itself, for example, you can use No. 0 engine to achieve some temporary face selection tasks (for the selection dialog box to use), and use the data of No. 1 engine to display search or matching results. |

| Count |   | int | Search for the number of matching images |

| Gender |   | array | Gender, the value represents the selected gender, 0: male 1: female |

| fAttrAge | [0, 1, 2, 3, 4, 5, 6] | array | Age range, the value represents the corresponding age. [[0, 17], [18, 25], [26, 30], [31 and 35], [36, 40], [41 to 50], [51, 127], [1, 0]]. [-1, 0] indicates the age of less than 1 year old |

| Beauty | [0, 1, 2, 3, 4] | array | Appearance level, the value represents the corresponding value. [[0, 9], [10, 29], [30, 69], [70, 89], [90, 100]] |

| GlassesType | [0, 1] | array | Type of glasses, 0: no glasses, 1: wear glasses (currently no distinction between sunglasses, ordinary glasses, default to all glasses) |

| Expression | [0, 1, 2] | array | Expression type: 0: blank expression, 1: smile, 2: laugh |

| MouthMask | [0, 1] | array | The value represents the search type, 0: no mask, 1: wearing a mask |

| Race | [0, 1, 2, 3] | array | Race, the value represents the corresponding type, 0: yellow, 1: white, 2: black, 3: Arab |

| FaceInfo |   | JSONarray | search SnapedFaces JSON show as follow Table 2 |

#### Table 2

| Parameter | Range | Type | Description |

| Id |   | int |   |

| MD5 | "F74C70ADB0B63B00E279E71B4143704D" | string | MD5 value |

| Feature | "base64(feature)" | string | eigenvalue |

| FtVersion |   | int | Version of the eigenvalue. This parameter is meaningful only when the eigenvalue of the same version is compared. If the eigenvalue is returned, this field is also returned |

Sample:

POST /API/AI/SnapedFaces/Search HTTP/1.1

{
	"msgType": "AI_searchSnapedFaces",
	"data": {
		"MsgId": null,
		"StartTime": "2018-10-20 00:00:00",
		"EndTime": "2018-10-28 23:59:59",
		"Chn": [0, 1, 2, 3, 4, 5, 6, 7, 8],
		"AlarmGroup": [1, 2, 5, 9, 13],
		"Similarity": 70,
		"Engine": 0,
		"Count": 2,
		"FaceInfo": [
			{
				"Id": 2,
				"MD5": "F74C70ADB0B63B00E279E71B4143704D",
				"Feature": "base64(feature)",
				"FtVersion": 0
			},
			{
				"Id": 5,
				"MD5": "294C703DB05F3B00E279E71B41437E46",
				"Feature": "base64(feature)",
				"FtVersion": 0
			}
		]
	}
}

## Response Message

## Parameter Description

#### Table 3

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | See the resultTable x |

| Count |   | int | The total number of captured faces in this response |

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
		"Count": 153
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
