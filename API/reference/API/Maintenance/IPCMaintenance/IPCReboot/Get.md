# Get

## Function

This API is used to NVR get IPC parameter.

## Request Message

None.

Sample:

POST /API/IPCMaintaint/IPCReboot/Get HTTP/1.1

{
    "version":"1.0",
    "data":
    {
    }
}

## Response Message

See Maintenance > IPCMaintenance > Load Default > Get > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "channel_info": {
            "CH14": {
                "status": "Online",
                "ip_address": "172.16.11.201",
                "software_version": "V21.45.8.2.2_220705"
            },
            "CH16": {
                "status": "Online",
                "ip_address": "172.16.11.162",
                "software_version": "V45.85.8.2.3_230620"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
