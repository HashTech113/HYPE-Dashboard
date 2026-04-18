# Get

## Function

This API is used for push subscriptions.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| Filter |   | object | subscription parameters, see Push > Query > Parameter Description > Table 3 for details. |

| Mobile |   | object | subscription parameters, see Table 2 for details. |

| Notification |   | object | Subscription parameters, see Push > Query > Parameter Description > Table 8. |

##### Table 2

| Parameter | Range | Type | Description |

| AppID |   | string |   |

| Language |   | string |   |

| PushChannel |   | string |   |

| Token |   | string |   |

| UUID |   | string |   |

##### Table 3

| Parameter | Range | Type | Description |

| notification_interval |   | int | Notification interval. |

| notification_interval_max |   | int | Displays the maximum subscription interval for the mobile app. |

| notification_interval_min |   | int | The minimum subscription interval to display for the mobile app. |

Sample:

POST /API/Push/Subscribe HTTP/1.1

{
    "version": "1.0",
    "data": {
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
        },
        "MobileInfo":[
            {
                "Mobile": {
                "AppID": "com.RXCamView.push",
                "Language": "zh-Hans",
                "PushChannel": "APNS",
                "Token": "eyJhbGciOiJFUzI1NiIsImtpZCI6InJzdHM4Mjg1NWI4MmNmNDk0YWM5OWNiZGM4OTQ2YTQ0YWYxNyJ9.eyJhdWQiOlsicHNfZGVsIl0sIlgtc3ViIjp7IlRva2VuIjoiZjA2MjE0YzFkOTM0OGRlZTExYTUxMzIxM2M5YTM4ZDBiNjJjOWZmZDMyZDFjMWI2ZjY0ODUxMTdkMWYxODdiOSIsIlVVSUQiOiI2ZTMzMjJjMy01MjFmLTQ0OWItYjk0Yy00MjE5ZGJiOTIwMmMifX0.ec_DrzO6AYidvJytmKADN9iW4sy3LqHBMJj9QEVaySquqlby43Oe5UvtqrU0y0t6o8cno6ypX9v4vzp5QGRbZw"
                },
                "UUID": "7c42cecc-7989-43df-8baf-86065abffac0"
            }
        ]
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
