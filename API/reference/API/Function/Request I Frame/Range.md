# Range

## Function

This API is used to get parameter range for Function >  Request I Frame  page.

Note:

The Range provides reference information for client UI input limits and API request limits.

## Request Message

{
"chn_no": 0,
“stream_type”:” Mainstream”
}

Sample:

POST/API/RequestIDR HTTP/1.1

{
	“data”: {
    "chn_no": 0,
    “stream_type”:” Mainstream”
}
}

## Response Message

{
“result”:”success”,
“data” : { }
}

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| chn_no |   | int |   |

| stream_type | "Mainstream","Substream","Mobilestream" | string |   |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

POST/API/RequestIDR HTTP/1.1

{
	“data”: {
"chn_no": 0,
“stream_type”:” Mainstream”
}
}

## Error Code

See Response Messages Body and Common error_code for more information.
