# Get

## Function

This API is used to get parameter for Function > Snapshot page.

## Request Message

See Function > Snapshot > Range > Parameter Description > Table 2 for parameter description.

Sample:

POST /API/Snapshot/Get
HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel":"CH1",
        "snapshot_resolution":"1280 x 720",
        "reset_session_timeout":false
    }
}

## Response Message

## Parameter Description

Table 1

| Parameter | Range | Type | Description |

| channel |   | string | channel number |

| snapshot_resolution | The maximum capture resolution should not exceed 1920 * 1080 | string | Snap resolution |

| img_time |   | int | UTC Time |

| img_encodes | “base64” | string | codec type |

| img_format | "image/jpeg" | string | image type |

| img_data |   | string | picture data |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ima_time":"1973912484",
        "img_encodes":"base64",
        "img_format":"image/jpeg",
        "ima_data":""
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
