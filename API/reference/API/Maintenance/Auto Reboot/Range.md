# Range

## Function

This API is used to get the auto restart page parameter range.

## Request Message

None.

Sample:

POST /API/Maintenance/AutoReboot/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| auto_reboot |   | bool | Auto restart switch.Automatic maintenance switch.. |

| period_mode | "EveryDay", "EveryWeek", "EveryMonth" | string | The model of the maintenance cycle. |

| week | "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" | string | Weekdays of the week.(When MaintainPeriod is Week) |

| day | 1~31 | int | Day of months.(When MaintainPeriod is Month) |

| time |   | string | Restart time.Format: hours : minutes(Each digit must be written with two digits) |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "auto_reboot": {
            "type": "bool"
        },
        "period_mode": {
            "type": "string",
            "items": [
                "EveryDay",
                "EveryWeek",
                "EveryMonth"
            ]
        },
        "week": {
            "type": "string",
            "items": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ]
        },
        "day": {
            "type": "int32",
            "min": 1,
            "max": 31
        },
        "time": {
            "type": "string",
            "min_len": 0,
            "max_len": 5
        },
        "secondary_authentication": {
            "type": "string",
            "min_len": 0,
            "max_len": 16
        },
        "show_tips": false
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
