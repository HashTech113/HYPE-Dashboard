# Range

## Function

This API is used to get parameter range for AI > Setup > Cross Counting page.

## Request Message

See AI > Setup > Cross Counting > Get > Table 1 for parameter description.

Sample:

POST /API/AI/Setup/CrossCount/Range HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

See AI > Setup > Cross Counting > Get > Parameter Description > Table 2 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "channel_info": {
            "type": "object",
            "items": {"CH1": {
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
                    "switch": {"type": "bool"},
                    "sensitivity": {
                        "type": "int32",
                        "items": [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    "alarm_num": {
                        "type": "int32",
                        "min": 1,
                        "max": 255
                    },
                    "rule_switch": {"type": "bool"},
                    "rule_type": {
                        "type": "string",
                        "items": [
                            "A->B",
                            "B->A"
                        ]
                    },
                    "type": {
                        "type": "string",
                        "items": [
                            "Motion",
                            "Pedestrian",
                            "Motor Vehicle",
                            "Non-motorized Vehicle"
                        ]
                    },
                    "start_time": {
                        "type": "string",
                        "len": 8
                    },
                    "end_time": {
                        "type": "string",
                        "len": 8
                    },
                    "reset_count": {"type": "bool"},
                    "rule_info": {
                        "type": "object",
                        "items": {"rule_number1": {
                            "type": "object",
                            "items": {
                                "rule_switch": {"type": "bool"},
                                "rule_type": {
                                    "type": "string",
                                    "items": [
                                        "A->B",
                                        "B->A"
                                    ]
                                },
                                "rule_line": {
                                    "type": "object",
                                    "items": {
                                        "x1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "x2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "y2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        }
                                    }
                                },
                                "rule_rect": {
                                    "type": "object",
                                    "items": {
                                        "x1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y1": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "x2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y2": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "x3": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y3": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "x4": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "y4": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        }
                                    }
                                }
                            }
                        }}
                    }
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
