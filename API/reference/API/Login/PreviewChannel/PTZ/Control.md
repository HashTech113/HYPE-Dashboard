# Control

## Function

This API is used to control PTZ.

## Request Message

### Parameter Description

See PreviewChannel > PTZ > Get > Parameter Description > Table 2 for parameter description.

Simple 1.Refresh ptz parameters:

POST /API/PreviewChannel/PTZ/Control HTTP/1.1

{
  "version": "1.0",
  "data": {
    "channel": "CH2",
    "cmd": "Ptz_Btn_Refresh",
    "speed": 50,
    "zoom_step": 5,
    "zoom_slider": 1,
    "focus_step": 1,
    "focus_slider": 180
  }
}

Simple 2.increase focus:

POST /API/PreviewChannel/PTZ/Control HTTP/1.1

{
  "version": "1.0",
  "data": {
    "channel": "CH2",
    "cmd": "Ptz_Cmd_FocusAdd",
    "state": "Stop",
    "speed": 50,
    "zoom_step": 5,
    "zoom_slider": 2,
    "focus_step": 1,
    "focus_slider": 126
  }
}

Simple 3.auto focus:

POST /API/PreviewChannel/PTZ/Control HTTP/1.1

{
  "version": "1.0",
  "data": {
    "channel": "CH2",
    "cmd": "Ptz_Btn_AutoFocus",
    "speed": 50,
    "zoom_step": 5,
    "zoom_slider": 2,
    "focus_step": 1,
    "focus_slider": 127
  }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
