# Set

## Function

This API is used to set AI > Cross Counting Scenario > Map configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| GroupId |   | int | group ID |

| RefWidth | 0~1920 | int | coordinate reference width |

| RefHeight | 0~1080 | int | coordinate reference height |

| CamPos |   | Object array | camera position JSON show as follow Table 2 |

| MapImage | "base64(imgData)" 0~5 * 1024 * 1024 | string | Map image, only supports png/jpg/bmp format |

Table 2

| Parameter | Range | Type | Description |

| ChnId |   | int | channel number |

| XPos |   | int | The X-axis coordinate located in the map |

| YPos |   | int | The Y-axis coordinate on the map |

Sample:

POST /API/AI/Scenario/CC/MapConfig/Set HTTP/1.1

{
    "data": {
        "GroupId": 0,
        "RefWidth": 1920,
        "RefHeight": 1080,
        "CamPos": [
            {
                "ChnId": 0,
                "XPos": 100,
                "YPos": 100
            },
            {
                "ChnId": 2,
                "XPos": 100,
                "YPos": 100
            }
        ],
		"MapImage": "base64"	//(选填)
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
