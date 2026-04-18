# Progress

## Function

This API is used to get upgrade progress.

## Request Message

None.

Sample:

POST /API/Maintenance/FtpUpgrade/Progress HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| upgrade_percent | 0~100 | int | Progress of upgrade processing. |

| upgrade_state | "start", "checkVersion", "downloadStart", "upgrade_download", "upgrade_upgrade_succeed", "downloadFailure", "upgrade_upgrading" | string | Upgrade state. |

| upgrade_result | "ok", "finish" | string | Upgrade result. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "upgrade_percent": 100,
        "upgrade_state": "upgrade_upgrade_succeed",
        "upgrade_result": "ok"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
