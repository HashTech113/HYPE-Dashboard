# Range

## Function

This API is used to set parameter for Storage > Cloud page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/StorageConfig/Cloud/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| accesstoken | 1-128 | string | Token after Dropbox activation |

#### Table 2

| Parameter | Range | Type | Description |

| cloud_storage |   | bool | Cloud storage function switch |

| cloud_type | DROPBOX Google Drive | string | Cloud storage type |

| cloud_status | Activated CloudFull Unactivated NetworkBlocked Disabled | string | Cloud storage connection status (DVR/NVR only) Note: only access is allowed, and setting is not supported |

| total_size | unit：byte | unsigned long long | Total capacity (DVR/NVR dedicated) Note: Only allowed for acquisition, not supported for setting |

| used_size | unit：byte | unsigned long long | Used capacity (DVR/NVR dedicated) Note: Only allowed to obtain, not supported for setting |

| cloud_over_write | Off Auto 1Day 3Days 7Days 14Days 30Days 90Days | string | Cloud storage data overwrite time (DVR/NVR dedicated) |

| video_type | RF AVI MP4 | string | Video file type (DVR/NVR specific) |

| channel_info |   | JSON array | Channel Info Object, please refer to Table 3 for details |

| channel_max |   | int | The total number of channels in the current device |

#### Table 3

Channel Info Object

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Channel Object, see Table 4 for detailed information |

| IP_CH1 |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

#### Table 4

Channel Object

| Parameter | Range | Type | Description |

| channel | 0 ~ Maximum number of channels | string | channel number |

| folder_name | Max length：63 byte | string | The folder created by each channel on Cloud storage Note: the folder name must conform to the file name specification, and illegal characters are not allowed |

#### Table 5

| Parameter | Range | Type | Description |

| cloud_type | DROPBOX Google Drive | string | Cloud storage type |

#### Table 6

| Parameter | Range | Type | Description |

| url |   | string | Request Connection URL |

| code |   | string | Verification code (for Google Drive Cloud storage) |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "cloud_storage": {
            "type": "bool"
        },
        "cloud_type": {
            "type": "string",
            "items": [
                "DROPBOX",
                "Google Drive"
            ]
        },
        "cloud_status": {
            "type": "string",
            "items": [
                "Activated",
                "CloudFull",
                "Unactivated",
                "NetworkBlocked",
                "Disabled"
            ]
        },
        "total_size": {
            "type": "string",
            "min_len": 0,
            "max_len": 20
        },
        "used_size": {
            "type": "string",
            "min_len": 0,
            "max_len": 20
        },
        "progress": {
            "type": "int32",
            "min": 0,
            "max": 100
        },
        "cloud_over_write": {
            "type": "string",
            "items": [
                "OFF",
                "Auto",
                "1Day",
                "3Days",
                "7Days",
                "14Days",
                "30Days",
                "90Days"
            ]
        },
        "video_type": {
            "type": "string",
            "items": [
                "RF",
                "AVI",
                "MP4"
            ]
        },
        "channel_max": 16,
        "channel_info": {
            "type": "object",
            "items": {
                "CH1": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH5": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH6": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH7": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH11": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH14": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH15": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                },
                "CH16": {
                    "type": "object",
                    "items": {
                        "folder_name": {
                            "type": "string",
                            "min_len": 0,
                            "max_len": 62
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
