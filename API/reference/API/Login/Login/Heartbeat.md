# Heartbeat

## Function

This API is used to send heartbeat, and send a heartbeat request every 30s after login to ensure that the heartbeat does not expire after timeout.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| keep_alive |   | bool | Keep session live. |

Sample:

POST /API/Login/Heartbeat HTTP/1.1

{
    "version": "1.0",
    "data": {
        "keep_alive": true
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
