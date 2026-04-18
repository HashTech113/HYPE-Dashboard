# Range

## Function

This API is used to get parameter range for Channel  > Video Crop page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/VideoCrop/Range HTTP/1.1

To be added

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” “IP_CH1”…” IP_CH1x” “WIFI_CH1”…” WIFI_CH1x” The number of channels depends on the capabilities of the device. | string array | Each array bit represents a channel with a string. |

#### Table 2

| Parameter | Range | Type | Description |

| channel_info |   | JSON Object | Channel Information JSON show as follow Table 3 |

| channel_max |   | int | Maximum number of channels. |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON show as follow Table 4 |

| … |   | Json Object |   |

| IP_CH1 |   | Json Object |   |

| … |   | Json Object |   |

| WIFI_CH1 |   | Json Object |   |

| … |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| status | "Offline", "Online" | string | Channel online status, only for digital channels. Note: This field does not exist when the channel is online. |

| enable |   | bool | Enable switch. |

| fps | 1-10 | int | Crop Fps |

| zone_info |   | JSON array | JSON show as follow Table 5 Note: Currently only two regions are supported. |

#### Table 5

| Parameter | Range | Type | Description |

| zone_no | 1-2 | int | Zone number |

| rect |   | JSON object | JSON show as follow Table 6 |

#### Table 6

| Parameter | Range | Type | Description |

| left | 0-704 | int | Left |

| top | 0-576 | int | Top |

| width | 0-704 | int | Width |

| height | 0-576 | int | Height |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

To be added.

## Error Code

See Response Messages Body and Common error_code for more information.
