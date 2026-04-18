# Get

## Function

This API is used to get parameter for Record > Record Tag page.

## Request Message

See Record >  Record Tag > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/Playback/Tag/Get HTTP/1.1

{
	"version": "1.0",
	"data": {
		"start_date": "06/29/2023",
		"start_time": "00:00:00",
		"end_date": "06/29/2023",
		"end_time": "23:59:59",
		"channel": [
			"CH1",
			"CH2",
			"CH3",
			"CH4",
			"CH5",
			"CH6",
			"CH7",
			"CH8",
			"CH9",
			"CH10",
			"CH11",
			"CH12",
			"CH13",
			"CH14",
			"CH15",
			"CH16"
		],
		"Keyword": ""
	}
}

## Response Message

See Record >  Record Tag > Parameter Description > Table 2 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"version": "1.0",
	"result": "success",
	"data": {
		"Pre-play": "30s",
		"Post-play": "30s",
		"all_tag_num": 1,
		"all_tag_info": [
			{
				"tag_info": {
					"Tag_date": "06/29/2023",
					"Tag_time": "13:19:40",
					"channel": "CH1",
					"chNum": 0,
					"label_id": 0,
					"record_id": 0,
					"Tag_name": "Tag1"
				}
			}
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
