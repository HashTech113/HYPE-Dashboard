# Get

## Function

This API is used to get parameter for AI > Setup > Rare Sound Detection  page.

## Request Message

See AI > Setup > Rare Sound Detection > Range > Parameter Description > Table 1for parameter description.

Sample:

POST /API/AI/Setup/RSD/Get HTTP/1.1

{
    "version": "1.0",
    "data": {"page_type": "ChannelConfig"}
}

## Response Message

See AI > Setup > Rare Sound Detection > Range > Parameter Description > Table 2for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"channel_info": {"CH1": {
        "status": "Online",
        "switch": false,
        "sensitivity": 60,
        "detection_type": ["Baby Crying Sound"]
    }}}
}

## Error Code

See Response Messages Body and Common error_code for more information.
