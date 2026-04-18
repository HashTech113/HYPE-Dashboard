# Set

## Function

This API is used to set AI > Cross Counting Scenario > RealTime Info configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| msgType | "get_CCScenario_RTData" "clear_CCScenario_RTData" | string | Get, clear CC RealTimeInfo |

| clear_type | "Channel","Group","All Channels","All Groups" | string | Clearing Types for CC RealTimeInfo |

| chnId |   | int | When clear_type selects Channel, the channel number needs to be passed |

| groupId |   | int | When clear_type selects Group, the group number needs to be passed |

Sample:

POST /API/AI/Scenario/CC/RealTime/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "msgType": "clear_CCScenario_RTData",
	    "clear_type": "Group",
        "groupId": 1
    }
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| CCScenarioRTInfo | “Channels”,“Groups” | Object array | Cross Counting RealTime Information JSON show as follow Table 3 |

Table 3

| Parameter | Range | Type | Description |

| Channels |   | Object array | JSON show as follow Table 4 |

| Groups |   | Object array | JSON show as follow Table 5 |

Table 4

| Parameter | Range | Type | Description |

| ChnId |   | int | channel number |

| EnterCnt |   | int | number of people entering |

| ExitCnt |   | int | number of people leaving |

| StayCnt |   | int | number of people staying |

| AvailableCnt |   | int | current capacity |

| ObjType |   | int | How to trigger counting: 0：Motion 1：Person 2：Vehicle |

Table 5

| Parameter | Range | Type | Description |

| GroupId |   | int | group ID |

| EnterCnt |   | int | number of people entering |

| ExitCnt |   | int | number of people leaving |

| StayCnt |   | int | number of people staying |

| AvailableCnt |   | int | current capacity |

| ObjType |   | int | How to trigger counting: 0：Motion 1：Person 2：Vehicle |

| ChnDetail |   | Object array | Real-time data of channels in the group JSON show as follow Table 6 |

Table 6

| Parameter | Range | Type | Description |

| ChnId |   | int | channel number |

| EnterCnt |   | int | Number of people entering |

| ExitCnt |   | int | number of people leaving |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "CCScenarioRTInfo": [
            {
                "Channels": [
                    {
                        "ChnId": 1,
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0,
                        "AvailableCnt": 10,
                        "ObjType": 0
                    }
                ],
                "Groups": [
                    {
                        "GroupId": 0,
                        "EnterCnt": 0,
                        "ExitCnt": 0,
                        "StayCnt": 0,
                        "AvailableCnt": 10,
                        "ObjType": 1,
                        "ChnDetail": [
                            {
                                "ChnId": 0,
                                "EnterCnt": 0,
                                "ExitCnt": 0
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
