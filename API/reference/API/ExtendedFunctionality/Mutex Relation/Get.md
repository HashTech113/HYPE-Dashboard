# Get

## Function

This API is used to get parameter for  Extended Functionality > Mutex Relation page.

## Request Message

None.

Sample:

POST /API/MutexRelation/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

## Parameter Description

Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Channel Information JSON show as follow Tabletable 2 |

Table 2

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table table 3 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

Table 3

| Parameter | Range | Type | Description |

| category |   | JSON array | CategoryJSON show as follow Table table 4 |

Table 4

| Parameter | Range | Type | Description |

| mutex_type | "h264+" "h265+" "roi" "exposure_compensation" "shutter_manual" "time_exposure" "lpd_enhance" | string | The feature types that are allowed to be configured. Note: Depending on device capabilities, actual feature types may be less than allowable configurable types |

| mutex_relation | "h264+" "h265+" "roi" "exposure_compensation" "shutter_manual" "time_exposure" "lpd_enhance" | string | Function type that is mutually exclusive with mutex_type Note: According to the device capability, the actual mutex type is different |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
        "channel_info":{
            "CH1":{
                "category":[
                    {
                        "mutex_type":"lpd_enhance",
                        "mutex_relation":[
                            "exposure_compensation",
                            "shutter_manual",
                            "time_exposure"
                        ]
                    },
                    {
                        "mutex_type":"exposure_compensation",
                        "mutex_relation":[
                            "lpd_enhance"
                        ]
                    },
                    {
                        "mutex_type":"shutter_manual",
                        "mutex_relation":[
                            "lpd_enhance"
                        ]
                    },
                    {
                        "mutex_type":"time_exposure",
                        "mutex_relation":[
                            "lpd_enhance"
                        ]
                    }
                ]
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
