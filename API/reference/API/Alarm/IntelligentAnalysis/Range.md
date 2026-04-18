# Range

## Function

This API is used to get Alarm > Intelligent Analysis configuration parameter scope.

## Request Message

None.

Sample:

POST /API/Intelligent/IntelligentAnalysis/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | object | Total channel information see Table 2. |

| page_type | "ChannelConfig", "AarmConfig" | string | It is used to distinguish the data of channel configuration page or alarm configuration page. |

| channel_max |   | int | The maximum number of channels. |

##### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | object | See Table 3 |

| … |   | object |   |

| IP_CH1 |   | object |   |

| … |   | object |   |

| WIFI_CH1 |   | object |   |

| … |   | object |   |

##### Table 3

| Parameter | Range | Type | Description |

| "status" | "Offline", "Online", "Notsupport" | string | status. |

| report_type | "Daily report", "Weekly report", "Monthly report", "Annual report" | Daily report, Weekly report, Monthly report, Yearly report. |   |

| cross_type | "Number of in", "Number of out" | string | crossing type. |

| search_date | string length:10 | string | Search date. |

| ai_cross_count |   | bool | Distinguish between first-generation and second-generation CC, here the default is true. |

| detection_type | "Motion", "Person", "Vehicle", "Non-motorized Vehicle" | string | detection type. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
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
                                "Notsupport"
                            ]
                        },
                        "report_type": {
                            "type": "string",
                            "items": [
                                "Daily report",
                                "Weekly report",
                                "Monthly report",
                                "Annual report"
                            ]
                        },
                        "cross_type": {
                            "type": "string",
                            "items": [
                                "Number of in",
                                "Number of out"
                            ]
                        },
                        "search_date": {
                            "type": "string",
                            "len": 10
                        },
                        "ai_cross_count": {
                            "type": "bool"
                        },
                        "detection_type": {
                            "type": "string",
                            "items": [
                                "Motion",
                                "Person",
                                "Vehicle",
                                "Non-motorized Vehicle"
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
