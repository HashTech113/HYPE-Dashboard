# Modify

## Function

This API is used to modify the AI > Recognition > FDGroup parameter.

## Request Message

see AI > Recognition > FDGroup > Get > Parameter Description > Table 2for parameter description.

Sample:

POST /API/AI/Faces/Modify HTTP/1.1

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

## Response Message

## Parameter Description

#### Table 9

| Parameter | Range | Type | Description |

| MsgId | null |   |   |

| Result | 0，-1，-2，….-23, -24 | int | Returns a result or error code See AI > Recognition > FDGroup > Get > Parameter Description > Table x |

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"MsgId": null,
		"Result": 0
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
