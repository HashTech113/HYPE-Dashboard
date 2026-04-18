# Search

## Function

This API is used to Search Record > Search Record page playback data.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x”, “IP_CH1”…” IP_CH1x”, “WIFI_CH1”…” WIFI_CH1x”, The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. |

| start_date |   | string | Search startdate. The date format is MM/DD/YYYY |

| end_date |   | string | Search enddate. The date format is MM/DD/YYYY |

| start_time |   | string | Search start time. The time format is hh:mm:ss |

| end_time |   | string | Search end time. The time format is hh:mm:ss |

| record_type |   | int | Recode type |

| record_type_ex |   | Int array | Record type expansion (bitwise) |

| stream_mode | "Mainstream","Substream" | string | Stream type (IPC supports only primary streams) |

| smart_region | 18 | Int array | The size of the Smart playback filter area is 15 x 22. |

Sample:

POST /API/Playback/SearchRecord/Search HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel": [
			"CH1"
		],
		"start_date": "06/28/2023",
		"start_time": "00:00:00",
		"end_date": "06/28/2023",
		"end_time": "23:59:59",
		"record_type": 4294967295,
		"smart_region": [],
		"enable_smart_search": 0,
		"record_type_ex": [
			4294967295
		],
		"stream_mode": "Substream"
	}
}

## Response Message

### Parameter Description

#### Table 2

| Parameter | Range | Type | Description |

| record |   | JSON array | Single Channel Record Information JSON show as follow Table3 |

#### Table 3

| Parameter | Range | Type | Description |

| channel |   | string | channel number |

| stream_mode | "Mainstream", "Substream" | string | Stream type (IPC supports only primary streams) |

| record_type | NormalRecord: 0x1, AlarmRecord:0x1c06, IORecord: 0x4, PIRRecord: 0x400, SoundRecord: 0x1000, NetbreakRecord: 0x800, MotionRecord: 0x2, MotionAndIo: 0x6, AllIntelliRec: 0x1c8, PEARecord: 0x40, PEALineRecord: 0x8, HDRecord: 0x80, FDRecord: 0x100, PCCRecord: 0x4000, SmartRecord: 0x80000,//2018.05.30 OcclusionRecord: 0x100000,//occulusion detection INE_ALL_RECORD: (0x10 | 0x20 | 0x40 | 0x200 |0x1000 | 0x2000 | 0x4000) AlarmAssemble: 0x7FFFFFFF,//5.0 Use both AllRecord: 0xFFFFFFFF, PicAllRecord: 0x7FFFF | int | Record Type (for IPC only) |

| record_type_ex | FiredetRecord 0x100000000 MeasureRecord 0x200000000 MeasureRulesRecord 0x400000000 | int array | Recording type extension (for IPC only, since record_type cannot store types exceeding 32 bits, new types exceeding 32 bits are stored here; 12.1.2 Support_record_type_ex: true should also be passed where the device capability is) (Example: pass FiredetRecord: record_type_ex[1 ]) |

| record_type | NormalRecord: 0x1, AlarmRecord: 0x2, MotionRecord: 0x4, IORecord: 0x8, PEARecord: 0x10, PEALineRecord: 0x10, AVDRecord: 0x20, OSCRecord: 0x40, AllIntelliRec: 0x80, SensorRecord: 0x100, PEAAreaRecord: 0x200, OCCRecord: 0x400,//private zone NetbreakRecord: 0x800,//netbreak HDRecord: 0x1000, 4096 FDRecord: 0x2000, 8192 PCCRecord: 0x4000, 16384 MothionAndIo: 0x8000, PIRRecord: 0x10000, SoundRecord: 0x20000, ManualRecord: 0x40000, SmartRecord: 0x80000,//2018.05.30 OcclusionRecord: 0x100000,//occulusion detection PersonRecord: 0x200000 FaceAttribute:0x400000 INE_ALL_RECORD: (0x10 | 0x20 | 0x40 | 0x200 |0x1000 | 0x2000 | 0x4000), AlarmAssemble: 0x7FFFFFFF,//5.0 Use both AllRecord: 0xFFFFFFFF, | int | Record Type (for NVR only) |

| start_date |   | string | Record file startdate. The date format is MM/DD/YYYY |

