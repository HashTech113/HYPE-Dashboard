# Get

## Function

This API is used to get parameter for System > Channel Information page.

## Request Message

None.

Sample:

POST /API/SystemInfo/Channel/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | Json Object | Single Channel Information JSON show as follow Table 2 |

| channel_max |   | int | Maximum number of channels |

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

| channel |   | string | Channel number |

| alias |   | string | IP Camera alias. |

| state | "Offline", "Online" | string | IP Camera connection status. |

| mainstream | "Resolution", FrameRate", "Bitrate" | string | IP Camera's mainstream information. |

| substream | Same as "mainstream" field | string | IP Camera's mobile stream information. |

| mobile_stream | Same as "mainstream" field | string | IP Camera's substream information. |

| motion_detection | "Support", "Nonsupport" | string | Motion Detection. |

| privacy_zone | "Support", " Nonsupport" | string | Privacy Zone. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": {
			"CH5": {
				"alias": "CH5",
				"state": "Offline"
			},
			"CH6": {
				"alias": "CH6",
				"state": "Offline"
			},
			"CH7": {
				"alias": "CH7",
				"state": "Offline"
			},
			"CH8": {
				"alias": "CH8",
				"state": "Online",
				"mainstream": "1920x1080, 30Fps, 2Mbps",
				"substream": "1280x720, 25Fps, 1024Kbps",
				"mobile_stream": "640x480, 30Fps, 512Kbps",
				"motion_detection": "Support",
				"privacy_zone": "Support"
			},
			"CH11": {
				"alias": "CH11",
				"state": "Offline"
			},
			"CH14": {
				"alias": "CH14",
				"state": "Online",
				"mainstream": "1920x1080, 25Fps, 1024Kbps",
				"substream": "1280x720, 25Fps, 1024Kbps",
				"mobile_stream": "640x480, 25Fps, 512Kbps",
				"motion_detection": "Support",
				"privacy_zone": "Support"
			},
			"CH15": {
				"alias": "CH15",
				"state": "Online",
				"mainstream": "2560x1440, 25Fps, 4Mbps",
				"substream": "1280x720, 25Fps, 1024Kbps",
				"mobile_stream": "640x480, 25Fps, 512Kbps",
				"motion_detection": "Support",
				"privacy_zone": "Support"
			},
			"CH16": {
				"alias": "CH16",
				"state": "Offline"
			}
		},
		"channel_max": 16
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
