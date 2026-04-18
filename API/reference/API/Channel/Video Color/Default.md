# Default

## Function

This API is used to get Channel > Video Color page parameters.

## Request Message

See Channel> Video Color > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/Color/Default HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel": [
			"CH1"
		]
	}
}

## Response Message

See Channel> Video Color > Parameter Description > Table 2 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH1": {
				"hue": 128,
				"bright": 128,
				"contrast": 128,
				"saturation": 128,
				"sharpness": 128,
				"support_default": true
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
