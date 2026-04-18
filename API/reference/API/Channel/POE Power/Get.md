# Get

## Function

This API is used to get Channel > POE Power page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/PoePower/Get HTTP/1.1

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

| actual_power |   | string | Used power |

| surplus_power |   | string | Surplus power |

| total_power |   | string | Total power |

| channel_min_power |   | string | Minimum power per channel. |

| channel_max_power |   | string | Maximum power per channel. |

| channel_max |   | int | Channel total |

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

| channel_current_power | Max length: 7byte | string | Power used by the current channel. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH1": {
				"channel_current_power": "3.05"
			},
			"CH2": {
				"channel_current_power": "2.39"
			},
			"CH3": {
				"channel_current_power": "3.49"
			},
			"CH4": {
				"channel_current_power": "3.61"
			},
			"CH5": {
				"channel_current_power": "3.91"
			},
			"CH6": {
				"channel_current_power": "3.19"
			},
			"CH7": {
				"channel_current_power": "2.39"
			},
			"CH8": {
				"channel_current_power": "3.94"
			},
			"CH9": {
				"channel_current_power": "0.00"
			},
			"CH10": {
				"channel_current_power": "2.75"
			},
			"CH11": {
				"channel_current_power": "4.44"
			},
			"CH12": {
				"channel_current_power": "3.55"
			},
			"CH13": {
				"channel_current_power": "1.54"
			},
			"CH14": {
				"channel_current_power": "2.51"
			},
			"CH15": {
				"channel_current_power": "3.40"
			},
			"CH16": {
				"channel_current_power": "1.92"
			}
		},
		"actual_power": "46.08",
		"surplus_power": "109.92",
		"channel_min_power": "0",
		"channel_max_power": "30",
		"total_power": "156"
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
