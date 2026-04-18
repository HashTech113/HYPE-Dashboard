# Default

## Function

This API is used to restore default parameter for Thermal > Video Color page.

## Request Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | description |

| channel | "CH1","CHx", "IP_CH1","IP_CHx", "WIFI_CH1","WIFI_CHx" Channels supported by the device. | string | Device channel number |

Sample:

POST /API/ChannelConfig/Color/Default HTTP/1.1

{
    "version": "1.0",
    "data": {"channel": ["CH1"]}
}

## Response Message

none

Sample:

{
    "result": "success",
    "data": {}
}

## Error Code

See Response message body and general error_code for more information.
