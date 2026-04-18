# Modify

## Function

This API is used to modify the AI > Recognition > PlateGroup license plate group.

## Request Message

### Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId	|null|||

|Group	||	array	|Add License Plate Group JSON show as followAI > Recognition > PlateGroup > Get > Parameter Description > Table 2|

Sample:

POST /API/AI/Faces/Modify HTTP/1.1

{
    "data": {
        "Group": [
            {
                "Id": 7,
                "Name": "测试组1",
                "Policy": 0,
                "DetectType": 2,
                "Similarity": 1,
                "CanDel": 1,
                "Enabled": 1,
                "EnableAlarm": 1,
				"PolicyConfigs": [...],
				"EnableChnAlarm": [...],
				"AlarmOut": {...}
            },
			{
                "Id": 8,
                "Name": "测试组2",
                "Policy": 0,
                "DetectType": 2,
                "Similarity": 1,
                "CanDel": 1,
                "Enabled": 1,
                "EnableAlarm": 1,
				"PolicyConfigs": [...],
				"EnableChnAlarm": [...],
				"AlarmOut": {...}
            }
		]
	}
}

## Response Message

## Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result |   | integer array | Return result or error code seeAI > Recognition > PlateGroup > Get > Parameter Description > Table 3 |

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Result": [
            0,
            0
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
