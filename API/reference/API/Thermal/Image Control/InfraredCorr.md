# InfraredCorr

## Function

This API is used for get InfrareCorr Thermal > ImageControl parameter

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel | "CH1","CHx", "IP_CH1","IP_CHx", "WIFI_CH1","WIFI_CHx" Channels supported by the device. | string | Device channel number |

| infrared_corr_type | "BackgroundCorr" "ShutterCorr" | string | Correction type |

Sample:

POST /API/ChannelConfig/ImageControl/InfrareCorr HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel": "CH2",
        "infrared_corr_type": "ShutterCorr"
    }
}

## Response Message

none

Sample:

POST /API/ChannelConfig/ImageControl/Set HTTP/1.1

{
    "result": "success",
    "data": {}
}

## Error Code

See Response message body and general error_code for more information.
