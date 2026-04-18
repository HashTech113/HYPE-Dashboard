# Login

## Function

This API is used to transmit the user password to encrypted key, Used before login when device isnot activated.

## Request Message

### Parameter Description

See Login > Request pubkey or randbyte > Maintenance > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/Login/TransKey/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
        "type": [
            "base_salt",
            "base_x_public"
        ]
    }
}

## Response Message

### Parameter Description

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| key_lists |   | object array | Array of key structures, see Table 3 for more details. |

##### Table 3

| Parameter | Range | Type | Description |

| type | "base_salt ", "base_x_public" | string | "base_salt": PBKDF2_SHA256 secondary authentication; "base_x_public" password transmission. |

| key | len:0-1024 | string | hexadecimal random number string, which needs to be converted. The public key is in plain text and is transmitted by Base64. |

| iter | 0-1000000 | int | Number of iterations for PBKDF2_SHA256. |

| seq | 0-1000000 | int | Each key corresponds to a seq, which must be passed in while transmitting encrypted data. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data":
    {
        "Key_lists":
        [
            {
                "type": "base_salt",
                "key": "NZLNvhZyfhHdVsUGL8GfVbUifQHIDiJ3oueTLiAGN54=",
                "iter": 10086,
                "seq": 19
            },
            {
                "type": "base_x_public",
                "key": "0mkSa7soBJ/WewVVn3J8Y/TsI9+MvAY+8Elds6UqNTyw=",
                "seq": 0
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
