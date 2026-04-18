# Get

## Function

This API is used to get Alarm > Intelligent Analysis configuration parameters.

## Request Message

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…"IP_CHx", "WIFI_CH1"…"WIFI_CHx" The channels supported by the device. | string array | IPC doesn't need to bring this key. |

Sample:

POST /API/Intelligent/IntelligentAnalysis/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
    }
}

## Response Message

See Alarm > IntelligentAnalysis > Range > Parameter Description  > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH16": {
                "report_type": "Daily report",
                "cross_type": "Number of in",
                "detection_type": "Motion",
                "ai_cross_count": true,
                "search_date": "2023-08-25"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
