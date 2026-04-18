# Range

## Function

This API is used to get parameter range for Channel  > ROI page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/ROI/Range HTTP/1.1

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

| channel_info |   | Json Object | JSON shows as follow Table 3 |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON shows as follow Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| main_stream_info |   | Json Object | JSON shows as follow Table 5 |

| sub_stream_info |   | Json Object | JSON shows as follow Table 5 |

| mobile_stream_info |   | Json Object | JSON shows as follow Table 5 |

#### Table 5

| Parameter | Range | Type | Description |

| region_id_1 |   | Json Object | JSON shows as follow Table 6 |

| … |   | Json Object |   |

| region_id_8 |   | Json Object |   |

#### Table 6

| Parameter | Range | Type | Description |

| roi_switch |   | bool | ROI Enable |

| roi_level | “Lowest”, "Lower" "Low", "Medium" "Higher", "Highest" | string | ROI Level |

| main_non_roi_fps |   | string | Non ROI Zone Fps |

| rect |   | Json Object | ROI Zone Rection JSON shows as follow Table 9 |

#### Table 7

| Parameter | Range | Type | Description |

| roi_switch |   | bool | ROI Enable |

| roi_level | “Lowest”, "Lower" "Low", "Medium" "Higher", "Highest" | string | ROI Level |

| sub_non_roi_fps |   | string | Non ROI Zone Fps |

| rect |   | Json Object | ROI Zone Rection JSON shows as follow Table 9 |

#### Table 8

| Parameter | Range | Type | Description |

| roi_switch |   | bool | ROI Enable |

| roi_level | “Lowest”, "Lower" "Low", "Medium" "Higher", "Highest" | string | ROI Level |

| mobile_non_roi_fps |   | string | Non ROI Zone Fps |

| rect |   | Json Object | ROI Zone Rection JSON shows as follow Table 9 |

#### Table 9

| Parameter | Range | Type | Description |

| left | 0-704 | int | Left |

| top | 0-576 | int | Top |

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
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						}
					}
				},
				"CH2": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						}
					}
				},
				"CH3": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH4": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH5": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								}
							}
						}
					}
				},
				"CH6": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						}
					}
				},
				"CH7": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH8": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH9": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH10": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9"
											]
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
								}
							}
						}
					}
				},
				"CH11": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						}
					}
				},
				"CH12": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH13": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": []
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
								}
							}
						}
					}
				},
				"CH14": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								}
							}
						},
						"mobile_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"mobile_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24"
											]
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
								}
							}
						}
					}
				},
				"CH15": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12",
												"13",
												"14",
												"15",
												"16",
												"17",
												"18",
												"19",
												"20",
												"21",
												"22",
												"23",
												"24",
												"25",
												"26",
												"27",
												"28",
												"29"
											]
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
								}
							}
						}
					}
				},
				"CH16": {
					"type": "object",
					"items": {
						"main_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"main_non_roi_fps": {
											"type": "string",
											"items": [
												"1",
												"2",
												"3",
												"4",
												"5",
												"6",
												"7",
												"8",
												"9",
												"10",
												"11",
												"12"
											]
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
								}
							}
						},
						"sub_stream_info": {
							"type": "object",
							"items": {
								"region_id_1": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_2": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_3": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_4": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_5": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_6": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_7": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								},
								"region_id_8": {
									"type": "object",
									"items": {
										"roi_switch": {
											"type": "bool"
										},
										"roi_level": {
											"type": "string",
											"items": [
												"Lowest",
												"Lower",
												"Low",
												"Medium",
												"Higher",
												"Highest"
											]
										},
										"sub_non_roi_fps": {
											"type": "string",
											"items": [
												"1"
											]
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
								}
							}
						}
					}
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
