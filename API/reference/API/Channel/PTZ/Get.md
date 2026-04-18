# Get

## Function

This API is used to get Channel > PTZ page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/PTZ/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel> PTZ > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
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
				"copy_ch": "analog"
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
			},
			"IP_CH1": {
				"reason": "Not configured"
			},
			"IP_CH2": {
				"reason": "Not support"
			},
			"IP_CH3": {
				"reason": "Not configured"
			},
			"IP_CH4": {
				"status": "Offline"
			},
			"IP_CH5": {
				"reason": "Not support"
			},
			"IP_CH6": {
				"reason": "Not configured"
			},
			"IP_CH7": {
				"reason": "Not configured"
			},
			"IP_CH8": {
				"reason": "Not configured"
			},
			"IP_CH9": {
				"reason": "Not configured"
			},
			"IP_CH10": {
				"reason": "Not configured"
			},
			"IP_CH11": {
				"reason": "Not configured"
			},
			"IP_CH12": {
				"reason": "Not configured"
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
