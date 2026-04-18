# Get

## Function

This API is used to get Alarm > Voice Prompts configuration parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| control_type | "Normal","AiFace","AiPlate" | string | Control type: Normal: non-AI face and non-AI license plate AiFace: AI face AiPlate: AI license plate |

| download_mode | "g711a","aac","wav","mp4","mp3" | string | The format of the audio file to be downloaded when the remote end is listening. |

| license_plate |   | string | Must bring it when the control_type is AiPlate, and don't need it when it is other. It corresponds to "License Plate" on the interface. |

Sample:

POST /API/AlarmConfig/VoicePrompts/Get HTTP/1.1

{
    "data": {
        "command": "GetAudioFilesList ",
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| info |   | object | See Table 3 for details. |

| audio_list |   | string array | list of audio files. |

##### Table 3

| Parameter | Range | Type | Description |

| language |   | string | The current system language, used to cut into the default language when the web server imports text. |

| ipc_channel_info |   | string array | The front-end supports language output channel list. |

| url |   | string | The url of the remote audition download audio file. For example: http://IP:Port/VoicePromptsTransform/api/FileName, the remote should replace IP, Port, and FileName by itself, where FileName is the file corresponding to audio_list+ File format, this file format is the download_mode (http://127.0.0.1:80/VoicePromptsTransform/api/test.mp3) sent when requesting. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "audio_list": [
            "5_13227.mp3", //Each item in the list is divided into two parts by "_", the first half is the unique serial number assigned to the audio file by the system, and the second half is the audio file name.
            "6_9528.mp3",
            "7_AlienBoi.mp3"
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
