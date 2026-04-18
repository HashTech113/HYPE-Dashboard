# Range

## Function

This API is used to get the parameter range of Alarm > PTZ Linkage.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channels supported by the device. | string array | IPC only use "CH1"。 |

Sample:

POST /API/AlarmConfig/PTZLinkage/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Channel information refer to Table 3 |

| channel_max |   | int | Maximum number of channels |

| support_copy |   | bool | Does the page support copy (dedicated to NVR and DVR) |

###### Table 3

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Channel information refer to Table 4 |

| channel_max |   | int | Maximum number of channels |

| support_copy |   | bool | Does the page support copy (dedicated to NVR and DVR) |

###### Table 4

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Json see Table 5 for more information |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

###### Table 5

| Parameter | Range | Type | Description |

| switch | true false | bool | Channel Enable Switch |

| motion |   | bool | Motion alarm trigger switch |

| pir |   | bool | PIR linkage switch |

| io |   | bool | Alarm input switch |

| ptz_info |   | array | see Table 6 for more information |

| all_alarm |   | json object | Alarm type switch, see Table 7 for information |

| copy_ch | "digit""analog""wifi" | string | Flag supporting channel replication (dedicated to NVR and DVR) |

###### Table 6

Channel Information JSON

| Parameter | Range | Type | Description |

| ptz_chn | “CH1” ”CH1x”“IP_CH1” ” IP_CH1x”“WIFI_CH1”…” WIFI_CH1x” | string | Channel alarm linkage The channel to which the alarm is linked. |

| linkage_ptz_point_index | 0,1,2,3....255 | int | Indication points corresponding to alarm linkage channels note:The client needs to be compatible with two methods. The old method, where type is string, had many redundant fields that could cause a crash. In version 8.2.3, it was changed to int to solve this problem. The hexadecimal string in the structure represents whether the option exists by bit, with a total of 256bits and small end storage. Bit0 represents the None option, 1-255bits represents the 1-255 numerical option, and bit 1 represents the existence, A bit of 0 indicates that it does not exist (for example: ptz_info. items. items [{"linkage_ptz point_index": "1", "linkage_ptz point_index": "2"...}] changed to ptz_info. item: "0000... 000") |

| ptz_switch |   | bool | Alarm linkage group switch (4 sets) |

###### Table 7

Channel Information JSON

| Parameter | Range | Type | Description |

| ptz_motion |   | bool | Motion alarm trigger switch |

| pir |   | bool | PIRgang switch |

| io |   | bool | Alarm input switch If the channel0（1）If the obtained value is 1, it indicates that Local<-1 (Local<-2) has been checked on the interface, otherwise it will not be checked. |

| linkage_lcd |   | bool | LCD gang switch |

| linkage_pid |   | bool | PID gang switch |

| linkage_sod |   | bool | SOD gang switch |

| linkage_pd |   | bool | PD gang switch |

| linkage_pdvd |   | bool | PDVD gang switch |

| linkage_fd |   | bool | FD gang switch |

| linkage_cc |   | bool | CC gang switch |

| linkage_sound |   | bool | Sound gang switch |

| linkage_vt |   | bool | Vt gang switch |

| linkage_ad |   | bool | AD gang switch |

| linkage_cd |   | bool | CD gang switch |

| linkage_qd |   | bool | QD gang switch |

| linkage_lpd |   | bool | LPD gang switch |

| linkage_rsd |   | bool | RSD gang switch |

| linkage_lpr |   | bool | LPR gang switch |

| linkage_fr |   | bool | FR gang switch |

| linkage_ai_pid |   | bool | AI PID gang switch |

| linkage_ai_lcd |   | bool | AI LCD gang switch |

