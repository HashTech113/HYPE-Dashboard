# Change

## Function

This API is used to change the group to which the license plate belongs.

## Request Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Group |   | int | The Id of the face group to be moved to, this field is only available for ChangeGroup |

| PlateInfo |   | JSON array | Add License Plates JSON show as follow Table Table 2 |

Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Id | 1-15 characters | string | Number plate |

Sample:

POST API/AI/Plates/ChangeGroup HTTP/1.1

{
    "version":"1.0",
    "data": {
        "Group": 1,
        "PlateInfo": [
            {
                "Id": "粤CW2763"
            },
            {
                "Id": "粤CK3961"
            }
		]
    }
}

## Response Message

See AI > Recognition > License Plate > Add > Response Message > Table 3for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Count": 2,
        "Result": [
            0,
            0
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
