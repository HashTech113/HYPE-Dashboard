# Set

## Function

This API is used to set parameter for Event > Http listening page.

## Request Message

refer to Event > event check > Range > Parameter Description  > table 1

Sample:

POST /API/AlarmConfig/EventPush/Set HTTP/1.1

{
    "version": "1.0",
    "data": {"params": {
        "name": "",
        "table": {
            "username": "",
            "password_empty": true,
            "addr": "",
            "port": 123,
            "url": "API/AlarmEvent/EventPush",
            "enable": false,
            "method": "POST",
            "keep_alive_interval": "0",
            "push_way": "HTTP",
            "udp_method": "Broadcast",
            "udp_addr": "255.255.255.255",
            "udp_port": 5000
        }
    }}
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
