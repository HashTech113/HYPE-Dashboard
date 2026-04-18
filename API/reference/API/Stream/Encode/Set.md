# Set

## Function

This API is used to set parameter for Stream > Encode page.

Note:

The following uses the Set request of the MainStream page as an example to describe this API.

## Request Message

See Stream > Encode > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/StreamConfig/MainStream/Set HTTP/1.1

{
	"version": "1.0",
	"data": {
		"channel_info": {
			"CH1": {
				"rtsp_enable": false,
				"stream_type": "Normal",
				"video_encode_type": "H.265",
				"resolution": "1920 x 1080",
				"fps": 30,
				"bitrate_control": "CBR",
				"video_quality": "Highest",
				"bitrate_mode": "Predefined",
				"bitrate": 2048,
				"custom_bitrate": 2048,
				"audio": true,
				"i_frame_interval": 60,
				"etr": false,
				"etr_stream_type": "Alarm",
				"etr_resolution": "1920 x 1080",
				"etr_fps": 30,
				"etr_video_encode_type": "H.265",
				"etr_bitrate_control": "CBR",
				"etr_video_quality": "Highest",
				"etr_bitrate_mode": "Predefined",
				"etr_bitrate": 4096,
				"etr_custom_bitrate": 4096,
				"etr_audio": true,
				"etr_i_frame_interval": 60,
				"chn_index": "CH1"
			},
			"CH14": {
				"rtsp_enable": false,
				"stream_type": "Normal",
				"video_encode_type": "H.264",
				"resolution": "1920 x 1080",
				"fps": 25,
				"bitrate_control": "CBR",
				"video_quality": "Highest",
				"bitrate_mode": "UserDefined",
				"bitrate": 256,
				"custom_bitrate": 1024,
				"audio": true,
				"i_frame_interval": 50
			},
			"CH16": {
				"rtsp_enable": false,
				"stream_type": "Normal",
				"video_encode_type": "H.264+",
				"resolution": "2560 x 1440",
				"fps": 30,
				"bitrate_control": "CBR",
				"video_quality": "Highest",
				"bitrate_mode": "Predefined",
				"bitrate": 6144,
				"custom_bitrate": 6144,
				"audio": true,
				"i_frame_interval": 60,
				"etr": false,
				"etr_stream_type": "Alarm",
				"etr_resolution": "2560 x 1440",
				"etr_fps": 30,
				"etr_video_encode_type": "H.265",
				"etr_bitrate_control": "CBR",
				"etr_video_quality": "Highest",
				"etr_bitrate_mode": "Predefined",
				"etr_bitrate": 4096,
				"etr_custom_bitrate": 4096,
				"etr_audio": true,
				"etr_i_frame_interval": 120
			}
		}
	}
}

## Response Message

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
	"result": "success",
	"data": {}
}

## Error Code

See Response Messages Body and Common error_code for more information.
