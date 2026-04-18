# Range

## Function

This API is used for get Thermal > ImageControl parameter scale

## Request Message

none

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel_info |   | Json Object | Channel information see Table 2 |

| channel_max |   | int | Total number of channels on the device |

#### Table 2

| Parameter | Range | Type | description |

| CH1 |   | Json Object | JSON see Table 3 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | description |

| status | "Offline" "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online |

| support_default |   | bool | Whether to restore the default value |

| support_backgroundcorr |   | bool | Whether background correction is supported |

| support_shuttercorr |   | bool | Whether shutter correction is supported |

| mirror_mode | "Close" "VerticalMirroring" "HorizontalMirroring" "All" | string | Mirror mode (synchronized with optical channel ch1) |

| angle_rotation | "0","90","180","270" | string | Angular rotation (synchronized with optical channel ch1) |

| denoising_2dlevel | 0~100 | int | 2D noise reduction |

| denoising_3dlevel | 0~100 | int | 3D noise reduction |

| enhancement_level | 0~100 | int | detail enhancement |

| enhance_regional | "Center-25" "Center-50" "Center-75" "Bottom" "Middle Area" "Top" "Customizations" "Full Screen" "Disable" | string | Image area enhancement |

| palette | "White Hot" "Black Hot" "Rainbow" "Ice Fire" "Red Hot" "Green Hot" "Fusion 1" "Fusion 2" "Hot Iron 1" "Hot Iron 2" "Puce" "Color 1" "Color 2" "Rain" "Dark Blue" | string | pseudo color |

| fusion | "Normal" "Details Overlay" | string | fusion Normal：Fusion not on Details Overlay Enable the fusion mode. For structure reference Table 4 |

| rule_info |   | Object array | Custom zone enhancement (Custom) mode line drawing information, structure reference Table 5 |

#### Table 4

| Parameter | Range | Type | description |

| imagefusion_level | 1~100 | int | Image fusion ratio |

| edgefusion_level | 1~100 | int | Edge fusion ratio |

| horizontal_trim | -100~100 | int | horizontal trim |

| vertica_trim | -100~100 | int | vertica trim |

| fusion_distance | 1~200 | double | Fusion distance |

#### Table 5

| Parameter | Range | Type | description |

| rule_no | 1 | int | Rule number |

| rule_rect | true, false | Json Object | Rectangle,Json parameters see Table 6 |

#### Table 6

| Parameter | Range | Type | description |

| left | 0-704 | int | X coordinate |

| top | 0-576 | int | Y coordinate |

| width | 0-704 | int | width |

