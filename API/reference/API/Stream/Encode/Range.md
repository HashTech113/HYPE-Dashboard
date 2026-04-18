# Range

## Function

This API is used to get parameter range for Stream > Encode page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range , otherwise the request may be rejected by the device.

The following uses the Range request of the MainStream page as an example to describe this API.

## Request Message

None.

Sample:

POST /API/StreamConfig/MainStream/Range HTTP/1.1

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

| channel_max |   | int | Total number of channels on the device. |

| support_copy |   | bool | Whether the page support copy (only for NVR and DVR) |

| analog_max |   | int | Maximum number of analog channels on the device. |

| bandwidth |   | object | Information show as follow Table 8 |

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

| status | "Offline", "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online. |

| resolution | "320 x 240", "640 x 480", "1280x720", "1280x960", "1920x1080", "2304x1296", "2048x1520", "2592x1520"， "2592 x 1944", "3072 x 1728", "3840 x 2160" | string | Resolution The resolution is linked to the frame rate and the bit rate. If one of the values is passed, the other two must be followed by the value. This linkage rule can be broken by passing the device power value breakStreamLinkage. |

| fps |   | int | Frame rate |

| video_encode_type | "H.264",| "H.265"， "H.264+", "H.265+"， “MJPEG” | string | Video coding type |

| bitrate_control | "CBR", "VBR" | string | Stream type |

| video_quality | "Lowest", "Lower", "Low", "Medium", "Higher", "Highest" | string | Image Quality Note: This parameter is supported only when Type is the VBR option. |

| bitrate_mode | "Predefined", "UserDefined" | string | Stream mode |

| bitrate | 8,16,24,32,48,64,80,96, 128,160,192,224,256, 320,384,448,512,640,768, 896,1024,1280,1536,1792,2048, 3072,4096,5120,6144,7168,8192, 10240,12288,16384,100000 | int | Default stream size |

| bitrate_default |   | JSON Object | JSON show as follow Table 5 |

| custom_bitrate |   | int | Custom stream size |

| audio |   | bool | Audio switch. |

| i_frame_interval |   | int | I-frame rate interval |

| i_frame_interval_rate |   | int | The I-frame interval is changed to x times the frame rate |

| etr |   | bool | Dynamic video switch (only for NVR) |

| etr_resolution | "320 x 240", "640 x 480", "1280x720", "1280x960", "1920x1080", "2304x1296", "2048x1520", "2592x1520"， "2592 x 1944", "3072 x 1728", "3840 x 2160" | string | Dynamic video resolution (only for NVR) |

| etr_fps |   | int | The frame rate of dynamic video recording.(only for NVR) |

| etr_bitrate | 8,16,24,32,48,64,80,96, 128,160,192,224,256, 320,384,448,512,640,768, 896,1024,1280,1536,1792,2048, 3072,4096,5120,6144,7168,8192, 10240,12288,16384,100000 | int | Default stream size for motion recording.(only for NVR) |

| etr_custom_bitrate |   | int | Custom stream size for dynamic video recording.(only for NVR) |

| etr_stream_type | “Alarm” | string | Stream type of dynamic video recording.(only for NVR) |

| etr_video_encode_type | "H.264", "H.265"， "H.264+", "H.265+"， “MJPEG” | string | Video encoding type of dynamic recording.(only for NVR) |

| etr_bitrate_control | "CBR", "VBR" | string | Type of dynamic video stream.(only for NVR) |

| etr_video_quality | "Lowest", "Lower", "Low", "Medium", "Higher", "Highest" | string | Image quality of dynamic video recording.(only for NVR) Note: This parameter is supported only when Type is the VBR option. |

| etr_bitrate_mode | "Predefined", "UserDefined" | string | Stream mode of dynamic video recording.(only for NVR) |

| etr_audio |   | bool | Audio switch.(only for NVR) |

| etr_i_frame_interval |   | string | I-frame rate interval of dynamic video recording.(only for NVR) |

| copy_ch | "digit", "analog", "wifi" | string | Flag that supports channel replication.(only for NVR, DVR) |

| enable_stream |   | bool | Mobile stream or fourth stream - switch. |

| video_encode_level | “Baseline”, “MainProfile”, “HighProfile” | string | Video coding level (IPC only) Note: H265 only has MainProfile. |

| resolution_mode | “SUPPORT_D1”, “SUPPORT_960H“, “SUPPORT_720P“, “SUPPORT_1080P“, “SUPPORT_3W“, “SUPPORT_720PCIF“, “SUPPORT_4W“, “SUPPORT_3W_TVI“, “SUPPORT_5W“, “SUPPORT_8W“, “SUPPORT_3W_HALF“, “SUPPORT_4W_HALF“, “SUPPORT_5W_HALF“, “SUPPORT_8WV2“, “SUPPORT_8WCVI“, | string | Simulated gun mode. Copy can be performed only when the mode is consistent. Digital channels are not supported. |

| rtsp_enable |   | bool | Determine the ipc parameters of the Rtsp protocol online and set them to grey. |

| video_encode_type_resolution_range |   | string | Resolution range |

| codeparam_setting_notice | "noticeRule_1", "noticeRule_2" | string | Two rules indicate whether to prompt a restart |

#### Table 5

| Parameter | Range | Type | Description |

| “1280 * 720” |   | JSON Object | Resolution value，JSON show as Table 6 |

| ... |   | JSON Object | Resolution value，JSON show as Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| “1” |   | JSON Object | Frame rate value，JSON show as Table 7 |

| ... |   | JSON Object | Frame rate value，JSON show as Table 7 |

#### Table 7

| Parameter | Range | Type | Description |

| default_value | 256,320,384,448,512,640,768, 896,1024,1280,1536,1792,2048, 3072,4096,5120,6144,8192 | int | Each fps corresponds to one bitrate default value. |

#### Table 8

| Parameter | Range | Type | Description |

| total_bandwidth |   | int | Total bandwidth (unit: kpbs) |

| remaining_bandwidth |   | int | Remaining available bandwidth (unit: kpbs) |

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
