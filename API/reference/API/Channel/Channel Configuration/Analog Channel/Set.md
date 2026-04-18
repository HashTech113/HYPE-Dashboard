# Set

## Function

This API is used to set Channel > Analog Channel page parameters.

## Request Message

See Channel > Analog Channel > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/AnalogChannel/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"channel_name": "CH1",
				"state": "Enable",
				"switch": true,
				"channel": "CH1"
			},
			"CH2": {
				"channel_name": "CH2",
				"state": "Enable",
				"switch": true,
				"channel": "CH2"
			},
			"CH3": {
				"channel_name": "CH3",
				"state": "Enable",
				"switch": true,
				"channel": "CH3"
			},
			"CH4": {
				"channel_name": "CH4",
				"state": "Enable",
				"switch": true,
				"channel": "CH4"
			},
			"CH5": {
				"channel_name": "CH5",
				"state": "Enable",
				"switch": true,
				"channel": "CH5"
			},
			"CH6": {
				"channel_name": "CH6",
				"state": "Enable",
				"switch": true,
				"channel": "CH6"
			},
			"CH7": {
				"channel_name": "CH7",
				"state": "Enable",
				"switch": true,
				"channel": "CH7"
			},
			"CH8": {
				"channel_name": "CH8",
				"state": "Enable",
				"switch": true,
				"channel": "CH8"
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
