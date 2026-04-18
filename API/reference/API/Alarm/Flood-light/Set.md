# Set

## Function

This API is used to set parameter for Alarm > Flood-light.

## Request Message

### Parameter Description

See Alarm>Flood-light>Range>Parameter Description>Table 2 for parameter description

Sample：

POST /API/AlarmConfig/Deterrence/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
        "channel_info": {"CH1": {
            "flood_light_switch": true,
            "bright_time": 60,
            "flood_light_mode": "Warninglight",
            "strobe_frequency": "Middle",
            "param_video": {
                "show": false,
                "disable": true
            },
            "flood_light_disable": false,
            "warning_light_disable": false,
            "chn_index": "CH1",
            "page": "chn_floodlight"
        }},
        "page_type": "ChannelConfig"
    }
}

## Response Message

None

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
