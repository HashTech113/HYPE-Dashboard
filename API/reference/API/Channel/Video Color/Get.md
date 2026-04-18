# Get

## Function

This API is used to get Channel > Video Color page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/Color/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel> Video Color > Parameter Description > Table 1 for parameter description.

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
			},
			"CH2": {
				"status": "Off-line"
			},
			"CH3": {
				"status": "Off-line"
			},
			"CH4": {
				"status": "Off-line"
			},
			"CH5": {
				"bright": 128,
				"contrast": 128,
				"saturation": 128,
				"sharpness": 128,
				"support_default": false
			},
			"CH6": {
				"status": "Off-line"
			},
			"CH7": {
				"status": "Off-line"
			},
			"CH8": {
				"status": "Off-line"
			},
			"CH9": {
				"status": "Off-line"
			},
			"CH10": {
				"status": "Off-line"
			},
			"CH11": {
				"status": "Off-line"
			},
			"CH12": {
				"status": "Off-line"
			},
			"CH13": {
				"status": "Off-line"
			},
			"CH14": {
				"hue": 128,
				"bright": 128,
				"contrast": 128,
				"saturation": 128,
				"sharpness": 128,
				"support_default": true
			},
			"CH15": {
				"hue": 128,
				"bright": 128,
				"contrast": 128,
				"saturation": 128,
				"sharpness": 128,
				"support_default": true
			},
			"CH16": {
				"status": "Off-line"
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
