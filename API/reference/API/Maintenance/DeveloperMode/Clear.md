# Clear

## Function

This API is used to clear configuration file which in disk.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| base_secondary_authentication |   | object | Encrypted information for authentication. See base_secondary_authentication information table for structure members details. |

| delete_type | "NVR_Ipc", "NVR_Local" | string | Clear log type, default is NVR log. "NVR_Ipc": the ipc log stored on the NVR. "NVR_Local": NVR log. |

Sample:

POST /API/Maintenance/DeveloperMode/Clear HTTP/1.1

{
    "version": "1.0",
    "data": {
        "base_secondary_authentication": {
            "seq": 1,
            "cipher": "CowFtnYJVzraDlE+OngLJfGaS7FXFjy6zXkILkSzB3A="
        },
        "delete_type": "NVR_Ipc"
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
