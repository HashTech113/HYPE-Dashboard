# Get

## Function

This API is used to get Heat Map statistics.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

Sample:

POST API/AI/HeatMapStatistics/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See AI >Statistics > Heat Map Statistics > Get > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "date": "2023-07-20",
        "start_hour": 0,
        "end_hour": 23,
        "report_type": "Daily report",
        "detection_type": "Motion",
        "heat_map_type": 1
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
