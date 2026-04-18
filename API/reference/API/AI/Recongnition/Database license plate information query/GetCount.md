# GetCount

## Function

This API is used to get added license plates count.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| PlateInfo |   | JSON array | Get license plates count JSON show as follow TableTable 2When only the first element of the array, GetId, is used in the search, this field and the following GrpId field can be selected. This field has a higher priority than the GrpId field. If this field is provided, the GrpId field will be invalid. |

| GrpId |   | integer array | This field is valid only when GetId |

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Id | 1-15characters | string | License plate number, optional when searching |

| GrpId |   | int | Group Id, optional when searching, if the provided word is within the valid range (only -1 will be regarded as an invalid value), it will be used as an exact condition, otherwise this field will be ignored |

| PlateColor | 0-5 | int | License plate color, the possible values are as follows: enum AIPlateColor_e { APC_Blue = 0, // blue APC_Green = 1, // green APC_Yellow = 2, // yellow APC_Black = 3, // black APC_White = 4, // white APC_Other = 5, // other APC_Max };Optional when searching, if the provided word is within the valid range, it will be used as an exact condition, otherwise ignore this field |

| CarBrand |   | string | Car brand, optional when searching |

| CarType |   | string | Model, optional when searching |

| Sex |   | int | Gender of car owner: 0-male, 1-female, optional when searching, if the provided word is within the valid range, it will be used as an exact condition, otherwise ignore this field |

| Owner | "Mike" | string | Owner's name, optional when searching |

| IdCode | "415025199203050916" | string | ID number, optional when searching |

| Job | "Software" | string | Occupation, optional when searching |

| Phone | "12345678902" | string | Phone number, optional when searching |

| Domicile | "Guangdong,Zhuhai,Xiangzhou ..." | string | Current residence, optional when searching |

| Remark | "Detail of this person ..." | string | Remarks, optional when searching |

| EnableChnAlarm | [255, 255, 255, 255] | array | Special authority control, which controls which channels the face is allowed to be used for alarming. It is used by bit. The bit position indicates that the corresponding channel is allowed to alarm. If this field does not exist or is empty, it means that special authority control is not used. This field is not used when searching |

Sample:

POST API/AI/AddedPlates/GetCount HTTP/1.1

{
    "version":"1.0",
	"data": {
        "PlateInfo": [
            {
                "Id": "粤C"
            }
        ]
	}
}

## Response Message

#### Table 3

|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |

|Result| |int|The results are shown in the table Table 4|
|Count| |int|The total number of qualified license plates in the searched database|
|PlatesId| |string array|A list of license plate numbers that meet the conditions, only the result of GetId has this field|
|PlateInfo| |JSON array|Only the result of GetById has this field|

#### Table 4

| Parameter | Value | Description |

| AORT_SUCCESS | 0 | Success |

| AORT_NO_DB | -1 | No database |

| ORT_DB_EXEC_FAILED | -2 | Database execution failed |

| AORT_CALC_FEATURE_FAILED | -3 | Feature extraction failed |

| AORT_CANCELED | -4 | Cancelled |

| AORT_NO_DISK | -5 | No hard drive |

| AORT_DISK_ERROR | -6 | Hard disk error |

| AORT_EXIST | -7 | Existed |

| AORT_GROUP_INVALID | -8 | Group invalid |

| AORT_NOT_EXIST | -9 | Does not exist |

| AORT_MORE_FILE_EXIST | -10 | Record already exists |

| AORT_SEARCH_ERROR | -11 | Hard disk error |

| AORT_OVER_MAX_COUNT | -12 | Limit exceeded |

| AORT_UPDATING_FEATURE | -13 | Updating feature values |

| AORT_NO_USABLE_IPC | -14 | No IPC available for eigenvalue calculation |

| AORT_INVALID_PARAM | -15 | Invalid parameter |

| AORT_INVALID_FORMAT | -16 | Wrong format |

| AORT_INVALID_RES | -17 | Wrong resolution |

| AORT_INVALID_MEM | -18 | File too large error |

| AORT_CREAT_FAILED | -19 | Creation failed |

| AORT_MD5_NOT_MATCH | -20 | MD5 mismatch |

| AORT_POS_ERROR | -21 | Location error |

| AORT_SIZE_ERROR | -22 | Wrong size |

| AORT_NOT_READY | -23 | Not ready |

| AORT_INVALID_DB | -24 | Invalid database |

| AORT_GRP_INVALID_OR_INTERNAL | -25 | The group is invalid or the internal preset group is not allowed to be deleted |

| AORT_GRP_FACE_OVER_MAX | -26 | The number of faces in the roster group has exceeded the limit |

| AORT_NO_PERMISSION | -27 | No permission |

| AORT_GRP_PLATE_OVER_MAX | -28 | The number of license plates in the license plate group has exceeded the limit |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Result": 0,
        "Count": 2
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
