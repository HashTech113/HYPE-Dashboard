# Set

## Function

This API is used to set parameter for System > General page.

## Request Message

See System > General > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/SystemConfig/General/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"device_name": "admin",
		"menu_timeouts": 60,
		"session_timeout": 1440,
		"preview_session_timeout": false
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
