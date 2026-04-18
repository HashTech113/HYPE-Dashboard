# Get

## Function

This API is used to get AI > Cross Counting Scenario > Statistics configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | String array | Each array bit represents a channel with a string. DVR/NVR need; IPC only use CH1 |

Sample:

POST /API/AI/Scenario/CC/Statistics/Get HTTP/1.1

{
    "result": "success",
    "data": {
        ["CH1"]
    }
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| Channels |   | Int array | query channel |

| Groups |   | Int array | queryable group |

| ReportType | "Day","Week","Month","Year" | string | query type |

| DetectionType | "Motion","Person","Vehicle" | string | detection type |

| Date | 10 | string | current date |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "success",
    "data": {
        "Channels": [
            0,
            3
        ],
        "Groups": [],
        "ReportType": "Week",
        "DetectionType": "Person",
        "Date": "2021-01-14"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
