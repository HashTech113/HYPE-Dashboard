# Add

## Function

This API is used to add AI > Recognition > FDGroup page parameters.

## Request Message

### Parameter Description

Table 3
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Group||array|Add Face Group JSON show as followTable 4|

Table 4
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|MsgId|null|||

|Id||int|Face group Id, add without giving|
|Name||string|Face group name, add without giving|
|DetectType|0|int|To detect the type and add a face group, just give the DetectType field, 0-DLDT_Face, 1-DLDT_Car|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

POST /API/AI/FDGroup/Add HTTP/1.1

{
	"data": {
		"MsgId": null,
		"Group": [
			{
				"DetectType": 0
			}
		]
	}
}

## Response Message

See AI > Recognition > FDGroup > Get > Parameter Description > Table 2for parameter descriptions.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0,
		"Count": 5,
		"Group": [
			{
				"Id": 2,
				"Name": "Block List",
				"DetectType": 0,
				"Policy": 0,
				"Enabled": 1,
				"CanDel": 0,
				"Similarity": 70,
				"PolicyConfigs": [
					{
						"ChnAlarmOut": [
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							...
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ]
						  ],
						  "ChnBuzzerOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "LatchTimeOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "SaveImg": [255, 255, 255, 255],
						  "SendEmail": [0, 0, 0, 0],
						  "UploadToFtp": [255, 255, 255, 255],
						  "UploadToCloud": [0, 0, 0, 0],
						  "ShowThumbnail": [255, 255, 255, 255],
						  "Record": [255, 255, 255, 255],
						  "Push": [0, 0, 0, 0],
						  "AlarmSchedule": [
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							...
						]
					},
					{
						"ChnAlarmOut": [
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ],
							...
							[ [255, 255, 0, 255], [255, 255, 0, 255], [255, 255, 0, 255] ]
						  ],
						  "ChnBuzzerOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "LatchTimeOpt": [0, 1, 1, 2, 3, 4, 0, 1, 1, 3, 2, 2 ],
						  "SaveImg": [255, 255, 255, 255],
						  "SendEmail": [0, 0, 0, 0],
						  "UploadToFtp": [255, 255, 255, 255],
						  "UploadToCloud": [0, 0, 0, 0],
						  "ShowThumbnail": [255, 255, 255, 255],
						  "Record": [255, 255, 255, 255],
						  "Push": [0, 0, 0, 0],
						  "AlarmSchedule": [
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							[
								[255, 255, 255, 255, 255, 255],
								...
							],
							...
						]
					}
				],
				"EnableChnAlarm": [255, 255, 255, 255]，
				"AlarmOut": {
					"Local": ["Local->1"],
					"Ipc": [{
						"Channel": 1,
						"AlarmOutCnt": 1
					}, {
						"Channel": 4,
						"AlarmOutCnt": 1
					}, {
						"Channel": 5,
						"AlarmOutCnt": 1
					}]
				}
			},
			...

		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
