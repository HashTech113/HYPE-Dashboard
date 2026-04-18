# Get

## Function

This API is used to get parameter for Storage > Disk Group page.

## Request Message

None.

Sample:

POST /API/StorageConfig/DiskGroup/Get HTTP/1.1

{
    "version": "1.0",
    "data": {}
}

## Response Message

See Storage > Disk Group > Range > Parameter Description > Table 1 for parameter description.

Sample:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "result": "success",
    "data": {
        "disk_group_info": [
            {
                "disk_group_type": "Record Disk Group",
                "group_array": [
                    {
                        "group_num": "Record Disk Group 1 (HDD5)",
                        "channel": [
                            "CH1",
                            "CH2",
                            "CH3",
                            "CH4",
                            "CH5",
                            "CH6",
                            "CH7",
                            "CH8",
                            "CH9",
                            "CH10",
                            "CH11",
                            "CH12",
                            "CH13",
                            "CH14",
                            "CH15",
                            "CH16"
                        ]
                    },
                    {
                        "group_num": "Record Disk Group 2 (HDD2 HDD4)",
                        "channel": [
                            "CH33",
                            "CH34",
                            "CH35",
                            "CH36",
                            "CH37",
                            "CH38",
                            "CH39",
                            "CH40",
                            "CH41",
                            "CH42",
                            "CH43",
                            "CH44",
                            "CH45",
                            "CH46",
                            "CH47",
                            "CH48"
                        ]
                    }
                ]
            }
        ]
    }
}

## Error Code

See Response Messages Body and Common error_code for more information.
