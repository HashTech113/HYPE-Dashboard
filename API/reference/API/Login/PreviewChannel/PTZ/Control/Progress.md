# Progress

## Function

This API is used to get PTZ status.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel |   | string | Channel name. |

Sample:

POST /API/PreviewChannel/PTZ/Control/Progress HTTP/1.1

{
    "version": "1.0",
    "data":{
        "channel": "CH1"
    }
}

## Response Message

See PreviewChannel > PTZ > Get > Parameter Description > Table 2 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel": "CH2",
        "zoom_slider": 1,
        "focus_slider": 564,
        "isctl": false
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
