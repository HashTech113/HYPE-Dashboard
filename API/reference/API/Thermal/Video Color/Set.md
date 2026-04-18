# Set

## Function

This API is used to Set Thermal > Video Color page.

## Request Message

### Parameter Description

See Thermal > Video Color >Response Message > Parameter Description > Table 1 Obtain the parameter description.

Sample:

POST /API/ChannelConfig/Color/Set HTTP/1.1

{
    "version": "1.0",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "bright": 128,
        "contrast": 128,
        "support_default": true,
        "hue": 167,
        "saturation": 128,
        "sharpness": 128,
        "last_hue": 50,
        "last_bright": 50,
        "last_contrast": 50,
        "last_saturation": 50,
        "last_sharpness": 50,
        "SunRise_time": "00:00",
        "SunSet_time": "00:00",
        "palette": "Rainbow"
    }}}
}

## Response Message

none

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response message body and general error_code for more information.
