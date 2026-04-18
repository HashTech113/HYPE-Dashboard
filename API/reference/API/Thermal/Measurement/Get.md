# Get

## Function

This API is used to get Thermal > Measurement parameter.

## Request Message

### Parameter Description

See Thermal > Measurement > Request Message >Parameter Description > Table 1 Obtain the parameter description.

Sample:

POST /API/Thermal/Setup/Measurement/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
        "page_type":"ChannelConfig"
        }

}

## Response Message

### Parameter Description

See Thermal > Measurement > Response Message >Parameter Description > Table 2 Obtain the parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH2": {
        "status": "Online",
        "switch": false,
        "colorbar_switch": false,
        "display_temp_on_optical": false,
        "display_temp_on_stream": true,
        "display_max_temp": true,
        "display_min_temp": false,
        "display_average_temp": false,
        "display_pos": "Near Target",
        "spot_measurement": false,
        "data_refresh_rate": "3",
        "temp_unit": "Degree Celsius",
        "emissivity": 0.96,
        "distance_unit": "Meter",
        "target_distance": 1,
        "reflective_temp": 25
    }}}
}

## Error Code

See Response message body and general error_code for more information.
