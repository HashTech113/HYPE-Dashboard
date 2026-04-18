# Get

## Function

This API is used to get parameter for Alarm > PTZ Linkage.

## Request Message

### Parameter Description

See Alarm > PTZ Linkage > Range > Parameter Description > Table 1 for parameter description.

Sample：

POST /API/AlarmConfig/PTZLinkage/Get HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

See Alarm > PTZ Linkage > Range > Parameter Description > Table 2 for parameter description.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "switch": false,
                "all_alarm": {
                    "motion": true,
                    "pir": true,
                    "io": true,
                    "linkage_sod": true,
                    "linkage_cc": true,
                    "linkage_sound": true,
                    "linkage_vt": true,
                    "linkage_fd": true,
                    "linkage_ad": true,
                    "linkage_cd": true,
                    "linkage_qd": true,
                    "linkage_lpd": true,
                    "linkage_rsd": true,
                    "linkage_lpr": true,
                    "linkage_fr": true,
                    "linkage_ai_pid": true,
                    "linkage_ai_lcd": true,
                    "linkage_ai_pdvd": true,
                    "linkage_ai_firedetet": true,
                    "linkage_ai_tempmeas": true,
                    "linkage_intrusion": true,
                    "linkage_region_entrance": true,
                    "linkage_region_exiting": true
                },
                "ptz_info": [
                    {
                        "ptz_switch": false,
                        "ptz_chn": "CH1",
                        "linkage_ptz_point_index": 0
                    },
                    {
                        "ptz_switch": false,
                        "ptz_chn": "CH2",
                        "linkage_ptz_point_index": 0
                    },
                    {
                        "ptz_switch": false,
                        "ptz_chn": "CH3",
                        "linkage_ptz_point_index": 0
                    },
                    {
                        "ptz_switch": false,
                        "ptz_chn": "CH4",
                        "linkage_ptz_point_index": 0
                    }
                ],
                "copy_ch": "digit"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
