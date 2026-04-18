# Get

## Function

This API is used to get parameter for Alarm > Flood-light.

## Request Message

### Parameter Description

See Alarm > Floodlight > Range > Parameter Description > Table 1 for parameter description.

Sampel：

POST /API/AlarmConfig/Deterrence/Get HTTP/1.1

{
    "version":"1.0",
    "data":
        {
            "page_type":"ChannelConfig"
        }
}

## Response Message

### Parameter Description

See Alarm > Floodlight > Range > Parameter Description > Table 2 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {
        "CH1": {
            "flood_light_switch": false,
            "bright_time": 60,
            "flood_light_mode": "Warninglight",
            "strobe_frequency": "Middle",
            "param_video": {
                "show": false,
                "disable": true
            },
            "flood_light_disable": false,
            "warning_light_disable": false
        },
        "CH2": {"reason": "Not configured"},
        "CH3": {"reason": "Not configured"},
        "CH4": {"reason": "Not configured"},
        "CH5": {"reason": "Not configured"},
        "CH6": {"reason": "Not configured"},
        "CH7": {"reason": "Not configured"},
        "CH8": {"reason": "Not configured"},
        "CH9": {"reason": "Not configured"},
        "CH10": {"reason": "Not configured"},
        "CH11": {"reason": "Not configured"},
        "CH12": {"reason": "Not configured"},
        "CH13": {"reason": "Not configured"},
        "CH14": {"reason": "Not configured"},
        "CH15": {"reason": "Not configured"},
        "CH16": {"reason": "Not configured"}
    }}
}

## Error Code

See Response Messages Body and Common error_code for more information.
