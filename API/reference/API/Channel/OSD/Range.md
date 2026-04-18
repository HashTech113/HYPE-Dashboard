# Range

## Function

This API is used to get parameter range for Channel  > OSD page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/OSD/Range HTTP/1.1

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

| name |   | JSON Object | JSON show as follow Table 5 |

| datetime |   | JSON Object | JSON show as follow Table 6 |

| alarm |   | JSON Object | JSON show as follow Table 7 |

| covert |   | bool | Preview switch (NVR/DVR only) |

| refresh_rate | "50Hz", "60Hz" | string | Refresh frequency. Note: Analog channels are not supported. |

| alpha | 1-128 | int | OSD transparency Note: Analog channels are not supported. |

| camera_type | "AUTO" "AHD" "TVI" "CVI" | string | Image Type (dvr specific). |

| eq_level | "AUTO" "1(0~50m)" "2(50~150m)" "3(150~250m)" "4(250~350m)" "5(350~450m)" | string | EQ rating (dvr only). |

| opy_ch | "digit" "analog" "wifi" | string | Support channel replication logo (NVR, DVR special). |

| channel_enable |   | bool | Check whether the parameters of the current channel can be configured. |

| osd_invert |   | bool | OSD Reverse color switch. |

#### Table 5

| Parameter | Range | Type | Description |

| show |   | bool | OSD Specifies whether to display the channel name. |

| text | Max length: 31byte | string | OSD text (DVR/NVR/IPC). |

| pos |   | JSON array | JSON show as follow Table 8 |

#### Table 6

| Parameter | Range | Type | Description |

| show |   | bool | Whether the video window displays a date. |

| date_format | "MM/DD/YYYY", "YYYY-MM-DD", "DD/MM/YYYY" | string | Date Format Note: Analog channels are not supported. |

| time_format | 24,12 | int | Time mode, unit: hour Note: Analog channel is not supported. |

| time |   | int | Current board time. |

| pos |   | JSON array | JSON show as follow Table 8 |

#### Table 7

| Parameter | Range | Type | Description |

| show |   | bool | Alarm Pos Specifies whether to support mobile. |

| text | Max length: 31byte | string | Alarm OSD text. The maximum value of the IPC is 32 bytes. |

| pos |   | JSON array | JSON show as follow Table 8 |

#### Table 8

| Parameter | Range | Type | Description |

| x | [0-704] | int | x Coordinate |

| y | [0-576] | int | y Coordinate |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"default_timeout": 30000,
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"text": {
									"type": "string",
									"min_len": 1,
									"max_len": 31,
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": false
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"alarm": {
							"type": "object",
							"items": {
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
							]
						},
						"osd_invert": {
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
								"Offline",
								"Online"
							]
						},
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"text": {
									"type": "string",
									"min_len": 1,
									"max_len": 31,
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": false
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
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
								"Offline",
								"Online"
							]
						},
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"text": {
									"type": "string",
									"min_len": 1,
									"max_len": 31,
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": false
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"alarm": {
							"type": "object",
							"items": {
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
							]
						},
						"osd_invert": {
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
								"Offline",
								"Online"
							]
						},
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"text": {
									"type": "string",
									"min_len": 0,
									"max_len": 31,
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": true
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": true
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": true
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"text": {
									"type": "string",
									"min_len": 1,
									"max_len": 31,
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": false
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"alarm": {
							"type": "object",
							"items": {
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
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
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"text": {
									"type": "string",
									"min_len": 1,
									"max_len": 31,
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": false
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"alarm": {
							"type": "object",
							"items": {
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
							]
						},
						"osd_invert": {
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
								"Offline",
								"Online"
							]
						},
						"channel_enable": {
							"type": "bool"
						},
						"name": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"text": {
									"type": "string",
									"min_len": 1,
									"max_len": 31,
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"datetime": {
							"type": "object",
							"items": {
								"show": {
									"type": "bool",
									"disable": false
								},
								"date_format": {
									"type": "string",
									"items": [
										"MM/DD/YYYY",
										"YYYY-MM-DD",
										"DD/MM/YYYY"
									],
									"disable": false
								},
								"time_format": {
									"type": "int32",
									"unit": "hour",
									"items": [
										24,
										12
									],
									"disable": false
								},
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"alarm": {
							"type": "object",
							"items": {
								"pos": {
									"type": "object",
									"items": {
										"x": {
											"type": "int32",
											"min": 0,
											"max": 704
										},
										"y": {
											"type": "int32",
											"min": 0,
											"max": 576
										}
									}
								}
							}
						},
						"covert": {
							"type": "bool"
						},
						"refresh_rate": {
							"type": "string",
							"items": [
								"50Hz",
								"60Hz"
							]
						},
						"osd_invert": {
							"type": "bool"
						},
						"flickerless_switch": {
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
