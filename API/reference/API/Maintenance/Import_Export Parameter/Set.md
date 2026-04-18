# Set

## Function

This API is used to import and exporting configuration files.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| base_secondary_authentication |   | object | See Login > Request pubkey or randbyte > EncryptObjectTable > Table 4 for parameter description. |

| param |   | string | Base64 |

Sample:

POST /API/Maintenance/ParamManagement/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "param":"kB9be+toauFV21fneBk45GHN018JxEmKIhq0l5CspWmS......HO/mHhE79z3w8XkDD+mzgvxNCMr40/Dq",
        "base_secondary_authentication":
        {
            "seq":2,
            "cipher":"GJF4i4o7nYahUGO16n8sqrMbGhx+NH7B6ehhxRVjOOs="
        }
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| state | "Success", "Failed" | string | Status of the IPC. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "state": "Success"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
