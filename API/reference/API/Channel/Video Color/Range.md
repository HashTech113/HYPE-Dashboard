# Range

## Function

This API is used to get parameter range for Channel  > Video Color page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/Color/Range HTTP/1.1

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

| hue | 0-255 | int | Hue |

| bright | 0-255 | int | Bright |

| contrast | 0-255 | int | Contrast |

| saturation | 0-255 | int | Saturation |

| sharpness | 0-255 | int | Sharpness |

| support_default |   | bool | Whether to restore the default value. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_max": 16,
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
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
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH9": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH10": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH11": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH12": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH13": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH14": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH15": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				},
				"CH16": {
					"type": "object",
					"items": {
						"status": {
							"description": "Only offline channel has this variable.",
							"type": "string",
							"mode": "r",
							"items": [
								"Off-line",
								"On-line"
							]
						},
						"hue": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"sharpness": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"bright": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"contrast": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"saturation": {
							"type": "int32",
							"min": 0,
							"max": 255
						},
						"support_default": {
							"type": "bool"
						}
					}
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