| linkage_ai_pdvd |   | bool | AI PDVD gang switch |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "support_copy": true,
        "ptz_info": {
            "type": "array",
            "min_size": 0,
            "max_size": 16,
            "items": [
                {
                    "ptz_chn": "CH1",
                    "linkage_ptz_point_index": {
                        "type": "int32",
                        "min": 0,
                        "max": 255,
                        "items": "0000000000000000000000000000000000000000000000000000000000000001"
                    }
                },
                ...
                {
                    "ptz_chn": "CH4",
                    "linkage_ptz_point_index": {
                        "type": "int32",
                        "min": 0,
                        "max": 255,
                        "items": "0000000000000000000000000000000000000000000000000000000000000001"
                    }
                }
            ]
        },
        "channel_info": {
            "type": "object",
            "items": {
                "CH1": {
                    "type": "object",
                    "items": {
                        "switch": {
                            "type": "bool"
                        },
                        "all_alarm": {
                            "type": "object",
                            "items": {
                                "motion": {
                                    "type": "bool"
                                },
                                "pir": {
                                    "type": "bool"
                                },
                                "io": {
                                    "type": "bool"
                                },
                                "linkage_sod": {
                                    "type": "bool"
                                },
                                "linkage_cc": {
                                    "type": "bool"
                                },
                                "linkage_sound": {
                                    "type": "bool"
                                },
                                "linkage_vt": {
                                    "type": "bool"
                                },
                                "linkage_fd": {
                                    "type": "bool"
                                },
                                "linkage_intrusion": {
                                    "type": "bool"
                                },
                                "linkage_region_entrance": {
                                    "type": "bool"
                                },
                                "linkage_region_exiting": {
                                    "type": "bool"
                                },
                                "linkage_ad": {
                                    "type": "bool"
                                },
                                "linkage_cd": {
                                    "type": "bool"
                                },
                                "linkage_qd": {
                                    "type": "bool"
                                },
                                "linkage_lpd": {
                                    "type": "bool"
                                },
                                "linkage_rsd": {
                                    "type": "bool"
                                },
                                "linkage_lpr": {
                                    "type": "bool"
                                },
                                "linkage_fr": {
                                    "type": "bool"
                                },
                                "linkage_ai_pid": {
                                    "type": "bool"
                                },
                                "linkage_ai_lcd": {
                                    "type": "bool"
                                },
                                "linkage_ai_pdvd": {
                                    "type": "bool"
                                },
                                "linkage_ai_firedetet": {
                                    "type": "bool"
                                },
                                "linkage_ai_tempmeas": {
                                    "type": "bool"
                                }
                            }
                        },
                        "ptz_info": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 4,
                            "items": [
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                },
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                },
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                },
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                }
                            ]
                        },
                        "copy_ch": {
                            "type": "string",
                            "items": [
                                "digit",
                                "analog",
                                "wifi",
                                "local",
                                "all"
                            ]
                        }
                    }
                },
                ...
                "CH4": {
                    "type": "object",
                    "items": {
                        "switch": {
                            "type": "bool"
                        },
                        "all_alarm": {
                            "type": "object",
                            "items": {
                                "motion": {
                                    "type": "bool"
                                },
                                "pir": {
                                    "type": "bool"
                                },
                                "io": {
                                    "type": "bool"
                                },
                                "linkage_sod": {
                                    "type": "bool"
                                },
                                "linkage_cc": {
                                    "type": "bool"
                                },
                                "linkage_sound": {
                                    "type": "bool"
                                },
                                "linkage_vt": {
                                    "type": "bool"
                                },
                                "linkage_fd": {
                                    "type": "bool"
                                },
                                "linkage_intrusion": {
                                    "type": "bool"
                                },
                                "linkage_region_entrance": {
                                    "type": "bool"
                                },
                                "linkage_region_exiting": {
                                    "type": "bool"
                                },
                                "linkage_ad": {
                                    "type": "bool"
                                },
                                "linkage_cd": {
                                    "type": "bool"
                                },
                                "linkage_qd": {
                                    "type": "bool"
                                },
                                "linkage_lpd": {
                                    "type": "bool"
                                },
                                "linkage_rsd": {
                                    "type": "bool"
                                },
                                "linkage_lpr": {
                                    "type": "bool"
                                },
                                "linkage_fr": {
                                    "type": "bool"
                                },
                                "linkage_ai_pid": {
                                    "type": "bool"
                                },
                                "linkage_ai_lcd": {
                                    "type": "bool"
                                },
                                "linkage_ai_pdvd": {
                                    "type": "bool"
                                },
                                "linkage_ai_firedetet": {
                                    "type": "bool"
                                },
                                "linkage_ai_tempmeas": {
                                    "type": "bool"
                                }
                            }
                        },
                        "ptz_info": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 4,
                            "items": [
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                },
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                },
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                },
                                {
                                    "ptz_switch": {
                                        "type": "bool"
                                    }
                                }
                            ]
                        },
                        "copy_ch": {
                            "type": "string",
                            "items": [
                                "digit",
                                "analog",
                                "wifi",
                                "local",
                                "all"
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
