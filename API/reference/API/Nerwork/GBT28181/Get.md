# Get

## Function

This API is used to get parameter for Network > GBT28181 .

## Request Message

None.

Sample：

POST /API/NetworkConfig/T28181/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

### Parameter Description

See Network > GBT28181 > Range > table 1 for parameter description.

Sample：

POST /API/ NetworkConfig/T28181/Get HTTP/1.1

{
    "result": "success",
    "data": {
        "server_port": 5061,
        "local_port": 5060,
        "stream_port": 55550,
        "heart_beat_time": 60,
        "expires": 3600,
        "enable_flag": true,
        "max_timeouts": 3,
        "stream_type": "Substream",
        "link_status": "GB28181_open",
        "server_ip": "172.16.8.15",
        "server_id": "51000000992000000001",
        "device_id": "34020000001340000001",
        "password": "",
        "password_empty": false,
        "device_name": "IPC",
        "server_domain": "32050",
        "channel_nvr_id": [{"channel_id": "34020000001340000001"}]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
