# Range

## Function

This API is used to get parameter range for Al > Face Attendance page.

## Request Message

Sample:

POST /API/AI/FDAttendance/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Al > Face Attendance > Get > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"fd_atd_info": {
        "type": "object",
        "items": {
            "enable": {"type": "bool"},
            "mode": {
                "type": "string",
                "items": [
                    "Day",
                    "Week",
                    "Month"
                ]
            },
            "mode_week": {
                "type": "string",
                "items": [
                    "Mon.",
                    "Tue.",
                    "Wed.",
                    "Thu.",
                    "Fri.",
                    "Sat.",
                    "Sun."
                ]
            },
            "mode_month_day": {
                "type": "string",
                "items": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31"
                ]
            },
            "send_email": {
                "type": "string",
                "len": 8
            },
            "on_duty_time": {
                "type": "string",
                "len": 8
            },
            "off_duty_time": {
                "type": "string",
                "len": 8
            },
            "working_days": {
                "type": "array",
                "min_size": 0,
                "max_size": 7,
                "items": {
                    "type": "string",
                    "items": [
                        "Mon.",
                        "Tue.",
                        "Wed.",
                        "Thu.",
                        "Fri.",
                        "Sat.",
                        "Sun."
                    ]
                }
            },
            "group": {
                "type": "array",
                "min_size": 0,
                "max_size": 16,
                "items": {
                    "type": "string",
                    "items": [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16"
                    ]
                }
            }
        }
    }}
}

## Error Code

See Response Messages Body and Common error_code for more information.
