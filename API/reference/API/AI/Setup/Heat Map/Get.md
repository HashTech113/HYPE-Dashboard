# Get

## Function

This API is used to get parameter for AI > Setup > Heat Map page.

## Request Message

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

| page_type | “ChannelConfig”, “AlarmConfig” | string | The data used to distinguish whether it is a channel configuration page or an alarm configuration page |

Sample:

POST API/AI/Setup/HeatMap/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Single Channel Information JSON show as follow Table Table 3 |

| channel_max |   | int | Maximum number of channels |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| status | "Offline","Online"，“Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| switch | true, false | bool | Switch, false: close true: open |

| rule_info |   | Object | Information JSON show as follow Table Table 5 |

| schedule_enable |   | bool | Schedule mode |

| ptz_operation_support |   | bool | (Ball machine use)Supports the ptz operation |

#### Table 5

| Parameter | Range | Type | Description |

| rule_number1 |   | Object | Rule number 1,information JSON show as follow Table Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| rule_switch |   | bool | Rule switch |

| rule_line |   | Object | Rectangle,Information JSON show as follow Table Table 7 |

| point_num | [min:max] | array | The number of points drawn in the area, minimum 3 points (min), maximum 8 points (max) |

#### Table 7

| Parameter | Range | Type | Description |

| x1 | 0-704 | short | x1 coordinate points |

| y1 | 0-576 | short | y1 coordinate points |

| x2 | 0-704 | short | x2 coordinate points |

| y2 | 0-576 | short | y2 coordinate points |

| x3 | 0-704 | short | x3 coordinate points |

| y3 | 0-576 | short | y3 coordinate points |

| x4 | 0-704 | short | x4 coordinate points |

| y4 | 0-576 | short | y4 coordinate points |

| x5 | 0-704 | short | x5 coordinate points |

| y5 | 0-576 | short | y5 coordinate points |

| x6 | 0-704 | short | x6 coordinate points |

| y6 | 0-576 | short | y6 coordinate points |

| x7 | 0-704 | short | x7 coordinate points |

| y7 | 0-576 | short | y7 coordinate points |

| x8 | 0-704 | short | x8 coordinate points |

| y8 | 0-576 | short | y8 coordinate points |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "switch": false,
        "rule_info": {"rule_number1": {
            "rule_switch": true,
            "rule_rect": {
                "x1": 0,
                "y1": 0,
                "x2": 704,
                "y2": 0,
                "x3": 704,
                "y3": 576,
                "x4": 0,
                "y4": 576
            }
        }}
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
