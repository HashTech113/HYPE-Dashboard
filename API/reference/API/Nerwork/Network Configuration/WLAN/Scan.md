# Scan

## Function

This API is used to get wifi list for Network > WLANScan.

## Request Message

None

Sample：

POST /API/NetworkConfig/ScanWlan/Scan HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| wifi_info |   | JSON array | JSON，see Table 2 for more information |

###### Table 2

| Parameter | Range | Type | Description |

| ssid | Max length:35byte | string | WIFI SSID |

| signal_strength | 0-4 | int | WiFi Signal Strength tip:only use for ScanWlan |

| security | Max length:128byte | string | WiFi Signal Strength tip:only use for ScanWlan |

| password | Max length:35byte | string | WIFI password tip:only use for JoinWlan |

| base_enc_password |   | Json Object | encrypted password,see base_secondary_authentication for more information |

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"wifi_info": [
        {
            "ssid": "TP-LINK_80AA",
            "signal_strength": 4,
            "security": "[WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]"
        },
        ...
        {
            "ssid": "YF-RJ-05",
            "signal_strength": 0,
            "security": "[WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]"
        }
    ]}
}

## Error Code

See Response Messages Body and Common error_code for more information.
