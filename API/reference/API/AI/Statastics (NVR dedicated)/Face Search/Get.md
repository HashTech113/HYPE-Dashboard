# Get

## Function

This API is used to get face statistics.

## Request Message

Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Which search engine to use, 0 or 1, used with the search interface |

| StartIndex | 0 | int | The starting index of the request, for example, the first time: 0-9999, the second time: 10000-19999, then the StartIndex is 0, 10000 respectively |

| Count |   | int | The number of pieces of face statistical information requested |

Sample:

POST API/AI/FaceStatistics/Get HTTP/1.1

{
	"version":"1.0",
	"data": {
		"MsgId": null,
		"Engine": 0,
		"StartIndex": 0,
		"Count": 10000
	}
}

## Response Message

## Parameter Description

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | See the results AI > Face search > Search >Table 3 |

| channel_max |   | int | Maximum number of channels |

| Count |   | int | Total number of objects for this response |

| Statistics |   | array | Face statistics JSON (show as follow TableTable 3) |

Table 3

| Parameter | Range | Type | Description |

| Group |   | int | The group ID to which the face belongs |

| Time |   | unsigned long long | Unix timestamp such as: 1540444116(When displaying, it will be displayed uniformly according to the UTC time zone, such as: 2020-07-12 00:00:00) |

| Chn |   | int | The channel to which the face belongs |

| StrChn | “CH1”…”CH1x” The number of channels depends on the capabilities of the device. | string | The channel to which the face belongs |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"Count": 10000,
		"Statistics": [
			{
				"Group": 1,
				"Time": 1540444116,
				"Chn": 3,
				"StrChn":"CH4",
			},
			{
				"Group": 3,
				"Time": 1540444119,
				"Chn": 4,
				"StrChn":"CH5",
			},
			{
				...
			},
			...
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
