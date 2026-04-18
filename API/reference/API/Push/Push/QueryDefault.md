# QueryDefault

## Function

This API is used to restore default push.

## Request Message

None.

Sample:

POST /API/Push/QueryDefault HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| types |   | object | Default parameters, see Push > Query > Parameter Description > Table 3 for details. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "Types": {
            "StorageError": "True",
            "StorageFull": "True",
            "StorageUnformatted": "True",
            "StorageNull": "True",
            "StorageReadOnly": "True",
            "Motion": "True",
            "IOAlarm": "True",
            "PIRAlarm": "True",
            "LCD": "True",
            "PID": "True",
            "PD&VD": "True",
            "FD": "True",
            "AD": "True",
            "CC": "True",
            "CD": "True",
            "QD": "True",
            "RSD": "True",
            "LPD": "True",
            "SOD": "True",
            "VT": "True",
            "SD": "True",
            "VideoLoss": "True"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
