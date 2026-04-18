# Check

## Function

This API is used to check for upgrade.

## Request Message

None.

Sample:

POST /API/Maintenance/FtpUpgrade/Check HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| has_new_firmware |   | bool | Whether has a new upgrade firmware. |

| current_ver |   | string | Current version. |

| new_version |   | string | New version. |

| Upgrade_button |   | bool | Whether the update button can be clicked. |

| lang_strs |   | string | Update package tips. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "Upgrade_button": true,
        "lang_strs": {},
        "has_new_firmware": true,
        "cur_version": "",
        "new_version": ""
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
