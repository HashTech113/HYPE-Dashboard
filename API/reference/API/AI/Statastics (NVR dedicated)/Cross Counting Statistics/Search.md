# Search

## Function

This API is used to search CC statistics.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Engine | 0 | int | Which search engine to use, 0 or 1, used in conjunction with the search interface |

| StartTime |   | string | Start time like:"2020-07-12 00:00:00" |

| EndTime |   | string | End time such as:"2020-07-12 23:59:59" |

| Chn | [0, 1, 2, 3, 4, 5, 6, 7, 8] | array | The channel to search, the value represents the channel |

| Group | [1, 2, 5, 9, 13….] | array | The group to search, the value represents the group Id of the selected group, if it is empty, search all (including deleted groups) |

Sample:

POST API/AI/CCStatistics/Search HTTP/1.1

{
    "version": "1.0",
    "data": {
        "MsgId": "",
        "Engine": 1,
        "StartTime": "2023-07-20  00:00:00",
        "EndTime": "2023-07-20  23:59:59",
        "Chn": [0],
        "Group": [
            2,
            3,
            4
        ]
    }
}

## Response Message

## Parameter Description

See Table 1

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{"data": {
    "MsgId": "",
    "Result": 0,
    "Count": 0,
    "channel_max": 1
}}

## Error Code

See Response Messages Body and Common error_code for more information.
