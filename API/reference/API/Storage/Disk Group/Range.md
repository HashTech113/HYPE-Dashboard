# Range

## Function

This API is used to get parameter for Storage > Disk Group page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/StorageConfig/DiskGroup/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| disk_group_info |   | JSON array | Disk Group Info Object, see Table 2 for detailed information |

| limit_channel_max |   | int | The maximum number of channels that can be selected for a disk group |

#### Table 2

Disk Group Info Object

| Parameter | Range | Type | Description |

| disk_group_type | None RecordDiskGroup RedundanceDiskGroup | string | Disk group type |

| group_num | 1~MAX_HDD_GROUP_NUM | int | Disk Group Type Video Disk Group Serial Number/Redundant Disk Group Serial Number |

| channel | “CH1”…“CH1x” “IP_CH1”…“IP_CH1x” “WIFI_CH1”…“WIFI_CH1x” | string | Disc group recording channel note: A channel can only be added to one disc group |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "limit_channel_max": 32,
        "disk_group_info": [
            {
                "disk_group_type": "Record Disk Group",
                "group_array": [
                    {
                        "group_num": "Record Disk Group 1 (HDD5)",
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 64,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
                        }
                    },
                    {
                        "group_num": "Record Disk Group 2 (HDD2 HDD4)",
                        "channel": {
                            "type": "array",
                            "min_size": 0,
                            "max_size": 64,
                            "items": {
                                "type": "string",
                                "items": [
                                    "CH1",
                                    "CH2",
                                    "CH3",
                                    "CH4",
                                    "CH5",
                                    "CH6",
                                    "CH7",
                                    "CH8",
                                    "CH9",
                                    "CH10",
                                    "CH11",
                                    "CH12",
                                    "CH13",
                                    "CH14",
                                    "CH15",
                                    "CH16"
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
