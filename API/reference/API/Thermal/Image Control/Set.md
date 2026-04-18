# Set

## Function

This API is used for set Thermal > ImageControl page.

## Request Message

### Parameter Description

See Thermal > ImageControl > Response Message > Parameter Description > Table 1 Obtain the parameter description.

Sample:

POST /API/ChannelConfig/ImageControl/Set HTTP/1.1

{
    "version": "1.0",
    "data": {"channel_info": {
        "CH1": {
            "status": "Online",
            "image_setting": "DayNightMode",
            "DayNightMode": {
                "ir_cut_mode": "Image",
                "image_sensitivity": 1,
                "ir_led": "Manual",
                "low_beam_light": 100
            },
            "mirror_mode": "Close",
            "angle_rotation": "0",
            "Daylight": {
                "back_light": "Close",
                "blc_level": 2,
                "back_light_area": "Center",
                "denoising": "Auto",
                "white_balance": "Auto",
                "exposure_mode": "Auto",
                "shutter_limit": "1/8"
            },
            "support_default": true
        },
        "CH2": {
            "status": "Online",
            "mirror_mode": "Close",
            "angle_rotation": "0",
            "denoising_2dlevel": 50,
            "denoising_3dlevel": 50,
            "enhancement_level": 50,
            "enhance_regional": "Disable",
            "rule_info": [{
                "rule_no": 1,
                "rule_rect": {
                    "left": 0,
                    "top": 0,
                    "width": 0,
                    "height": 0
                },
                "Select": 0
            }],
            "palette": "Rainbow",
            "fusion": "Normal",
            "imagefusion_level": 50,
            "edgefusion_level": 50,
            "horizontal_trim": 0,
            "vertica_trim": 0,
            "fusion_distance": 2,
            "support_backgroundcorr": true,
            "support_shuttercorr": true,
            "support_default": true,
            "chn_index": "CH2",
            "page": "chn_imgCtrl",
            "camera_param_mode": "Daylight",
            "Daylight": {}
        }
    }}
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
