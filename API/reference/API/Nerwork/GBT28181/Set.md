# Set

## Function

This API is used to set parameter for Network > GBT28181.

## Request Message

### Parameter Description

See Network > GBT28181 > Range > table 1 for parameter description.

Sample：

POST /API/ NetworkConfig/T28181/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "server_port": 5061,
        "local_port": 5060,
        "stream_port": 55550,
        "heart_beat_time": 60,
        "expires": 3600,
        "enable_flag": true,
        "max_timeouts": 3,
        "stream_type": "Substream",
        "link_status": "GB28181_close",
        "server_ip": "172.16.8.15",
        "server_id": "51000000992000000001",
        "device_id": "34020000001340000001",
        "password_empty": true,
        "device_name": "IPC",
        "server_domain": "32050",
        "channel_nvr_id": [{"channel_id": "34020000001340000001"}],
        "enc_password": {
            "seq": 0,
            "peer_key": "0SaWizhlOpa0wQRqrlRMlkaeISft+e7O65RZpQSqbbhM=",
            "cipher": "0uWSr9VAP9/tos+bFguJw2qggJDEncuD/ryv+pz2aRw=="
        }
    }
}

## Response Message

None.

Sample：

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result":"success",
    "data":{}
}

## Error Code

See Response Messages Body and Common error_code for more information.
