# Set

## Function

This API is used to set parameter for AI > Attribute Detection page.

## Request Message

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

POST /API/AI/Alarm/AttributeDetect/Set HTTP/1.1

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "alarm_type": "Close",
                "record_enable": false,
                "post_recording": "5",
                "send_email": false,
                "ftp_picture_upload": false,
                "picture_to_cloud": false,
                "http_listening": false,
                "schedule": [
                    {
                        "schedule_type": "SendEmail",
                        "week": [
                            {
                                "day": "Sun",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Mon",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Tue",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Wed",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Thu",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Fri",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Sat",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            }
                        ]
                    },
                    {
                        "schedule_type": "FtpPicUpload",
                        "week": [
                            {
                                "day": "Sun",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Mon",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Tue",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Wed",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Thu",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Fri",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Sat",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            }
                        ]
                    },
                    {
                        "schedule_type": "CloudPicUpload",
                        "week": [
                            {
                                "day": "Sun",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Mon",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Tue",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Wed",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Thu",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Fri",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Sat",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            }
                        ]
                    },
                    {
                        "schedule_type": "Record",
                        "week": [
                            {
                                "day": "Sun",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Mon",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Tue",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Wed",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Thu",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Fri",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            },
                            {
                                "day": "Sat",
                                "time": [
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                ]
                            }
                        ]
                    }
                ]
            }
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
