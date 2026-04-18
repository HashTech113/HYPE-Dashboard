# Set

## Function

This API is used to set AI > Cross Counting Scenario > Statistics configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| Channels |   | Int array | Query channel, when querying group, pass empty |

| Groups |   | Int array | Query group, pass null when querying channel |

| Date | 10 | string | query date |

| ReportType | "Day","Week","Month","Year" | string | query type |

| ChnObjType | 0~2 | Int array | Detection type: (Only pass empty when querying groups, corresponding to Channels) 0："Motion", 1："Person", 2："Vehicle" |

| GrpObjType | 0~2 | Int array | Detection type: (Only pass empty when querying the channel, corresponding to Groups) 0："Motion", 1："Person", 2："Vehicle" |

Sample:

POST /API/AI/Scenario/CC/Statistics/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "Channels": [
            0,
            3
        ],
        "Groups": [],
        "Date": "2021-01-14",
        "ReportType": "Week",
        "ChnObjType": [
            1,
            1
        ],
        "GrpObjType": []
    }
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| Channels |   | Object array | channel statistics JSON show as follow Table 3 |

| Groups |   | Object array | group statistics JSON show as follow Table 4 |

Table 3

| Parameter | Range | Type | Description |

| ChnId |   | int | channel number |

| Num |   | Object array | Statistical data JSON show as follow Table 5 |

Table 4

| Parameter | Range | Type | Description |

| GroupId |   | int | group ID |

| Num |   | Object array | Statistical data JSON show as follow Table 5 |

Table 5

| Parameter | Range | Type | Description |

| EnterCnt |   | int | Number of people entering |

| ExitCnt |   | int | number of people leaving |

| StayCnt |   | int | number of people staying |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "Channels": [
            {
                "ChnId": 0,
                "Num": [
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 11,
                        "ExitCnt": 3,
                        "StayCnt": 8
                    },
                    {
                        "EnterCnt": 16,
                        "ExitCnt": 2,
                        "StayCnt": 14
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    }
                ]
            },
            {
                "ChnId": 3,
                "Num": [
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 1,
                        "ExitCnt": 0,
                        "StayCnt": 1
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    },
                    {
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0
                    }
                ]
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
