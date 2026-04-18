# Get

## Function

This API is used to get parameter for Stream > Rtsp Url page.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. |

Sample:

POST /API/Preview/StreamUrl/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON Object | Channel Information JSON show as follow Table 3 |

#### Table 3

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” | string | Channel number |

| mainstream_url | Max length: 63 byte | string | MainStream URL |

| substream_url | Max length: 63 byte | string | SubStream URL |

| mobilestream_url | Max length: 63 byte | string | MobileStream URL |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {
		"channel_info": [
			{
				"channel": "CH1",
				"mainstream_url": "rtsp://172.16.10.169:80/rtsp/streaming?channel=1&subtype=0",
				"substream_url": "rtsp://172.16.10.169:80/rtsp/streaming?channel=1&subtype=1"
			},
			{
				"channel": "IP_CH1",
				"mainstream_url": "rtsp://172.16.10.169:80/rtsp/streaming?channel=17&subtype=0",
				"substream_url": "rtsp://172.16.10.169:80/rtsp/streaming?channel=17&subtype=1",
				"mobile_stream_url": "rtsp://172.16.10.169:80/rtsp/streaming?channel=17&subtype=2"
			}
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
