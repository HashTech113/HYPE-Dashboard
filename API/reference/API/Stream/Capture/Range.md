# Range

## Function

This API is used to get parameter range for Stream > Capture page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range , otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/StreamConfig/Capture/Range HTTP/1.1

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

| CH1 |   | Json Object | Information show as follow Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| auto_capture | false:off, true:on | bool | Automatic capture switch |

| stream_type | "Mainstream", "Substream" | string | Stream type |

| normal_interval | 5,10,30,60,600,1800,3600 | int | Normal Image capture interval Unit: Second |

| alarm_interval | Same as normal_interval field | int | Parameter Description Value Alarm Indicates the alarm type capture interval. Unit: Second |

| alarm_resolution |   | string | Picture resolution |

| alarm_quality | “Highest", "Higher", "Medium", "Low", "Lower", "Lowest" | string | Picture quality |

| copy_ch | "digit", "analog", "wifi" | string | Support channel replication logo (noly for NVR, DVR) |

#### Table 5

| Parameter | Range | Type | Description |

| auto_capture_used | 0~MAX_PARA_CHN_NUM | array | Id of the channel where the automatic capture function is enabled. |

| max_auto_capture_num | 16 | int | The maximum number of open channels supported by automatic capture. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_max": 16,
		"support_copy": true,
		"channel_info": {
			"type": "object",
			"items": {
				"CH1": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
						},
						"anr": {
							"type": "bool"
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
						}
					}
				},
				"CH2": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH3": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH4": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH5": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH6": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH7": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH8": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH9": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH10": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH11": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH12": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH13": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH14": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH15": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				},
				"CH16": {
					"type": "object",
					"items": {
						"record_switch": {
							"type": "bool"
						},
						"stream_mode": {
							"type": "string",
							"items": [
								"Mainstream",
								"DualStream"
							]
						},
						"prerecord": {
							"type": "bool"
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
						}
					}
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
