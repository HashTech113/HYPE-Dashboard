# Range

## Function

This API is used to get parameter range for Storage > Disk page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/StorageConfig/Disk/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| disk_info |   | JSON array | Disk Info object, see Table 2 for detailed information |

| over_write | Off Auto 1Day 3Days 7Days 14Days 30Days 90Days | string | Disk replication type |

| esata_record |   | bool | E-SATA recording function switch |

| support_format |   | bool | Used to display the formatting button |

| default_timeout | 1~120000 unit: ms | int | Session timeout field |

| hdd_format_type | AllHddData OnlyHddRecord OnlyHddData | string | Hard disk format type /* Format the entire hard disk / / Format only the video partition / / Format only the general partition*/ |

#### Table 2

Disk Info Object

| Parameter | Range | Type | Description |

| id |   | int | Disk serial number |

| display_id |   | int | Disk display serial number (dedicated to NVR and DVR) |

| model | Max length: 40 byte | string | Disk model |

| serial_no | Max length: 20 byte | string | disk serial number |

| firmware | Max length: 8 byte | string | Disk firmware model |

| device_type | None Normal Esata Sd Usb Network Raid All | string | disk type |

| active | Inactive Active | string | Disk working status |

| status | NoHdd Unformat Normal Full ReadOnly HddError Connecting Offline Occupied Oversized Broken Degrade Rebuilding Backup RaidHdd | string | Disk status |

| total_size | Unit: Megabytes | int | Total capacity |

| free_size | Unit: Megabytes | int | remaining capacity |

| total_time | Unit: seconds | int | total time |

| free_time | Unit: seconds | int | remaining time |

| format_enable |   | bool | Can I format it |

| delete_enable |   | bool | Can I delete it |

| disk_type | ReadAndWriteDisk RedundantDisk ReadOnlyDisk | string | Disk group type |

| disk_group_id |   | int | Disk group serial number |

| NasMaxCount |   | int | Maximum number of supported NAS disks |

| nas_info |   | Json Object | Nas Info Object, see Table 3 for detailed information |

Note:
Except for disk in Table 2 Type, disk_ Group_ ID, NasMaxCount, nas_ Other fields of info are only allowed to be obtained and do not support setting

#### Table 3

Channel Object

| Parameter | Range | Type | Description |

| Enable |   | int | enabled |

| Index |   | int | Network disk serial number |

| Type | NFS SMB/CIFS | string | Protocol(NFS SMB/CIFS) |

| Username |   | string | username |

| Password |   | string | password |

| password_empty |   | bool | Do you have a password |

| Ip |   | string | IP |

| Dir |   | string | directory path |

| Size |   | Int | Hard disk capacity (GB) |

| TotalSize | 1~8192 | int | Total size |

| base_enc_password |   | Json Object | Please refer to the table in the Syntax file under the Request pubkey or randbyte in the Login directory for encryption password details |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "disk_info": {
            "type": "array",
            "min_size": 0,
            "max_size": 18,
            "items": [
                {
                    "id": {
                        "type": "int32",
                        "min": 1,
                        "max": 21
                    },
                    "display_id": {
                        "type": "int32",
                        "min": 1,
                        "max": 21
                    },
                    "model": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 40
                    },
                    "serial_no": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 20
                    },
                    "firmware": {
                        "type": "string",
                        "min_len": 0,
                        "max_len": 8
                    },
                    "device_type": {
                        "type": "string",
                        "items": [
                            "None",
                            "Normal",
                            "Esata",
                            "Sd",
                            "Usb",
                            "Network",
                            "Raid",
                            "All"
                        ]
                    },
                    "status": {
                        "type": "string",
                        "items": [
                            "NoHdd",
                            "Unformat",
                            "Normal",
                            "Full",
                            "ReadOnly",
                            "HddError",
                            "Connecting",
                            "Offline",
                            "Occupied",
                            "Oversized",
                            "Broken",
                            "Degrade",
                            "Rebuilding",
                            "Backup",
                            "RaidHdd"
                        ]
                    },
                    "total_size": {
                        "type": "int32",
                        "unit": "MB",
                        "min": 0,
                        "max": 2147483647
                    },
                    "free_size": {
                        "type": "int32",
                        "unit": "MB",
                        "min": 0,
                        "max": 2147483647
                    },
                    "total_time": {
                        "type": "int32",
                        "unit": "second",
                        "min": 0,
                        "max": 2147483647
                    },
                    "free_time": {
                        "type": "int32",
                        "unit": "second",
                        "min": 0,
                        "max": 2147483647
                    },
                    "format_enable": {
                        "type": "bool"
                    },
                    "delete_enable": {
                        "type": "bool"
                    },
                    "disk_type": {
                        "type": "string",
                        "items": [
                            "ReadAndWriteDisk",
                            "RedundantDisk",
                            "ReadOnlyDisk"
                        ]
                    },
                    "nas_info": {
                        "type": "array",
                        "min_size": 0,
                        "max_size": 8,
                        "items": [
                            {
                                "Enable": {
                                    "type": "int32",
                                    "min": 0,
                                    "max": 1
                                },
                                "Index": {
                                    "type": "int32",
                                    "min": 0,
                                    "max": 7
                                },
                                "Type": {
                                    "type": "string",
                                    "items": [
                                        "NFS",
                                        "SMB/CIFS"
                                    ]
                                },
                                "Username": {
                                    "type": "string",
                                    "min_len": 1,
                                    "max_len": 63
                                },
                                "Password": {
                                    "type": "string",
                                    "min_len": 1,
                                    "max_len": 63
                                },
                                "password_empty": {
                                    "type": "bool"
                                },
                                "Ip": {
                                    "type": "string",
                                    "min_len": 1,
                                    "max_len": 15
                                },
                                "Dir": {
                                    "type": "string",
                                    "min_len": 1,
                                    "max_len": 32
                                },
                                "Size": {
                                    "type": "int32",
                                    "unit": "GB",
                                    "min": 33,
                                    "max": 8192
                                },
                                "TotalSize": {
                                    "type": "int32",
                                    "unit": "GB",
                                    "min": 33,
                                    "max": 8192
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "default_timeout": 60000,
        "NasMaxCount": {
            "type": "int32",
            "min": 1,
            "max": 8
        },
        "over_write": {
            "type": "string",
            "items": [
                "Off",
                "Auto",
                "1Day",
                "3Days",
                "7Days",
                "14Days",
                "30Days",
                "90Days"
            ]
        },
        "hdd_format_type": {
            "type": "string",
            "items": [
                "AllHddData",
                "OnlyHddRecord",
                "OnlyHddData"
            ]
        },
        "support_format": {
            "type": "bool"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
