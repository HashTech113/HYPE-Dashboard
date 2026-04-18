# Add

## Function

This API is used to add a AI > Recognition > PlateGroup license plate group.

## Request Message

### Parameter Description

Table 1
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId	|null		|||
|Id	||	int	|The license plate group Id is not specified when adding|
|Name	||	string	|License plate group name|
|DetectType	|2	|int	|Detection type
enum DLDetectType
{
DLDT_Face,
DLDT_Object,
DLDT_Plate,
DLDT_All
};
The number Plate group is fixed as 2(DLDT Plate), and the modification is invalid|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/PlateGroup/Add HTTP/1.1

{
	"data": {
        "Group": [
			{
                "Name": "Test Group 1"
            },
            {
                "Name": "Test Group 2"
            }
       ]
	}
}

## Response Message

See AI > Recognition > PlateGroup > Get > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "data": {
        "Result": [
            0,
            0
        ],
        "Group": [
            {
                "Id": 7,
                "Name": "Test Group 1",
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
                "Name": "Test Group 2",
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

## Error Code

See Response Messages Body and Common error_code for more information.
