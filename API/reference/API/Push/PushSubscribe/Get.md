# Get

## Function

This API is used to get push subscriptions.

## Request Message

##### Table 1

| Parameter | Range | Type | Description |

| app_support_ai_notification_subscribe |   | bool | Whether the app supports ai notification push. |

Sample:

POST /API/PushSubscribe/Get HTTP/1.1

{
    "data": {
        "app_support_ai_notification_subscribe":true
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| HddAlarm |   | object | see Table 3 for more information. |

| IOAlarm |   | object | see Table 4 for more information. |

| LowPower |   | object | see Table 4 for more information. |

| MotionAlarm |   | object | see Table 4 for more information. |

| PIRAlarm |   | object | see Table 4 for more information. |

| SmartAlarm |   | object | see Table 4 for more information. |

| VideoLoss |   | object | see Table 4 for more information. |

| FaceAlarm |   | object | see Table 5 for more information. |

| LCDAlarm |   | object | see Table 4 for more information. |

| PIDAlarm |   | object | see Table 4 for more information. |

| SODAlarm |   | object | see Table 4 for more information. |

| PDAlarm |   | object | see Table 4 for more information. |

| FDAlarm |   | object | see Table 4 for more information. |

| CCAlarm |   | object | see Table 4 for more information. |

| ADAlarm |   | object | see Table 4 for more information. |

| CDAlarm |   | object | see Table 4 for more information. |

| QDAlarm |   | object | see Table 4 for more information. |

| LPDAlarm |   | object | see Table 4 for more information. |

| RSDAlarm |   | object | see Table 4 for more information. |

| VTAlarm |   | object | see Table 4 for more information. |

| SDAlarm |   | object | see Table 4 for more information. |

| IntrusionAlarm |   | object | see Table 4 for more information. |

| RegionEntranceAlarm |   | object | see Table 4 for more information. |

| RegionExitingAlarm |   | object | see Table 4 for more information. |

| Human |   | object | see Table 4 for more information. |

| Vehicle |   | object | see Table 4 for more information. |

| LPRAlarm |   | object | see Table 5 for more information. |

##### Table 3

| Parameter | Range | Type | Description |

| Enabled |   | int |   |

| Type |   | Int |   |

##### Table 4

| Parameter | Range | Type | Description |

| ChnFlags |   | int array |   |

##### Table 5

| Parameter | Range | Type | Description |

| Group |   | object array |   |

##### Table 6

| Parameter | Range | Type | Description |

| Id |   | int |   |

| Name |   | string |   |

| ChnFlags |   | int array |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "HddAlarm": {
            "Enabled": 0,
            "Type": 0
        },
        "IOAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "LowPower": {
            "ChnFlags": [
                255,
                0
            ]
        },
        "MotionAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "PIRAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "LCDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "PIDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "SODAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "PDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "FDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "CCAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "ADAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "CDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "QDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "LPDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "RSDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "VTAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "SDAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "VideoLoss": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "Human": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "Vehicle": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "IntrusionAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "RegionEntranceAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "RegionExitingAlarm": {
            "ChnFlags": [
                255,
                255
            ]
        },
        "FaceAlarm": {
            "Group": [
                {
                    "Id": 2,
                    "Name": "Allow List",
                    "ChnFlags": [
                        0,
                        0
                    ]
                },
                {
                    "Id": 3,
                    "Name": "Block List",
                    "ChnFlags": [
                        0,
                        0
                    ]
                }
            ]
        },
        "LPRAlarm": {
            "Group": [
                {
                    "Id": 5,
                    "Name": "Allow List",
                    "ChnFlags": [
                        0,
                        0
                    ]
                },
                {
                    "Id": 6,
                    "Name": "Block List",
                    "ChnFlags": [
                        0,
                        0
                    ]
                }
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
