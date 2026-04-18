# Set

## Function

This API is used to set Channel > IPChannel page parameters.

## Request Message

See Channel > IPChannel > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/IPChannel/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"state": "Online",
				"ip_address": "172.16.11.5",
				"main_url": "",
				"sub_url": "",
				"subnet_mask": "255.255.252.000",
				"gateway": "172.016.008.001",
				"port": 80,
				"channel_num": 1,
				"channel_index": 0,
				"protocol": "Private",
				"connect_method": "General",
				"username": "admin",
				"password_empty": false,
				"manufacturer": "",
				"device_type": "SSC30KQ+SC2315",
				"mac_address": "00-23-63-94-AA-08",
				"software_version": "V31.35.8.2.4_230710",
				"network_mode": "Dhcp",
				"forward_port": 65001
			}
		},
		"operation_type": "EditIPCParam"
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
