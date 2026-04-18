# Get

## Function

This API is used to set parameter for Storage > Disk page.

## Request Message

None.

Sample:

POST /API/StorageConfig/Disk/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Storage > Disk > Disk Configuration > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "disk_info": [
            {
                "id": 1,
                "display_id": 1,
                "model": "TOSHIBA MQ01ABD050V",
                "serial_no": "Z68ES299S",
                "firmware": "AX0U1Q",
                "device_type": "Normal",
                "status": "Full",
                "total_size": 476940,
                "free_size": 0,
                "total_time": 724487,
                "free_time": 0,
                "format_enable": true,
                "delete_enable": false,
                "disk_type": "ReadAndWriteDisk"
            }
        ],
        "NasMaxCount": 1,
        "over_write": "Auto",
        "hdd_format_type": "AllHddData",
        "support_format": true
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
