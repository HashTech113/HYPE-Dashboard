# Get

## Function

This API is used to get parameter for Al > Face Attendance page.

## Request Message

None

Sample:

POST API/AI/FDAttendance/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| fd_atd_info |   | JSON object | Face Attendance Configuration JSON(show as follow Table Table 2) |

Table 2

| Parameter | Range | Type | Description |

| enable | true false | bool | Whether to enable periodic sending of attendance forms |

| mode | “Day””Week””Month” | string | Sending mode |

| mode_week | “Mon.”“Tue.”“Wed.”“Thu.” “Fri.” “Sat.” “Sun.” | string | Day of the week sending mode |

| mode_month_day | “1” “2” “3” “4” “5” … “26” “27” “28” “29” “30” “31” | string | A certain day in monthly sending mode |

| send_email |   | string | Sending time |

| on_duty_time |   | string | Working hours |

| off_duty_time |   | string | Off work time |

| working_days | "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun." | array | Working days, corresponding to Monday ~ Sunday |

| channel | "CH1","CH2","CH3"……"CHx" The number of channels depends on the capabilities of the device. | array | Active channel |

| group | "1","2","3","4","5","6","7","8", "9","10","11","12","13", "14","15","16" | array | Effective group |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
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

## Error Code

See Response Messages Body and Common error_code for more information.
