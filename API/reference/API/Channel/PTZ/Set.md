# Set

## Function

This API is used to set Channel > PTZ page parameters.

## Request Message

See Channel > PTZ > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/PTZ/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 1,
				"copy_ch": "analog",
				"chn_index": "CH1"
			},
			"CH2": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 2,
				"copy_ch": "analog"
			},
			"CH3": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 3,
				"copy_ch": "analog"
			},
			"CH4": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 4,
				"copy_ch": "analog"
			},
			"CH5": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 5,
				"copy_ch": "analog"
			},
			"CH6": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 6,
				"copy_ch": "analog"
			},
			"CH7": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 7,
				"copy_ch": "analog"
			},
			"CH8": {
				"signal_type": "Analog",
				"protocol": "COAX1",
				"baudrate": "9600",
				"databit": "8",
				"stopbit": "1",
				"parity": "None",
				"address": 8,
				"copy_ch": "analog"
			}
		},
		"page_type": "AlarmConfig"
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
