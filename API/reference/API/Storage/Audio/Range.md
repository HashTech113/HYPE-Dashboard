# Range

## Function

This API is used to get parameter range for Storage > Audio page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/DeviceConfig/Audio/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | CH1 CH1x IP_CH1 IP_CH1x WIFI_CH1 WIFI_CH1x The number of channels depends on the functionality of the device | string array | Each array bit represents a channel with a string |

| channel_info |   | JSON Object | Channel Info Object, see Table 2 for detailed information |

| channel_max |   | int | Current device total channel |

| support_copy |   | bool | Does the page support copy (dedicated to NVR and DVR) |

#### Table 2

Channel Info object

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | Channel Object, see Table 3 for detailed information |

| IP_CH1 |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

#### Table 3

Channel object

| Parameter | Range | Type | Description |

| audio_enable |   | bool |   |

| audio_type | G711AG711U ADPCM G726_16K G726_24K G726_32K G726_40K ACC | string | Audio Type |

| in_volume | 0-10 | int | Channel devices in volume |

| out_volume | 0-10 | int | Channel device output volume |

| audio_in | MicIn Lineln | string | Audio input type |

| audioin_enable |   | bool | Audio input sub switch |

| audioout_enable |   | bool | Audio output sub switch |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_max": 16,
        "support_copy": true,
        "channel_info": {
            "type": "object",
            "items": {
                "CH1": {
                    "type": "object",
                    "items": {
                        "copy_ch": {
                            "type": "string",
                            "items": [
                                "digit",
                                "analog",
                                "wifi",
                                "local",
                                "all"
                            ]
                        },
                        "audio_type": {
                            "type": "string",
                            "items": [
                                "G711A",
                                "G711U"
                            ],
                            "hide_items": [

                            ]
                        },
                        "in_volume": {
                            "type": "int32",
                            "min": 0,
                            "max": 10
                        },
                        "out_volume": {
                            "type": "int32",
                            "min": 0,
                            "max": 10
                        }
                    }
                },
                "CH14": {
                    "type": "object",
                    "items": {
                        "copy_ch": {
                            "type": "string",
                            "items": [
                                "digit",
                                "analog",
                                "wifi",
                                "local",
                                "all"
                            ]
                        },
                        "audio_enable": {
                            "type": "bool"
                        },
                        "audio_type": {
                            "type": "string",
                            "items": [
                                "G711A",
                                "G711U"
                            ],
                            "hide_items": []
                        },
                        "in_volume": {
                            "type": "int32",
                            "min": 0,
                            "max": 10
                        },
                        "out_volume": {
                            "type": "int32",
                            "min": 0,
                            "max": 10
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
