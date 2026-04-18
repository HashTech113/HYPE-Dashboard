# Range

## Function

This API is used to get parameter range for Storage > RAID page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/StorageConfig/Raid/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| disk_info |   | JSON Object | Disk Info Object, see Table 2 for detailed information |

| raid_info |   | JSON Object | Raid Info Object, see Table 3 for detailed information |

| about_raid_info |   | JSON Object | About Raid Info Object, see Table 5 for detailed information |

| create_raid |   | JSON Object | Create Info Object, see Table 6 for detailed information |

| ctrl_info |   | JSON Object | Ctrl Info Object, see Table 8 for detailed information |

#### Table 2

Disk Info Object

| Parameter | Range | Type | Description |

| No | 1~16 | int32 | The page displays the serial number of the hard drive |

| enable |   | bool | Is the hard drive in a configurable state, that is, it can be checked for hot backup or Raid reconstruction |

| check |   | bool | Used to select the current hard drive for hot backup or rebuild Raid |

| id | 0~16 | int32 | The ID number of the hard drive |

| disk_model | max_length:40 | string | Model of hard drive |

| serial_no | max_length:20 | string | The serial number of the hard drive |

| total_size | 2147483647 | int32 | The capacity of the hard drive, in GB |

| array_name | max_length:20 | string | Which RAID disk does the hard disk belong to |

| disk_type | Normal Disk HotDisk Raid Disk | string | Indicates that the hard drive is a regular hard drive, set as a hot spare, and formed into a RAID disk |

| button_type | "Add HotDisk" "Remove HotDisk" "" | string | Display the button to set/release the hot spare operation. If the character is blank, it indicates that the operation is not supported and does not need to be displayed |

| slot_no | max_length:8 | string | The slot number of the hard drive |

#### Table 3

Raid Info Object

| Parameter | Range | Type | Description |

| No |   | int32 | The page displays the serial number of the RAID disk |

| check |   | bool | The page displays the serial number of the RAID disk for selecting the current hard drive for rebuilding the current Raid or deleting operations |

| raid_id | 0~16 | int32 | The page displays the serial number of the RAID disk |

| raid_name | max_length:32 | string | The page displays the name of the RAID disk |

| raid_type | RAID0 RAID1 RAID4 RAID5 RAID0 RAID10 | string | RAID level type |

| total_size | 0~ 2147483647 | int32 | Capacity of RAID disk |

| raid_status | Normal Degrade Offline | string | RAID status, normal, degraded, offline |

| hot_disk | 0~16 | int32 | Number of hot spares for RAID disks |

| sub_disk_list |   | array | The hard disk ID for building a RAID disk |

| rebuild_button | Rebuild RAID | int32 | The display operation reconstructs the current RAID disk button, and an empty string indicates that it does not need to be displayed |

| task |   | object | Task Object,Refer to Table 4 for detailed information |

#### Table 4

Task Object

| Parameter | Range | Type | Description |

| status | None Rebuild Sync | string | RAID disk operation progress, no operation progress, rebuilding RAID (taking very long hours, 3 days or more), synchronizing data |

| progress | 0~100 | int32 | Percentage of operation progress |

#### Table 5

About Raid Info Object

| Parameter | Range | Type | Description |

| max_raid_num | 0~16 | int32 | Support the number of RAID disks to be formed |

| raid_type |   | int32 | List of types that support building RAID |

| hotdisk_type | Public HotDisk | string | There is currently only one type of hot spare supported |

| support_rebuild | No Yes | int | Does it support reconstruction operations |

#### Table 6

Create Raid Object

| Parameter | Range | Type | Description |

| item | OneKeyCreate CreateRaid DeleteRaid AddHotDisk RemoveHotDisk Rebuild | string | Supported Actions |

| raid_type | RAID0 RAID1 RAID4 RAID5 RAID6 RAID10 | string | Supported RAID types for creation |

| disk_info |   | array | A hard disk that can be used to form RAID, Ctrl Disk Info Object, see Table 7 for detailed information |

#### Table 7

Task Object

| Parameter | Range | Type | Description |

| id | 0~16 | int32 | The ID of the hard drive |

| serial_no | max_length:20 | string | The serial number of the hard drive |

| check |   | bool | Check the hard drive used to build RAID |

#### Table 8

Ctrl Info Object

