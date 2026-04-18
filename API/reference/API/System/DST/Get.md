# Get

## Function

This API is used to get parameter for System > DST page.

## Request Message

None.

Sample:

POST /API/SystemConfig/DST/Get HTTP/1.1

{
    "version": "1.0",
}

## Response Message

See System > DST > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"dst_enable": true,
		"time_offset": 1,
		"dst_mode": "Week",
		"start_month": "Apr",
		"end_month": "Mar",
		"start_week": "4th",
		"end_week": "3rd",
		"start_weekday": "Mon",
		"end_weekday": "Mon",
		"start_date": "10/10/2021",
		"end_date": "01/03/2022",
		"start_hour": "02:00:00",
		"end_hour": "04:00:00",
		"support_crossyear": true
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
