# Get

## Function

This API is used to get PTZ control information.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1"…"CHx", "IP_CH1"…" IP_CHx", "WIFI_CH1"…",WIFI_CHx", The number of channels depends on the capabilities of the device. | string | Channel name. |

Sample:

POST /API/PreviewChannel/PTZ/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
        "channel": "CH1",
        "disable_ManualHumanTrace": false,
        "current_cruise_mode": "Mode_Default_Cruise",
        "zoom_step": 5,
        "focus_step": 5
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| channel |   | string |   |

| ptz_version | "1.0","2.0","3.0" | string | Ptz version. |

| cmd | "Ptz_Cmd_Up", "Ptz_Cmd_Down", … … "Ptz_Privacy_Mode", "Ptz_Trace_Mode" | string | See Table 3 for more information of cmd. |

| state | "Stop","Start" | string | For button press and release. |

| zoom_step | 1,5,20 | int | Zoom adjust the number of steps. |

| focus_step | 1,5,20 | int | Focus adjust the number of steps. |

| zoom_slider | Depending on the lens | int | Zoom slider. |

| focus_slider | Depending on the lens | int | Focus slider. |

| isctl |   | bool | Whether gray screen; true: no gray screen; false: gray screen. |

| speed | 0-10 0-100(For DVR/NVR) | int | (only control) |

| preset_point | 0-255 | int array | The maximum length of the array is 255, each bit represents a preset point, the value of each bit (0-255) represents the polling time of the corresponding preset point, 0 means no preset point is set for this bit. |

| line_scan_state |   | bool | Line scan cruise state. |

| trace_preset_point |   | array | Preset point set by TOUR. |

| preset_point_no | 1-255 | int | (only control) |

| ctl_stop |   | bool | true:stop ctl operation(only control) |

| preset_point_time | 1-255 | int | Single preset point polling time.(only control) |

| preset_point_name | len:1-31 | string | Preset point name, ranging from 1 to 31 character. |

| zoom_minus_add | "Ptz_Cmd_ZoomMinus" "Ptz_Cmd_ZoomAdd" | object | Range used it to display the zoom button |

| focus_minus_add | "Ptz_Cmd_FocusMinus", "Ptz_Cmd_FocusAdd" | object | Range used it to display the focus button Range |

| iris_minus_add | "Ptz_Cmd_IrisMinus", "Ptz_Cmd_IrisAdd" | object | Range used it to display aperture buttons. |

| btn_autofocus | "Ptz_Btn_AutoFocus" | object | Used to display the autofocus button. |

| btn_default | "Ptz_Btn_Default" | object | Used to display the restore button. |

| btn_refresh | "Ptz_Btn_Refresh" | object | Used to display the refresh button |

| preset_point_cruise_btn | "Ptz_Cmd_Cruise" | object | Used to display the cruise buttons. |

| is_req_progress |   | bool | Whether to issue the progress polling command. |

| ptz_direction_control | "Ptz_Cmd_Up" "Ptz_Cmd_Down", "Ptz_Cmd_Left", "Ptz_Cmd_Right", "Ptz_Cmd_UpLeft", "Ptz_Cmd_UpRight", "Ptz_Cmd_DownLeft", "Ptz_Cmd_DownRight", "Ptz_Cmd_CircleCenter" | object | Range used it to display direction control. |

| advanced_mode | "Mode_Preset_Point", "Mode_Watch_Mode", "Mode_Line_Scan", "Mode_Trace", "Mode_Pattern_Scan" | object | Range used it to display each mode in the advanced mode. |

| trace_number | 0-3 | int | Tour 1-4 tracks. |

| pattern_scan_number | 0-3 | int | Pattern scan 1-4 tracks. |

| pattern_scan_number_isset | 0-3 | bool array | Whether pattern scan 1-4 has been marked. |

| line_scan_speed | "Low", "Middle", "High" | string | line scan speed |

| line_scan_area |   | bool | Whether linear scan is set. |

| trace_interval | "5s""6s""7s"….."59s""60s" | string | Tour time interval. |

| utc_protocol |   | string | Utc Protocol. |

| utc_cmd | "Coax_Cmd_Menu", "Coax_Cmd_Up", | "Coax_Cmd_Left", "Coax_Cmd_Right", "Coax_Cmd_Down" | string |

| current_cruise_mode | "Mode_Default_Cruise", "Mode_Preset_Point", "Mode_Watch_Mode", "Mode_Line_Scan", "Mode_Trace", "Mode_Pattern_Scan", "Mode_Restore_Btn" | string | Current pattern scan mode |

