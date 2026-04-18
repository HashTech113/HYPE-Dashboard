# Set

## 功能介绍

It is used to operate the Extended Functionality > IPCVoice Prompt function of IPC.

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

POST /API/Extended/IPCVoicePrompts/Set HTTP/1.1

Request Configure Audio Index

{
    "data": {
        "command": "ConfigureAudioIndex",
        "channel_info": {
            "IP_CH1": {
                "audio_index": 2
            },
            "IP_CH2": {
                "audio_index": 3
            }
        }
    }
}

Request Playor Stop Audio

{
    "data": {
        "command": "PlayAudio",  //"StopPlaying"
        "channel": [
            "CH1", "CH2"
        ]
    }
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

Configure Audio Index

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

Playor Stop Audio

{
    "result": "success",
    "data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
