# Range

## Function

This API is used to get parameter range for Channel  > Video Cover page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/VideoCover/Range HTTP/1.1

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

| channel_max |   | Int | Maximum number of channels |

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

| privacy_zone_enable |   | Bool | Video block switch. |

| zone_info_p |   | JSON array | JSON show as follow Table 5 Note: The onvif protocol supports up to four occlusion areas. |

| copy_ch | "digit""analog""wifi" | string | Support channel replication logo (NVR, DVR special). |

#### Table 5

| Parameter | Range | Type | Description |

| zone_no | 1-8 | int | Occluded area number. |

| zone_enable |   | bool | Occluded area switch. |

| point |   | JSON array | JSON show as follow Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| left | 0-704 | int | X Coordinate |

| top | 0-576 | int | Y Coordinate |

| width | 0-704 | int | Width |

| height | 0-576 | int | Height |

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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 6,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 5,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 6,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 6,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 5,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 6,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
							]
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
								"Offline",
								"Online"
							]
						},
						"privacy_zone_enable": {
							"type": "bool"
						},
						"zone_info": {
							"type": "array",
							"min_size": 0,
							"max_size": 4,
							"items": [
								{
									"zone_no": 1,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 2,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 3,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								},
								{
									"zone_no": 4,
									"zone_enable": {
										"type": "bool"
									},
									"rect": {
										"type": "object",
										"items": {
											"left": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"top": {
												"type": "int32",
												"min": 0,
												"max": 576
											},
											"width": {
												"type": "int32",
												"min": 0,
												"max": 704
											},
											"height": {
												"type": "int32",
												"min": 0,
												"max": 576
											}
										}
									}
								}
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
