# Range

## Function

This API is used to get parameter range for AI > Setup > Face Detection page.

## Request Message

See AI > Setup > Face Detection > Get > Request Message > Table 1 for parameter description.

Sample:

POST /API/AI/Setup/FD/Range HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

See AI > Setup > Face Detection > Get > Parameter Description > Table 2 for parameter description.

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
                    "face_attribute": {"type": "bool"},
                    "apply_mode": {
                        "type": "string",
                        "items": [
                            "FrontalView",
                            "MultiiView",
                            "Customize"
                        ]
                    },
                    "snap_mode": {
                        "type": "string",
                        "items": [
                            "OptimalMode",
                            "RealTimeMode",
                            "IntervalMode"
                        ]
                    },
                    "snap_num": {
                        "type": "string",
                        "items": [
                            "1",
                            "2",
                            "3",
                            "Unlimited"
                        ]
                    },
                    "snap_frequency": {
                        "type": "int32",
                        "min": 1,
                        "max": 255
                    },
                    "min_pixel": {
                        "type": "int32",
                        "mode": "r",
                        "min": 32,
                        "max": 1080,
                        "default_value": 64
                    },
                    "max_pixel": {
                        "type": "int32",
                        "mode": "r",
                        "min": 320,
                        "max": 1080,
                        "default_value": 640
                    },
                    "detection_mode": {
                        "type": "string",
                        "items": [
                            "StaticMode",
                            "MotionMode"
                        ]
                    },
                    "roll_range": {
                        "type": "int32",
                        "mode": "r",
                        "min": 0,
                        "max": 180,
                        "default_value": 30,
                        "default_value_frontal": 30,
                        "default_value_multi": 180
                    },
                    "pitch_range": {
                        "type": "int32",
                        "mode": "r",
                        "min": 0,
                        "max": 180,
                        "default_value": 30,
                        "default_value_frontal": 30,
                        "default_value_multi": 180
                    },
                    "yaw_range": {
                        "type": "int32",
                        "mode": "r",
                        "min": 0,
                        "max": 180,
                        "default_value": 45,
                        "default_value_frontal": 45,
                        "default_value_multi": 180
                    },
                    "picture_quality": {
                        "type": "int32",
                        "mode": "r",
                        "min": 0,
                        "max": 100,
                        "default_value": 100,
                        "default_value_frontal": 100,
                        "default_value_multi": 100
                    },
                    "rule_info": {
                        "type": "object",
                        "items": {"rule_number1": {
                            "type": "object",
                            "items": {
                                "rule_kind": {
                                    "type": "string",
                                    "items": [
                                        "Rect",
                                        "Line"
                                    ]
                                },
                                "detection_range": {
                                    "description": "Only rule_rect has this variable.",
                                    "type": "string",
                                    "mode": "r",
                                    "items": [
                                        "FullScreen",
                                        "Customize"
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
                                        }
                                    }
                                },
                                "rule_type": {
                                    "description": "Only rule_line has this variable.",
                                    "type": "string",
                                    "mode": "r",
                                    "items": [
                                        "A->B",
                                        "B->A"
                                    ]
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