| Parameter | Range | Type | Description |

| item | OneKeyCreate CreateRaid DeleteRaid AddHotDisk RemoveHotDisk Rebuild | sring | Name of the RAID disk to be built |

#### Table 9

| Parameter | Range | Type | Description |

| ctrl | OneKeyCreate CreateRaid DeleteRaid AddHotDisk RemoveHotDisk Rebuild | string | Command for operation (corresponding to JSON when the parameter is get, fill in and modify the parameters and return it) |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "disk_info": {
            "type": "object",
            "items": {
                "No": {
                    "type": "int32",
                    "min": 0,
                    "max": 16
                },
                "enable": {
                    "type": "bool"
                },
                "check": {
                    "type": "bool"
                },
                "id": {
                    "type": "int32",
                    "min": 0,
                    "max": 16
                },
                "disk_model": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 40
                },
                "serial_no": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 20
                },
                "total_size": {
                    "type": "int32",
                    "unit": "GB",
                    "min": 0,
                    "max": 2147483647
                },
                "array_name": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 32
                },
                "disk_type": {
                    "type": "string",
                    "items": [
                        "Normal Disk",
                        "HotDisk",
                        "Raid Disk"
                    ]
                },
                "button_type": {
                    "type": "string",
                    "items": [
                        "",
                        "Add HotDisk",
                        "Remove HotDisk"
                    ]
                },
                "slot_no": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 8
                }
            }
        },
        "raid_info": {
            "type": "object",
            "items": {
                "No": {
                    "type": "int32",
                    "min": 0,
                    "max": 16
                },
                "check": {
                    "type": "bool"
                },
                "raid_id": {
                    "type": "int32",
                    "min": 0,
                    "max": 16
                },
                "raid_name": {
                    "type": "string",
                    "min_len": 1,
                    "max_len": 24
                },
                "raid_type": {
                    "type": "string",
                    "items": [
                        "RAID0",
                        "RAID1",
                        "RAID5",
                        "RAID6",
                        "RAID10"
                    ]
                },
                "total_size": {
                    "type": "int32",
                    "min": 0,
                    "max": 2147483647
                },
                "raid_status": {
                    "type": "string",
                    "items": [
                        "Normal",
                        "Degrade",
                        "Offline"
                    ]
                },
                "hot_disk": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 16
                },
                "sub_disk_list": {
                    "type": "array",
                    "min_size": 0,
                    "max_size": 16,
                    "items": [

                    ]
                },
                "rebuild_button": {
                    "type": "string",
                    "items": [
                        "",
                        "Rebuild RAID"
                    ]
                },
                "task": {
                    "type": "object",
                    "items": {
                        "status": {
                            "type": "string",
                            "items": [
                                "None",
                                "Rebuild",
                                "Sync"
                            ]
                        },
                        "progress": {
                            "type": "int32",
                            "min": 0,
                            "max": 100
                        }
                    }
                }
            }
        },
        "about_raid_info": {
            "type": "object",
            "items": {
                "max_raid_num": {
                    "type": "int32",
                    "min": 0,
                    "max": 16
                },
                "raid_type": {
                    "type": "object",
                    "items": {

                    }
                },
                "hotdisk_type": {
                    "type": "string",
                    "items": [
                        "Global Hot Spare Disk"
                    ]
                },
                "support_rebuild": {
                    "type": "string",
                    "items": [
                        "Not supported",
                        "Supported"
                    ]
                }
            }
        },
        "create_raid": {
            "type": "object",
            "items": {
                "raid_name": {
                    "type": "string",
                    "min_len": 1,
                    "max_len": 24
                },
                "raid_type": {
                    "type": "string",
                    "items": [
                        "RAID0",
                        "RAID1",
                        "RAID5",
                        "RAID6",
                        "RAID10"
                    ]
                },
                "slot_no": {
                    "type": "string",
                    "min_len": 0,
                    "max_len": 8
                },
                "enable": {
                    "type": "bool"
                },
                "disk_info": {
                    "type": "array",
                    "size": 0,
                    "items": [

                    ]
                }
            }
        },
        "ctrl": {
            "type": "string",
            "items": [
                "OneKeyCreate",
                "CreateRaid",
                "DeleteRaid",
                "AddHotDisk",
                "RemoveHotDisk",
                "Rebuild"
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
