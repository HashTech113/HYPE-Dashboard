# Set

## Function

This API is used to reboot device.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| For the structure of | base_secondary_authentication |   | object |

Sample:

POST /API/Maintenance/DeviceReboot/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "cipher" : "0bjEvTI4Lr8jsytAHx8bSXPNk7cuvIFYGCQjIUH2S/sVPnNQO",
        "seq": 0
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
