# Get

## Function

This API is used to obtain two-way intercom information.

## Request Message

### Parameter Description

see PreviewChannel > PTZ > Get > Parameter Description  > Table 1 for parameter description.

Sample:

POST /API/PreviewChannel/DualTalk/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
        "channel":"IP_CH4",
        "command_flag":false,
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CH1x", "IP_CH1"…" IP_CH1x", "WIFI_CH1"…" WIFI_CH1x" The channel names supported by the device. | string | Channel name |

| action | 0-1 | int | 1:open, 0:close |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
        "channel": "CH1",
        "action": 1
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
