# Set

## Function

This API is used to set Channel > Video Color page parameters.

## Request Message

See Channel > Video Color > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/VideoCover/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"hue": 128,
				"bright": 128,
				"contrast": 128,
				"saturation": 128,
				"sharpness": 192,
				"support_default": true,
				"last_hue": 50,
				"last_bright": 50,
				"last_contrast": 50,
				"last_saturation": 50,
				"last_sharpness": 50,
				"SunRise_time": "00:00",
				"SunSet_time": "00:00",
				"palette": "White Hot"
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
