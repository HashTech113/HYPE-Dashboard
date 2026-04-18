# Range

## Function

This API is used to get parameter range for Channel > Analog Channel page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /ChannelConfig/AnalogChannel/Range HTTP/1.1

{
	"version": "1.0",
	"data": {
		"page_type": "ChannelConfig"
	}
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

| channel_name | Max length: 31byte | string | Channel name |

| switch |   | bool | true: enable false: disable |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_max": 20,
		"channel_info": {
			"type": "object",
			"items": {
				"CH1": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH2": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH3": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH4": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH5": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH6": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH7": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
							"type": "bool"
						}
					}
				},
				"CH8": {
					"type": "object",
					"items": {
						"channel_name": {
							"type": "string",
							"min_len": 0,
							"max_len": 31
						},
						"state": {
							"type": "string",
							"items": [
								"Disable",
								"Enable"
							]
						},
						"switch": {
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
