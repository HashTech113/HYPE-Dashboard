# Set

## Function

This API is used to set parameter for Al > Face Attendance page.

## Request Message

See Al > Face Attendance > Get > Parameter Description > Table 1 for parameter description.

Sample:

POST API/AI/FDAttendance/Set HTTP/1.1

{
    "version": "1.0",
    "data": {"fd_atd_info": {
        "enable": false,
        "mode": "Day",
        "mode_week": "Mon.",
        "mode_month_day": "1",
        "send_email": "08:30:00",
        "on_duty_time": "08:30:00",
        "off_duty_time": "17:30:00",
        "working_days": [
            "Mon.",
            "Tue.",
            "Wed.",
            "Thu.",
            "Fri."
        ],
        "group": [
            "1",
            "2",
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
    }}
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
