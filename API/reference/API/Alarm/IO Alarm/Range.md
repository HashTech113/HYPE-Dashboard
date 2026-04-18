# Range

## Function

This API is used to get the parameter range of Alarm > IO Alarm.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| alarm_in | "Local<-1"..."Local<-x" "IP_CH1<-1"..."IP_CHx<-x" The number of channels depends on the functionality of the device. | string array | Each array bit represents a channel with a string. |

Sample:

POST /API/AlarmConfig/IO/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Channel information see Table 3 for more information |

| channel_max |   | int | The total number of channels in the current device |

###### Table 3

| Parameter | Range | Type | Description |

| Local<-1 |   | Json Object | Json object see Table 4 for more information |

| ... |   | Json Object |   |

| IP_CH1<-1 |   | Json Object |   |

| ... |   | Json Object |   |

###### Table 4

| Parameter | Range | Type | Description |

| alarm_type | "NormallyOpen", "NormallyClose", "Off" | string | I/O status alarm |

| latch_time | "10","20","40","60"or“5”“10”“20”“30” | string | Alarm output time |

| buzzer | "0","10","20","40","60" | string | Buzzer beep time (NVR/DVR dedicated) |

| alarm_out | “Local->1” ”Local->x” “IP_CH1->1” “IP_CH1->2” ” IP_CHx->1” ”IP_CHx->2” The number of channels depends on the functionality of the device. | array | Alarm output channel Each array bit is represented by a string representing the alarm output channel. |

| post_recording | "30","60","120","300"or“0”“5”“10”“20”“30” | string | Recording delay time |

| send_email |   | bool | Send email switch |

| ftp_picture_upload |   | bool | Channel video FTP upload switch |

| picture_to_cloud |   | bool | Image upload switch |

| video_to_cloud |   | bool | Video cloud upload switch (dedicated to NVR/DVR) |

| ftp_video_upload |   | bool | Channel video FTP upload switch (dedicated to NVR/DVR) |

| show_message |   | bool | Display message switch (dedicated to NVR/DVR) |

| full_screen |   | bool | Full screen switch (dedicated to NVR/DVR) |

| channel | “CH1” ”CH1x” “IP_CH1” ” IP_CH1x”“WIFI_CH1”…” WIFI_CH1x” | array | Channel alarm linkage switch Channel alarm linkage switch, each value represents a channel switch. |

| voice_prompts_index | 0~4294967295 | int | File index (0~4294967295, where 0 is None, meaning no audio file has been selected). Each file is named "index_filename" (1ui will try), and when displayed on the page, "index_" should be hidden, such as "1ui will try" and only "i will try" should be displayed |

| voice_prompts_select |   | array | Playback channel, calculated by bit (bit0 is local, bit1 corresponds to front-end channel 1, and bit2 corresponds to channel 2) |

| voice_prompts_time |   | array | Time period, there cannot be time conflicts among 12 time periods |

| record_enable |   | bool | record switch |

| light_linkage |   | bool | White light linkage switch |

| enforcerlight_linkage |   | bool | Alarm light linkage switch |

| siren_linkage |   | bool | Alarm linkage switch |

| http_listening |   | bool | eventpush linkage switch |

| schedule |   | Json array | Json See Table 5. |

###### Table 5

| Parameter | Range | Type | Description |

| schedule_type | "IO" | string | IO Linkage schedule |

| week |   | Json array | WeekJson See Table 6 |

###### Table 6

| Parameter | Range | Type | Description |

| day | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string |   |

| time | 0:Disable Time range 1: The time range is enabled | array | Each array bit (int) identifies half an hour. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "support_copy": true,
        "channel_info": {
            "type": "object",
            "items": {
                "Local<-1": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-2": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-3": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-4": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-5": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-6": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-7": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "Local<-8": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
                "IP_CH1<-1": {
                    "type": "object",
                    "items": {
                        "alarm_type": {
                            "type": "string",
                            "items": [
                                "NormallyOpen",
                                "NormallyClose",
                                "Off"
                            ]
                        },
                        "buzzer": {
                            "type": "string",
                            "items": [
                                "0",
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "alarm_out": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 33,
                            "items": {
                                "type": "string",
                                "items": [
                                    "Local->1",
                                    "IP_CH1->1"
                                ]
                            }
                        },
                        "latch_time": {
                            "type": "string",
                            "items": [
                                "10",
                                "20",
                                "40",
                                "60"
                            ]
                        },
                        "post_recording": {
                            "type": "string",
                            "items": [
                                "30",
                                "60",
                                "120",
                                "300"
                            ]
                        },
                        "show_message": {"type": "bool"},
                        "send_email": {"type": "bool"},
                        "full_screen": {"type": "bool"},
                        "ftp_picture_upload": {"type": "bool"},
                        "ftp_video_upload": {"type": "bool"},
                        "http_listening": {"type": "bool"},
                        "picture_to_cloud": {"type": "bool"},
                        "video_to_cloud": {"type": "bool"},
                        "voice_prompts_index": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_select": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "voice_prompts_time": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 12,
                            "items": []
                        },
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 16,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
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
