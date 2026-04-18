# Range

## Function

This API is used to get the parameter range of Network > FTP.

## Request Message

None.

Sample:

POST /API/NetworkConfig/Ftp/Range HTTP/1.1

{
    "version":"1.0",
    "data":{}
}

## Response Message

### Parameter Description

###### Table 1

| Parameter | Range | Type | Description |

| ftp_enable |   | bool | FTP function switch |

| ftp_test |   | bool | Does it support FTP test |

| server_ip | Max length: 64 byte Note: The maximum input character for DVR is 15 | string | FTP IP address |

| port | [1~65535] | int | FTP server port |

| username | Max length: 64 byte Note: The maximum input character for DVR is 15 | string | Login user name |

| password | Max length: 64 byte Note: The maximum input character for DVR is 15 | string | Login user password.(Only indicate the range in Range, deprecated in Get, Set and Test, pass empty) |

| password_empty |   | bool | Is the password empty |

| upgrade_picture |   | bool | Upload Image Switch |

| picture_resolution | "1920x1080", "1280x720", "1024x768", "640x480", "320x240", "176x144" or "176x120" | string | Image resolution (NVR specific) |

| picture | "Highest", "Higher", "Medium", "Low", "Lower", "Lowest" | string | Image quality (NVR specific) |

| video_stream_type | "Mainstream","Substream" | string | Video stream type |

| video_type | "RF","AVI","MP4" | string | Video file type |

| max_package_interval | 10,20,30,45,60 | int | Maximum subcontracting interval.Unit:minutes |

| directory_name | Max lenth:95byte | string | Upload Path |

| upload_normal_video |   | JSON array | Upload video information JSON,see Table 2 for more information |

| enc_mode | "FTP", "SFTP", "FTPS", | string | FTP Type |

| certpem |   | string | certificate |

| certpwd |   | string | secret key |

| privatekey |   | string | Private certificate |

| privatekeypwd |   | string | Private key |

| base_enc_passwod |   | Json Object | encrypted password，see base_enc_password for more information(Special for Set and Test). |

| upload_picture |   | bool | Whether to upload pictures through FTP |

| upload_video |   | bool | Whether to upload videos through FTP |

###### Table 2

| Parameter | Range | Type | Description |

| enable |   | bool | Upload regular video switch |

| channel | “CH1” ”CH1x” “IP_CH1” ”IP_CH1x“ “WIFI_CH1” ” WIFI_CH1x” The number of channels depends on the functionality of the device. | array | The channel number for uploading regular videos is required Each array bit represents a channel with a string. |

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "ftp_test": true,
        "ftp_enable": {"type": "bool"},
        "server_ip": {
            "description": "Each range {min_len,max_len} corresponds to one ftp_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 63
                },
                {
                    "min_len": 1,
                    "max_len": 63
                }
            ]
        },
        "port": {
            "type": "int32",
            "mode": "r",
            "min": 1,
            "max": 65535,
            "default_value": 21
        },
        "username": {
            "description": "Each range {min_len,max_len} corresponds to one ftp_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 63
                },
                {
                    "min_len": 1,
                    "max_len": 63
                }
            ]
        },
        "password": {
            "description": "Each range {min_len,max_len} corresponds to one ftp_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 63
                },
                {
                    "min_len": 1,
                    "max_len": 63
                }
            ]
        },
        "password_empty": {"type": "bool"},
        "picture_resolution": {
            "type": "string",
            "items": [
                "1920x1080",
                "1280x720",
                "1024x768",
                "640x480",
                "320x240",
                "176x120"
            ]
        },
        "picture_quality": {
            "type": "string",
            "items": [
                "Highest",
                "Higher",
                "Medium",
                "Low",
                "Lower",
                "Lowest"
            ]
        },
        "video_stream_type": {
            "type": "string",
            "items": [
                "Mainstream",
                "Substream"
            ]
        },
        "max_package_interval": {
            "type": "int32",
            "unit": "minute",
            "items": [
                10,
                20,
                30,
                45,
                60
            ]
        },
        "directory_name": {
            "description": "Each range {min_len,max_len} corresponds to one ftp_enable state [false,true].",
            "type": "string",
            "mode": "rw",
            "specialFilter": "*:?\"<>|#(){}~@",
            "ranges": [
                {
                    "min_len": 0,
                    "max_len": 95
                },
                {
                    "min_len": 1,
                    "max_len": 95
                }
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
