# Set

## Function

This API is used to set parameter for Stream > Capture page.

## Request Message

See Stream > Capture > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/StreamConfig/Capture/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"auto_capture": true,
				"normal_interval": 600,
				"alarm_interval": 60,
				"copy_ch": "all",
				"chn_index": "CH1"
			},
			"CH2": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH3": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH4": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH5": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH6": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH7": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH8": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH9": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH10": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH11": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH12": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH13": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH14": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH15": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
			},
			"CH16": {
				"auto_capture": false,
				"normal_interval": 5,
				"alarm_interval": 5,
				"copy_ch": "all"
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
