# Set

## Function

This API is used to set Channel > ROI page parameters.

## Request Message

See Channel > ROI > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ChannelConfig/ROI/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"main_stream_info": {
					"region_id_1": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						},
						"regionID_index": "region_id_1",
						"chn_index": "CH1",
						"page": "chn_roi",
						"stream_index": "main_stream_info"
					},
					"region_id_2": {
						"roi_switch": false,
						"roi_level": "Lowest",
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
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					}
				}
			},
			"CH3": {
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
			}
		}
	}
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
