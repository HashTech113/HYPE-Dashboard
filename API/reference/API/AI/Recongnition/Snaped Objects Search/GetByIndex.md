# GetByIndex

## Function

This API is used to match AI > Recognition > SnapedObjects snapshot object ID.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Which search engine, 0 or 1, to use with the search interface |

| StartIndex |   | int | The starting index of the request, for example, the first time: 0-19, the second time: 20-39, the StartIndex is 0, 20, and only GetByIndex has this field |

| Count |   | int | The requested number of passenger-vehicle information, only GetByIndex has this field |

| SimpleInfo | 1 | int | Get short information, or complete information. 1- Abbreviated information,0- full information, abbreviated information contains only UUId, only GetByIndex has this field |

| UUIds | [103, 105, 190, 129] | array | The unique identification of the capture information to be obtained, only GetById has this field |

| WithObjectImage | 1 | int | Whether a picture of an object (such as a pedestrian, a car) is required, 1- Yes, 0- No |

| WithBackgroud | 0 | int | Do you need a background image? 1- Yes, 0- No |

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/SnapedObjects/GetByIndex HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Engine": 0,
		"StartIndex": 0,
		"Count": 20,
		"SimpleInfo": 1，
		"WithObjectImage": 0,
		"WithBackgroud": 0
	}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0 | int | See the resultAI > Recognition > SnapedObjects > Search > Parameter Description > Table x |

| TotalCount |   | int | The total number of objects searched, only GetByIndex has this field |

| Count |   | int | The total number of objects in this response |

| SnapedObjInfo |   | array | SnapedObjects JSON show as follow Table 3 |

Table 3
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|UUId||		string|	Unique Id of the captured object. You can use this ID to obtain detailed information about the object  |
|Chn||		int	|passage  |
|StrChn|	“CH1”…”CH1x”
“IP_CH1”…” IP_CH1x”
“WIFI_CH1”…” WIFI_CH1x”
The number of channels depends on the capability of the device.| 	string|	passage  |
|StartTime	||	unsigned long long	|Unix timestamp, such as 1540444116  |
|EndTime	||	unsigned long long	|Unix timestamp, such as 1540444116  |
|ObjectImage|	"base64(imgData)"	|string	|The front IPC sent to capture the picture of people and cars  |
|Background	|"base64(imgData)"|	string	|Captured background image from the front-end IPC  |
|SnapId	||	unsigned int|	The Id of the picture taken by the front-end IPC  |
|Type	|1	|int|	The type of the captured object, such as: 0-face, 1-humanoid, 2-model, 3-PID humanoid, 4-PID model, 5-LCD humanoid, 6-LCD model 	|

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"TotalCount": 600,
		"Count": 20,
		"SnapedObjInfo": [
			{
				"UUId": 103,
				"Chn": 3,
				"StrChn":"CH4",
				"StartTime": 1540444116,
				"EndTime": 1540444137,
				"ObjectImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"SnapId": 2375,
				"Type": 1
			},
			{
				"UUId": 105,
				"Chn": 6,
				"StrChn":"CH7",
				"StartTime": 1540444116,
				"EndTime": 1540444139,
				"ObjectImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"SnapId": 2375,
				"Type": 2
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
