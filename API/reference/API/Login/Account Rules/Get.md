# Get

## Function

Get user rule restrictions.

## Request Message

None.

Sample:

POST /API/AccountRules/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
    }
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| username |   | object | Rule restrictions of username,see Table 2 for more information. |

| password |   | object | Rule restrictions of password,see Table 2 for more information. |

##### Table 2

| Parameter | Range | Type | Description |

| min_length | 1-8 | int | Minimum length. |

| max_length | 16-16 | int | Maximum length. |

| character_combinations_num | 1-4 | int | At least the number of character combinations. |

| character_combinations | "ALPHA", "alpha", "Alpha", "digit", "special" | string array | Character combination list. |

| special |   | string | Special character. |

| not_same_username |   | bool | Can be the same as the user name. |

| deny_password |   | string array | The password cannot be set the same as in the array. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "username":
        {
            "min_length": 1,
            "character_combinations":
            [
                "Alpha",
                "digit",
                "special"
            ],
            "special": "_"
        },

        "password":
        {
            "min_length": 8,
            "not_same_username": true,
            "character_combinations_num": 2,
            "character_combinations":
            [
                "ALPHA",
                "alpha",
                "digit",
                "special"
            ],
            "special": "`~!@#$%^&*()-_=+\\|[{}];:'\",<.>/?"
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
