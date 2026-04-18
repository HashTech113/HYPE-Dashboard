# Upgrade

## Function

This API is used to IPC upgrade.

## Request Message

file data.

Sample:

POST /API/IPCMaintaint/IPCUpgrade/Upgrade HTTP/1.1

{
    "version":"1.0",
    "data":{
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| ChannelInfo |   | object array | See Table 2 for more information. |

##### Table 2

| Parameter | Range | Type | Description |

| channel |   | string | Channel number. |

| result |   | string | UpgradeResult. |

| reason |   | string | Upgrade error reason. |

| error_code |   | string | The error code corresponding to the cause of the upgrade error, see Maintenance > IPCMaintenance > IPCUpgrade_Code for more information. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":
    {
        "upgrade_token":"39fed489f0c82094abbe536bc47eeac4",
        "upgrade_timeout":1800
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
