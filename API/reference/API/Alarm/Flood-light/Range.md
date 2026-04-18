# Range

## Function

This API is used to get the parameter range of Alarm > Floodlight.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channels supported by the device. | string array | IPC only use "CH1"。 |

Sample:

POST /API/AlarmConfig/Deterrence/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

###### Table 2

| Parameter | Range | Type | Description |

| channel_max |   | int | Maximum number of channels |

| channel_info |   | Json Object | Channel information see Table 3 for more information |

###### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Json see Table 4 |

| ... |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| ... |   | Json Object |   |

###### Table 4

| Parameter | Range | Type | Description |

| status | "Offline","Online" | string | Channel online status, only for digital channels. Note: This field is not available when the channel is online |

| flood_light_switch |   | bool | White light switch |

| flood_light_disable |   | bool | Full color machine only |

| flood_light_mode | "Warninglight" "Strobe" | string | White light mode, Warninglight: constantly on, Strobe: flashing and degree_ There are differences in modes, flood_ Light_ Mode represents the way in which the white light is lit when the white light is triggered, degree_ Mod represents the screen color of white light in night vision mode |

| flood_light_value | 1-100 | int | White brightness |

| bright_time | 5-180 | int | White light duration |

| strobe_frequency | "Low","Middle","High" | string | Enable in flashing mode，0:low; 1:middle; 2:high |

| sensitivity | 1-8 | int | 8 levels: 8-high, 7-high, 1-low sensitivity for detecting triggered white light in areas |

| siren_switch | true false | bool | siren switch false: close true: open |

| siren_value | 1-10 | int | siren volume |

| siren_time | 5-180 | int | siren time last |

| color_image_ctrl |   | bool | 0: Off, 1: On When turned on, triggering white light will force IRCUT to operate in daytime mode. When not turned on, IRCUT will not respond to photosensitive effects. |

| region_setting | 200*8 | array | Divide the region into row * col blocks, with each bit describing the value of a block The row and col of white light are based on motion. Region: White light is triggered only when motion is in this region Bit = 1: motion in this block is monitored..Example: region_setting[0] = (FF-FF-FF-FF-FF-F0-00-00-00-00-00):: motion in channel 0 line 0’s 44 blocks is monitored. Line 1’s 44 blocks not monitored. |

| mbcol | 44 | int | Divide the area into row * col blocks |

| mbrow | 30 | int | Divide the area into row * col blocks |

| dualtalk_volume | 1-10 | int | Intercom volume control. |

| enforcer_light_switch | true false | bool | Red and blue light switch false: close true: open |

| enforcer_bright_time | 5-180 | int | Duration of red and blue lights |

| warning_light_disable |   | bool | Full color machine only |

| button_control |   | Json Object | Controls whether the save and default buttons are displayed or hidden |

| save_visible |   | bool | Save button |

| default_visible |   | bool | Restore default button |

| param_video |   | Json Object | Page small window video box, do not pass this field default display |

| show |   | bool | show |

| disable |   | bool | disable |

| time_schedule |   | Json array | Json object see Table 5 |

| deterrence_mode | " Normal "," Full Color "," Alarm " | string | Used in the white light night vision mode of the wireless battery program:,1:Normal; 2:Full Color;3: Alarm. flood_ Light_ There are differences in modes, flood_ Light_ Mode represents the way in which the white light is lit when the white light is triggered, degree_ Mod represents the screen color of white light in night vision mode |

| deterrence_interval_time |   | int | (Dedicated for consumer NVR docking with IPC POE package) Sound and light linkage alarm working interval time |

| deterrence_schedule |   | Json array | (Dedicated to Consumer NVR Docking IPC POE Package) Sound and Light Linkage Schedule Data,see Table 7 for more information |

###### Table 5

| Parameter | Range | Type | Description |

| schedule_type | “Deterrence” | string | White Light Time Schedule |

| week |   | Json array | WeekJson see Table 6 for more information |

###### Table 6

| Parameter | Range | Type | Description |

| day | Sun,Mon,Tue,Wed,Thu,Fri,Sat | string | Identify the day of the week |

| time | 0: Close time period 1: Enable this time period | array | Each array bit (int) identifies half an hour. |

###### Table 7

| Parameter | Range | Type | Description |

| schedule_type | "white_light","enforcer_light","siren" | string | The alarm type represented by the current schedule data |

| schedule_list |   | string | Current alarm linkage schedule data,see Table 8 for more information |

###### Table 8

| Parameter | Range | Type | Description |

| enable | true false | bool | Is the current schedule effective |

| start_time | 0 – 1439(23*60+59) | int | Schedule start time (minutes relative to 00:00) |

| end_time | 0 – 1439(23*60+59) | int | Schedule end time (minutes relative to 00:00) |

| weekday | "Sunday""Monday""Tuesday""Wednesday""Thursday""Friday""Saturday" |   |   |

| array | Indicates the day of the week on which the current schedule takes effect, with multiple options available |   |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
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
                            "Online"
                        ]
                    },
                    "flood_light_switch": {"type": "bool"},
                    "bright_time": {
                        "type": "int32",
                        "min": 5,
                        "max": 180,
                        "default_value": 60
                    },
                    "flood_light_mode": {
                        "type": "string",
                        "items": [
                            "Warninglight",
                            "Strobe"
                        ]
                    },
                    "strobe_frequency": {
                        "type": "string",
                        "items": [
                            "Low",
                            "Middle",
                            "High"
                        ]
                    },
                    "support_floodLight_schedule_hub": {"type": "bool"},
                    "flood_light_disable": {"type": "bool"},
                    "warning_light_disable": {"type": "bool"},
                    "button_control": {
                        "save_visible": true,
                        "default_visible": true,
                        "support_floodLight_schedule_hub_disable": false,
                        "support_enforcer_schedule_hub_disable": false
                    },
                    "param_video": {
                        "type": "object",
                        "items": {
                            "show": {"type": "bool"},
                            "disable": {"type": "bool"}
                        }
                    }
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
