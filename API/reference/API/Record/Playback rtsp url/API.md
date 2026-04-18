# Playback rtsp url

## Function

This API is used to play playback videos.

## URI

Video playback uses the Rtsp protocol, and the url format is as follows:

#### Back-end Devices (NVR/DVR)

rtsp://ip:port/rtsp/playback?channel=1&subtype=0&starttime=2021-03-24T01:30:00Z&endtime=2021-03-24T07:30:59Z&localtime=true

### Front-end Equipment (IPC)

#### 327DE platform

rtsp://ip:port/rtsp/playback?channel=1&subtype=0&starttime=2021-03-24T01:30:00Z&endtime=2021-03-24T07:30:59Z

#### Other platforms

rtsp://ip:port/cam/playback?channel=1&starttime=2021-03-24T01:30:00Z&endtime=2021-03-24T07:30:59Z

Table 1 describes the parameters.

### Parameter Description

#### Table 1

| Parameter | Range | Type | Description |

| channel |   | int | Channel, starting at 1 |

| subtype | 0: primary stream, 1: substream | int | Stream type |

| starttime |   | string | Play start time |

| endtime |   | string | Playback end time |

| localtime | true: use the local time. false: use the UTC time | bool | Whether to use local time (do not include this field, do not use UTC time) (note: this field is currently only supported by the back-end, front-end IPC does not support it) |
