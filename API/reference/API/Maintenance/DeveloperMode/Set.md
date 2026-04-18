# Set

## Function

This API is used to set the Developer Mode configuration.

## Request Message

See Maintenance > DeveloperMode > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/Maintenance/DeveloperMode/Set HTTP/1.1

{
    "version":"1.0",
    "data":{
        "ssh_switch":false,
        "export_disk_switch":"Shut Off"
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
