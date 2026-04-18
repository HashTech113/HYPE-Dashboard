# Get

## Function

This API is used to get Channel > OSD page parameters.

## Request Message

None.

Sample:

POST /API/ChannelConfig/OSD/Get HTTP/1.1

{
	"version": "1.0",
	"data": {}
}

## Response Message

See Channel> OSD > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH1": {
				"main_stream_info": {
					"region_id_1": {
						"roi_switch": false,
						"roi_level": "Lowest",
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"main_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"sub_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
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
						"mobile_non_roi_fps": "29",
						"rect": {
							"left": 0,
							"top": 0,
							"width": 0,
							"height": 0
						}
					}
				}
			},
			"CH2": {
				"reason": "Not configured"
			},
			"CH3": {
				"reason": "Not configured"
			},
			"CH4": {
				"reason": "Not configured"
			},
			"CH5": {
				"reason": "Not configured"
			},
			"CH6": {
				"reason": "Not configured"
			},
			"CH7": {
				"reason": "Not configured"
			},
			"CH8": {
				"reason": "Not configured"
			},
			"CH9": {
				"reason": "Not configured"
			},
			"CH10": {
				"reason": "Not configured"
			},
			"CH11": {
				"reason": "Not configured"
			},
			"CH12": {
				"reason": "Not configured"
			},
			"CH13": {
				"reason": "Not configured"
			},
			"CH14": {
				"reason": "Not configured"
			},
			"CH15": {
				"main_stream_info": {
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
			"CH16": {
				"reason": "Not configured"
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
