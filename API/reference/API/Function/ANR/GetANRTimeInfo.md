# GetANRTimeInfo

## Function

This API is used to get parameter for Function > ANR page.

## Request Message

see Function > ANR > SetANRInfo > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/ANRConfig/GetANRTimeInfo HTTP/1.1

{
"data": {
        " device_flag ": "88-DF-58-18-4F-47 "
    }
}

## Response Message

#### table 1

| Parameter | Range | Type | Description |

| start_time |   | unsigned int |   |

| end_time |   | unsigned int |   |

Sample:

HTTP/1.1 200 OK

{
    "result": "success",
    "data": {
        "start_time":1481290144,
        "end_time":1481290249
        }
}

## Error Code

See Response Messages Body and Common error_code for more information.
