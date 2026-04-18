# Range

## Function

This API is used to get parameter range for Channel  > PTZ page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/PTZ/Range HTTP/1.1

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

| channel_info |   | JSON Object | Channel Information JSON show as follow Table 3 |

| channel_max |   | int | Maximum number of channels. |

| support_copy |   | bool | Page support copy (NVR, DVR dedicated). |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| status | "Offline", "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online. |

| signal_type | “Analog” “Digital” | string | Signal type. |

| protocol | "PelcoD", "PelcoP", "COAX1", "COAX2" | string | PTZ protocol. |

| baudrate | "1200", "2400", "4800", "9600" | string | Baud rate. |

| databit | "8", "7", "6", "5" | string | Data bit. |

| stopbit | "1", "2" | string | Stop bit. |

| parity | "None", "Odd", "Even", "Mark", "Space" | string | Parity check bit. |

| address | 1-255. | int | Address code |

| copy_ch | "digit" "analog" "wifi" | string | Support channel replication logo (only for NVR, DVR) |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_max": 20,
		"support_copy": true,
		"channel_info": {
			"type": "object",
			"items": {
				"CH1": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH2": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH3": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH4": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH5": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH6": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH7": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				},
				"CH8": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Offline",
								"Online"
							]
						},
						"signal_type": {
							"type": "string",
							"items": [
								"Analog"
							]
						},
						"protocol": {
							"type": "string",
							"items": [
								"Pelco-D",
								"Pelco-P",
								"COAX1",
								"COAX2"
							]
						},
						"baudrate": {
							"type": "string",
							"items": [
								"1200",
								"2400",
								"4800",
								"9600"
							]
						},
						"databit": {
							"type": "string",
							"items": [
								"8",
								"7",
								"6",
								"5"
							]
						},
						"stopbit": {
							"type": "string",
							"items": [
								"1",
								"2"
							]
						},
						"parity": {
							"type": "string",
							"items": [
								"None",
								"Odd",
								"Even",
								"Mark",
								"Space"
							]
						},
						"address": {
							"type": "int32",
							"min": 1,
							"max": 255
						},
						"copy_ch": {
							"type": "string",
							"items": [
								"digit",
								"analog",
								"wifi",
								"local",
								"all"
							]
						},
						"ptz_disable": {
							"type": "string",
							"items": [
								"protocol",
								"baudrate",
								"databit",
								"stopbit",
								"parity",
								"address",
								"focus_mode",
								"zoom_status",
								"pan_tilt_status",
								"preset_status",
								"min_focus_distance"
							]
						}
					}
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
