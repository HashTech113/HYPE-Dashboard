# Range

## Function

This API is used to get parameter range for System > NTP page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/SystemConfig/NTP/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| ntp_enable | boolean | boolean | NTP switch |

| server | "time.windows.com" "time.nist.gov" "pool.ntp.org" "UserDefined" | string | NTP server address |

| custom_server | Max length: 63byte | string | Custom server address. Use this field when the server field is "UserDefined". |

| sync_period | 0-65535 | int32 | NTP server synchronization period |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ntp_enable": {
            "type": "bool"
        },
        "server": {
            "type": "string",
            "items": [
                "time.windows.com",
                "time.nist.gov",
                "pool.ntp.org",
                "UserDefined"
            ]
        },
        "custom_server": {
            "type": "string",
            "min_len": 0,
            "max_len": 63
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
