# Range

## Function

This API is used to obtain the Record > Search Record page playback data range.

## Request Message

Sample:

POST /API/Playback/SearchRecord/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel |   | string | Channel number |

| search_type | "Record", "Picture" | string | Search type, used to distinguish between searching for videos or pictures |

| start_date |   | string | Video file start date The date format is MM/DD/YYYY |

| end_date |   | string | Video file end date The date format is MM/DD/YYYY |

| start_time |   | string | Video file start time The time format is hh:mm:ss |

| end_time |   | string | Video file end time The time format is hh:mm:ss |

| record_type | NormalRecord: 0x1, AlarmRecord: 0x2, MotionRecord: 0x4, IORecord: 0x8, PEARecord: 0x10, PEALineRecord: 0x10, AVDRecord: 0x20, OSCRecord: 0x40, AllIntelliRec: 0x80, SensorRecord: 0x100, PEAAreaRecord: 0x200, OCCRecord: 0x400,//private zone NetbreakRecord: 0x800,//netbreak HDRecord: 0x1000, 4096 FDRecord: 0x2000, 8192 PCCRecord: 0x4000, 16384 MothionAndIo: 0x8000, PIRRecord: 0x10000, SoundRecord: 0x20000, ManualRecord: 0x40000, SmartRecord: 0x80000,//2018.05.30 OcclusionRecord: 0x100000,//occulusion detection PersonRecord: 0x200000 FaceAttribute:0x400000 INE_ALL_RECORD: (0x10 | 0x20 | 0x40 | 0x200 |0x1000 | 0x2000 | 0x4000), AlarmAssemble: 0x7FFFFFFF,//5.0 Use both AllRecord: 0xFFFFFFFF, | int | Recording type (only for NVR) |

| record_type_ex | FiredetRecord 0x100000000 MeasureRecord 0x200000000 MeasureRulesRecord 0x400000000 | int array | Recording type extension (for IPC only, since record_type cannot store types exceeding 32 bits, new types exceeding 32 bits are stored here; 12.1.2 Support_record_type_ex: true should also be passed where the device capability is) (Example: pass FiredetRecord: record_type_ex) |

| record_id | 0 - 0xFFFFFFFF | unsigned int | Record ID |

| disk_event_id | 0 - 255 | unsigned int | Disk event ID |

| size | 0 - 0x3FFFFFFF | int | File size, unit bytes |

| unfinished |   | bool |   |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel": {
            "type": "string",
            "items": [
                "CH1"
            ]
        },
        "search_type": {
            "type": "string",
            "items": [
                "Record",
                "Picture"
            ]
        },
        "start_date": {
            "description": "The date format is MM/DD/YYYY",
            "type": "string",
            "len": 10
        },
        "end_date": {
            "description": "The date format is MM/DD/YYYY",
            "type": "string",
            "len": 10
        },
        "start_time": {
            "description": "The time format is hh:mm:ss",
            "type": "string",
            "len": 8
        },
        "end_time": {
            "description": "The time format is hh:mm:ss",
            "type": "string",
            "len": 8
        },
        "record_type": {
            "type": "uint32",
            "mode": "r",
            "min": 0,
            "max": 4294967295
        },
        "record_type_ex": {
            "type": "array",
            "min_size": 0,
            "max_size": 4,
            "items": []
        },
        "record_id": {
            "type": "uint32",
            "min": 0,
            "max": 4294967295
        },
        "disk_event_id": {
            "type": "int32",
            "min": 0,
            "max": 255
        },
        "size": {
            "type": "uint32",
            "mode": "r",
            "min": 0,
            "max": 2147483647
        },
        "unfinished": {
            "type": "bool",
            "mode": "r"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
