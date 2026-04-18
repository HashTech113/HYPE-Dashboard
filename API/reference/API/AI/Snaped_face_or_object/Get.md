# Get

## Function

This API is used to get AI > Snaped face or object alarm real-time appeal.

## Request Message

None.

Sample:

POST /API/AI/processAlarm/Get HTTP/1.1

{}

## Response Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| FaceInfo |   | JSON array | FaceInfo JSON show as follow Table 2 |

| SnapedObjInfo |   | JSON array | SnapedObjInfoJSON show as follow Table 3 |

Table 2

| Parameter | Range | Type | Description |

| Id |   | int | Face Id, unique identification (nvr only) |

| GrpId |   | int | Group Id (nvr only) |

| SnapId |   | unsigned int | The Id of the picture when the front-end IPC captures |

| Type | 0 | int | Types of face capture objects |

| StartTime |   | unsigned long long | Snapshot start time, such as: 2018-10-25 13:08:36, Unix timestamp (displayed according to UTC time zone uniformly) |

| EndTime |   | unsigned long long | The capture end time, such as: 2018-10-25 13:08:46, Unix timestamp (when displayed, it will be displayed uniformly in UTC time zone) |

| Similarity |   | float | Similarity, such as: 93.56932 (for nvr only) |

| Score |   | int | Image score (confidence) (nvr only) |

| Sex |   | int | Gender: 0-male, 1-female |

| Age |   | int | Age |

| Gender |   | int | Face attribute gender: 0-male, 1-female |

| fAttrAge |   | int | face attribute age |

| Beauty |   | int | Beauty |

| GlassesType |   | int | Glasses type, 0: no glasses, 1: wear glasses (currently there is no distinction between sunglasses and ordinary glasses, all glasses are defaulted) |

| Expression |   | int | Expression type, 0: no expression, 1: smiling, 2: laughing |

| MouthMask |   | int | Whether to wear a mask, 0: no mask, 1: with a mask |

| Race |   | int | Race, 0: Yellow, 1: Caucasian, 2: Black, 3: Arab |

| Chn |   | int | Channel |

| StrChn | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string | Channel |

| ModifyCnt |   | int | The number of revisions, the upper layer is read-only, and is updated in real time by the device every time the face information is modified (nvr only) |

| Image1 | "base64(imgData)" | string | Imported face pictures |

| Image2 | "base64(imgData)" | string | Capture face pictures |

| Image3 | "base64(imgData)" | string | Capture human body pictures |

| Image4 | "base64(imgData)" | string | Capture background image |

| Feature | "base64(feature)" | string | Eigenvalues (nvr only) |

| Name | "Mike" | string | Name (for nvr only) |

| Country | "China" | string | Nationality (nvr only) |

| Nation | "Han" | string | Ethnic (nvr only) |

| NativePlace | "Guangdong,Zhuhai" | string | Hometown (nvr only) |

| IdCode | "415025199203050916" | string | ID card (nvr only) |

| Job | "Software" | string | work (nvr only) |

| Phone | "12345678902" | string | Phone (nvr only) |

| Email | "abcd@163.com" | string | Mail (for nvr only) |

| Domicile | "Guangdong,Zhuhai,Xiangzhou ..." | string | Current residence (nvr only) |

| Remark | "Detail of this person ..." | string | Evaluation (for nvr only) |

Table 3

| Parameter | Range | Type | Description |

| chn |   | string | Channel |

| StrChn | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string | Channel |

| GrpId |   | int | GroupId |

| StartTime |   | unsigned long long | Snapshot start time, such as: 2018-10-25 13:08:36, Unix timestamp (displayed according to UTC time zone uniformly) |

| EndTime |   | unsigned long long | The capture end time, such as: 2018-10-25 13:08:46, Unix timestamp (when displayed, it will be displayed uniformly in UTC time zone) |

| ObjectImage | "base64(imgData)" | string | Imported face pictures |

| Background | "base64(imgData)" | string | Capture face pictures |

| SnapId |   | unsigned int | The Id of the picture when the front-end IPC captures |

| Type |   | int | Types of captured objects, such as: 0-face, 1-figure, 2-vehicle, 3-PID figure, 4-PID vehicle, 5-LCD figure, 6-LCD vehicle |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"data": {
		"FaceInfo":[
			{
				"Id": 1,
				"GrpId": 1,
				"SnapId": 1250,
				"StartTime": 1540444116,
				"EndTime": 1540444126,
				"Similarity": 93.56932,
				"Score": 87,
				"Gender": 0,
				"fAttrAge": 26,
				"Chn": "CH1",
				"ModifyCnt": 0,
				"Image1": "base64(imgData)",
				"Image2": "base64(imgData)",
				"Image3": "base64(imgData)",
				"Image4": "base64(imgData)",
				"Feature": "base64(feature)",
				"Name": "Mike",
				"Country": "China",
				"Nation": "Han",
				"NativePlace": "Guangdong,Zhuhai",
				"IdCode": "415025199203050916",
				"Job": "Software",
				"Phone": "12345678902",
				"Email": "abcd@163.com",
				"Domicile": "Guangdong,Zhuhai,Xiangzhou ...",
				"Remark": "Detail of this person ..."
			},
		],"SnapedObjInfo":[
			{
				"Chn": "CH1",
				"StartTime": 1540444116,
				"EndTime": 1540444137,
				"ObjectImage": "base64(imgData)",
				"Background": "base64(imgData)",
				"SnapId": 2375,
				"Type": 1
			}
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
