# Set

## Function

This API is used to setup push subscriptions.

## Request Message

See Push > PushSubcribe > Get > Parameter Description  > Table 2 for parameter description.

Sample:

POST /API/PushSubscribe/Set HTTP/1.1

{
    "data": {
        "HddAlarm": {
            "Enabled": 1,
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

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
