# ComponentUpgrade

## Function

This API is used to upgrade component.

## Request Message

File data.

Sample:

POST /API/Maintenance/SystemUpgrade/ComponentUpgrade HTTP/1.1

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
    "data": {
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
