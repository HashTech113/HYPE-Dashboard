# POST

## Function

This API is used to push Event > Http listening Push related description alarm event requests.

## Request Message

#### Table 1

| Parameter | Range | Type | Description |

| EventType | VideoMotion VideoBlind SoundDetect SOD LCD PID PD_VD FD CC AD CD QD LPD RSD | string | IPC alarm type |

| EventTime |   | string | Alarm trigger time |

| EventAction | Start stop | string | Alarm status of IPC |

| ChannelName |   | string | channel name |

| DeviceName |   | string | IPC device name |

| IPAddress |   | string | IP address of the IPC |

| MACAddress |   | string | IPC MAC address |

| PicData |   | Json Object | The push data when the smart alarm is sent, as shown in the Table 2 below |

#### Table 2

| Parameter | Range | Type | Description |

| SnapedObjInfo | t | Json Object | Push data when Pd&vd, PID, LCD intelligent alarm, as shown in the Table 3 below |

| PlateInfo |   | Json Object | Push data when LPD intelligent alarm, as shown in the table Table 4 below |

| FaceInfo |   | Json Object | The push data when FD intelligent alarm is shown in the Table 5 below |

#### Table 3

| Parameter | Range | Type | Description |

| Chn | 0 | int | IPC only uses channel 0 |

| StrChn | "CH1" | string | channel name |

| StartTime |   | long long | start time, picture with |

| EndTime |   | long long | end time, picture with |

| SnapId |   | int | image id |

| Type |   | int | type ACPT_Face = 0, ACPT_HumanBody = 1, ACPT_Vehicle = 2, ACPT_PIDHumanBody = 3, ACPT_PIDVehicle = 4, ACPT_LCDHumanBody = 5, ACPT_LCDVehicle = 6, |

| ObjectImage |   | string | Base64 encoded image data |

| Background |   | string | Base64 encoded background image data |

#### Table 4

| Parameter | Range | Type | Description |

| Id | 1-15characters | string | License plate number, unique identification. |

| GrpId |   | int | group ID |

| SnapId |   | unsigned int | The Id of the picture when the front-end IPC captures |

| Type | 0 | int | Types of face capture objects |

| StrChn |   | string | channel |

| StartTime |   | unsigned long long | Snapshot start time, such as: 2018-10-25 13:08:36, Unix timestamp (displayed according to UTC time zone uniformly) |

| EndTime |   | unsigned long long | The capture end time, such as: 2018-10-25 13:08:46, Unix timestamp (when displayed, it will be displayed uniformly in UTC time zone) |

| BgImgWidth |   | unsigned int | Capture the width of the picture |

| BgImgHeight |   | unsigned int | Capture the height of the picture |

| Chn |   | int | channel |

| PlateColor | 0-5 | int | License plate color, the possible values are as follows: enum AIPlateColor_e { APC_Blue = 0,// blue APC_Green = 1,// green APC_Yellow = 2,// yellow APC_Black = 3,// black APC_White = 4,// White APC_Other = 5,// other colours APC_Max }; |

| CarBrand |   | string | car brand |

| CarType |   | string | car model |

| Sex |   | int | Owner gender: 0-male, 1-female |

| Owner | "Mike" | string | owner name |

| IdCode | "415025199203050916" | string | identification number |

| Job | "Software" | string | Profession |

| Phone | "12345678902" | string | telephone number |

| Domicile | "Guangdong,Zhuhai,Xiangzhou ..." | string | Living |

| Remark | "Detail of this person ..." | string | Remark |

| ImageAllInfo |   | string | License plate picture information |

| PlateImg | "base64(imgData)" | string | license plate image |

| BgImg | "base64(imgData)" | string | Background picture |

#### Table 5

| Parameter | Range | Type | Description |

| Id |   | int | Face Id, unique identification (nvr only) |

| GrpId |   | int | Group Id (nvr only) |

| SnapId |   | unsigned int | The Id of the picture when the front-end IPC captures |

| MD5 |   | string | MD5 value of the face image |

| Type | 0 | int | Types of face capture objects |

| StartTime |   | unsigned long long | Snapshot start time, such as: 2018-10-25 13:08:36, Unix timestamp (displayed according to UTC time zone uniformly) |

| EndTime |   | unsigned long long | The capture end time, such as: 2018-10-25 13:08:46, Unix timestamp (when displayed, it will be displayed uniformly in UTC time zone) |

| BgImgWidth |   | unsigned int | Capture the width of the picture |

| BgImgHeight |   | unsigned int | Capture the height of the picture |

| Score |   | int | Image Score (Confidence) |

| Sex |   | int | Gender: 0-male, 1-female |

| Age |   | int | age |

| Gender |   | int | Face attribute gender: 0-male, 1-female |

| Beauty |   | int | face score |

| fAttrAge |   | int | face attribute age |

| GlassesType |   | int | Glasses type, 0: no glasses, 1: wear glasses (currently there is no distinction between sunglasses and ordinary glasses, all glasses are defaulted) |

| Expression |   | int | Expression type, 0: no expression, 1: smiling, 2: laughing |

|   |   |   |   |

| MouthMask |   | int | Whether to wear a mask, 0: no mask, 1: with a mask |

| Race |   | int | Race, 0: Yellow, 1: Caucasian, 2: Black, 3: Arab |

| Chn |   | int | channel |

| StrChn | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string | channel |

| Similarity |   | float | 相似度 |

| ModifyCnt |   | int | The number of revisions, the upper layer is read-only, and is updated in real time by the device every time the face information is modified (nvr only) |

| ImageAllInfo |   | string | picture information |

| Image1 | "base64(imgData)" | string | Imported ID photo |

| Image2 | "base64(imgData)" | string | Capture face pictures |

| Image3 | "base64(imgData)" | string | A snapshot of the human body |

| Image4 | "base64(imgData)" | string | Capture background image |

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

| Feature | "base64(imgData)" | string | eigenvalue |

| FtVersion |   | int | Feature value version, it is meaningful only when comparing feature values with the same version, if return feature value, please return this field |

Sample:

POST /API/AlarmEvent/EventPush HTTP/1.1
Host: 172.16.8.138:123
Accept: */*
Content-Type: application/json;charset=UTF-8
Content-Length: 231

## Response Message

Channel Information JSON show as follow table 1.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success","data":{
        "EventType":"VideoMotion",
        "EventTime":"2023-7-13 7:28:10",
        "EventAction":"stop",
        "ChannelName":"senvi",
        "DeviceName":"RS-CH281M8ND-DF-WA2812PW",
        "IPAddress":"172.16.11.186",
        "MacAddress":"00-23-63-69-23-6D"
        }
}

## Error Code

See Response Messages Body and Common error_code for more information.
