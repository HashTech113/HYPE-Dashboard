# Range

## Function

This API is used to get the parameter range of the System > DST page

Note:

Range Provides reference information on client UI limits and API request limits. When sending Get and Set  request, the parameters must be limited strictly according to the Range, or request may be machine rejected.

## Request Message

None.

Sample:

POST /API/SystemConfig/DST/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| dst_enable | boolean | boolean | DST function switch |

| support_crossyear |   | boolean | Whether to support of crossing year. |

| time_offset | 1,2 | int | DST offset value.Unit: hour |

| dst_mode | "Week", "Date" | string | DST pattern |

| start_date |   | string | DST startdate. The date format is MM/DD/YYYY |

| end_date |   | string | DST end date. The date format is MM/DD/YYYY |

| start_hour |   | string | DST start time. The time format is hh:mm:ss |

| end_hour |   | string | DST end time. For example : "00:20:00” The time format is hh:mm:ss |

| start_month | "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" | string | Start month |

| end_month | Which in accordance with "start_month" | string | End month |

| start_week | "1st", "2nd", "3rd", "4th", "Last" | string | The week of the month |

| end_week | Which in accordance with "start_week" | string | The week of the month |

| start_weekday | "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" | string | Which day start from. |

| end_weekday | Which in accordance with "start_weekday" | string | Which day end of |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"dst_enable": {
			"type": "bool"
		},
		"time_offset": {
			"type": "int32",
			"unit": "hour",
			"items": [
				1,
				2
			]
		},
		"dst_mode": {
			"description": "Week mode:month week weekday hour; Date mode:date hour.",
			"type": "string",
			"items": [
				"Week",
				"Date"
			]
		},
		"start_date": {
			"description": "The date format is MM/DD/YYYY",
			"type": "string",
			"len": 10
		},
		"end_date": {
			"description": "The date format is MM/DD/YYYY",
			"type": "string",
			"len": 10
		},
		"start_hour": {
			"description": "The time format is hh:mm:ss",
			"type": "string",
			"len": 8
		},
		"end_hour": {
			"description": "The time format is hh:mm:ss",
			"type": "string",
			"len": 8
		},
		"start_month": {
			"type": "string",
			"items": [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			]
		},
		"end_month": {
			"type": "string",
			"items": [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			]
		},
		"start_week": {
			"type": "string",
			"items": [
				"1st",
				"2nd",
				"3rd",
				"4th",
				"Last"
			]
		},
		"end_week": {
			"type": "string",
			"items": [
				"1st",
				"2nd",
				"3rd",
				"4th",
				"Last"
			]
		},
		"start_weekday": {
			"type": "string",
			"items": [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			]
		},
		"end_weekday": {
			"type": "string",
			"items": [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			]
		},
		"support_crossyear": {
			"type": "bool"
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
