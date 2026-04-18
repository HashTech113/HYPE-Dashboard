# Range

## Function

This API is used to get parameter for AI > Statistics > Cross Counting Statistics page.

## Request Message

Sample:

POST API/AI/CCStatistics/Range HTTP/1.1

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
    "data": {
        "channel_max": 1,
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
                            "Online",
                            "Notsupport"
                        ]
                    },
                    "search_date": {
                        "type": "string",
                        "len": 10
                    },
                    "report_type": {
                        "type": "string",
                        "items": [
                            "Daily report",
                            "Weekly report",
                            "Monthly report",
                            "Annual report"
                        ]
                    },
                    "detection_type": {
                        "type": "string",
                        "items": [
                            "Motion",
                            "Person",
                            "Vehicle",
                            "Non-Vehicle"
                        ]
                    },
                    "cross_type": {
                        "type": "string",
                        "items": [
                            "Cross In",
                            "Cross Out"
                        ]
                    },
                    "column_chart": {"type": "bool"},
                    "line_chart": {"type": "bool"},
                    "ai_cross_count": {"type": "bool"}
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
