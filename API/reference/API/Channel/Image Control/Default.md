# Default

## Function

This API is used to get Channel > Image Control page parameters.

## Request Message

See Channel> Image Control > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/ImageControl/Default HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel": [
			"CH14"
		]
	}
}

## Response Message

See Channel> Image Control > Parameter Description > Table 2 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH14": {
				"ir_cut_mode": "AutoMode",
				"start_time": "00:00",
				"end_time": "00:00",
				"ir_cut_delay": 2,
				"ir_led": "Auto",
				"low_beam_light": 100,
				"high_beam_light": 100,
				"mirror_mode": "Close",
				"back_light": "Close",
				"denoising": "Auto",
				"denoising_level": 128,
				"gain": 64,
				"white_balance": "Auto",
				"red_tuning": 44,
				"green_tuning": 27,
				"blue_tuning": 54,
				"exposure_mode": "Auto",
				"shutter_limit": "1/8",
				"defog_mode": "Disable",
				"defogging_level": 128,
				"support_default": true
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
