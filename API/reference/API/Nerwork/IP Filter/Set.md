# Set

## Function

This API is used to set Network > IP Filter parameters.

## Request Message

### Parameter Description

See Network > IP Filter > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/NetworkConfig/IPFilter/Set HTTP/1.1

{
    "version":"1.0",
    "data":
    {
        "enable":true,
        "choose":"Whitelist",
        "restricted_type":"Whitelist",
        "whitelist":[
            {
                "ip_type":"Ipv4",
                "start_address":"192.193.1.223",
                "end_address":"192.193.1.223"
            }
        ],
        "blacklist":[]
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

###### Table 1

| error_code | commet |

| ip_filter_list_empty | The blacklist/whitelist is empty |

See Table 1, Response Messages Body and Common error_code for more information.
