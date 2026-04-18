# Get

## Function

This API is used for get Remote Setting page parameters.

## Request Message

None.

Sample:

POST /API/Login/DevicePage/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| main |   | object array | Level 1 menu array,see Table 2 for more information of array member. |

##### Table 2

| Parameter | Range | Type | Description |

| title | len:0-64 | string | Level one menu title, "Display", "Record", "Alarm", "AI", "Network", "Storage", "System", "Intelligent". |

| sub |   | object array | Level 2 menu array,see Table 3 for more information of array member. |

##### Table 3

| Parameter | Range | Type | Description |

| title | len:0-64 | string | Title of level 2 menu. |

| pages |   | object array | Level 3 menu array,see Table 4 for more information of array member. |

##### Table 4

| Parameter | Range | Type | Description |

| title | len:0-64 | string | Title of level 3 menu. |

| page | len:0-64 | string | Page name in level 3 menu, confirm this with the client. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "main":[  //Level 1 menu
        {
            "title":"Channel",
            "sub":
            [   //Level 2 menu
                {
                    "title":"Channel",
                    "pages":
                    [ //Level 3 menu, corresponding to a single page
                        {
                            "title":"IP Channels",//name
                            "page":"chn_ipChn"//web page
                        },
                        {
                            "title":"Protocol Manage",
                            "page":"chn_protocolMng"
                        }
                    ]
                },
                ...
            ]
        },
        {
            ...
        },
        ...
    ]
}

## Menu list

see Web Pages for more information.

## Error Code

See Response Messages Body and Common error_code for more information.
