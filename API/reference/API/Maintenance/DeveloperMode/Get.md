# Get

## Function

This API is used to get the developer mode page parameters.

## Request Message

None.

Sample:

POST /API/Maintenance/DeveloperMode/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Maintenance > DeveloperMode > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ssh_switch": false,
        "export_disk_switch": "Shut Off",
        "enable_export": true,
        "enable_delete": true,
        "support_ipc_log_export": true,
        "support_ipc_log_delete": true,
        "channel_info": {
            "CH1": {
                "log_collect_enable": true,
                "support_logcollection": false
            },
            ...
            "CH16": {
                "log_collect_enable": false,
                "support_logcollection": false
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
