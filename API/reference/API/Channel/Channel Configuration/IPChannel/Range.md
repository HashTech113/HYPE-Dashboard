# Range

## Function

This API is used to get parameter range for Channel > IPChannel page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/IPChannel/Range HTTP/1.1

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

| device_info |   | JSON Object | JSON show as follow Table 5 |

#### Table 3

| Parameter | Range | Type | Description |

| operation_type | "AddOrEditChannel", "EditIPCParam", "EditIPCPwd" | string | Operation Type: Add or modify channel parameters, edit connection IPC parameters, and edit connection IPC password. |

| remove_ipc | “IP_CH1”…” IP_CH1x” The number of channels depends on the capabilities of the device. | array | Each array bit represents a channel with a string. |

| channel_info |   | JSON object | JSON show as follow Table 4 |

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

| channel_num |   | int | Number of channels supported by each device. |

| state | "NotConfigured", "Offline", "Online" | string | A message is displayed when the channel is not configured. |

| switch_mode | "ManualMode", "AutoMode" | string | Only POE channels have this variable." POE channel mode: "ManualMode" : manual mode "AutoMode" : automatic mode |

| ip_address | Max length: 63byte | string | IP Adress |

| subnet_mask | Max length: 15byte | string | Subnet mask |

| gateway | Max length: 15byte | string | Gateway |

| dns1 | Max length: 15byte | string | Preferred DNS server, for example, 8.8.8.8. |

| dns2 | Max length: 15byte | string | Standby DNS server, for example, 8.8.8.8. |

| port | [1~65535] | int | Media port |

| web_port | [1~65535] | int |   |

| protocol | Max length: 15byte | string | IPC access protocol |

| username | Max length: 31byte | string |   |

| password | Max length: 31byte | string |   |

| password_empty |   | bool | Whether the password is empty. |

| camera_mode | "Auto", "Normal", "Fisheye" | string | Camera mode |

| manufacturer | Max length: 35byte | string | Device type |

| device_type | Max length: 35byte | string | Manufacturer |

| device_type_flag | Max length: 32byte | string | Manufacturer flag, informing the third party IPC can broadcast protocol search, modify IP, but online still to ONVIF protocol online (only for NVR) |

| mac_address | Max length: 35byte | string | MAC adress |

| software_version | Max length: 40byte | string | Software version |

| version_flag | [0~255] | int | Version flag |

| security | "Risk", "Weak", "Medium", "Strength" | string | Cryptographic security |

| can_modify_pwd |   | bool | Whether the password can be changed. |

| new_password | Max length: 31byte | string | Change a new password. |

| modify_all_chn_pwd |   | bool | Whether to change the passwords of all channels. |

| network_mode | “Dhcp”, ”Static” | string | Network model |

| can_set_netmode |   | bool | The network mode can be selected. |

| main_url | Max length: 120byte | string | URL of the mainstream |

| sub_url | Max length: 120byte | string | URL of the substream |

| connect_method | "General", "Security" | string | When the ONVIF protocol is used, it is used to indicate whether to use normal mode or safe mode to connect the front-end device. |

| base_enc_password |   | Json Object | Encrypted Password |

| hide_network_mode |   | bool | Whether to hide the network mode option. |

| tips_ensure_ip_not_use |   | bool | Whether prompt messages are displayed. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"operation_type": {
			"type": "string",
			"items": [
				"AddOrEditChannel",
				"EditIPCParam",
				"SaveCommonParam",
				"PoeToIpChannel"
			]
		},
		"remove_ipc": {
			"type": "array",
			"min_size": 0,
			"max_size": 16,
			"items": {
				"type": "string",
				"items": [
					"CH1",
					"CH2",
					"CH3",
					"CH4",
					"CH5",
					"CH6",
					"CH7",
					"CH8",
					"CH9",
					"CH10",
					"CH11",
					"CH12",
					"CH13",
					"CH14",
					"CH15",
					"CH16"
				]
			}
		},
		"channel_max": 16,
		"default_password": true,
		"batch_modify_password": true,
		"restore_channel_connect": true,
		"auto_add_ipc_hasCheck": {
			"type": "bool"
		},
		"auto_add_ipc": false,
		"poe_replace_ipc": false,
		"channel_info": {
			"type": "object",
			"items": {
				"CH1": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						},
						"forward_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH2": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH3": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH4": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH5": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						},
						"forward_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH6": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						},
						"forward_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH7": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH8": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH9": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH10": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH11": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						},
						"forward_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH12": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH13": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH14": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH15": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						},
						"forward_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				},
				"CH16": {
					"type": "object",
					"items": {
						"state": {
							"type": "string",
							"items": [
								"NotConfigured",
								"Offline",
								"Online",
								"WeakPassword",
								"NotActivated"
							]
						},
						"ip_address": {
							"type": "string",
							"min_len": 0,
							"max_len": 63
						},
						"subnet_mask": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"subnet_mask_hide": {
							"type": "bool"
						},
						"gateway": {
							"type": "string",
							"min_len": 7,
							"max_len": 15
						},
						"port": {
							"type": "int32",
							"mode": "rw",
							"min": 1,
							"max": 65535,
							"default_value": 9988
						},
						"channel_num": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"channel_index": {
							"type": "int32",
							"min": 0,
							"max": 128
						},
						"protocol": {
							"type": "string",
							"items": [
								"Private",
								"Onvif",
								"RTSP"
							]
						},
						"connect_method": {
							"default": "General",
							"type": "string",
							"mode": "rw",
							"items": [
								"General",
								"Security"
							],
							"default_value": ""
						},
						"username": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"password_empty": {
							"type": "bool"
						},
						"manufacturer": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"device_type": {
							"type": "string",
							"min_len": 0,
							"max_len": 35
						},
						"main_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
						},
						"sub_url": {
							"type": "string",
							"min_len": 0,
							"max_len": 120
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
						"network_mode": {
							"type": "string",
							"items": [
								"Dhcp",
								"Static"
							]
						},
						"web_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						},
						"forward_port": {
							"type": "int32",
							"min": 1,
							"max": 65535
						}
					}
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
