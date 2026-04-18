# Set

## Function

This API is used to get Thermal > Spot Measurement parameter

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device. | string array | IPC can only be used "CH1"。 |

| x | 0-704 | int | Preview click location, x |

| y | 0-576 | int | Preview click position, y |

Sample:

POST /API/PreviewChannel/PreviewShowTempByPos/Get HTTP/1.1

{
    "data": {
       "channel":"CH2",
       "x":10,
       "y":20
    }
}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" Channels supported by the device. | string array | IPC can only be used "CH1"。 |

| temp_str |   | string | A string that displays the temperature |

| show_time | 1- 60 | int | Display time, unit: ms. This parameter is not displayed. The default display time is 5000ms |

| font_color | 0-704 | JSON array | Text color, temporarily do not pass, web default[r,g,b]==[0,0,0] |

| bg_color | 0-576 | JSON array | Background color, not uploaded for now, web default[r,g,b]==[0,255,0] |

| x | 0-704 | int | Preview click location, x |

| y | 0-576 | int | Preview click position, y |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel": "CH2",
        "x": 10,
        "y": 20,
        "temp_str": "25.66℃"
    }
}

## Error Code

See Response message body and general error_code for more information.
