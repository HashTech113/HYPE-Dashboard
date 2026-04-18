# Set

## Function

This API is used to set wifi type parameter for Network > WLANScan.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| restart_to_match_wifitype |   | bool | Do you want to restart the board end |

| current_wifitype |   | int | wifi type(0:MT7601;1:WN650BT) |

Sample：

POST /API/APNetworkCfg/WifiStaParam/Set HTTP/1.1

{
    "version": "1.0",
    "data":
    {
        "restart_to_match_wifitype": false,
        "current_wifitype": 1
    }
}

## Response Message

None

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "version": "1.0",
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
