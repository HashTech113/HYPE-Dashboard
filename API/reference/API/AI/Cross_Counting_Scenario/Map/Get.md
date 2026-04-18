# Get

## Function

This API is used to get AI > Cross Counting Scenario > Map configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| GroupId |   | int | Need to search the group ID of the Map |

Sample:

POST /API/AI/Scenario/CC/MapConfig/Get HTTP/1.1

{
    "data": {
        "GroupId": 0
    }
}

## Response Message

### Parameter Description

Table 2

| Parameter | Range | Type | Description |

| GroupId |   | int | group ID |

| RefWidth | 0~1920 | int | coordinate reference width |

| RefHeight | 0~1080 | int | coordinate reference height |

| CamPos |   | Object array | camera position JSON show as follow Table 3 |

| MapImage | "base64(imgData)" 0~5 * 1024 * 1024 | string | Map image, only supports png/jpg/bmp format |

Table 3

| Parameter | Range | Type | Description |

| ChnId |   | int | channel number |

| XPos |   | int | The X-axis coordinate located in the map |

| YPos |   | int | The Y-axis coordinate on the map |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "RefWidth": 1920,
		"RefHeight": 1080,
		"CamPos": [
            {
                "ChnId": 0,
                "XPos": 362,
                "YPos": 936
            },
            {
                "ChnId": 3,
                "XPos": 1830,
                "YPos": 289
            },
			......
        ],
		"MapImage": "base64"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
