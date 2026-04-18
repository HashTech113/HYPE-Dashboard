# Set

## Function

This API is used to set parameter for Record > Record Configuration page.

## Request Message

See Record > Record Configuration > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/RecordConfig/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"anr": false,
				"copy_ch": "all",
				"chn_index": "CH1"
			},
			"CH2": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH3": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all",
				"chn_index": "CH3"
			},
			"CH4": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH5": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH6": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH7": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH8": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH9": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH10": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH11": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH12": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH13": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH14": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH15": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
				"copy_ch": "all"
			},
			"CH16": {
				"record_switch": true,
				"stream_mode": "DualStream",
				"prerecord": true,
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
