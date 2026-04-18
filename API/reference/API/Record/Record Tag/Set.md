# Set

## Function

This API is used to set parameter for Record >  Record Tag page.

## Request Message

See Record >  Record Tag > Parameter Description > Table 4 for parameter description.

Sample:

POST /API/Playback/Tag/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"Tag_name": "Tag1",
		"Tag_date": "06/29/2023",
		"Tag_time": "13:19:40",
		"label_id": 0,
		"record_id": 0,
		"operate": 0,
		"channel": [
			"CH1"
		]
	}
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"version": "1.0",
	"data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
