# Get

## Function

This API contains parameters for setting light and sound sirens.

## Request Message

None.

Sample:

POST /API/PreviewChannel/ManualAlarm/Get HTTP/1.1

{
    "version": "1.0",
    "data":{
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| Local->1 |   | bool | Local->1 channel alarm switch |

| ...... |   | bool | ...... |

| Loca->x |   | bool | Local->x channel alarm switch |

| IP_CH1->1 |   | bool | IP_CH1->1 channel alarm switch |

| ...... |   | bool | ...... |

| IP_CHx->x |   | bool | IP_CHx->x channel alarm switch |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{
        "Local->1": false,
        "IP_CH1->1": false,
        "IP_CH12->1": false
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
