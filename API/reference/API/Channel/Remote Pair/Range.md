# Range

## Function

This API is used to get a range of remote pairing parameters.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/Login/ChannelPairing/Range HTTP/1.1

To be added.

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel |   | int | Channel number for remote pairing. |

| pair_status |   | int | Remote pair operation command, 1: pair, 0: unpair. |

#### Table 2

| Parameter | Range | Type | Description |

| state | Max_length:20 | string | Status of remote pairing. pairing Device is busy. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

To be added.

## Error Code

See Response Messages Body and Common error_code for more information.
