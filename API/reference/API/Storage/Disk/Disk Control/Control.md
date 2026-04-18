# Control

## Function

This API is used to set parameter for Storage > Disk page.

## Request Message

### Parameter Description

Table 1

| Parameter | Range | Type | Description |

| Type |   | string | NetHdd、RaidHdd、Hdd |

| Info |   | Json Object | NetHdd Object, see Table 2 for detailed information Hdd object, see Table 3 for detailed information |

Table 2

NetHdd Object

| Parameter | Range | Type | Description |

| Mode |   | string | Add、Test、Del |

| Enable |   | int | enable |

| Index |   | int | Network disk serial number (not required for Add, not required for Test) |

| Type | NFS SMB/CIFS | string | Protocol(NFS SMB/CIFS) |

| Username |   | string | username |

| Password |   | string | password |

| Ip |   | string | IP |

| Dir |   | string | directory path |

| Size |   | Int | Hard disk capacity (GB) |

| id |   | in | Hard drive serial number |

| disk_type | ReadAndWriteDisk RedundantDisk ReadOnlyDisk | string | Disk group type |

| disk_group_id |   | int | Disk group serial number |

| base_enc_password |   | Json Object | Please refer to the table in the Syntax file under the Request pubkey or randbyte in the Login directory for encryption password details |

Table 3

Channel Object

| Parameter | Range | Type | Description |

| id |   | int | Hard drive serial number |

| disk_type | ReadAndWriteDisk RedundantDisk ReadOnlyDisk | string | Disk group type |

| disk_group_id |   | int | Disk group serial number |

Table 4

| Parameter | Range | Type | Description |

| result |   | string | success failed |

Sample:

POST /API/StorageConfig/Disk/Control HTTP/1.1

{
    "version": "1.0",
    "data": {
        "Info": {
            "Enable": 1,
            "Mode": "Edit",
            "disk_type": "ReadAndWriteDisk",
            "id": 1
        },
        "Type": "Hdd"
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
