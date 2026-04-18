# Set

## Function

This API is used to set parameter for System > Date&Time page.

## Request Message

See System > Date&Time > Range > Parameter Description > Table 1 for parameter description.

Tips

The time field is sent only when the time parameter is modified, otherwise the system time will be rolled back. Because when the system time obtained by Get request, the system time has already passed.

Even if you have implemented the clock function on the client, and have not stopped the obtained time at the moment of the request, do not send Set request frequently, because network transmission also takes time, and sending Set request frequently will make the transmission time superimposed on the time deviation.

Sample:

POST /API/SystemConfig/DateTime/Set HTTP/1.1

Without time field

{
    "version": "1.0",
    "data": {
        "date_format": "MM/DD/YYYY",
        "time_format": 12,
        "time_zone": "GMT+8:00"
    }
}

With time field

{
    "version": "1.0",
    "data": {
		"date": "01/01/1970",
		"time": "00:00:00",
        "date_format": "MM/DD/YYYY",
        "time_format": 12,
        "time_zone": "GMT+8:00"
    }
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
