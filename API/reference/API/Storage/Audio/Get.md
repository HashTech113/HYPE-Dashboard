# Get

## Function

This API is used to get parameter for Storage > Audio page.

## Request Message

None.

Sample:

POST /API/DeviceConfig/Audio/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Storage > Audio > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "copy_ch": "digit",
                "audio_type": "G711A",
                "in_volume": 9,
                "out_volume": 9
            },
            "CH2": {
                "reason": "Not support"
            },
            "CH3": {
                "reason": "Not support"
            },
            "CH4": {
                "reason": "Not support"
            },
            "CH5": {
                "reason": "Not support"
            },
            "CH6": {
                "reason": "Not support"
            },
            "CH7": {
                "reason": "Not support"
            },
            "CH8": {
                "reason": "Not support"
            },
            "CH9": {
                "reason": "Not support"
            },
            "CH10": {
                "reason": "Not support"
            },
            "CH11": {
                "reason": "Not support"
            },
            "CH12": {
                "reason": "Not support"
            },
            "CH13": {
                "reason": "Not support"
            },
            "CH14": {
                "copy_ch": "digit",
                "audio_enable": true,
                "audio_type": "G711A",
                "in_volume": 0,
                "out_volume": 0
            },
            "CH15": {
                "reason": "Not support"
            },
            "CH16": {
                "reason": "Not support"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
