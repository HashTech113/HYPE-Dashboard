# Set

## Function

This API is used to set parameter for System > DST page.

## Request Message

See System > DSTl > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/SystemConfig/DST/Set HTTP/1.1

{
	"data": {
		"dst_enable": true,
		"dst_mode": "Week",
		"end_date": "01/03/2022",
		"end_hour": "04:00:00",
		"end_month": "Mar",
		"end_week": "3rd",
		"end_weekday": "Mon",
		"start_date": "10/10/2021",
		"start_hour": "02:00:00",
		"start_month": "Apr",
		"start_week": "4th",
		"start_weekday": "Mon",
		"support_crossyear": true,
		"time_offset": 1
	},
	"version": "1.0"
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
