# Get

## Function

This API is used to get Thermal > Video Color parameter

## Request Message

none

## Response Message

### Parameter Description

See  Thermal > Video Color > Response Message > Parameter Description > Table 1 Obtain the parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {
        "CH1": {
            "status": "Online",
            "bright": 128,
            "contrast": 128,
            "support_default": true,
            "hue": 128,
            "saturation": 128,
            "sharpness": 128
        },
        "CH2": {
            "status": "Online",
            "bright": 128,
            "contrast": 128,
            "support_default": true,
            "text": "Thermal",
            "palette": "Hot Iron 2"
        }
    }}
}

## Error Code

See Response message body and general error_code for more information.
