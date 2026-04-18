# Set

## Function

This API is used to get parameter for Storage > Disk Group page.

## Request Message

See Storage > Disk Group > Range > Parameter Description > Table 1 for parameter description.

Sample:

POST /API/StorageConfig/DiskGroup/Set HTTP/1.1

{
    "result": "success",
    "data": {
        "disk_group_info": [
            {
                "disk_group_type": "Record Disk Group",
                "group_array": [
                    {
                        "group_num": "Record Disk Group 1",
                        "channel": [
                            "CH1",
                            "IP_CH1",
                            "IP_CH2"
                        ]
                    },
                    {
                        "group_num": "Record Disk Group 2",
                        "channel": [
                            "CH2",
                            "CH3",
                            "CH4"
                        ]
                    }
                ]
            }
        ]
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
