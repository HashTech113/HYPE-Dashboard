# Set

## Function

This API is used to set CCt parameters.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON array | Single Channel Information JSON show as follow Table Table 2 |

| channel_max |   | int | Maximum number of channels |

Table 2

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | When the URL is a Get request JSON show as follow Table Table 3 When the URL is a Get request JSON show as follow Table Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

Table 3

| Parameter | Range | Type | Description |

| status | "Offline","Online"，“Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field. |

| search_date |   | string | Query date |

| detection_type | "Motion" "Person" "Vehicle" "Non-Vehicle" | string | Detection type |

| cross_type | "Cross In""Cross Out" | string | Way to cross the line |

| ai_cross_count |   | bool | Distinguish between first-generation and second-generation CCs, here the default is true |

Table 4

| Parameter | Range | Type | Description |

| status | "Offline","Online"，“Nonsupport” | string | Channel online status, only for digital channels. Note: When the channel is online, there is no such field |

| report |   | int array | Number of people crossing the line |

Sample:

POST API/AI/FCCStatistics/Set HTTP/1.1

{
    "version": "1.0",
    "data": {"channel_info": {"CH1": {
        "search_date": "2023-07-20",
        "report_type": "Daily report",
        "cross_type": "Cross In",
        "detection_type": "Motion"
    }}}
}

## Response Message

See AI > Statistics > Cross Counting Statistics > Set > Parameter Description  > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {"report": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]}}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
