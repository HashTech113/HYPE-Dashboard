# Get

## Function

This API is used to get parameter for Storage > RAID page.

## Request Message

None.

Sample:

POST /API/StorageConfig/Raid/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Storage > RAID > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "disk_info": [
            {
                "No": 0,
                "id": 3,
                "enable": false,
                "check": false,
                "slot_no": "HDD4",
                "disk_model": "TOSHIBA DT01ABA100V",
                "serial_no": "878UUN4MS",
                "total_size": 931,
                "array_name": "-",
                "disk_type": "Normal Disk",
                "button_type": ""
            }
        ],
        "raid_info": [

        ],
        "about_raid_info": {
            "max_raid_num": 16,
            "raid_type": [
                0,
                1,
                5,
                6,
                10
            ],
            "hotdisk_type": "Global Hot Spare Disk",
            "support_rebuild": "Supported"
        },
        "create_raid": {
            "raid_type": "RAID0",
            "disk_info": [
                {
                    "id": 3,
                    "serial_no": "HDD4-878UUN4MS",
                    "slot_no": 1,
                    "enable": false,
                    "check": false
                }
            ]
        }
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
