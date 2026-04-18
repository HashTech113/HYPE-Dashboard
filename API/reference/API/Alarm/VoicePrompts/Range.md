# Range

## Function

This API is used to get Alarm > Voice Prompts configuration parameter range.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| control_type | "Normal", "AiFace", "AiPlate" | string | Control type: Normal: non-AI face and non-AI license plate AiFace: AI face AiPlate: AI license plate |

Sample:

POST /API/AlarmConfig/VoicePrompts/Get HTTP/1.1

{
    "version": "1.0",
    "data": {
        "control_type":"Normal"
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| language | "Simplified Chinese", "Traditional Chinese", "ČEŠTINA", "DANSK", "ENGLISH", "FINNISH",< br />"FRANÇAIS", "DEUTSCH", "ΕΛΛΗΝΙΚΑ", "עברית", "MAGYAR", "ITALIANO", >"Japanese", "POLSKI", "PORTUGUÊS", "РУССКИЙ", "ESPAÑOL", "ไ ท ย", "SLOVENIA", "ROMANIAN", "BULGARIAN", "ARABIC", "HINDI", "VIETNAM", "HOLLAND", "TURKEY", "PERSIAN", "SVENSKA", "KOREAN", "INDONESIA", "BRAZILE ", "TFLEMISH", "Українська", "SLOVENSKY" | string | The current system language, used to cut into the default language when the web server imports text. |

| command | "Upload", "Remove", "Transform", "Exit", "Play" | string | command. |

| control_type | "Normal","AiFace","AiPlate" | string | Control type. |

| file_name | string length:1-64 | string | file name. |

| text | string length:1-200 | string | file text. |

| index | 0-65535 | int | file index. |

| convert_mode | "File","NetworkText" | string | conversion mode. |

| packet_index | 0-65535 | int | packet index. |

| file_count | 1-65535 | int | Number of files. |

| package_size | 1-51200 | int | package size. |

| download_mode | "g711a","wav","mp3" | string | The format of the audio file to be downloaded when the remote end is listening. |

| url | string length:1-128 | string | download link. |

| license_plate | string length:1-15 | string | It must be brought when the control_type is AiPlate, and it is not necessary when it is other. It corresponds to the "License Plate" on the interface. |

| tips_support_import |   | bool | Whether to support import tips. |

| tips_max_length | 0-16 | int | the longest tip length. |

| volume | 0-100 | int | volume. |

| file_data | string length:1-5242880 | string | file data. |

| audio_list |   | string array | list of audio files. |

| siren_type_content |   | Json Object |   |

| delete_button |   | bool | Delete/import audio button |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "language": {
            "type": "string",
            "items": [
                "简体中文",
                "繁體中文",
                "ČEŠTINA",
                "DANSK",
                "ENGLISH",
                "FINNISH",
                "FRANÇAIS",
                "DEUTSCH",
                "ΕΛΛΗΝΙΚΑ",
                "עברית",
                "MAGYAR",
                "ITALIANO",
                "日 本 語",
                "POLSKI",
                "PORTUGUÊS",
                "РУССКИЙ",
                "ESPAÑOL",
                "ไ ท ย",
                "SLOVENIA",
                "ROMANIAN",
                "BULGARIAN",
                "ARABIC",
                "HINDI",
                "VIETNAM",
                "HOLLAND",
                "TURKEY",
                "PERSIAN",
                "SVENSKA",
                "KOREAN",
                "INDONESIA",
                "BRAZILE",
                "TFLEMISH",
                "Українська",
                "SLOVENSKY"
            ],
            "hide_items": [
                "简体中文",
                "ČEŠTINA",
                "SLOVENIA",
                "VIETNAM",
                "SVENSKA",
                "INDONESIA",
                "BRAZILE",
                "TFLEMISH",
                "Українська",
                "SLOVENSKY"
            ]
        },
        "command": {
            "type": "string",
            "items": [
                "Upload",
                "Remove",
                "Transform",
                "Exit",
                "Play"
            ]
        },
        "control_type": {
            "type": "string",
            "items": [
                "Normal",
                "AiFace",
                "AiPlate"
            ]
        },
        "file_name": {
            "type": "string",
            "min_len": 1,
            "max_len": 64
        },
        "text": {
            "type": "string",
            "min_len": 1,
            "max_len": 200
        },
        "index": {
            "type": "int32",
            "min": 0,
            "max": 65535
        },
        "convert_mode": {
            "type": "string",
            "items": [
                "File",
                "NetworkText"
            ]
        },
        "packet_index": {
            "type": "int32",
            "min": 0,
            "max": 65535
        },
        "file_count": {
            "type": "int32",
            "min": 1,
            "max": 65535
        },
        "package_size": {
            "type": "int32",
            "min": 1,
            "max": 512000
        },
        "download_mode": {
            "type": "string",
            "items": [
                "g711a",
                "wav",
                "mp3"
            ]
        },
        "url": {
            "type": "string",
            "min_len": 1,
            "max_len": 128
        },
        "license_plate": {
            "type": "string",
            "min_len": 1,
            "max_len": 15
        },
        "tips_support_import": {
            "type": "bool"
        },
        "tips_max_length": {
            "type": "string",
            "min_len": 0,
            "max_len": 16
        },
        "volume": {
            "type": "int32",
            "min": 0,
            "max": 100
        },
        "file_data": {
            "type": "string",
            "min_len": 1,
            "max_len": 5242880
        },
        "audio_list": {
            "type": "array",
            "min_size": 0,
            "max_size": 100,
            "items": []
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
