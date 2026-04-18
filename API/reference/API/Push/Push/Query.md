# Query

## Function

This API is used to push query push parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| Token |   | string |   |

Sample:

POST /API/Push/Query HTTP/1.1

{
    "data": {
        "Token": "f06214c1d9348dee11a513213c9a38d0b62c9ffd32d1c1b6f6485117d1f187b9",
        "app_support_ai_notification_subscribe":true
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| Default |   | object | Default parameters, see Table 3 for details. |

| Filter |   | object | subscription parameters, see Table 6 for details. |

| Notification |   | object | subscription parameters, see Table 8 for details. |

##### Table 3

| Parameter | Range | Type | Description |

| notification_interval_max | 30 | int | Maximum notification interval. |

| notification_interval_min | 1 | int | The minimum notification interval. |

| notification_interval | notification_interval_min-notification_interval_max | int | Notification interval. |

| notification_interval_switch |   | bool | Push switch. |

| StorageError | "True", "False" | string |   |

| StorageFull | "True", "False" | string |   |

| StorageUnformatted | "True", "False" | string |   |

| StorageNull | "True", "False" | string |   |

| Motion | "True", "False" | string |   |

| IOAlarm | "True", "False" | string |   |

| PIRAlarm | "True", "False" | string |   |

| Intellect | "True", "False" | string |   |

| AiHuman | "True", "False" | string |   |

| AiVehicle | "True", "False" | string |   |

| VideoLoss | "True", "False" | string |   |

| AiFaceDetection |   | object | See Table 4 for details. |

| LPR |   | object | See Table 4 for details. |

| LCD | "True", "False" | string |   |

| PID | "True", "False" | string |   |

| PD&VD(PD) | "True", "False" | string |   |

| FD | "True", "False" | string |   |

| AD | "True", "False" | string |   |

| CC | "True", "False" | string |   |

| CD | "True", "False" | string |   |

| QD | "True", "False" | string |   |

| RSD | "True", "False" | string |   |

| LPD | "True", "False" | string |   |

| SOD | "True", "False" | string |   |

| VT | "True", "False" | string |   |

| SD | "True", "False" | string |   |

| Intrusion | "True"、"False" | string |   |

| RegionEntrance | "True"、"False" | string |   |

| RegionExiting | "True"、"False" | string |   |

##### Table 4

| Parameter | Range | Type | Description |

| Group |   | array | See Table 5 for details. |

##### Table 5

| Parameter | Range | Type | Description |

| Name |   | string |   |

| AutoSubscribe | "True"、"False" | string |   |

##### Table 6

| Parameter | Range | Type | Description |

| Intellect |   | object | See Table 7 for details. |

| IOAlarm |   | object | See Table 7 for details. |

| Motion |   | object | See Table 7 for details. |

| PIRAlarm |   | object | See Table 7 for details. |

| VideoLoss |   | object | See Table 7 for details. |

| StorageError |   | object |   |

| StorageFull |   | object |   |

| StorageNull |   | object |   |

| StorageUnformatted |   | object |   |

| LCD |   | object | See Table 7 for details. |

| PID |   | object | See Table 7 for details. |

| PD&VD(PD) |   | object | See Table 7 for details. |

| FD |   | object | See Table 7 for details. |

| AD |   | object | See Table 7 for details. |

| CC |   | object | See Table 7 for details. |

| CD |   | object | See Table 7 for details. |

| QD |   | object | See Table 7 for details. |

| RSD |   | object | See Table 7 for details. |

| LPD |   | object | See Table 7 for details. |

| SOD |   | object | See Table 7 for details. |

| VT |   | object | See Table 7 for details. |

| SD |   | object | See Table 7 for details. |

| AiHuman |   | object | See Table 7 for details. |

| AiVehicle |   | object | See Table 7 for details. |

| Intrusion |   | object | See Table 7 for details. |

| RegionEntrance |   | object | See Table 7 for details. |

| RegionExiting |   | object | See Table 7 for details. |

| AiFaceDetection |   | object array | See Table 9 for details. |

| LPR |   | object array | See Table 9 for details. |

##### Table 7

| Parameter | Range | Type | Description |

| Channel | 0~maximum number of channels | int array |   |

##### Table 8

| Parameter | Range | Type | Description |

| notification_interval | notification_interval_min-notification_interval_max | int | Notification of push. |

| notification_interval_switch |   | bool | Notification switch. |

##### Table 9

| Parameter | Range | Type | Description |

| Name |   | string | Group name |

| Channel | 0~Max Channel Number | int array |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "Default": {
            "notification_interval_max": 30,
            "notification_interval_min": 1,
            "notification_interval": 1,
            "notification_interval_switch": false,
            "StorageError": "True",
            "StorageFull": "True",
            "StorageUnformatted": "True",
            "StorageNull": "True",
            "Motion": "True",
            "IOAlarm": "True",
            "PIRAlarm": "True",
            "LCD": "True",
            "PID": "True",
            "PD&VD": "True",
            "FD": "True",
            "AD": "True",
            "CC": "True",
            "CD": "True",
            "QD": "True",
            "RSD": "True",
            "LPD": "True",
            "SOD": "True",
            "VT": "True",
            "SD": "True",
            "Intrusion": "true",
            "RegionEntrance": "true",
            "RegionExiting": "true",
            "AiFaceDetection": {
            "Group": [
                {
                "Name": "Allow List",
                "AutoSubscribe": "True"
                },
                {
                "Name": "Block List",
                "AutoSubscribe": "True"
                },
                {
                "Name": "Stranger",
                "AutoSubscribe": "True"
                }
            ]
            },
            "LPR": {
            "Group": [
                {
                "Name": "Allow List",
                "AutoSubscribe": "True"
                },
                {
                "Name": "Block List",
                "AutoSubscribe": "True"
                },
                {
                "Name": "Unknown",
                "AutoSubscribe": "True"
                }
            ]
            },
            "AiHuman": "True",
            "AiVehicle": "True",
            "VideoLoss": "True"
        },
        "Filter": {
            "AD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "AiFaceDetection": {
            "Group": [
                {
                "Channel": [0,1,2,3,4,5,6,7,8],
                "Name": "Allow List"
                },
                {
                "Channel": [0,1,2,3,4,5,6,7,8],
                "Name": "Block List"
                },
                {
                "Channel": [0,1,2,3,4,5,6,7,8],
                "Name": "Stranger"
                }
            ]
            },
            "AiHuman": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "AiVehicle": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "CC": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "CD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "FD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "Intrusion": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "IOAlarm": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "LCD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "LPD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "LPR": {
            "Group": [
                {
                "Channel": [0,1,2,3,4,5,6,7,8],
                "Name": "Allow List"
                },
                {
                "Channel": [0,1,2,3,4,5,6,7,8],
                "Name": "Block List"
                },
                {
                "Channel": [0,1,2,3,4,5,6,7,8],
                "Name": "Unknown"
                }
            ]
            },
            "Motion": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "PID": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "PIRAlarm": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "PD&VD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "QD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "RegionEntrance": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "RegionExiting": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "RSD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "SD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "SOD": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "StorageError": {},
            "StorageFull": {},
            "StorageNull": {},
            "StorageUnformatted": {},
            "VideoLoss": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            },
            "VT": {
            "Channel": [0,1,2,3,4,5,6,7,8]
            }
        },
        "Notification": {
            "notification_interval": 1,
            "notification_interval_switch": false
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
