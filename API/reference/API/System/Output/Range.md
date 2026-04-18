# Range

## Function

This API is used to get parameter range for System > Output page.

Note:

The Range provides reference information for client UI input limits and API request limits. When sending Get and Set requests, the parameters must be strictly limited according to the Range, otherwise the request may be rejected by the device.

## Request Message

None.

Sample:

POST /API/SystemConfig/Output/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| output |   | object | Output object,see Table 2 for more information |

#### Table 2

Output object

| Parameter | Range | Type | Description |

| LIVE-OUT |   | object | LIVE-OUT object,see Table 3 for more information |

#### Table 3

LIVE-OUT object

| Parameter | Range | Type | Description |

| output_resolution | "1024x768" "1280x1024" "1440x900" "720P(1280x720)" "1080P(1920x1080)" "1600x1200" "1920x1200" "2K(2560x1440)" "4K(3840x2160)" | string | The VGA resolution of the current output display, the maximum range depends on the maximum resolution supported by the device. |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "output": {
            "type": "object",
            "items": {
                "LIVE-OUT": {
                    "type": "object",
                    "items": {
                        "output_resolution": {
                            "type": "string",
                            "items": [
                                "1024x768",
                                "1280x1024",
                                "1440x900",
                                "720P(1280x720)",
                                "1080P(1920x1080)",
                                "1600x1200",
                                "1920x1200",
                                "2K(2560x1440)",
                                "4K(3840x2160)"
                            ]
                        }
                    }
                }
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
