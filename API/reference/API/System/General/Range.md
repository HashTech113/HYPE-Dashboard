# Range

## Function

This API is used to get parameter range for System > General page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/SystemConfig/General/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| device_name | Max length: 31byte | string | Device name |

| menu_timeouts | 0,30,60,120,300,600 | int32 | Menu auto lock Time,in seconds. |

| FisheyeOrAI | "Fisheye" "AI" | string | Only for NVR. AI and Fisheye are mutually exclusive. |

| session_timeout | 5-1440 | int32 | Web session timeout time,in minutes. |

| preview_session_timeout | boolean | boolean | Preview/playback session timed out switch. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "device_name": {
            "type": "string",
            "min_len": 1,
            "max_len": 31
        },
        "menu_timeouts": {
            "type": "int32",
            "unit": "second",
            "items": [
                0,
                30,
                60,
                120,
                300,
                600
            ]
        },
        "session_timeout": {
            "type": "int32",
            "min": 5,
            "max": 1440
        },
        "preview_session_timeout": {
            "type": "bool"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
