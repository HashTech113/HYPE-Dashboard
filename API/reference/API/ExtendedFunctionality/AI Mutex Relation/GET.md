# Get

## Function

This API is used to get parameter for Extended Functionality > AIMutexRelation .

## Request Message

None.

Sample:

POST /API/AIMutexRelation/Get HTTP/1.1
HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

## Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel_info |   | JSON object | Channel Information JSON show as followtable 2 |

#### Table 2

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Channel Information JSON show as followtable 3 |

##### Table 3

| Parameter | Range | Type | Description |

| category |   | JSON array | Channel Information JSON show as followtable 4 |

#### Table 4

| Parameter | Range | Type | Description |

| intelligent_type | "fd" "pvd" "pid" "lcd" "sod" "cc" "cd" "qd" "lpd" "hm" "rsd" "intrusion" "region_entrance" "region_exiting" | string | Intelligent types that can be configured Note: Depending on the device functionality, the actual intelligent type may be less than the allowed configuration type |

| mutex_type | "fd" "pvd" "pid" "lcd" "sod" "cc" "cd" "qd" "lpd" "hm" "rsd" "intrusion" "region_entrance" "region_exiting" | string | intelligent type Indicates the intelligent type that is mutually exclusive with intelligent Type Note: Actual mutex types vary depending on device capabilities |

| mutex_type_between_channel |   | JSON array | (Thermal imaging use)Intelligent type of the mutual exclusion between the schedule_type of other channels and the current channel Note: The actual mutual exclusion type varies according to the device capabilityTable 5 |

#### Table 5

| Parameter | Range | Type | Description |

| channel | “CH1” “CH2” ... | string | Exclusive channel |

| mutex_type | "fd" "pvd" "pid" "lcd" "sod" "cc" "cd" "qd" "lpd" "hm" “rsd” “intrusion” “region_entrance” “region_exiting” | Json array | Intelligent type that is mutually exclusive with schedule_type Note: The actual type varies according to the device capability |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH1": {
                "category": [
                    {
                        "intelligent_type": "fd",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "pvd",
                            "cc",
                            "cd",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "pvd",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "fd",
                            "cc",
                            "cd",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "pid",
                        "mutex_type": [
                            "lcd",
                            "sod",
                            "pvd",
                            "fd",
                            "cc",
                            "cd",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "lcd",
                        "mutex_type": [
                            "pid",
                            "sod",
                            "pvd",
                            "fd",
                            "cc",
                            "cd",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "sod",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "pvd",
                            "fd",
                            "cc",
                            "cd",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "cc",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "pvd",
                            "fd",
                            "cd",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "cd",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "pvd",
                            "fd",
                            "cc",
                            "qd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "qd",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "pvd",
                            "fd",
                            "cc",
                            "cd",
                            "lpd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "lpd",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "pvd",
                            "fd",
                            "cc",
                            "cd",
                            "qd",
                            "hm"
                        ]
                    },
                    {
                        "intelligent_type": "hm",
                        "mutex_type": [
                            "pid",
                            "lcd",
                            "sod",
                            "pvd",
                            "fd",
                            "cc",
                            "cd",
                            "qd",
                            "lpd"
                        ]
                    },
                    {
                        "intelligent_type": "rsd",
                        "mutex_type": []
                    }
                ]
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
