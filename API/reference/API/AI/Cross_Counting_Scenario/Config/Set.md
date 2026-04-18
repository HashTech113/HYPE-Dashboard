# Set

## Function

This API is used to set AI > Cross Counting Scenario > Config configuration parameters.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| adSwitch |   | bool | Advertising mode control switch |

| ad_displayMode |   | bool | Keep aspect ratio switch |

| ad_seqTime |   | int | Ad image polling time |

| channel_info |   | JSON object | Channel Information JSON show as follow Table 2 |

| group_info |   | JSON object | Group Information JSON show as follow Table 3 |

Table 2

| Parameter | Range | Type | Description |

| channel_switch |   | bool | Control whether to open the CC scene application function |

| channel_group |   | int | The group number to which the channel belongs, and -1 if not in the group |

| channel_capacity |   | int | Capacity |

| chn_set_enable |   | bool | Whether the channel can be set or not is associated with the second-generation CC function |

| chn_buzzer | "0","10","20","40","60" | string | Buzzer sounding time |

| chn_alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera: Local->1: open, empty value: close |

| chn_latch_time | "10","20","40","60" | string | Alarm output delay time |

Table 3

| Parameter | Range | Type | Description |

| group_switch |   | bool | Control whether to open the CC scene application function |

| group_capacity |   | int | Capacity |

| start_time | 8 | string | Starting time |

| end_time | 8 | string | End Time |

| alarm_type | "Unuse","Person","Vehicle" | string | alarm type: 1：Person，2：Vehicle |

| grp_buzzer | "0","10","20","40","60" | string | Buzzer sounding time |

| grp_alarm_out | “Local->1”… ”Local->x” “IP_CH1->1”… “IP_CH1->2”… ” IP_CHx->1” ” IP_CHx->2” The number of channels depends on the capabilities of the device. | array | Alarm output channel Each array bit represents aalarm output channel with a string. Camera: Local->1: open, empty value: close |

| grp_latch_time | "10","20","40","60" | string | Alarm output delay time |

Sample:

POST /API/AI/Scenario/CC/Config/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "adSwitch": false,
        "ad_displayMode": false,
        "ad_seqTime": 1,
        "channel_info": {
            "CH1": {
                "channel_switch": false,
                "channel_group": -1,
                "channel_capacity": 11,
                "chn_set_enable": false,
                "chn_buzzer": "0",
                "chn_alarm_out": [],
                "chn_latch_time": "20"
            },
            "CH8": {
                "channel_switch": false,
                "channel_group": 4,
                "channel_capacity": 33,
                "chn_set_enable": false,
                "chn_buzzer": "0",
                "chn_alarm_out": [],
                "chn_latch_time": "10"
            }
        },
        "group_info": {
            "Group1": {
                "group_switch": false,
                "group_capacity": 30,
                "start_time": "00:00:00",
                "end_time": "23:59:59",
                "alarm_type": "Person",
                "grp_buzzer": "0",
                "grp_alarm_out": [],
                "grp_latch_time": "10"
            },
            "Group8": {
                "group_switch": false,
                "group_capacity": 10,
                "start_time": "00:00:00",
                "end_time": "23:59:29",
                "alarm_type": "Person",
                "grp_buzzer": "0",
                "grp_alarm_out": [],
                "grp_latch_time": "10"
            }
        }
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
