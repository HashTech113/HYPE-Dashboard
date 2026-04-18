# Set

## Function

This API is used to set Channel > OSD page parameters.

## Request Message

See Channel > OSD > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/OSD/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"status": "Online",
				"channel_enable": true,
				"name": {
					"show": true,
					"text": "Camera",
					"pos": {
						"x": 290,
						"y": 0
					}
				},
				"datetime": {
					"show": true,
					"date_format": "YYYY-MM-DD",
					"time_format": 24,
					"pos": {
						"x": 390,
						"y": 0
					}
				},
				"alarm": {
					"show": true,
					"text": "In: - Out: -",
					"pos": {
						"x": 0,
						"y": 50
					}
				},
				"refresh_rate": "60Hz",
				"covert": false,
				"osd_invert": false,
				"chn_index": "CH1",
				"page": "chn_osd"
			},
			"CH5": {
				"status": "Online",
				"channel_enable": true,
				"name": {
					"show": true,
					"text": "Camera",
					"pos": {
						"x": 290,
						"y": 0
					}
				},
				"datetime": {
					"show": true,
					"date_format": "MM/DD/YYYY",
					"time_format": 24,
					"pos": {
						"x": 390,
						"y": 0
					}
				},
				"covert": false
			},
			"CH14": {
				"status": "Online",
				"channel_enable": true,
				"name": {
					"show": true,
					"text": "Camera",
					"pos": {
						"x": 290,
						"y": 0
					}
				},
				"datetime": {
					"show": true,
					"date_format": "YYYY-MM-DD",
					"time_format": 24,
					"pos": {
						"x": 390,
						"y": 0
					}
				},
				"alarm": {
					"show": true,
					"text": "In: - Out: -",
					"pos": {
						"x": 0,
						"y": 50
					}
				},
				"refresh_rate": "60Hz",
				"covert": false
			},
			"CH15": {
				"status": "Online",
				"channel_enable": true,
				"name": {
					"show": true,
					"text": "Camera",
					"pos": {
						"x": 290,
						"y": 0
					}
				},
				"datetime": {
					"show": true,
					"date_format": "YYYY-MM-DD",
					"time_format": 24,
					"pos": {
						"x": 390,
						"y": 0
					}
				},
				"alarm": {
					"show": true,
					"text": "In: - Out: -",
					"pos": {
						"x": 0,
						"y": 50
					}
				},
				"refresh_rate": "60Hz",
				"covert": false,
				"osd_invert": false
			}
		}
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
