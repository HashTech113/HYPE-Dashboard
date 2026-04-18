# Range

## Function

This API is used to get parameter range for System > Date&Time page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/SystemConfig/DateTime/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| date | The format is the same as described in the date_format field | string | System date |

| time | The format is : hh:mm:ss | string | System time |

| synchronize_computer_time | boolean | boolean | Only for IPC,synchronize computer time switch |

| date_format | "MM/DD/YYYY" "YYYY-MM-DD" "DD/MM/YYYY" | string | Date format |

| time_format | 12,24 | int32 | Time format,in hour |

| time_zone | "GMT-12:00" "GMT-11:00" "GMT-10:00" "GMT-9:00" "GMT-8:00" "GMT-7:00" "GMT-6:00" "GMT-5:00" "GMT-4:30" "GMT-4:00" "GMT-3:30" "GMT-3:00" "GMT-2:00" "GMT-1:00" "GMT" "GMT+1:00" "GMT+2:00" "GMT+3:00" "GMT+3:30" "GMT+4:00" "GMT+4:30" "GMT+5:00" "GMT+5:30" "GMT+5:45" "GMT+6:00" "GMT+6:30" "GMT+7:00" "GMT+8:00" "GMT+9:00" "GMT+9:30" "GMT+10:00" "GMT+11:00" "GMT+12:00" "GMT+13:00" | string | Time zone |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "date": {
            "type": "string",
            "len": 10
        },
        "time": {
            "description": "The time format is hh:mm:ss",
            "type": "string",
            "len": 8
        },
        "date_format": {
            "type": "string",
            "items": [
                "MM/DD/YYYY",
                "YYYY-MM-DD",
                "DD/MM/YYYY"
            ]
        },
        "time_format": {
            "type": "int32",
            "unit": "hour",
            "items": [
                24,
                12
            ]
        },
        "time_zone": {
            "type": "string",
            "items": [
                "GMT-12:00",
                "GMT-11:00",
                "GMT-10:00",
                "GMT-9:00",
                "GMT-8:00",
                "GMT-7:00",
                "GMT-6:00",
                "GMT-5:00",
                "GMT-4:30",
                "GMT-4:00",
                "GMT-3:30",
                "GMT-3:00",
                "GMT-2:00",
                "GMT-1:00",
                "GMT",
                "GMT+1:00",
                "GMT+2:00",
                "GMT+3:00",
                "GMT+3:30",
                "GMT+4:00",
                "GMT+4:30",
                "GMT+5:00",
                "GMT+5:30",
                "GMT+5:45",
                "GMT+6:00",
                "GMT+6:30",
                "GMT+7:00",
                "GMT+8:00",
                "GMT+9:00",
                "GMT+9:30",
                "GMT+10:00",
                "GMT+11:00",
                "GMT+12:00",
                "GMT+13:00"
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
