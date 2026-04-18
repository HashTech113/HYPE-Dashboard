# Set

## Function

This API is used to set Channel > Image Control page parameters.

## Request Message

See Channel > Image Control > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/ImageControl/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH3": {
				"support_default": true,
				"ir_cut_mode": "ImageMode",
				"image_sensitivity": 1,
				"ir_led": "Auto",
				"mirror_mode": "Close",
				"corridor_mode": "Close",
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
					"shutter_limit": "1/8"
				},
				"wdr_hide_ai_area": false,
				"Night": {
					"back_light": "Close",
					"denoising": "Auto",
					"denoising_level": 128,
					"gain": 64,
					"white_balance": "Auto",
					"red_tuning": 44,
					"green_tuning": 27,
					"blue_tuning": 54,
					"exposure_mode": "Auto",
					"shutter_limit": "1/8"
				},
				"camera_param_mode": "Daylight",
				"chn_index": "CH3",
				"page": "chn_imgCtrl"
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