| end_date |   | string | Record file end date. The date format is MM/DD/YYYY |

| start_time |   | string | Record file start time. The time format is hh:mm:ss |

| end_time |   | string | Record file end time. The time format is hh:mm:ss |

| Size |   | int | file size, unit byte |

| record_id | 0 - 0xFFFFFFFF | unsigned int |   |

| disk_event_id | 0 - 0xFFFFFFFF | unsigned int |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"version": "1.0",
	"result": "success",
	"data": {
		"record": [
			[
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "13:02:03",
					"end_date": "06/28/2023",
					"end_time": "13:29:07",
					"record_id": 605,
					"disk_event_id": 0,
					"size": 266215424,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "13:29:07",
					"end_date": "06/28/2023",
					"end_time": "13:57:30",
					"record_id": 523,
					"disk_event_id": 0,
					"size": 266240000,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "13:57:30",
					"end_date": "06/28/2023",
					"end_time": "14:20:32",
					"record_id": 596,
					"disk_event_id": 0,
					"size": 191094784,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 2147483647,
					"start_date": "06/28/2023",
					"start_time": "14:20:32",
					"end_date": "06/28/2023",
					"end_time": "14:21:04",
					"record_id": 596,
					"disk_event_id": 1,
					"size": 4653056,
					"lock": false,
					"new_record_type": "IMN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "14:21:04",
					"end_date": "06/28/2023",
					"end_time": "14:22:18",
					"record_id": 596,
					"disk_event_id": 2,
					"size": 10436608,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 2147483647,
					"start_date": "06/28/2023",
					"start_time": "14:22:18",
					"end_date": "06/28/2023",
					"end_time": "14:22:52",
					"record_id": 596,
					"disk_event_id": 3,
					"size": 4882432,
					"lock": false,
					"new_record_type": "IMN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "14:22:52",
					"end_date": "06/28/2023",
					"end_time": "14:29:31",
					"record_id": 596,
					"disk_event_id": 4,
					"size": 55169024,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "14:29:31",
					"end_date": "06/28/2023",
					"end_time": "15:01:37",
					"record_id": 614,
					"disk_event_id": 0,
					"size": 266240000,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "15:01:37",
					"end_date": "06/28/2023",
					"end_time": "15:33:44",
					"record_id": 611,
					"disk_event_id": 0,
					"size": 266227712,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "15:33:44",
					"end_date": "06/28/2023",
					"end_time": "15:46:07",
					"record_id": 647,
					"disk_event_id": 0,
					"size": 102531072,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 2147483647,
					"start_date": "06/28/2023",
					"start_time": "15:46:07",
					"end_date": "06/28/2023",
					"end_time": "15:46:39",
					"record_id": 647,
					"disk_event_id": 1,
					"size": 4546560,
					"lock": false,
					"new_record_type": "IMN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "15:46:39",
					"end_date": "06/28/2023",
					"end_time": "15:48:33",
					"record_id": 647,
					"disk_event_id": 2,
					"size": 15785984,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 2147483647,
					"start_date": "06/28/2023",
					"start_time": "15:48:33",
					"end_date": "06/28/2023",
					"end_time": "15:49:09",
					"record_id": 647,
					"disk_event_id": 3,
					"size": 5074944,
					"lock": false,
					"new_record_type": "IMN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 2147483647,
					"start_date": "06/28/2023",
					"start_time": "15:49:09",
					"end_date": "06/28/2023",
					"end_time": "15:50:35",
					"record_id": 647,
					"disk_event_id": 4,
					"size": 12128256,
					"lock": false,
					"new_record_type": "IMN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "15:50:35",
					"end_date": "06/28/2023",
					"end_time": "16:05:47",
					"record_id": 647,
					"disk_event_id": 5,
					"size": 126181376,
					"lock": false,
					"new_record_type": "IN"
				},
				{
					"channel": "CH1",
					"stream_mode": "Substream",
					"record_type": 8,
					"start_date": "06/28/2023",
					"start_time": "16:05:47",
					"end_date": "06/28/2023",
					"end_time": "16:12:53",
					"record_id": 650,
					"disk_event_id": 0,
					"size": 59002880,
					"lock": false,
					"new_record_type": "IN"
				}
			]
		]
	}
}

## Error Code

See Response Messages Body and Common error_code for more information.
