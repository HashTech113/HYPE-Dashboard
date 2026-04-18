# Set

## Function

This API is used to set wifi AP parameter for Network > WLANScan.This API interface will only be registered and enabled in AP mode.

## Request Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| ssid |   | string | route ssid |

| encryptionType |   | string | NONE/WEP/WPA-PSK/WPA2-PSK/WPA-NONE |

| cloudhost |   | string |   |

| cloudport |   | int |   |

| base_enc_password |   | Json Object | wifi route password，encrypted password，see base_secondary_authentication for more information |

## Response Message

None

## Error Code

See Response Messages Body and Common error_code for more information.
