# Range

## Function

This API is used to get parameter range for Function > Snapshot page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/Snapshot/Range HTTP/1.1

{
    "version": "1.0",
    "data":{"reset_session_timeout":false}
}

## Response Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON array | Single Channel Information JSON show as follow table 2 |

#### Table 2

| Parameter | Range | Type | Description |

| channel |   | string | channel number |

| snapshot_resolution | The maximum capture resolution should not exceed 1920 * 1080 | string | Snap resolution |

| reset_session_timeout |   | bool | Reset the session timeout to true by default. This field is only valid when the preview/playback session timeout option is turned on. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: xx
Connection: keep-alive

{
    "result": "success",
    "data": {
        "channel_info": {
            "type": "array",
            "min_size": 0,
            "max_size": 1,
            "items": [{
                "channel": "CH1",
                "snapshot_resolution": {
                    "description": "The resolution of the image is no more than 1920*1080",
                    "type": "string",
                    "items": [
                        "1280x720",
                        "640x480",
                        "320x240"
                    ]
                }
            }]
        },
        "img_encode": {
            "type": "string",
            "min_len": 0,
            "max_len": 128
        },
        "img_format": {
            "type": "string",
            "min_len": 0,
            "max_len": 128
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
