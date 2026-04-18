# Range

## Function

This API is used to get parameter range for AI > Attribute Detection page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/AI/Alarm/AttributeDetect/Range HTTP/1.1

{
    "result": "success",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Channel Information JSON show as follow Table 2 |

| channel_max |   | int | Maximum number of channels |

#### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 3 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | Description |

| status | "Offline","Online"， “Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| alarm_type | "Close" "NO Mask" "Wear Mask" | string | Alarm type, 0-off, 1-not wearing a mask, 2-wearing a mask |

| record_enable | true, false | bool | Record channel switch |

| send_email | true, false | bool | switch to send Email |

| ftp_picture_upload | true, false | bool | ftp picture upload switch |

| picture_to_cloud | true, false | bool | picture to cloud switch |

| http_listening | true, false | bool | http listening switch |

| schedule | "schedule_type", "week" | array | schedule |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "channel_info": {
            "type": "object",
            "items": {
                "CH1": {
                    "type": "object",
                    "items": {
                        "status": {
                            "description": "Only offline channel has this variable.",
                            "type": "string",
                            "mode": "r",
                            "items": [
                                "Offline",
                                "Online",
                                "Nonsupport"
                            ]
                        },
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "Close",
                                "NO Mask",
                                "Wear Mask"
                            ]
                        },
                        "record_enable": {
                            "type": "bool"
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "0",
                                "5",
                                "10",
                                "20",
                                "30"
                            ]
                        },
                        "send_email": {
                            "type": "bool"
                        },
                        "ftp_picture_upload": {
                            "type": "bool"
                        },
                        "picture_to_cloud": {
                            "type": "bool"
                        },
                        "http_listening": {
                            "type": "bool"
                        },
                        "schedule": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 5,
                            "items": [
                                {
                                    "schedule_type": {
                                        "type": "string",
                                        "items": [
                                            "SendEmail",
                                            "FtpPicUpload",
                                            "CloudPicUpload",
                                            "Record"
                                        ]
                                    },
                                    "week": {
                                        "type": "array",
                                        "size": 7,
                                        "items": [
                                            {
                                                "day": {
                                                    "type": "string",
                                                    "items": [
                                                        "Sun",
                                                        "Mon",
                                                        "Tue",
                                                        "Wed",
                                                        "Thu",
                                                        "Fri",
                                                        "Sat"
                                                    ]
                                                },
                                                "time": {
                                                    "type": "array",
                                                    "size": 48,
                                                    "items": [
                                                        {
                                                            "type": "int32",
                                                            "items": [
                                                                0,
                                                                1
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