| height | 0-576 | int | height |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 2,
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
                                "Online"
                            ]
                        },
                        "image_setting": {
                            "type": "string",
                            "items": [
                                "FullColorMode",
                                "DayNightMode",
                                "Schedule"
                            ]
                        },
                        "white_light": {
                            "type": "string",
                            "items": [
                                "Auto",
                                "Manual",
                                "Schedule",
                                "OFF"
                            ]
                        },
                        "light_distance": {
                            "type": "int32",
                            "min": 0,
                            "max": 100
                        },
                        "image_setting_schedule": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 1,
                            "items": [{"week": {
                                "type": "array",
                                "size": 7,
                                "items": [{
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
                                        "items": [{
                                            "type": "int32",
                                            "items": [
                                                0,
                                                1
                                            ]
                                        }]
                                    }
                                }]
                            }}]
                        },
                        "whitelight_schedule": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 1,
                            "items": [{"week": {
                                "type": "array",
                                "size": 7,
                                "items": [{
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
                                        "items": [{
                                            "type": "int32",
                                            "items": [
                                                0,
                                                1
                                            ]
                                        }]
                                    }
                                }]
                            }}]
                        },
                        "ircut_schedule": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 1,
                            "items": [{"week": {
                                "type": "array",
                                "size": 7,
                                "items": [{
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
                                        "items": [{
                                            "type": "int32",
                                            "items": [
                                                0,
                                                1
                                            ]
                                        }]
                                    }
                                }]
                            }}]
                        },
                        "ir_cut_mode": {
                            "default": "Image",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Day",
                                "Night",
                                "Image",
                                "Schedule"
                            ]
                        },
                        "image_sensitivity": {
                            "type": "int32",
                            "mode": "rw",
                            "items": [
                                3,
                                2,
                                1,
                                0
                            ],
                            "default_value": 1,
                            "default_value_fullcolor": 1
                        },
                        "start_time": {
                            "description": "When ir_cut_mode is TimeSchedule has this variable.",
                            "default": "18:00",
                            "type": "string",
                            "mode": "rw",
                            "len": 5
                        },
                        "end_time": {
                            "description": "When ir_cut_mode is TimeSchedule has this variable.",
                            "default": "06:00",
                            "type": "string",
                            "mode": "rw",
                            "len": 5
                        },
                        "ir_led": {
                            "default": "Manual",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Manual",
                                "SmartIR",
                                "OFF"
                            ]
                        },
                        "low_beam_light": {
                            "type": "int32",
                            "mode": "r",
                            "min": 0,
                            "max": 100,
                            "default_value": 100
                        },
                        "angle_rotation": {
                            "chn_linkage": "CH2",
                            "default": "0",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "0",
                                "180"
                            ]
                        },
                        "mirror_mode": {
                            "chn_linkage": "CH2",
                            "default": "Close",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Close",
                                "VerticalMirroring",
                                "HorizontalMirroring",
                                "All"
                            ]
                        },
                        "back_light": {
                            "default": "Close",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "DWDR",
                                "HLC",
                                "BacklightCompensation",
                                "Close"
                            ]
                        },
                        "blc_level": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 15,
                            "default_value": 2
                        },
                        "back_light_area": {
                            "default": "Center",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Top",
                                "Left",
                                "Down",
                                "Right",
                                "Center"
                            ]
                        },
                        "denoising": {
                            "default": "Auto",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Disable",
                                "Auto",
                                "Manual"
                            ]
                        },
                        "denoising_level": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 128
                        },
                        "wdr_coefficeient": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 128
                        },
                        "dwdr_coefficeient": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 128
                        },
                        "hlc_strength": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 128
                        },
                        "white_balance": {
                            "default": "Auto",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Auto",
                                "Manual"
                            ]
                        },
                        "red_tuning": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 44
                        },
                        "green_tuning": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 27
                        },
                        "blue_tuning": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 255,
                            "default_value": 54
                        },
                        "exposure_mode": {
                            "default": "Auto",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Auto",
                                "Manual"
                            ]
                        },
                        "shutter_limit": {
                            "default": "1/8",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "1/5",
                                "1/8",
                                "1/15",
                                "1/30",
                                "1/60",
                                "1/120",
                                "1/150",
                                "1/180",
                                "1/200",
                                "1/240",
                                "1/250",
                                "1/300",
                                "1/360",
                                "1/480",
                                "1/500",
                                "1/600",
                                "1/700",
                                "1/1000",
                                "1/1500",
                                "1/2500",
                                "1/5000",
                                "1/10000",
                                "1/12000",
                                "1/20000",
                                "Flickerless"
                            ]
                        },
                        "support_default": {"type": "bool"},
                        "support_flickerless_mode": {
                            "type": "string",
                            "items": ["Auto"]
                        }
                    }
                },
                "CH2": {
                    "type": "object",
                    "items": {
                        "status": {
                            "description": "Only offline channel has this variable.",
                            "type": "string",
                            "mode": "r",
                            "items": [
                                "Offline",
                                "Online"
                            ]
                        },
                        "angle_rotation": {
                            "chn_linkage": "CH1",
                            "default": "0",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "0",
                                "180"
                            ]
                        },
                        "mirror_mode": {
                            "chn_linkage": "CH1",
                            "default": "Close",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Close",
                                "VerticalMirroring",
                                "HorizontalMirroring",
                                "All"
                            ]
                        },
                        "denoising_2dlevel": {
                            "type": "int32",
                            "mode": "r",
                            "min": 0,
                            "max": 100,
                            "default_value": 50
                        },
                        "denoising_3dlevel": {
                            "type": "int32",
                            "mode": "r",
                            "min": 0,
                            "max": 100,
                            "default_value": 50
                        },
                        "enhancement_level": {
                            "type": "int32",
                            "mode": "r",
                            "min": 0,
                            "max": 100,
                            "default_value": 50
                        },
                        "imagefusion_level": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 100,
                            "default_value": 50
                        },
                        "edgefusion_level": {
                            "type": "int32",
                            "mode": "r",
                            "min": 1,
                            "max": 100,
                            "default_value": 50
                        },
                        "fusion": {
                            "default": "Normal",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Normal",
                                "Details Overlay"
                            ]
                        },
                        "horizontal_trim": {
                            "type": "int32",
                            "mode": "r",
                            "min": -100,
                            "max": 100,
                            "default_value": 0
                        },
                        "vertica_trim": {
                            "type": "int32",
                            "mode": "r",
                            "min": -100,
                            "max": 100,
                            "default_value": 0
                        },
                        "fusion_distance": {
                            "type": "double",
                            "mode": "r",
                            "min": 1,
                            "max": 200,
                            "default_value": 1
                        },
                        "palette": {
                            "default": "White Hot",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "White Hot",
                                "Black Hot",
                                "Rainbow",
                                "Ice Fire",
                                "Red Hot",
                                "Green Hot",
                                "Fusion 1",
                                "Fusion 2",
                                "Hot Iron 1",
                                "Hot Iron 2",
                                "Puce",
                                "Color 1",
                                "Color 2",
                                "Rain",
                                "Dark Blue"
                            ]
                        },
                        "support_backgroundcorr": {"type": "bool"},
                        "support_shuttercorr": {"type": "bool"},
                        "enhance_regional": {
                            "default": "Full Screen",
                            "type": "string",
                            "mode": "rw",
                            "items": [
                                "Center-25",
                                "Center-50",
                                "Center-75",
                                "Bottom",
                                "Middle Area",
                                "Top",
                                "Customizations",
                                "Full Screen",
                                "Disable"
                            ]
                        },
                        "support_default": {"type": "bool"},
                        "rule_info": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 1,
                            "items": [{
                                "rule_no": 1,
                                "rule_rect": {
                                    "type": "object",
                                    "items": {
                                        "left": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "top": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        },
                                        "width": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 704
                                        },
                                        "height": {
                                            "type": "int32",
                                            "min": 0,
                                            "max": 576
                                        }
                                    }
                                }
                            }]
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response message body and general error_code for more information.
