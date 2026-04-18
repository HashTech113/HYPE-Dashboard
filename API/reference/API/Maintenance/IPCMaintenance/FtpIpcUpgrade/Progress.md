# Progress

## Function

This API is used to get IPC update progress.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| upgrade_chns |   | string array | Need to upgrade the IPCs. |

Sample:

POST /API/Maintenance/FtpUpgrade/Progress HTTP/1.1

{
    "version": "1.0",
    "data": {
        "upgrade_chns":[
            "CH8",
            "CH15",
            "CH16"
        ]
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| cur_ipc |   | string array | Currently upgrading IPC. |

| upgrade_percent |   | int | FTP download IPC upgrade file progress. |

| upgrade_state |   | string | FTP upgrade IPC status, see Maintenance > IPCMaintenance > IPCUpgrade_Code . |

| upgrade_result |   | string | FTP upgrade IPC result, see Maintenance > IPCMaintenance > IPCUpgrade_Code . |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "cur_ipc": [],
        "upgrade_percent": 100,
        "upgrade_state": "upgrade_upgrade_succeed",
        "upgrade_result": "ok"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
