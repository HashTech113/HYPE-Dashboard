# Format

## Function

This API is used to set parameter for Storage > Disk page.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| base_secondary_authentication |   | Json Object | For details of encrypted authentication, please refer to the table in the Syntax file under the Request pubkey or randbyte in the Login directory |

| hdd_id |   | int array | Disk serial number |

| hdd_format_type | AllHddData OnlyHddRecord OnlyHddData | string | Hard disk format type /* Format the entire hard disk / / Format only the video partition / / Format only the general partition*/ |

Sample:

POST /API/StorageConfig/Disk/Format HTTP/1.1

{
    "version": "1.0",
    "data": {
        "base_secondary_authentication": {
            "cipher": "oz+j5ICkAxtNjnxGInpxkOLHvsep6Fm5gruG6F0/PCE=",
            "seq": 1
        },
        "hdd_format_type": "AllHddData",
        "hdd_id": [
            1
        ]
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