| belt_times_use | 0-100 | int | Belt life, more than 90, prompt life is not enough, 100 can not cruise. |

| quick_use | "Ptz_QuickUse_3DPosition", "Ptz_QuickUse_AutoFocus", "Ptz_QuickUse_PtzReset", "Ptz_QuickUse_WatchMode", "Ptz_QuickUse_ManualHumanTrace", "Ptz_QuickUse_LensReset" | string | Range used it to display shortcut function buttons. |

| preset_point_obj | 0-256 | object array | Object of the number of preset point arrays,see Table 4 for more information of member in array. |

| watch_mode_mode | "Mode_Default_Cruise", "Mode_Watch_Point", "Mode_Line_Scan", "Mode_Trace", "Mode_Pattern_Scan" | string | Mode of watch mode. |

| watch_mode_num | 0 - 255 | int | Num of public modes in watch mode.(except linear scan) |

| watch_mode_num | "low", "middle", "high" | string | Linear scan speed in watch mode. |

##### Table 3

| Parameter | Range | Type | Description |

| cmd | "Ptz_Cmd_Up", "Ptz_Cmd_Down", "Ptz_Cmd_Left", "Ptz_Cmd_Right", "Ptz_Cmd_UpLeft", "Ptz_Cmd_UpRight", "Ptz_Cmd_DownLeft", "Ptz_Cmd_DownRight", "Ptz_Cmd_ZoomAdd", "Ptz_Cmd_ZoomMinus", "Ptz_Cmd_FocusAdd", "Ptz_Cmd_FocusMinus", "Ptz_Cmd_IrisAdd", "Ptz_Cmd_IrisMinus", "Ptz_Cmd_CircleCenter", "Ptz_Cmd_Cruise", "Ptz_Change_CruiseTime", "Ptz_Cmd_AddPreset", "Ptz_Cmd_ClearPreset", "Ptz_Cmd_CallPreset", "Ptz_Cmd_AuxiliartOpen", "Ptz_Cmd_AuxiliartClose", "Ptz_Cmd_LockFocus", "Ptz_LineScan_StartPoint", "Ptz_LineScan_EndPoint", "Ptz_Cmd_LineScanSetSpeed", "Ptz_LineScan_CruiseStart", "Ptz_LineScan_CruiseStop", "Ptz_Btn_Default", "Ptz_Zoom_Position", "Ptz_Focus_Position", "Ptz_Zoom_Move", "Ptz_Focus_Move", "Ptz_Btn_AutoFocus", "Ptz_AreaFocus", "Ptz_Btn_Refresh", "Ptz_CalibRationSetting", "Ptz_Tour_Start", "Ptz_Tour_Stop", "Ptz_Pattern_CruiseStart", "Ptz_Pattern_CruiseStop", "Ptz_Pattern_RecordStart", "Ptz_Pattern_RecordStop", "Ptz_Net_Osd", "Ptz_3Dposition", "Ptz_Light", "Ptz_Rain", "Ptz_CalcpadNumSetting", "Ptz_Cmd_NewSceneCalib", "Ptz_Cmd_DefCruise_Start", "Ptz_Cmd_DefCruise_Stop", "Ptz_WatchPoint_Add", "Ptz_Privacy_Mode", "Ptz_Trace_Mode" | string | (only control) |

##### Table 4

| Parameter | Range | Type | Description |

| no | 1-256 | int | The number of preset points can be set up to 255. |

| name | len:1-31 | string | Array preset point name: range 1 to 31 character. |

| add |   | bool | Whether the preset point has been set. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
        "channel":"CH1",
        "preset_point":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "belt_times_use":0,
        "preset_point_obj":
        [
            {
                "no":1,
                "name":"point 1",
                "add":false
            },
            {
                "no":2,
                "name":"point 2",
                "add":false
            },
            {
                "no":3,
                "name":"point 3",
                "add":false
            },
            ...
            {
                "no":254,
                "name":"point 254",
                "add":false
            },
            {
                "no":255,
                "name":"point 255",
                "add":false
            }
        ],
        "watch_mode_time":20,
        "watch_mode_mode":"Mode_Default_Cruise",
        "watch_mode_num":0,
        "line_scan_area":false,
        "line_scan_speed":"low",
        "trace_interval":20,
        "trace_number":0,
        "trace_preset_point":[[],[],[],[]],
        "pattern_scan_number_isset":[true,false,false,false],
        "pattern_scan_number":0,
        "current_cruise_mode":"No_Cruise"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
