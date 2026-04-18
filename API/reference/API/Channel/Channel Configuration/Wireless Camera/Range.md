# Range

## Function

This API is used to get parameter range for Channel  > Wireless Camera page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/WirelessCamera/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON Object | JSON show as follow Table 2 |

| page_type | "ChannelConfig" | string |   |

#### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 3 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | Description |

| channel_name | Max length: 31byte | string | Channel name |

| software_version | Max length: 40byte | string | Wireless channel version number, read only. |

| switch |   | bool | true: enable false: disable This switch can only be turned off. (from true to false) |

| chn_index | "CH1"..."CHx" "IP_CH1"..."IP_CHx" "WIFI_CH1"..."WIFI_CHx" | string |   |

| page | "chn_wireChn" | string |   |

| battery | 0-100 | int | Electrical value |

| post_recording | "Continuous" "10" "20" "30" | string | Recode delay time |

| pair_state | -1 - 7 | int | Matching status of wireless Ipc. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_max": 8,
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
						"software_version": {
							"type": "string",
							"min_len": 0,
							"max_len": 40
						},
						"pair_state": {
							"type": "int32",
							"items": [
								2
							]
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
						"software_version": {
							"type": "string",
							"min_len": 0,
							"max_len": 40
						},
						"pair_state": {
							"type": "int32",
							"items": [
								2
							]
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
						"software_version": {
							"type": "string",
							"min_len": 0,
							"max_len": 40
						},
						"pair_state": {
							"type": "int32",
							"items": [
								2
							]
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
						"software_version": {
							"type": "string",
							"min_len": 0,
							"max_len": 40
						},
						"pair_state": {
							"type": "int32",
							"items": [
								2
							]
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
						"software_version": {
							"type": "string",
							"min_len": 0,
							"max_len": 40
						},
						"pair_state": {
							"type": "int32",
							"items": [
								2
							]
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
						"software_version": {
							"type": "string",
							"min_len": 0,
							"max_len": 40
						},
						"pair_state": {
							"type": "int32",
							"items": [
								3
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
