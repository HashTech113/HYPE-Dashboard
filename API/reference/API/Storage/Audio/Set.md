# Set

## Function

This API is used to set parameter for Storage > Audio page.

## Request Message

See Storage > Audio > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/DeviceConfig/Audio/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {
            "CH1": {
                "audio_type": "G711A",
                "chn_index": "CH1",
                "copy_ch": "digit",
                "in_volume": 9,
                "out_volume": 9,
                "page": "device_audio"
            },
            "CH14": {
                "audio_enable": true,
                "audio_type": "G711A",
                "copy_ch": "digit",
                "in_volume": 0,
                "out_volume": 0
            }
        },
        "page_type": "ChannelConfig"
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
