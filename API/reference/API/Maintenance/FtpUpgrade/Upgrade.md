# Upgrade

## Function

This API is used for online upgrades.

## Request Message

None.

Sample:

POST /API/Maintenance/FtpUpgrade/Upgrade HTTP/1.1

{
    "version":"1.0",
    "data":{
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
