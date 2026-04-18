# Get

## Function

This API is used to get CC statistics.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

Sample:

POST API/AI/CCStatistics/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See AI > Statistics > Cross Counting Statistics > Set > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "search_date": "2023-07-19",
        "ai_cross_count": true,
        "report_type": "Daily report",
        "detection_type": "Motion",
        "cross_type": "Cross In"
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
