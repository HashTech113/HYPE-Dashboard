# Range

## Function

This API is used to get parameter range for AI > Setup > Line Crossing Detection page.

## Request Message

See AI > Setup > Line Crossing Detection > Get > Table 1 for parameter description.

Sample:

POST /API/AI/Setup/LCD/Range HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

See AI > Setup > Line Crossing Detection > Get > Parameter Description > Table 2 for parameter description.

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
                    "detection_type": {
                        "type": "array",
                        "min_size": 0,
                        "max_size": 3,
                        "items": {
                            "type": "string",
                            "items": [
                                "Pedestrian",
                                "Motor Vehicle",
                                "Non-motorized Vehicle"
                            ]
                        }
                    },
                    "rule_info": {
                        "type": "object",
                        "items": {
                            "rule_number1": {
                                "type": "object",
                                "items": {
                                    "rule_switch": {"type": "bool"},
                                    "rule_type": {
                                        "type": "string",
                                        "items": [
                                            "A->B",
                                            "B->A",
                                            "A<-->B"
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
                                    }
                                }
                            },
                            "rule_number2": {
                                "type": "object",
                                "items": {
                                    "rule_switch": {"type": "bool"},
                                    "rule_type": {
                                        "type": "string",
                                        "items": [
                                            "A->B",
                                            "B->A",
                                            "A<-->B"
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
                                    }
                                }
                            },
                            "rule_number3": {
                                "type": "object",
                                "items": {
                                    "rule_switch": {"type": "bool"},
                                    "rule_type": {
                                        "type": "string",
                                        "items": [
                                            "A->B",
                                            "B->A",
                                            "A<-->B"
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
                                    }
                                }
                            },
                            "rule_number4": {
                                "type": "object",
                                "items": {
                                    "rule_switch": {"type": "bool"},
                                    "rule_type": {
                                        "type": "string",
                                        "items": [
                                            "A->B",
                                            "B->A",
                                            "A<-->B"
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
                                    }
                                }
                            }
                        }
                    }
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
