# Get

## Function

This API is used to set parameter for Storage > Cloud page.

## Request Message

None.

Sample:

POST /API/StorageConfig/Cloud/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Storage > Cloud > Range > Parameter Description > Table 2 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "cloud_storage": true,
        "cloud_type": "DROPBOX",
        "cloud_status": "NetworkBlocked",
        "total_size": "0.00B",
        "used_size": "0.00B",
        "progress": 0,
        "cloud_over_write": "OFF",
        "video_type": "RF",
        "channel_info": {
            "CH1": {
                "folder_name": "CH1"
            },
            "CH5": {
                "folder_name": "CH5"
            },
            "CH6": {
                "folder_name": "CH6"
            },
            "CH7": {
                "folder_name": "CH7"
            },
            "CH11": {
                "folder_name": "CH11"
            },
            "CH14": {
                "folder_name": "CH14"
            },
            "CH15": {
                "folder_name": "CH15"
            },
            "CH16": {
                "folder_name": "CH16"
            }
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
