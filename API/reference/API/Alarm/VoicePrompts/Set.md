# Set

## Function

This API is used to set Alarm > Voice Prompts configuration parameters.

## Request Message

### Parameter Description

##### Table 1

| Parameter | Range | Type | Description |

| command | "Upload", "Remove", "Transform", "Exit", "Play" | string | Control command: "Upload": upload audio file or text. "Remove": Delete an audio file. "Transform": Transform an audio file (if the remote end does not support G711A decoding during trial listening, you can issue this command to let the board end convert the audio file For the required format, note that if you have issued this command, you must issue the "Exit" command to let the board release resources when exiting the audio broadcast page). "Exit": Tell the board to release The resources occupied by the "Transform" command (if the "Transform" command is not issued, it is not necessary to issue this command when exiting the audio broadcast page). "Play": audition a certain audio. |

| control_type | "Normal", "AiFace", "AiPlate" | string | Control type. "Normal": Non-AI face and non-AI license plate. "AiFace": AI face.< br />"AiPlate": AI license plate. To be issued in the "Upload" "Remove" "Transform" "Play" command. |

| convert_mode | "File", "LocalText", "NetworkText" | string | conversion mode. "File": Convert audio files. "LocalText": Locally convert text. "NetworkText ": The web server converts text. To be sent in the "Upload" command. |

| packet_index | 0~65535 | int | "command" is "Upload" and "convert_mode" is "File", which means the index of the current package. |

| file_count | 0~65535 | int | issued when "command" is "Upload" and "convert_mode" is "File", indicating the total number of packets. |

| file_name | 1~64 | string | Sent when "command" is "Upload" and "convert_mode" is "File", it means the name of the uploaded audio file. |

| file_data | "control_type" is "Normal" 1~5M "control_type" is "AiFace" 1~500K | string | "command" is "Upload" and "convert_mode" is "File", Indicates the uploaded audio file content. When "control_type" is "Normal", the entire file size is 1~5M. When "control_type" is "AiFace", the entire file size is 1~5M 500K (the total size of a single package cannot exceed 1.5M). |

| text | 1~1024 | string | Sent when "command" is "Upload" and "convert_mode" is "Text". |

| index | 1~11 | int | "command" is "Upload" and "convert_mode" is "File" and "control_type" is "AiFace" to issue, indicating the time period for import. "command" is "Remove" and "control_type" is "Normal", which means to delete the index of which file in the audio list. "command" is "Remove" and "control_type" is " AiFace" issued, indicating which time period of audio to delete. Issued when "command" is "Transform" and "control_type" is "Normal", indicating which file index to transfer. When "command" is "Transform" and "control_type" is "AiFace", it is issued, indicating which time period to turn. "command" is "Play" and "control_type" When it is "Normal", it means the index of which file to play. When "command" is "Play" and "control_type" is "AiFace", it means which time period to play. |

| language |   | string | "command" is "Upload" and "convert_mode" is "Text", indicating which language the text is in. |

| download_mode | "g711a", "aac", "wav", "mp4" | string | "command" is issued when "Transform", indicating what format the audio file related to "index" should be converted into. |

| ipc_channel_info |   | int array | "command" is issued when "Play", indicating which channels to use to play, 255 means local, others correspond to front-end channels, starting from 0. |

| license_plate |   | string | Must bring it when "control_type" is "AiPlate", and don't need it when it is other. Corresponds to "License Plate" on the interface. |

Sample 1. delete audio file:

POST /API/AlarmConfig/VoicePrompts/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "control_type": "Normal",
        "command": "Remove",
        "download_mode": "mp3",
        "index": 45
    }
}

Sample 2. import audio files:

POST /API/AlarmConfig/VoicePrompts/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "fileIndex": 0,
        "fileName": "CC.mp3",
        "chunkSize": 1,
        "chunkIndex": 0,
        "data": "//MoxAAM+F...qqqqqqqqq",
        "control_type": "Normal",
        "command": "Upload",
        "convert_mode": "File",
        "download_mode": "mp3",
        "file_count": 1,
        "packet_index": 0,
        "package_size": 10560,
        "file_name": "CC.mp3",
        "file_data": "//MoxAq...qqqqqqq"
    }
}

Sample 3. server switch:

POST /API/AlarmConfig/VoicePrompts/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "control_type": "Normal",
        "command": "Upload",
        "convert_mode": "NetworkText",
        "download_mode": "mp3",
        "language": "ENGLISH",
        "text": "test",
        "file_name": "name"
    }
}

Sample 4. audition audio:

POST /API/AlarmConfig/VoicePrompts/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "control_type": "Normal",
        "command": "Transform",
        "download_mode": "mp3",
        "index": 46
    }
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| audio_list |   | array | list of audio files. |

| info |   | object | See Table 3. |

##### Table 3

| Parameter | Range | Type | Description |

| language |   | string | The current system language, used to cut into the default language when importing text from the web server. |

| ipc_channel_info |   | array | The front-end supports language output channel list. |

| url |   | string | The url of the remote audition download audio file. For example: http://IP:Port/VoicePromptsTransform/api/FileName, the remote should replace IP, Port, and FileName by itself, where FileName is the file corresponding to audio_list+ File format, this file format is the download_mode (http://127.0.0.1:80/VoicePromptsTransform/api/test.mp3) sent when requesting. |

Sample 1. delete audio file:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"audio_list": []}
}

Sample 2. import audio files:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"audio_list": ["46_CC"]}
}

Sample 3. Server conversion produces audio files:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {"audio_list": [
        "47_name",
        "46_CC"
    ]}
}

Sample 4. audition audio:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
