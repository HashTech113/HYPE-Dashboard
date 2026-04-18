# Default

## Funtion

This API is used to restore the default Alarm > Floodlight parameters.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| channel | "CH1" | string array |   |

Sample:

POST /API/AlarmConfig/Deterrence/Default HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "channel":["CH1"]
    }
}

## Response Message

None.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
