# Get

## Function

This API is used to get Channel > Analog Channel page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/AnalogChannel/Get HTTP/1.1

{
	"version": "1.0",
	"data": {
		"page_type": "ChannelConfig"
	}
}

## Response Message

See Channel > Analog Channel > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH1": {
				"channel_name": "CH1",
				"state": "Enable",
				"switch": true
			},
			"CH2": {
				"channel_name": "CH2",
				"state": "Enable",
				"switch": true
			},
			"CH3": {
				"channel_name": "CH3",
				"state": "Enable",
				"switch": true
			},
			"CH4": {
				"channel_name": "CH4",
				"state": "Enable",
				"switch": true
			},
			"CH5": {
				"channel_name": "CH5",
				"state": "Enable",
				"switch": true
			},
			"CH6": {
				"channel_name": "CH6",
				"state": "Enable",
				"switch": true
			},
			"CH7": {
				"channel_name": "CH7",
				"state": "Enable",
				"switch": true
			},
			"CH8": {
				"channel_name": "CH8",
				"state": "Enable",
				"switch": true
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
