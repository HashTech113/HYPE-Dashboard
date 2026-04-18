# Add

## Function

This API is used to add license plate.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| PlateInfo |   | JSON array | Add License Plates JSON show as follow Table Table 2 |

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Id | 1-15characters | string | License plate number, unique identification. |

| GrpId |   | int | Group ID |

| PlateColor | 0-5 | int | License plate color, the possible values are as follows: enum AIPlateColor_e { APC_Blue = 0,// blue APC_Green = 1,// green APC_Yellow = 2, // yellow APC_Black = 3,// black APC_White = 4,// white APC_Other = 5,// other APC_Max }; |

| CarBrand |   | string | Car brand |

| CarType |   | string | Car model |

| Sex |   | int | Owner gender: 0-male, 1-female |

| Owner | "Mike" | string | Owner name |

| IdCode | "415025199203050916" | string | Identification number |

| Job | "Software" | string | Profession |

| Phone | "12345678902" | string | Telephone number |

| Domicile | "Guangdong,Zhuhai,Xiangzhou ..." | string | Living |

| Remark | "Detail of this person ..." | string | Remark |

| EnableChnAlarm | [255, 255, 255, 255] | array | Special permission control, which controls which channels the face is allowed to be used for alarming. It is used by bit. The bit position indicates that the corresponding channel allows alarming. If this field does not exist or is empty, it means that special permission control is not used. |

| VoicePromptsChn | 0~255 | int | File index, when there is no audio file, this pass 255 |

| VoicePromptsSel |   | array | Play channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, bit2 corresponds to channel 2...) |

| VoicePromptsTm |   | array | Time period, there cannot be time conflicts among the 12 time periods |

Sample:

POST API/AI/Plates/Add HTTP/1.1

{
    "version":"1.0",
    "data": {
        "PlateInfo": [
            {
                "Id": "粤CW2763",
                "GrpId": 6,
                "PlateColor": 0,
                "Sex": 1,
                "CarBrand": "大众",
                "CarType": "两厢车",
                "Owner": "张三",
                "IdCode": "12125180",
                "Job": "职业",
                "Phone": "15271859302",
                "Domicile": "居住地1",
                "Remark": "备注",
                "EnableChnAlarm": []
            },
            {
                "Id": "粤CK3961",
                "GrpId": 6,
                "PlateColor": 1,
                "Sex": 1,
                "CarBrand": "大众",
                "CarType": "三厢车",
                "Owner": "李四",
                "IdCode": "12125181",
                "Job": "职业",
                "Phone": "15271859303",
                "Domicile": "居住地2",
                "Remark": "备注",
                "EnableChnAlarm": []
            }
		]
    }
}

## Response Message

#### Table 3

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Count |   | int | Number of groups |

| Result | [0, 0,…] | array | Result reference table Table 4 |

Table 4

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
        "Count": 2,
        "Result": [
            0,
            0
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
