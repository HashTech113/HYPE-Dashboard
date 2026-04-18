# Range

## Function

This API is used to get parameter range for Channel  > Channel Configuration page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/ChannelConfig/Range HTTP/1.1

To be added

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel | “CH1”…”CH1x” | string array | Each array bit represents a channel with a string. |

#### Table 2

| Parameter | Range | Type | Description |

| channel_max |   | int Json Object | Maximum number of channels. |

| limit_wireless_max |   | int | Maximum number of wireless channels. |

| channel_info |   | Json Object | JSON shows as follow Table 3 |

#### Table 3

| Parameter | Range | Type | Description |

| CH1 |   | Json Object | JSON shows as follow Table 4 |

| … |   | Json Object |   |

| CHx |   | Json Object |   |

#### Table 4

| Parameter | Range | Type | Description |

| camera_type | "Digital" "Wireless" | string | Mode of the current channel. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

To be added.

## Error Code

See Response Messages Body and Common error_code for more information.
