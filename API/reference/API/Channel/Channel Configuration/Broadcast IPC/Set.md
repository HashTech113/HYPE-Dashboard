# Set

## Function

This API is used to broadcast set IPC information.

## Request Message

See Channel > Channel Configuration > Broadcast IPC > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/RemoteDev/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"device_info": [
			{
				"tips_ensure_ip_not_use": true,
				"network_mode": "Dhcp",
				"hide_network_mode": false,
				"ip_address": "172.16.8.5",
				"subnet_mask": "255.255.252.000",
				"gateway": "172.016.008.001",
				"dns1": "000.000.000.000",
				"dns2": "000.000.000.000",
				"port": 80,
				"channel_num": 1,
				"protocol": "Private",
				"manufacturer": " ",
				"activesign": 1,
				"fmulti_devid": "WjNFZWZRWnMwTW1EM1E1VU1ZV1NrYjFGdWJTYU1sL29Lc2VXbjgyMjNaYz0=",
				"device_type": "NC591XB",
				"device_type_flag": "0",
				"mac_address": "00-23-63-A2-91-B0",
				"software_version": "V40.45.8.2.4_230705",
				"ismodify_username": true,
				"ismodify_dhcp": true,
				"ismodify_ip": true,
				"ismodify_port": true,
				"password_empty": true,
				"version_flag": 0,
				"No": 1,
				"web_port": 80,
				"old_ip_address": "172.16.8.5",
				"username": ""
			}
		]
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
