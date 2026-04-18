# Set

## Function

This API is used to set Channel > Wireless Camera page parameters.

## Request Message

See Channel > Wireless Camera > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/WirelessCamera/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"channel_name": "Channel1 1111111",
				"software_version": "V33.21.5.2_220429_50V",
				"chn_index": "CH1",
				"page": "chn_wireChn"
			},
			"CH2": {
				"channel_name": "Channel 2",
				"software_version": "V25.11.5.2_220407"
			},
			"CH3": {
				"channel_name": "Channel 3",
				"software_version": "V21.15.5.2_221207"
			},
			"CH4": {
				"channel_name": "Channel 4",
				"software_version": "V33.21.5.2_220520_50V"
			},
			"CH5": {
				"channel_name": "Channel 5",
				"software_version": "V33.21.5.2_220429_50V"
			},
			"CH6": {
				"channel_name": "Channel 6",
				"software_version": "V41.11.0.1_230706_W-0706"
			}
		},
		"page_type": "ChannelConfig"
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
