# Range

## Function

This API is used to get parameter range for Channel  > Protocol Manage page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/ChannelConfig/ProtocolManage/Range HTTP/1.1

To be added

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| protocol_info |   | JSON Object | JSON show as follow Table 2 |

#### Table 2

| Parameter | Range | Type | Description |

| protocol1 |   | Json Object | JSON show as follow Table 3 |

| … |   | Json Object |   |

| protocol16 |   | Json Object |   |

#### Table 3

| Parameter | Range | Type | Description |

| protocol_name | Max length: 15byte | string |   |

| custom_stream |   | Json array | JSON show as follow Table 4 |

#### Table 4

| Parameter | Range | Type | Description |

| stream_name | “Mainstream” “Substream” | string |   |

| enable |   | bool | The Substream is available only when the code stream is enabled. |

| type | “Rtsp” | string |   |

| port | 1-65535 | int |   |

| source_path | Max length: 119byte | string |   |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

To be added.

## Error Code

See Response Messages Body and Common error_code for more information.
