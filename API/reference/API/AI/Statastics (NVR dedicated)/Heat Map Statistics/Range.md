# Range

## Function

This API is used to get parameter range for AI >Statistics > Heat Map Statistics page.

## Request Message

Sample:

POST API/AI/HeatMapStatistics/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See AI >Statistics > Heat Map Statistics > Set > Parameter Description > Table 1 for parameter description.

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
                    "date": {
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
                    "start_hour": {
                        "type": "int32",
                        "min": 0,
                        "max": 23
                    },
                    "end_hour": {
                        "type": "int32",
                        "min": 0,
                        "max": 23
                    },
                    "detection_type": {
                        "type": "string",
                        "items": [
                            "Motion",
                            "face"
                        ]
                    }
                }
            }}
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
