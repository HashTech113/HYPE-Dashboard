# join

## Function

This API is used to add wifi parameter for Network > WLANScan.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| network_mode_type | "Dhcp" "Static" | string | network model |

| ip_address |   | string | ip address |

| subnet_mask |   | string | subnet mask |

| gateway |   | string | gateway |

| ssid | Max length:35byte | string | WIFI SSID |

| base_enc_password |   | Json Object | See base_secondary_authentication。 |

Sample：

POST /API/NetworkConfig/ScanWlan/Join HTTP/1.1

{
    "version": "1.0",
    "data": {
        "ssid": "TPXXX",
        "base_enc_password": {
            "seq": 0,
            "peer_key": "06AX8xRt+bAfD+jV8UpMl+zIcbNkakYIFi3X7YlBWhgs=",
            "cipher": "0WwwRvSgRDydPvrCqmbZrHRcpjsEYC+TbW8tDVNzQPvP6OvHZ"
        }
    }
}

## Response Message

None

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
