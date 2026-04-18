# Range

## Function

This API is used to get parameter range for Channel > Channel Configuration > Broadcast IPC page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Search and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/RemoteDev/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. |

#### Table 2

| Parameter | Range | Type | Description |

| device_info |   | JSON Object | Channel Information JSON show as follow Table 5 |

#### Table 3

| Parameter | Range | Type | Description |

| operation_type | "AddOrEditChannel", "EditIPCParam", "EditIPCPwd" | string | Operation Type: Add or modify channel parameters, edit connection IPC parameters, and edit connection IPC password. |

| remove_ipc | “IP_CH1”…” IP_CH1x” The number of channels depends on the capabilities of the device. | array | Each array bit represents a channel with a string. |

| channel_info |   | JSON object | show as follow Table 4 |

#### Table 4

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 5 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 5

| Parameter | Range | Type | Description |

| No | 1~1000000 | int |   |

| activesign | 0~2 | int |   |

| channel_num |   | int | Number of channels supported by each device. |

| device_type | Max length: 35byte | string | Manufacturer |

| device_type_flag | Max length: 32byte | string | Manufacturer flag, informing the third party IPC can broadcast protocol search, modify IP, but online still to ONVIF protocol online (only for NVR) |

| dns1 | Max length: 15byte | string | Preferred DNS server, for example, 8.8.8.8. |

| dns2 | Max length: 15byte | string | Standby DNS server, for example, 8.8.8.8. |

| fmuti_devid | Max length: 1024byte | string |   |

| gateway | Max length: 15byte | string | Gateway |

| ip_address | Max length: 63byte | string | IP address |

| ismodify_dhcp |   | bool |   |

| ismodify_ip |   | bool | Whether the ip address is changed. |

| ismodify_port |   | bool | Whether the port address is changed. |

| ismodify_username |   | bool |   |

| mac_address | Max length: 35byte | string | MAC address |

| manufacturer | Max length: 35byte | string | Device type |

| network_mode | “Dhcp”, ”Static” | string | Network mode |

| old_ip_address | Max length: 63byte | string | Old IP address |

| password | Max length: 31byte | string | Password |

| password_empty |   | bool | Whether the password is empty. |

| port | [1~65535] | int | Media port |

| protocol | Max length: 15byte | string | IPC access protocol |

| software_version | Max length: 40byte | string | Software version |

| subnet_mask | Max length: 15byte | string | Subnet mask |

| username | Max length: 31byte | string |   |

| version_flag | [0~255] | int | Version flag |

| web_port | [1~65535] | int |   |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"device_info": {
			"type": "array",
			"min_size": 0,
			"max_size": 500,
			"items": [
				{
					"network_mode": {
						"type": "string",
						"items": [
							"Dhcp",
							"Static"
						]
					},
					"ip_address": {
						"type": "string",
						"min_len": 7,
						"max_len": 63
					},
					"subnet_mask": {
						"type": "string",
						"min_len": 7,
						"max_len": 15
					},
					"gateway": {
						"type": "string",
						"min_len": 7,
						"max_len": 15
					},
					"dns1": {
						"type": "string",
						"min_len": 7,
						"max_len": 15
					},
					"dns2": {
						"type": "string",
						"min_len": 7,
						"max_len": 15
					},
					"port": {
						"type": "int32",
						"min": 1,
						"max": 65535
					},
					"web_port": {
						"type": "int32",
						"min": 1,
						"max": 65535
					},
					"channel_num": {
						"type": "int32",
						"mode": "r",
						"min": 1,
						"max": 256
					},
					"protocol": {
						"type": "string",
						"mode": "r",
						"items": [
							"Private",
							"Onvif",
							"RTSP",
							"Custom 1",
							"Custom 2",
							"Custom 3",
							"Custom 4",
							"Custom 5",
							"Custom 6",
							"Custom 7",
							"Custom 8",
							"Custom 9",
							"Custom 10",
							"Custom 11",
							"Custom 12",
							"Custom 13",
							"Custom 14",
							"Custom 15",
							"Custom 16"
						]
					},
					"username": {
						"type": "string",
						"mode": "w",
						"min_len": 0,
						"max_len": 31
					},
					"password": {
						"type": "string",
						"mode": "w",
						"min_len": 0,
						"max_len": 31
					},
					"manufacturer": {
						"type": "string",
						"mode": "r",
						"min_len": 0,
						"max_len": 35
					},
					"activesign": {
						"type": "int32",
						"mode": "r",
						"min": 0,
						"max": 2
					},
					"device_type": {
						"type": "string",
						"mode": "r",
						"min_len": 0,
						"max_len": 35
					},
					"device_type_flag": {
						"type": "string",
						"mode": "r",
						"min_len": 0,
						"max_len": 32
					},
					"mac_address": {
						"type": "string",
						"mode": "r",
						"min_len": 0,
						"max_len": 35
					},
					"software_version": {
						"type": "string",
						"mode": "r",
						"min_len": 0,
						"max_len": 40
					},
					"fmulti_devid": {
						"type": "string",
						"mode": "r",
						"min_len": 0,
						"max_len": 1024
					},
					"version_flag": {
						"type": "int32",
						"mode": "r",
						"min": 0,
						"max": 255
					},
					"old_ip_address": {
						"type": "string",
						"mode": "w",
						"min_len": 7,
						"max_len": 63
					},
					"ismodify_dhcp": {
						"type": "bool",
						"mode": "r"
					},
					"ismodify_ip": {
						"type": "bool",
						"mode": "r"
					},
					"ismodify_port": {
						"type": "bool",
						"mode": "r"
					},
					"ismodify_username": {
						"type": "bool",
						"mode": "r"
					},
					"password_empty": {
						"type": "bool"
					},
					"No": {
						"type": "int32",
						"min": 1,
						"max": 1000000
					}
				}
			]
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
