# Set

## Function

This API is used to set parameter for Storage > Disk page.

## Request Message

See Storage > Disk > Disk Configuration > Range > Parameter Description > Table 2 for parameter description.

Sample:

POST /API/StorageConfig/Disk/Set HTTP/1.1

{
    "version": "1.0",
    "data": {
        "NasMaxCount": 1,
        "diskArr": [

        ],
        "disk_info": [
            {
                "delete_enable": false,
                "device_type": "Normal",
                "disk_type": "ReadAndWriteDisk",
                "display_id": 1,
                "firmware": "AX0U1Q",
                "format_enable": true,
                "free_size": 0,
                "free_time": 0,
                "id": 1,
                "model": "TOSHIBA MQ01ABD050V",
                "serial_no": "Z68ES299S",
                "status": "Full",
                "total_size": 476940,
                "total_time": 724487
            }
        ],
        "hdd_format_type": "AllHddData",
        "over_write": "Auto",
        "support_format": true
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
