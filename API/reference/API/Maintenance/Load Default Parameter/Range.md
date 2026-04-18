# Range

## Function

This API is used to get the parameter range for Load Default page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/Maintenance/Reset/Range HTTP/1.1

{
    "version": "1.0",
    "data": {
    }
}

## Response Message

## Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| channel |   | bool | Reset Channel related parameters. |

| record |   | bool | Reset record related parameters.Reset record related parameters |

| event |   | bool | Reset alarm related parameters.Reset alarm related parameters |

| ai |   | bool | Reset AI related parameters.Reset ai related parameters |

| network |   | bool | Reset Network related parameters.Reset network related parameters |

| device |   | bool | Reset Device related parameters.Reset device related parameters |

| system |   | bool | Reset System related parameters.Reset system related parameters |

| secondary_authentication | Max length: 16 | string | Verify admin user password for secondary authentication. |

| intelligent |   | bool Reset Intellight related parameters. | Reset intelligent related parameters |

| except_network_param |   | bool | Reset parameters except Network. |

| base_secondary_authentication |   | Json Object | Encrypted authentication structure, see base_secondary_authentication information table for more information. |

| default_timeout | 1~120000ms | int | Session timeout field, unit: ms |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel": {
            "type": "bool"
        },
        "record": {
            "type": "bool"
        },
        "event": {
            "type": "bool"
        },
        "ai": {
            "type": "bool"
        },
        "network": {
            "type": "bool"
        },
        "except_network_param": {
            "type": "bool"
        },
        "device": {
            "type": "bool"
        },
        "system": {
            "type": "bool"
        },
        "secondary_authentication": {
            "type": "string",
            "min_len": 0,
            "max_len": 16
        },
        "default_timeout": 60000
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
