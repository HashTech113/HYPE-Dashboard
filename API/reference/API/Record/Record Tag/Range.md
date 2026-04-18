# Range

## Function

This API is used to get parameter range for Record >  Record Tag page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST API/Playback/Tag/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1 (Search Request JSON)

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. |

| start_date |   | string | Search startdate. The date format is MM/DD/YYYY |

| end_date |   | string | Search end date. The date format is MM/DD/YYYY |

| start_time |   | string | Search start time. The time format is hh:mm:ss |

| end_time |   | string | Search start time. The time format is hh:mm:ss |

| Keyword | 0-39 | string | When you search for tags, you only search for tags that contain keywords |

#### Table 2 (Response Information JSON)

| Parameter | Range | Type | Description |

| Pre-play |   | string | Start playing the video with the label time forward ("5s")("10s")("30s")("1Min")("2Min")("5Min")("10Min"). |

| Post-play |   | string | Play the recording at the end of the tag time ("5s")("10s")("30s")("1Min")("2Min")("5Min")("10Min"). |

| all_tag_info |   | json | show as follow Table 3 |

| all_tag_num | 0-5000 | int | How many matching tags are found. |

#### Table 3 (all_tag_info Information JSON)

| Parameter | Range | Type | Description |

| Tag_date |   | string | The date format is MM/DD/YYYY. |

| Tag_time |   | string | The time format is hh:mm:ss. |

| channel |   | string | The channel to which the label belongs. |

| chNum |   | int | Channel number |

| label_id |   | int | Tag ID |

| record_id |   | int | Record ID |

| Tag_name | 0-39 | string | Tag name |

#### Table 4 (Add Tag Information JSON)

| Parameter | Range | Type | Description |

| Tag_date |   | string | The date format is MM/DD/YYYY. |

| Tag_time |   | string | The time format is hh:mm:ss. |

| channel |   | string array | The channel to which the label belongs. |

| chNum |   | int | Channel number |

| label_id |   | int | Tag ID |

| record_id |   | int | Record ID |

| Tag_name | 0-39 | string | Tag name |

| operate | 0-2 | int | 0- Set, 1- Delete, 2- Change the name |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"version": "1.0",
	"result": "success",
	"data": {
		"start_date": {
			"description": "The date format is MM/DD/YYYY",
			"type": "string",
			"len": 10
		},
		"end_date": {
			"description": "The date format is MM/DD/YYYY",
			"type": "string",
			"len": 10
		},
		"start_time": {
			"description": "The time format is hh:mm:ss",
			"type": "string",
			"len": 8
		},
		"end_time": {
			"description": "The time format is hh:mm:ss",
			"type": "string",
			"len": 8
		},
		"Keyword": {
			"type": "string",
			"min_len": 0,
			"max_len": 20
		},
		"all_tag_num": {
			"type": "int32",
			"min": 0,
			"max": 5000
		},
		"all_tag_info": {
			"type": "array",
			"min_size": 0,
			"max_size": 5000,
			"items": []
		},
		"Pre-play": {
			"type": "string",
			"items": [
				"5s",
				"10s",
				"30s",
				"1Min",
				"2Min",
				"5Min",
				"10Min"
			]
		},
		"Post-play": {
			"type": "string",
			"items": [
				"5s",
				"10s",
				"30s",
				"1Min",
				"2Min",
				"5Min",
				"10Min"
			]
		},
		"date": "06/29/2023",
		"time": "13:19:40",
		"Tag_name": {
			"default": "Tag",
			"type": "string",
			"mode": "rw",
			"min_len": 1,
			"max_len": 39
		},
		"tag": {
			"type": "object",
			"items": {
				"channel": {
					"type": "string",
					"items": [
						"CH1",
						"CH2",
						"CH3",
						"CH4",
						"CH5",
						"CH6",
						"CH7",
						"CH8",
						"CH9",
						"CH10",
						"CH11",
						"CH12",
						"CH13",
						"CH14",
						"CH15",
						"CH16"
					]
				}
			}
		}
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
