# Get

## Function

This API is used to export configuration files.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| base_secondary_authentication |   | object | See base_secondary_authentication information table for structure members details. |

Sample:

POST /API/Maintenance/ParamManagement/Get HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "base_secondary_authentication":
        {
            "seq":1,
            "cipher":"EvATuCptX+3MBm+BWmKDpHBem0u4YmH4Z7Mf0Jk2gig="
        }
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| param |   | string | Base64,if no device is requested, there is no need to reply to this item. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "param":"kB9be+toauFV21fneBk45GHN018JxEmKIhq0l5CspWmS......HO/mHhE79z3w8XkDD+mzgvxNCMr40/Dq"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
