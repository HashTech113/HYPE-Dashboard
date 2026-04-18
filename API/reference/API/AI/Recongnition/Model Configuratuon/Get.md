# Get

## Function

This API is used to get AI > Recognition > Model Configuratuon page parameters.

## Request Message

None.

Sample:

POST /API/AI/Model/Get HTTP/1.1

{
    "version": "1.0",
}

## Response Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| auto_select_enable |   | bool | Whether the model is automatically selected |

| rows |   | JSON array | The Model configuration JSON show as followTable 2 |

Table 2
|Parameter|Range|Type|Description|
| ---- | ---- | ---- | ---- |
|channel|“local” “CH1”…”CH1x”
The number of channels depends on the capability of the device.|string|Local model or front-end model flag|
|face_recognition|  |string|Face recognition model version display|
|face_detection|    |string|Face detection model version display|
|enable_face_recognition|True false|bool|Face recognition model enable switch|

Tips:

Response messages and request messages may not contain all the fields in the table above. If no fields are included, the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
   {
    "result": "success",
    "data": {
        "rows": [
			{
                "channel": "local",
                "face_recognition": "------",
                "face_detection": "------",
                "enable_face_recognition": false
            },
            {
                "channel": "CH1",
                "face_recognition": "V0.2.0.0.1-release",
                "face_detection": "V0.2.1.2.1-release",
                "enable_face_recognition": true
            }
        ]
    }
}
}

## Error Code

See Response Messages Body and Common error_code for more information.
