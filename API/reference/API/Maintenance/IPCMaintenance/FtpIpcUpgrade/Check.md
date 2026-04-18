# Check

## Function

This API is used to check for IPC upgrade.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| check_chns |   | string array | The IPC that needs to be detected. |

Sample:

POST /API/IPCMaintaint/FtpIpcUpgrade/Check HTTP/1.1

{
    "version":"1.0",
    "data":{
        "check_chns":[
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
