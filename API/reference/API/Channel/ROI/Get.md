# Get

## Function

This API is used to get Channel > ROI page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/ROI/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel> ROI > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"IP_CH1": {
				"reason": "Not configured"
			},
			"IP_CH2": {
				"main_stream_info": {
					"region_id_1": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_2": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_3": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_4": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_5": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_6": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_7": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_8": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					}
				},
				"sub_stream_info": {
					"region_id_1": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_2": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_3": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_4": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_5": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_6": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_7": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_8": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"sub_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					}
				},
				"mobile_stream_info": {
					"region_id_1": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_2": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_3": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_4": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_5": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_6": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_7": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					},
					"region_id_8": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"mobile_non_roi_fps": "1",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					}
				}
			},
			"IP_CH3": {
				"reason": "Not configured"
			},
			"IP_CH4": {
				"reason": "Not configured"
			},
			"IP_CH5": {
				"reason": "Not configured"
			},
			"IP_CH6": {
				"reason": "Not configured"
			},
			"IP_CH7": {
				"reason": "Not configured"
			},
			"IP_CH8": {
				"reason": "Not configured"
			},
			"IP_CH9": {
				"reason": "Not configured"
			},
			"IP_CH10": {
				"reason": "Not configured"
			},
			"IP_CH11": {
				"reason": "Not configured"
			},
			"IP_CH12": {
				"reason": "Not configured"
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
