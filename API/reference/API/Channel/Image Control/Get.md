# Get

## Function

This API is used to get Channel > Image Control page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/ImageControl/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel> Image Control > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH1": {
				"status": "Offline"
			},
			"CH2": {
				"status": "Offline"
			},
			"CH5": {
				"status": "Offline"
			},
			"CH6": {
				"status": "Offline"
			},
			"CH7": {
				"status": "Offline"
			},
			"CH9": {
				"status": "Offline"
			},
			"CH10": {
				"status": "Offline"
			},
			"CH11": {
				"status": "Offline"
			},
			"CH12": {
				"status": "Offline"
			},
			"CH13": {
				"status": "Offline"
			},
			"CH14": {
				"support_default": true,
				"ir_cut_mode": "AutoMode",
				"start_time": "00:00",
				"end_time": "00:00",
				"ir_cut_delay": 2,
				"ir_led": "Auto",
				"mirror_mode": "Close",
				"angle_rotation": "0",
				"Daylight": {
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
					"defogging_level": 128
				},
				"wdr_hide_ai_area": false
			},
			"CH15": {
				"support_default": true,
				"mirror_mode": "Close",
				"corridor_mode": "Close",
				"angle_rotation": "0",
				"Daylight": {
					"back_light": "Close",
					"denoising": "Auto",
					"denoising_level": 128,
					"white_balance": "Auto",
					"red_tuning": 44,
					"green_tuning": 27,
					"blue_tuning": 54,
					"exposure_mode": "Auto",
					"iris_max": 100,
					"iris_min": 0,
					"shutter_max": "1/5",
					"shutter_min": "1/20000"
				},
				"wdr_hide_ai_area": false,
				"image_setting": "FullColorMode",
				"FullColorMode": {
					"white_light": "Auto",
					"image_sensitivity": 1
				}
			},
			"CH16": {
				"status": "Offline"
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
