# Progress

## Function

This API is used to set parameter for Storage > Disk page.

## Request Message

None.

Sample：

POST /API/StorageConfig/Disk/Format/Progress HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| hdd_id |   | int array | Disk serial number |

| hdd_format_state | Formatting Ok | string | Hard drive status |

| hdd_format_percent | 0~100 | int | Format Progress |

| hdd_format_info |   | json array | HddFormat Info Object, see Table 2 for detailed information |

Table 2

NetHdd Object

| Parameter | Range | Type | Description |

| hdd_id |   | Int | hdd id |

| hdd_format_result | Idle Ok InvalidParam NoExist HwError Failed Oversized | string | Format Result /* Format Not Started / / Success / / Illegal Parameter / / No Hard Disk / / Hardware Error / / Failure / / Excessive Mount Capacity*/ |

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "hdd_id": 1,
        "hdd_format_state": "Formatting",
        "hdd_format_percent": 12
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
