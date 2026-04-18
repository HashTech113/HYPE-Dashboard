# Get

## Request Message

None.

Sample:

POST /API/MutexParam/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

##### Table 2

| Parameter | Range | Type | Description |

| cloud_video_is_used | len:0~Maximum number of channels | array | The channel number to enable cloud video upload function. |

| max_cloud_video_upload_num |   | int | Maximum number of video uploads for cloud storage. |

Tips:

The response message of the Get request may not contain all the fields in the above table, and the fields not included indicate that the device does not support this parameter configuration.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "cloud_video_is_used": [1, 0, 1, 0, 0],
        "max_cloud_video_upload_num": 5,
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
