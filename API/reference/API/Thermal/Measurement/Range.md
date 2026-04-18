# Range

## Function

This API is used to get Thermal > Measurement parameter scale

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device | string array | IPC can only be used "CH1"。 |

| page_type | “ChannelConfig” “AlarmConfig” | string | Data used to distinguish between the channel configuration page and the alarm configuration page |

Sample:

POST /API/Thermal/Setup/Measurement/Range HTTP/1.1

{
    "version": "1.0",
    "data":{
        "page_type":"ChannelConfig"
        }

}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | description |

| channel_info |   | Json Object | Channel information see Table 3 |

| page_type | "ChannelConfig", "AlarmConfig" | string | The data used to distinguish between the channel configuration page and the alarm configuration page is only needed when setting. |

| channel_max |   | int | Total number of channels on the device |

#### Table 3

| Parameter | Range | Type | description |

| CH1 |   | Json Object | JSON see Table 4 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | description |

| status | "Offline" "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online |

| alarm_out | “Local->1” ”Local->x” “IP_CH1->1” “IP_CH1->2” ” IP_CHx->1” ” IP_CHx->2”... The number of channels depends on the performance of the device | array | Alarm output channel |

| latch_time | "5s","10s","20s","30s" | string | Alarm output time Ipc value 5 10 20 30 |

| record_enable |   | bool | channel video switch |

| post_recording | "OFF","5s","10s","20s","30s" | string | Video delay time Ipc value 0 5 10 20 30 |

| send_email | true, false | bool | Send Email switch |

| ftp_picture_upload | true, false | bool | FTP upload switch of channel capture |

| ftp_video_upload | true, false | bool | Channel video FTP upload switch |

| picture_to_cloud | true, false | bool | Picture upload switch |

| video_to_cloud | true, false | bool | Video cloud upload switch |

| light_linkage | true, false | bool | Linkage switch of the white light. When motion is triggered, the linkage triggers the white light |

| enforcerlight_linkage | true, false | bool | Red and blue light alarm switch |

| siren_linkage | true, false | bool | siren alarm switch |

| http_listening | true, false | bool | Push switch |

| switch | true, false | bool | switch |

| colorbar_switch | true, false | bool | Temperature color bar switch Switch |

| display_temp_on_stream | true, false | bool | The temperature is displayed on the stream switch |

| display_temp_on_optical | true, false | bool | The temperature is displayed on the optical channel switch |

| display_max_temp | true, false | bool | Displays the maximum temperature switch |

| display_min_temp | true, false | bool | Displays the minimum temperature switch |

| display_average_temp | true, false | bool | Displays the average temperature switch |

| spot_measurement | true, false | bool | Click anywhere in the image to get a temperature reading for a specific location, which takes 5 seconds to display in the preview screen. Default off |

| display_pos | "Near Target","Top Left" | string | Temperature display location option |

| data_refresh_rate | 1~5 | int | (original)Temperature measuring frame rate（Data Refresh Rate） (now)Temperature measurement frame rate（Data Refresh Interval（s），Default value 3 |

| temp_unit | "Degree Celsius" "Degree Fahrenheit" "Degree Kelvin" | string | Temperature unit option |

| reflective_temp |   | Json Object | Reflective Temperature value（rangeVaries with temperature units and gain options） （ high gain： {C:-40~200 F: -40~392 K:233.15~473.15} low gain： { C:-40~600 F: -40~1112 K:233.15~873.15}）Json see Table 5 |

| emissivity | 0.01~ 1 | double | emissivity |

| distance_unit | "Meter" "Feet" | string | Meter and Feet, default Meter |

| target_distance | 0~100 | double | Target Distance unit m |

| record_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video alarm output channel |

| ftp_picture_upload_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Capture image FTP upload alarm output channel |

| ftp_video_upload_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video FTP upload alarm output channel |

| picture_cloud_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Image upload alarm output channel |

| video_cloud_channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | array | Video cloud upload alarm output channel |

| schedule |   | JSON array | Schedule see Table 6 |

#### Table 5

| Parameter | Range | Type | description |

| Degree Celsius | [-40,200] | double |   |

| Degree Fahrenheit | [-40,392] | double |   |

| Degree Kelvin | [233.14999389648437,473.1499938964844] | double |   |

#### Table 6

| Parameter | Range | Type | description |

| schedule_type | “Record” | string | time schedule：Record，AlarmOut，SendEmail |

| week |   | JSON array | week json see Table 7 |

#### Table 7

| Parameter | Range | Type | description |

| day | Sun,Mon,Tue,Wed Thu,Fri,Sat | string | Mark the day of the week |

| time | 0: disables the time range 1: enables the time range | array | Each array bit identifies half an hour |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 1,
        "channel_info": {
            "type": "object",
            "items": {"CH2": {
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
                    "switch": {"type": "bool"},
                    "colorbar_switch": {"type": "bool"},
                    "display_temp_on_stream": {"type": "bool"},
                    "display_temp_on_optical": {"type": "bool"},
                    "display_max_temp": {"type": "bool"},
                    "display_min_temp": {"type": "bool"},
                    "display_average_temp": {"type": "bool"},
                    "display_pos": {
                        "type": "string",
                        "items": [
                            "Near Target",
                            "Top Left"
                        ]
                    },
                    "spot_measurement": {"type": "bool"},
                    "data_refresh_rate": {
                        "type": "string",
                        "items": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5"
                        ]
                    },
                    "temp_unit": {
                        "type": "string",
                        "items": [
                            "Degree Celsius",
                            "Degree Fahrenheit",
                            "Degree Kelvin"
                        ]
                    },
                    "emissivity": {
                        "type": "double",
                        "mode": "r",
                        "min": 0.01,
                        "max": 1,
                        "default_value": 1
                    },
                    "distance_unit": {
                        "type": "string",
                        "items": [
                            "Meter",
                            "Feet"
                        ]
                    },
                    "target_distance": {
                        "type": "double",
                        "mode": "r",
                        "min": 0,
                        "max": 100,
                        "default_value": 1
                    },
                    "reflective_temp": {
                        "type": "object",
                        "items": {
                            "Degree Celsius": {
                                "type": "double",
                                "mode": "r",
                                "min": -40,
                                "max": 200,
                                "default_value": 25
                            },
                            "Degree Fahrenheit": {
                                "type": "double",
                                "mode": "r",
                                "min": -40,
                                "max": 392,
                                "default_value": 77
                            },
                            "Degree Kelvin": {
                                "type": "double",
                                "mode": "r",
                                "min": 233.14999389648437,
                                "max": 473.1499938964844,
                                "default_value": 298.1499938964844
                            }
                        }
                    }
                }
            }}
        }
    }
}

## Error Code

See Response message body and general error_code for more information.
