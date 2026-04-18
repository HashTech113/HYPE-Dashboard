# Upgrade

## Function

This API is used to IPC ftp upgrade.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| upgrade_chns |   | string array | IPCs that need to be upgraded. |

Sample:

POST /API/IPCMaintaint/FtpIpcUpgrade/Upgrade HTTP/1.1

{
    "version":"1.0",
    "data":{
        "upgrade_chns":[
            "CH8",
            "CH15",
            "CH16"
        ]
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
