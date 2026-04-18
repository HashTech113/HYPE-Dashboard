# Get

## Function

This API is used to get month playback data for a specified date.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x”, “IP_CH1”…” IP_CH1x”, “WIFI_CH1”…” WIFI_CH1x”, The number of channels depends on the capabilities of the device | string array | Each array bit represents a channel with a string. (An empty array means that all channels are searched) |

| search_type | "Record", "Picture", "FD", "PVD", "PidLcd", "Repeat", "FaceAttendance" | string | Monthly search type |

| start_date |   | string | Search startdate. The date format is MM/DD/YYYY |

| stream_type | "Mainstream", "Substream" | string | Stream type |

Sample:

POST /API/Playback/SearchMonth/Get HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel": [],
		"stream_type": "Substream",
		"start_date": "05/31/2023",
		"search_type": "Record"
	}
}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| is_has_rec |   | int array |   |

| record_type |   | int array |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"version": "1.0",
	"result": "success",
	"data": {
		"is_has_rec": [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		],
		"record_type": [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
