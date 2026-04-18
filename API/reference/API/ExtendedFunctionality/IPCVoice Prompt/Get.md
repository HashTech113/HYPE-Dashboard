# Get

## Function

This API is used to get parameter for Extended Functionality > IPCVoice Prompt page.

## Request Message

## Parameter Description

Table 1

| Parameter | Range | Type | Description |

| command | "GetAudioFilesList", "GetAudioIndex", "ConfigureAudioIndex", "PlayAudio", "StopPlaying" | string | Operation command: Get the list of audio files, Get the audio configuration number of the IP channel, Configure the audio number of the IP channel, Start playing audio on IPC, Stop playing on IPC audio |

| channel | “IP_CH1”…” IP_CHx” The number of channels depends on the capabilities of the device. | string array | Used to specify the IP channel to operate (PlayAudio, StopPlaying) |

| channel_info |   | JSON object | Channel Information JSON show as follow Table 2（ConfigureAudioIndex） |

Table 2

| Parameter | Range | Type | Description |

| IP_CH1 |   | Json Object | JSON show as follow Table 3 |

| … |   | Json Object |   |

| IP_CHx |   | Json Object |   |

Table 3

| Parameter | Range | Type | Description |

| state | "Offline", "Online" | string | IP channel online status |

| audio_index |   | int | audio file number |

Sample:

POST /API/Extended/IPCVoicePrompts/Get HTTP/1.1

RequestGet Audio Files List

{
    "data": {
     "command": "GetAudioFilesList"
    }
}

RequestGet Audio Index List

{
    "data": {
     "command": "GetAudioIndex"
    }
}

## Response Message

## Parameter Description

Table 2

| Parameter | Range | Type | Description |

| audio_list |   | string array | audio list |

| channel_info |   | JSON object | Channel Information JSON show as follow Table 2 |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

Get Audio Files List

{
    "result": "success",
    "data": {
        "audio_list": [
            "5_13227.mp3", //Each item in the list is divided into two parts by "_". The first half is the unique serial number assigned to the audio file by the system, and the second half is the audio file name.
            "6_9528.mp3",
            "7_AlienBoi.mp3"
        ]
    }
}

Get Audio Index List

{
    "result": "success",
    "data": {
        "channel_info": {
            "IP_CH1": {
                "status": "Online",
                "audio_index": 2
            },
            "IP_CH2": {
                "status": "Online",
                "audio_index": 3
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
