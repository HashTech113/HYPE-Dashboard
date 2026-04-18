# Range

## Function

This API is used to get device information before login.

## Request Message

None.

Sample:

POST /API/Login/Range HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| device_type | "IPC | string | Used to determine the type of current device before login. |

| cur_lang |   | string | Current display language. |

| username | Max length: 16 byte | string | Username. |

| password |   | string | Password |

| pwd_tip | "ipc_tip", "nvr_tip", "dvr_tip" | string | Tip of password panel. |

| password_tips |   | bool | Whether to display the tip of password. |

| lang_strs |   | object | List of languages supported for selection, language types such as Table 2. |

| default_lang |   | string | Default languages. |

| custom_name |   | int | Custom name. |

| custom_logo |   | int | Custom logo. |

| first_login_flag |   | bool | The sign of logging in to IE with an empty password, that is, whether it is the first time to log in. |

| wifi_ip |   | string | Wifi ip. |

| web_title |   | string | "Web Viewer". |

| site_version |   | string | Version. |

| support_recover_password |   | bool | whether it support password retrieval function. |

| use_recover_password |   | bool | Whether to use the password retrieval function. |

| default_username |   | string | Default username,when there is no password, it is displayed when it is used to modify the password. |

| password_enc |   | bool | Whether the password is encrypted for transmission. |

| http_api_version |   | string | The currently supported API version, the current version is: V1.0. (Note: This field is only available in version 8.2.2) |

##### Table 2

lang_strs

| Parameter | Range | Type | Description |

| CHS | 中文 | string |   |

| CHT | 繁体中文 | string |   |

| CSY | ČEŠTINA | string |   |

| DAN | DANSK | string |   |

| ENU | English | string |   |

| FIN | FINNISH | string |   |

| FRA | FRANÇAIS | string |   |

| DEU | DEUTSCH | string |   |

| ELL | ΕΛΛΗΝΙΚΑ | string |   |

| HEB | עברית | string |   |

| HUN | MAGYAR | string |   |

| ITA | ITALIANO | string |   |

| JPN | 日本語 | string |   |

| PLK | POLSKI | string |   |

| PTG | PORTUGUÊS | string |   |

| RUS | РУССКИЙ | string |   |

| ESN | ESPAÑOL | string |   |

| THA | ไทย | string |   |

| SLV | SLOVENIA | string |   |

| ROM | ROMANIAN | string |   |

| BRG | BULGARIAN | string |   |

| ARA | ARABIC | string |   |

| HIN | HINDI | string |   |

| VIE | VIETNAM | string |   |

| HOL | HOLLAND | string |   |

| TUR | TURKEY | string |   |

| POS | PERSIAN | string |   |

| SVE | SVENSKA | string |   |

| KOR | KOREAN | string |   |

| IND | INDONESIAN | string |   |

| PTB | PORTUGUESE | string |   |

| FLM | FLEMISH | string |   |

| UKA | Українська | string |   |

| SLK | Slovensky | string |   |

Tips:

The response message of the Range request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "username":
        {
            "type": "string",
            "min_len": 1,
            "min_len": 16
        },
        "password":
        {
            "type": "string",
            "min_len": 8,//The minimum password length supported by the system
            "min_len": 16//Maximum password length supported by the system
        },
        "pwd_tip": "nvr_tip",
        "first_login_flag": true,
        "default_username": "abc",
        "password_enc": true,
        "http_api_version": "V1.026",
        "default_lang": "CHS",
        "custom_name": 0,
        "custom_logo": 0,
        "login_exclusivity": false,
        "lang_strs":
        {
            "CHS": "中文",
            "CHT": "繁体中文",
            "CSY": "ČEŠTINA",
            "DAN": "DANSK",
            ....
            "PTB": "PORTUGUESE",
            "FLM": "FLEMISH",
            "UKA": "Українська",
            "SLK": "Slovensky"
        },
        "support_recover_password": true,
        "use_recover_password": true,
        "syn_activation_pwd_enable": true,
        "activation_pwd": true,
        "site_version": "dayzip"
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
